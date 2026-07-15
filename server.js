const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { ImapFlow } = require('imapflow');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve the static frontend assets from the current directory
app.use(express.static(__dirname));

// Single active session store (for simple local proxy operations)
let currentSession = null;

// Helper function to map standard folder names to Hostinger folders
function mapFolderName(folder) {
    const f = folder.toLowerCase();
    if (f === 'inbox') return 'INBOX';
    if (f === 'sent') return 'Sent';
    if (f === 'trash') return 'Trash';
    return 'INBOX';
}

// 1. Health check endpoint to tell mail.html that the server is active
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mode: 'Server Proxy Active' });
});

// 2. Authentication and Connection Setup
app.post('/api/connect', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const client = new ImapFlow({
        host: 'imap.hostinger.com',
        port: 993,
        secure: true,
        auth: { user: email, pass: password },
        logger: false
    });

    try {
        // Attempt quick connect/disconnect to verify credentials
        await client.connect();
        await client.logout();

        // Save session locally in memory
        currentSession = { email, password };
        console.log(`[Server] Authenticated session for ${email}`);
        res.json({ success: true, email });
    } catch (err) {
        console.error('[Server] Login connection failed:', err.message);
        res.status(401).json({ error: 'Authentication failed. Please verify your password.' });
    }
});

// 3. Fetch latest 20 emails
app.get('/api/emails', async (req, res) => {
    if (!currentSession) {
        return res.status(401).json({ error: 'No active session. Please sign in.' });
    }

    const targetFolder = mapFolderName(req.query.folder || 'inbox');
    const client = new ImapFlow({
        host: 'imap.hostinger.com',
        port: 993,
        secure: true,
        auth: { user: currentSession.email, pass: currentSession.password },
        logger: false
    });

    try {
        await client.connect();
        
        let lock = await client.getMailboxLock(targetFolder);
        let emails = [];
        
        try {
            let mailbox = await client.mailboxOpen(targetFolder);
            const existsCount = mailbox.exists;
            
            if (existsCount > 0) {
                // Fetch the latest 20 messages
                const start = Math.max(1, existsCount - 19);
                const end = existsCount;
                
                for await (let msg of client.list(`${start}:${end}`, { envelope: true })) {
                    // Extract Sender details safely
                    const fromObj = msg.envelope.from && msg.envelope.from[0] ? msg.envelope.from[0] : {};
                    const fromName = fromObj.name || fromObj.address || 'Unknown Sender';
                    const fromAddress = fromObj.address || '';
                    
                    const toObj = msg.envelope.to && msg.envelope.to[0] ? msg.envelope.to[0] : {};
                    const toAddress = toObj.address || '';

                    // Simple mock message body preview for speed (fetched dynamically on open if needed)
                    emails.push({
                        id: msg.seq,
                        uid: msg.uid,
                        name: fromName,
                        email: fromAddress,
                        to: toAddress,
                        subject: msg.envelope.subject || '(No Subject)',
                        message: 'Double click to download message contents...',
                        timestamp: msg.envelope.date ? new Date(msg.envelope.date).toLocaleString('en-IN') : new Date().toLocaleString('en-IN')
                    });
                }
            }
        } finally {
            lock.release();
        }

        await client.logout();
        // Return latest emails (newest first)
        res.json({ emails: emails.reverse() });
    } catch (err) {
        console.error('[Server] Failed to fetch emails:', err.message);
        res.status(500).json({ error: 'Server error retrieving mailbox folders.' });
    }
});

// 4. Fetch full single email body content on demand
app.get('/api/emails/:uid/body', async (req, res) => {
    if (!currentSession) {
        return res.status(401).json({ error: 'No active session. Please sign in.' });
    }

    const uid = parseInt(req.params.uid);
    const targetFolder = mapFolderName(req.query.folder || 'inbox');
    const client = new ImapFlow({
        host: 'imap.hostinger.com',
        port: 993,
        secure: true,
        auth: { user: currentSession.email, pass: currentSession.password },
        logger: false
    });

    try {
        await client.connect();
        let lock = await client.getMailboxLock(targetFolder);
        let emailBodyText = 'No text content available.';
        
        try {
            await client.mailboxOpen(targetFolder);
            
            // Try fetching the text body parts (Part '1' or source chunk)
            try {
                let download = await client.download(uid, '1', { uid: true });
                if (download && download.content) {
                    let chunks = [];
                    for await (let chunk of download.content) {
                        chunks.push(chunk);
                    }
                    emailBodyText = Buffer.concat(chunks).toString('utf-8');
                }
            } catch (bodyErr) {
                // Fallback: download whole source if part 1 is missing
                let download = await client.download(uid, undefined, { uid: true });
                if (download && download.content) {
                    let chunks = [];
                    for await (let chunk of download.content) {
                        chunks.push(chunk);
                    }
                    const fullSource = Buffer.concat(chunks).toString('utf-8');
                    // Extract body payload (basic parse)
                    const parts = fullSource.split('\r\n\r\n');
                    emailBodyText = parts.slice(1).join('\r\n\r\n') || fullSource;
                }
            }
        } finally {
            lock.release();
        }

        await client.logout();
        res.json({ body: emailBodyText });
    } catch (err) {
        console.error('[Server] Failed to download full body:', err.message);
        res.status(500).json({ error: 'Failed to retrieve full body text.' });
    }
});

// 5. Send SMTP email and sync it to the IMAP 'Sent' folder
app.post('/api/send', async (req, res) => {
    if (!currentSession) {
        return res.status(401).json({ error: 'No active session. Please sign in.' });
    }

    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
        return res.status(400).json({ error: 'To, Subject, and Body fields are required' });
    }

    // SMTP Transporter setup
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: { user: currentSession.email, pass: currentSession.password }
    });

    try {
        // Send email via SMTP
        const info = await transporter.sendMail({
            from: currentSession.email,
            to,
            subject,
            text: body
        });
        console.log(`[SMTP] Sent email: ${info.messageId}`);

        // Sync to Sent folder via IMAP
        const client = new ImapFlow({
            host: 'imap.hostinger.com',
            port: 993,
            secure: true,
            auth: { user: currentSession.email, pass: currentSession.password },
            logger: false
        });

        try {
            await client.connect();
            const rawMessage = `From: ${currentSession.email}\r\nTo: ${to}\r\nSubject: ${subject}\r\nDate: ${new Date().toUTCString()}\r\n\r\n${body}`;
            await client.append('Sent', rawMessage, ['\\Seen']);
            await client.logout();
            console.log('[IMAP] Message appended to Sent folder');
        } catch (imapErr) {
            console.error('[IMAP] Appending to Sent folder failed:', imapErr.message);
            // Non-blocking error, SMTP was already successful
        }

        res.json({ success: true, messageId: info.messageId });
    } catch (err) {
        console.error('[SMTP] Failed to send email:', err.message);
        res.status(500).json({ error: `SMTP server error: ${err.message}` });
    }
});

// 6. Delete email endpoint
app.post('/api/emails/:uid/delete', async (req, res) => {
    if (!currentSession) {
        return res.status(401).json({ error: 'No active session. Please sign in.' });
    }

    const uid = parseInt(req.params.uid);
    const targetFolder = mapFolderName(req.query.folder || 'inbox');
    const client = new ImapFlow({
        host: 'imap.hostinger.com',
        port: 993,
        secure: true,
        auth: { user: currentSession.email, pass: currentSession.password },
        logger: false
    });

    try {
        await client.connect();
        let lock = await client.getMailboxLock(targetFolder);

        try {
            await client.mailboxOpen(targetFolder);
            
            if (targetFolder === 'Trash') {
                // Permanently delete by adding Deleted flag and expunging
                await client.messageFlagsAdd({ uid }, ['\\Deleted'], { uid: true });
                await client.expunge();
                console.log(`[IMAP] Message UID ${uid} permanently deleted from Trash`);
            } else {
                // Move to Trash folder
                await client.messageMove({ uid }, 'Trash', { uid: true });
                console.log(`[IMAP] Message UID ${uid} moved to Trash`);
            }
        } finally {
            lock.release();
        }

        await client.logout();
        res.json({ success: true });
    } catch (err) {
        console.error('[Server] Delete operation failed:', err.message);
        res.status(500).json({ error: 'Failed to delete message.' });
    }
});

// 7. Submit customer inquiry from public website (local secure mail proxy dispatch)
app.post('/api/submit-inquiry', async (req, res) => {
    const { name, phone, email, district, location, connection, systemModelLabel, capacity, loanRequired, message, partnerName, partnerCode } = req.body;
    
    // Construct email content
    const emailBody = `New Solar Inquiry Details:
----------------------------------------
Customer Name: ${name}
Phone: ${phone}
Email: ${email || 'Not Provided'}
District: ${district}
Location: ${location}
System Type: ${connection === 'residential' ? 'Residential (Home Solar)' : 'Commercial / Business'}
System Model: ${systemModelLabel}
Capacity: ${capacity} kWp
Loan Required: ${loanRequired}
Site Message: ${message || 'None'}
Assigned Partner: ${partnerName} (${partnerCode})
----------------------------------------
Sent automatically by Sunova Solar Web Portal.`;

    // If a staff session is authenticated, use it to dispatch emails directly to info@sunovasolar.in
    if (currentSession && currentSession.email && currentSession.password) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: { user: currentSession.email, pass: currentSession.password }
        });
        
        try {
            await transporter.sendMail({
                from: currentSession.email,
                to: 'info@sunovasolar.in',
                subject: `New Solar Inquiry from ${name} (${location})`,
                text: emailBody
            });
            console.log(`[Local SMTP Proxy] Sent inquiry copy to info@sunovasolar.in`);
            return res.json({ success: true, method: 'Local SMTP Session' });
        } catch (err) {
            console.error('[Local SMTP Proxy] Failed to send email copy:', err.message);
        }
    }
    
    console.log(`[Local Proxy] Inquiry received but no active SMTP session is online.`);
    res.json({ success: false, error: 'No active SMTP session found on proxy server.' });
});

const fs = require('fs');

// Mock proxy.php router for local Node.js server testing
app.all('/proxy.php', (req, res) => {
    const action = req.query.action || req.body.action;
    
    if (action === 'log_inquiry') {
        const payload = req.method === 'POST' ? req.body : req.query;
        const dbFile = path.join(__dirname, 'inquiries_db.json');
        let inquiries = [];
        if (fs.existsSync(dbFile)) {
            try {
                inquiries = JSON.parse(fs.readFileSync(dbFile, 'utf8')) || [];
            } catch (e) {}
        }
        
        const newInq = {
            uid: Date.now().toString(),
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            district: payload.district,
            location: payload.location,
            connection: payload.connection,
            systemModel: payload.systemModel,
            capacity: payload.capacity,
            loan: payload.loan,
            message: payload.message,
            dealer: payload.dealer,
            timestamp: new Date().toLocaleString('en-IN')
        };
        
        inquiries.push(newInq);
        fs.writeFileSync(dbFile, JSON.stringify(inquiries, null, 2));
        console.log(`[Local Server] Lead logged to inquiries_db.json for ${payload.name}`);
        return res.json({ success: true, inquiry: newInq });
    }
    
    if (action === 'get_inquiries') {
        const dbFile = path.join(__dirname, 'inquiries_db.json');
        let inquiries = [];
        if (fs.existsSync(dbFile)) {
            try {
                inquiries = JSON.parse(fs.readFileSync(dbFile, 'utf8')) || [];
            } catch (e) {}
        }
        return res.json({ inquiries: inquiries });
    }
    
    if (action === 'delete_inquiry') {
        const uid = req.query.uid;
        const dbFile = path.join(__dirname, 'inquiries_db.json');
        let inquiries = [];
        if (fs.existsSync(dbFile)) {
            try {
                inquiries = JSON.parse(fs.readFileSync(dbFile, 'utf8')) || [];
            } catch (e) {}
        }
        inquiries = inquiries.filter(inq => inq.uid !== uid);
        fs.writeFileSync(dbFile, JSON.stringify(inquiries, null, 2));
        console.log(`[Local Server] Lead deleted: ${uid}`);
        return res.json({ success: true });
    }
    
    if (action === 'complete_inquiry') {
        const uid = req.query.uid;
        const commission = req.query.commission || 0;
        const dbFile = path.join(__dirname, 'inquiries_db.json');
        let inquiries = [];
        if (fs.existsSync(dbFile)) {
            try {
                inquiries = JSON.parse(fs.readFileSync(dbFile, 'utf8')) || [];
            } catch (e) {}
        }
        inquiries = inquiries.map(inq => {
            if (inq.uid === uid) {
                inq.status = 'Completed';
                inq.commission = commission;
            }
            return inq;
        });
        fs.writeFileSync(dbFile, JSON.stringify(inquiries, null, 2));
        console.log(`[Local Server] Lead completed: ${uid} (Commission: ${commission})`);
        return res.json({ success: true });
    }
    
    res.status(400).json({ error: 'Unknown action in mock proxy' });
});

// Redirect any other route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Sunova Solar Mail Server is running on port ${PORT}`);
    console.log(`🔗 Local Address: http://localhost:${PORT}`);
    console.log(`📁 Static files folder: ${__dirname}`);
    console.log(`==================================================\n`);
});

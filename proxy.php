<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Health connection check
if ($action === 'health') {
    echo json_encode(['status' => 'ok', 'mode' => 'PHP Mail Proxy Active']);
    exit;
}

// 2. Connect / Authenticate
if ($action === 'connect') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = isset($data['email']) ? $data['email'] : '';
    $password = isset($data['password']) ? $data['password'] : '';
    
    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        exit;
    }
    
    // Attempt IMAP connection to verify credentials
    $mbox = @imap_open("{imap.hostinger.com:993/imap/ssl}INBOX", $email, $password, OP_HALFOPEN);
    if ($mbox) {
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;
        imap_close($mbox);
        echo json_encode(['success' => true, 'email' => $email]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication failed. Please verify your password.']);
    }
    exit;
}

// Check session
if (!isset($_SESSION['email']) || !isset($_SESSION['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No active session']);
    exit;
}

$email = $_SESSION['email'];
$password = $_SESSION['password'];

// 3. Fetch Emails
if ($action === 'fetch') {
    $folder = isset($_GET['folder']) ? $_GET['folder'] : 'inbox';
    $imapFolder = 'INBOX';
    $folderLower = strtolower($folder);
    if ($folderLower === 'sent') $imapFolder = 'Sent';
    if ($folderLower === 'trash') $imapFolder = 'Trash';
    
    $mbox = @imap_open("{imap.hostinger.com:993/imap/ssl}$imapFolder", $email, $password);
    if (!$mbox) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to connect to Hostinger IMAP.']);
        exit;
    }
    
    $numMessages = imap_num_msg($mbox);
    $emails = [];
    
    // Fetch latest 20 messages
    $start = max(1, $numMessages - 19);
    for ($i = $numMessages; $i >= $start; $i--) {
        $header = imap_headerinfo($mbox, $i);
        $subject = isset($header->subject) ? imap_utf8($header->subject) : '(No Subject)';
        
        $from = $header->from[0];
        $senderName = isset($from->personal) ? imap_utf8($from->personal) : $from->mailbox . '@' . $from->host;
        $senderEmail = $from->mailbox . '@' . $from->host;
        $date = date('d-M-Y H:i', strtotime($header->date));
        
        $emails[] = [
            'uid' => $i,
            'name' => $senderName,
            'email' => $senderEmail,
            'subject' => $subject,
            'message' => 'Click to open and read full message content...',
            'timestamp' => $date
        ];
    }
    
    imap_close($mbox);
    echo json_encode(['emails' => $emails]);
    exit;
}

// 4. Fetch Email Body
if ($action === 'body') {
    $uid = isset($_GET['uid']) ? intval($_GET['uid']) : 0;
    $folder = isset($_GET['folder']) ? $_GET['folder'] : 'inbox';
    $imapFolder = 'INBOX';
    $folderLower = strtolower($folder);
    if ($folderLower === 'sent') $imapFolder = 'Sent';
    if ($folderLower === 'trash') $imapFolder = 'Trash';
    
    $mbox = @imap_open("{imap.hostinger.com:993/imap/ssl}$imapFolder", $email, $password);
    if (!$mbox) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to connect to IMAP']);
        exit;
    }
    
    $body = imap_fetchbody($mbox, $uid, 1);
    $structure = imap_fetchstructure($mbox, $uid);
    if ($structure->encoding == 3) { // BASE64
        $body = base64_decode($body);
    } elseif ($structure->encoding == 4) { // QUOTED-PRINTABLE
        $body = quoted_printable_decode($body);
    }
    
    imap_close($mbox);
    echo json_encode(['body' => $body]);
    exit;
}

// 5. Send Email
if ($action === 'send') {
    $data = json_decode(file_get_contents('php://input'), true);
    $to = isset($data['to']) ? $data['to'] : '';
    $subject = isset($data['subject']) ? $data['subject'] : '';
    $body = isset($data['body']) ? $data['body'] : '';
    
    if (!$to || !$subject || !$body) {
        http_response_code(400);
        echo json_encode(['error' => 'Recipient, subject, and body are required']);
        exit;
    }
    
    // Connect to SMTP secure server on port 465 using direct socket connection
    $host = 'ssl://smtp.hostinger.com';
    $port = 465;
    $timeout = 30;
    
    $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        http_response_code(500);
        echo json_encode(['error' => "SMTP Connection failed: $errstr ($errno)"]);
        exit;
    }
    
    function getResponse($socket) {
        $data = "";
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return $data;
    }
    
    getResponse($socket);
    fwrite($socket, "EHLO localhost\r\n");
    getResponse($socket);
    fwrite($socket, "AUTH LOGIN\r\n");
    getResponse($socket);
    fwrite($socket, base64_encode($email) . "\r\n");
    getResponse($socket);
    fwrite($socket, base64_encode($password) . "\r\n");
    $authResponse = getResponse($socket);
    
    if (strpos($authResponse, "235") === false) {
        http_response_code(401);
        echo json_encode(['error' => 'SMTP Authentication failed: ' . $authResponse]);
        fclose($socket);
        exit;
    }
    
    fwrite($socket, "MAIL FROM: <$email>\r\n");
    getResponse($socket);
    fwrite($socket, "RCPT TO: <$to>\r\n");
    getResponse($socket);
    fwrite($socket, "DATA\r\n");
    getResponse($socket);
    
    $headers = "From: <$email>\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    
    fwrite($socket, $headers . $body . "\r\n.\r\n");
    getResponse($socket);
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    
    echo json_encode(['success' => true]);
    exit;
}

// 6. Delete Email
if ($action === 'delete') {
    $uid = isset($_GET['uid']) ? intval($_GET['uid']) : 0;
    $folder = isset($_GET['folder']) ? $_GET['folder'] : 'inbox';
    $imapFolder = 'INBOX';
    $folderLower = strtolower($folder);
    if ($folderLower === 'sent') $imapFolder = 'Sent';
    if ($folderLower === 'trash') $imapFolder = 'Trash';
    
    $mbox = @imap_open("{imap.hostinger.com:993/imap/ssl}$imapFolder", $email, $password);
    if (!$mbox) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to connect to IMAP']);
        exit;
    }
    
    imap_delete($mbox, $uid);
    imap_expunge($mbox);
    imap_close($mbox);
    
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid action']);

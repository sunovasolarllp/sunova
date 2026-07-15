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
    
    $imapHost = isset($data['imap_host']) ? $data['imap_host'] : 'imap.hostinger.com';
    $imapPort = isset($data['imap_port']) ? intval($data['imap_port']) : 993;
    $smtpHost = isset($data['smtp_host']) ? $data['smtp_host'] : 'smtp.hostinger.com';
    $smtpPort = isset($data['smtp_port']) ? intval($data['smtp_port']) : 465;
    
    // Attempt IMAP connection to verify credentials
    $mbox = @imap_open("{" . $imapHost . ":" . $imapPort . "/imap/ssl}INBOX", $email, $password, OP_HALFOPEN);
    if ($mbox) {
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;
        $_SESSION['imap_host'] = $imapHost;
        $_SESSION['imap_port'] = $imapPort;
        $_SESSION['smtp_host'] = $smtpHost;
        $_SESSION['smtp_port'] = $smtpPort;
        imap_close($mbox);
        echo json_encode(['success' => true, 'email' => $email]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication failed. Please verify your password.']);
    }
    exit;
}

// 7. Log Inquiry (Publicly accessible from homepage form)
if ($action === 'log_inquiry') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }
    
    $file = 'inquiries_db.php';
    $inquiries = [];
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $jsonStr = str_replace('<?php http_response_code(403); exit; ?>', '', $content);
        $inquiries = json_decode($jsonStr, true);
        if (!is_array($inquiries)) $inquiries = [];
    }
    
    // Append timestamp and unique ID
    $data['uid'] = time() . '_' . rand(1000, 9999);
    $data['timestamp'] = date('Y-m-d H:i:s');
    
    array_unshift($inquiries, $data);
    
    // Save with security header
    $saveContent = '<?php http_response_code(403); exit; ?>' . json_encode($inquiries, JSON_PRETTY_PRINT);
    file_put_contents($file, $saveContent);
    
    echo json_encode(['success' => true]);
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
    
    $mbox = @imap_open("{" . $_SESSION['imap_host'] . ":" . $_SESSION['imap_port'] . "/imap/ssl}$imapFolder", $email, $password);
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
    
    $mbox = @imap_open("{" . $_SESSION['imap_host'] . ":" . $_SESSION['imap_port'] . "/imap/ssl}$imapFolder", $email, $password);
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
    
    // Connect to SMTP secure server using direct socket connection
    $host = 'ssl://' . $_SESSION['smtp_host'];
    $port = $_SESSION['smtp_port'];
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
    
    $mbox = @imap_open("{" . $_SESSION['imap_host'] . ":" . $_SESSION['imap_port'] . "/imap/ssl}$imapFolder", $email, $password);
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

// 8. Retrieve Logged Inquiries (Requires Auth Session)
if ($action === 'get_inquiries') {
    $file = 'inquiries_db.php';
    $inquiries = [];
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $jsonStr = str_replace('<?php http_response_code(403); exit; ?>', '', $content);
        $inquiries = json_decode($jsonStr, true);
        if (!is_array($inquiries)) $inquiries = [];
    }
    
    echo json_encode(['inquiries' => $inquiries]);
    exit;
}

// 9. Delete Logged Inquiry (Requires Auth Session)
if ($action === 'delete_inquiry') {
    $uid = isset($_GET['uid']) ? $_GET['uid'] : '';
    if (!$uid) {
        http_response_code(400);
        echo json_encode(['error' => 'Inquiry UID is required']);
        exit;
    }
    
    $file = 'inquiries_db.php';
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $jsonStr = str_replace('<?php http_response_code(403); exit; ?>', '', $content);
        $inquiries = json_decode($jsonStr, true);
        if (is_array($inquiries)) {
            $inquiries = array_values(array_filter($inquiries, function($inq) use ($uid) {
                return $inq['uid'] !== $uid;
            }));
            
            $saveContent = '<?php http_response_code(403); exit; ?>' . json_encode($inquiries, JSON_PRETTY_PRINT);
            file_put_contents($file, $saveContent);
        }
    }
    
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid action']);

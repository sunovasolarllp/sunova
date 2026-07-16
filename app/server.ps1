$port = 8081
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Host "PowerShell HTTP Server running on http://127.0.0.1:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        # Clean path and join
        $cleanPath = $urlPath.Replace("/", "\").TrimStart("\")
        $filePath = [System.IO.Path]::Combine($pwd.Path, $cleanPath)

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            
            # Content Type Mapping
            if ($urlPath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($urlPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($urlPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($urlPath.EndsWith(".json")) { $response.ContentType = "application/json" }
            elseif ($urlPath.EndsWith(".jpg") -or $urlPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($urlPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errorMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.OutputStream.Write($errorMsg, 0, $errorMsg.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Server error: $_"
} finally {
    $listener.Stop()
}

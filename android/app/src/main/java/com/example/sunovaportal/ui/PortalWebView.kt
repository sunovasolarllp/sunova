package com.example.sunovaportal.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.print.PrintAttributes
import android.print.PrintManager
import android.view.ViewGroup
import android.webkit.*
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.sunovaportal.R

val SurfaceDark = Color(0xFF1E293B)

fun isOnline(context: Context): Boolean {
    val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager ?: return false
    val activeNetwork = connectivityManager.activeNetwork ?: return false
    val capabilities = connectivityManager.getNetworkCapabilities(activeNetwork) ?: return false
    return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
}

@OptIn(ExperimentalMaterial3Api::class)
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PortalWebView(
    initialUrl: String,
    sessionUser: String? = null,
    isStaff: Boolean = false,
    onLogout: () -> Unit = {}
) {
    val context = LocalContext.current
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var currentUrl by remember { mutableStateOf(initialUrl) }
    var pageTitle by remember { mutableStateOf(if (isStaff) "Staff Workspace" else "Partner Portal") }
    var isLoading by remember { mutableStateOf(true) }
    var canGoBack by remember { mutableStateOf(false) }
    var isOfflineError by remember { mutableStateOf(false) }

    var filePathCallback by remember { mutableStateOf<ValueCallback<Array<Uri>>?>(null) }

    val fileChooserLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val intentData = result.data
            val results: Array<Uri>? = when {
                intentData?.dataString != null -> arrayOf(Uri.parse(intentData.dataString))
                intentData?.clipData != null -> {
                    val count = intentData.clipData!!.itemCount
                    Array(count) { i -> intentData.clipData!!.getItemAt(i).uri }
                }
                else -> null
            }
            filePathCallback?.onReceiveValue(results)
        } else {
            filePathCallback?.onReceiveValue(null)
        }
        filePathCallback = null
    }

    BackHandler(enabled = true) {
        if (webViewInstance?.canGoBack() == true) {
            webViewInstance?.goBack()
        } else {
            onLogout()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.sunova_logo),
                            contentDescription = "Sunova Solar Logo",
                            modifier = Modifier.size(28.dp)
                        )
                        Column {
                            Text(
                                text = if (isStaff) "🏢 Staff Workspace" else "🤝 Partner Portal",
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            if (!sessionUser.isNullOrEmpty()) {
                                Text(
                                    text = "User: $sessionUser",
                                    fontSize = 11.sp,
                                    color = SunYellow
                                )
                            }
                        }
                    }
                },
                navigationIcon = {
                    IconButton(onClick = {
                        if (webViewInstance?.canGoBack() == true) {
                            webViewInstance?.goBack()
                        } else {
                            onLogout()
                        }
                    }) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White
                        )
                    }
                },
                actions = {
                    // 1-Click Native Print Document / PDF
                    IconButton(onClick = {
                        webViewInstance?.let { wv ->
                            val printManager = context.getSystemService(Context.PRINT_SERVICE) as? PrintManager
                            val printAdapter = wv.createPrintDocumentAdapter("Sunova_Solar_Document")
                            printManager?.print(
                                "Sunova_Solar_Print",
                                printAdapter,
                                PrintAttributes.Builder().build()
                            )
                        }
                    }) {
                        Icon(
                            imageVector = Icons.Default.Print,
                            contentDescription = "1-Click Print",
                            tint = SunYellow
                        )
                    }

                    // Refresh Button
                    IconButton(onClick = { 
                        isOfflineError = false
                        webViewInstance?.reload() 
                    }) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Refresh",
                            tint = Color.White
                        )
                    }

                    // Logout Button (Returns to app login)
                    IconButton(onClick = { onLogout() }) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.Logout,
                            contentDescription = "Logout",
                            tint = Color(0xFFEF4444)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = DarkBackground)
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .background(DarkBackground)
        ) {
            AndroidView(
                factory = { ctx ->
                    WebView(ctx).apply {
                        layoutParams = ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT
                        )

                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            allowFileAccess = true
                            allowContentAccess = true
                            useWideViewPort = true
                            loadWithOverviewMode = true
                            setSupportZoom(true)
                            builtInZoomControls = true
                            displayZoomControls = false
                            mediaPlaybackRequiresUserGesture = false
                            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                            cacheMode = WebSettings.LOAD_DEFAULT
                            userAgentString = userAgentString + " SunovaSolarAndroidApp/1.0"
                        }

                        CookieManager.getInstance().setAcceptCookie(true)
                        CookieManager.getInstance().setAcceptThirdPartyCookies(this, true)

                        webViewClient = object : WebViewClient() {
                            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                                isLoading = true
                                canGoBack = view?.canGoBack() == true
                                url?.let { currentUrl = it }
                            }

                            override fun onPageFinished(view: WebView?, url: String?) {
                                isLoading = false
                                canGoBack = view?.canGoBack() == true
                                pageTitle = view?.title ?: if (isStaff) "Staff Workspace" else "Partner Portal"
                                url?.let { currentUrl = it }

                                // Inject session authentication into localStorage
                                sessionUser?.let { user ->
                                    val jsCode = if (isStaff) {
                                        "localStorage.setItem('portal_user', '$user'); localStorage.setItem('staff_portal_user', '$user');"
                                    } else {
                                        "localStorage.setItem('partner_code', '$user'); localStorage.setItem('partner_last_activity', Date.now().toString()); if (typeof showDashboard === 'function') showDashboard('$user');"
                                    }
                                    view?.evaluateJavascript(jsCode, null)
                                }
                            }

                            override fun onReceivedError(
                                view: WebView?,
                                request: WebResourceRequest?,
                                error: WebResourceError?
                            ) {
                                if (request?.isForMainFrame == true) {
                                    isLoading = false
                                    if (!isOnline(ctx)) {
                                        isOfflineError = true
                                    }
                                }
                            }

                            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                                val reqUrl = request?.url?.toString() ?: return false

                                // WhatsApp Intent
                                if (reqUrl.startsWith("https://wa.me") || reqUrl.startsWith("whatsapp://")) {
                                    try {
                                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(reqUrl))
                                        ctx.startActivity(intent)
                                        return true
                                    } catch (e: Exception) {
                                        return false
                                    }
                                }

                                // UPI Payment Intent
                                if (reqUrl.startsWith("upi://")) {
                                    try {
                                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(reqUrl))
                                        ctx.startActivity(intent)
                                        return true
                                    } catch (e: Exception) {
                                        return false
                                    }
                                }

                                // Phone dialer
                                if (reqUrl.startsWith("tel:")) {
                                    try {
                                        val intent = Intent(Intent.ACTION_DIAL, Uri.parse(reqUrl))
                                        ctx.startActivity(intent)
                                    } catch (e: Exception) {}
                                    return true
                                }

                                // Mailto
                                if (reqUrl.startsWith("mailto:")) {
                                    try {
                                        val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(reqUrl))
                                        ctx.startActivity(intent)
                                    } catch (e: Exception) {}
                                    return true
                                }

                                return false
                            }
                        }

                        webChromeClient = object : WebChromeClient() {
                            override fun onReceivedTitle(view: WebView?, title: String?) {
                                super.onReceivedTitle(view, title)
                                if (!title.isNullOrEmpty()) pageTitle = title
                            }

                            override fun onGeolocationPermissionsShowPrompt(
                                origin: String?,
                                callback: GeolocationPermissions.Callback?
                            ) {
                                callback?.invoke(origin, true, false)
                            }

                            override fun onShowFileChooser(
                                webView: WebView?,
                                filePathCallbackIn: ValueCallback<Array<Uri>>?,
                                fileChooserParams: FileChooserParams?
                            ): Boolean {
                                filePathCallback?.onReceiveValue(null)
                                filePathCallback = filePathCallbackIn

                                val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                                    type = "*/*"
                                    addCategory(Intent.CATEGORY_OPENABLE)
                                }

                                try {
                                    fileChooserLauncher.launch(intent)
                                } catch (e: Exception) {
                                    filePathCallback = null
                                    return false
                                }
                                return true
                            }
                        }

                        loadUrl(initialUrl)
                        webViewInstance = this
                    }
                },
                modifier = Modifier.fillMaxSize()
            )

            if (isLoading) {
                LinearProgressIndicator(
                    modifier = Modifier
                        .fillMaxWidth()
                        .align(Alignment.TopCenter),
                    color = SunYellow,
                    trackColor = BorderColor
                )
            }

            // Offline Screen Overlay if network fails
            if (isOfflineError) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(DarkBackground.copy(alpha = 0.95f))
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Card(
                        colors = CardDefaults.cardColors(containerColor = SurfaceDark),
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier.padding(24.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(16.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.WifiOff,
                                contentDescription = "Offline",
                                tint = SunYellow,
                                modifier = Modifier.size(48.dp)
                            )
                            Text(
                                text = "Unable to Connect to Portal Server",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                textAlign = TextAlign.Center
                            )
                            Text(
                                text = "Please check your internet connection, or load the local offline partner portal.",
                                fontSize = 13.sp,
                                color = Color(0xFF94A3B8),
                                textAlign = TextAlign.Center
                            )
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                Button(
                                    onClick = {
                                        isOfflineError = false
                                        webViewInstance?.reload()
                                    },
                                    modifier = Modifier.weight(1f),
                                    colors = ButtonDefaults.buttonColors(containerColor = SunYellow)
                                ) {
                                    Text("Retry", color = Color(0xFF0D1321), fontWeight = FontWeight.Bold)
                                }
                                OutlinedButton(
                                    onClick = {
                                        isOfflineError = false
                                        webViewInstance?.loadUrl("file:///android_asset/partner-portal.html")
                                    },
                                    modifier = Modifier.weight(1f)
                                ) {
                                    Text("Local Portal", color = Color.White)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

package com.example.sunovaportal

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.example.sunovaportal.theme.SunovaPortalTheme
import com.example.sunovaportal.ui.PortalWebView
import com.example.sunovaportal.ui.UnifiedLoginScreen

sealed class AppScreen {
    object Login : AppScreen()
    data class Portal(
        val url: String,
        val isStaff: Boolean,
        val sessionUser: String?
    ) : AppScreen()
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            SunovaPortalTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    var currentScreen by remember { mutableStateOf<AppScreen>(AppScreen.Login) }

                    when (val screen = currentScreen) {
                        is AppScreen.Login -> {
                            UnifiedLoginScreen(
                                onLoginSuccess = { isStaff, user, targetUrl ->
                                    currentScreen = AppScreen.Portal(
                                        url = targetUrl,
                                        isStaff = isStaff,
                                        sessionUser = user
                                    )
                                },
                                onQuickToolSelect = { toolUrl ->
                                    currentScreen = AppScreen.Portal(
                                        url = toolUrl,
                                        isStaff = false,
                                        sessionUser = null
                                    )
                                }
                            )
                        }

                        is AppScreen.Portal -> {
                            PortalWebView(
                                url = screen.url,
                                sessionUser = screen.sessionUser,
                                isStaff = screen.isStaff,
                                onLogout = {
                                    currentScreen = AppScreen.Login
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}

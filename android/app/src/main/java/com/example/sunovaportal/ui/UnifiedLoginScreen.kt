package com.example.sunovaportal.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

val DarkBackground = Color(0xFF0D1321)
val SurfaceColor = Color(0xFF1E293B)
val SunYellow = Color(0xFFFFB703)
val EmeraldGreen = Color(0xFF10B981)
val AccentSky = Color(0xFF38BDF8)
val TextMuted = Color(0xFF94A3B8)
val BorderColor = Color(0xFF334155)

enum class LoginTab {
    PARTNER,
    STAFF
}

@Composable
fun UnifiedLoginScreen(
    onLoginSuccess: (isStaff: Boolean, identifier: String, targetUrl: String) -> Unit,
    onQuickToolSelect: (toolUrl: String) -> Unit
) {
    var selectedTab by remember { mutableStateOf(LoginTab.PARTNER) }
    
    // Partner Form States
    var partnerCodeOrPhone by remember { mutableStateOf("SUN-TVM-01") }
    var partnerPin by remember { mutableStateOf("2277") }
    var partnerPinVisible by remember { mutableStateOf(false) }
    var partnerError by remember { mutableStateOf("") }
    
    // Staff Form States
    var staffIdOrEmail by remember { mutableStateOf("STAFF-ENG-01") }
    var staffPassword by remember { mutableStateOf("admin123") }
    var staffRole by remember { mutableStateOf("Project Engineer") }
    var staffPasswordVisible by remember { mutableStateOf(false) }
    var staffError by remember { mutableStateOf("") }

    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .verticalScroll(scrollState)
            .padding(horizontal = 20.dp, vertical = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        // Branding Header
        Box(
            modifier = Modifier
                .size(64.dp)
                .background(
                    brush = Brush.radialGradient(listOf(SunYellow.copy(alpha = 0.3f), Color.Transparent)),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "⚡", fontSize = 36.sp)
        }

        Text(
            text = "SUNOVA SOLAR",
            fontSize = 24.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color.White,
            letterSpacing = 1.sp
        )

        Text(
            text = "Staff & Partner Operations Portal",
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium,
            color = SunYellow,
            modifier = Modifier.padding(top = 2.dp)
        )

        Text(
            text = "PM Surya Ghar Authorized EPC Operations Suite",
            fontSize = 11.sp,
            color = TextMuted,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
        )

        // Segmented Switcher (Partner vs Staff)
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceColor, shape = RoundedCornerShape(12.dp))
                .border(1.dp, BorderColor, shape = RoundedCornerShape(12.dp))
                .padding(4.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // Partner Tab
            Box(
                modifier = Modifier
                    .weight(1f)
                    .background(
                        color = if (selectedTab == LoginTab.PARTNER) SunYellow else Color.Transparent,
                        shape = RoundedCornerShape(9.dp)
                    )
                    .clickable { selectedTab = LoginTab.PARTNER }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "🤝 Partner Login",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (selectedTab == LoginTab.PARTNER) Color(0xFF0D1321) else Color.White
                    )
                }
            }

            // Staff Tab
            Box(
                modifier = Modifier
                    .weight(1f)
                    .background(
                        color = if (selectedTab == LoginTab.STAFF) EmeraldGreen else Color.Transparent,
                        shape = RoundedCornerShape(9.dp)
                    )
                    .clickable { selectedTab = LoginTab.STAFF }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "🏢 Staff / Admin",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (selectedTab == LoginTab.STAFF) Color.White else Color.White
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Form Card Container
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceColor),
            border = CardDefaults.outlinedCardBorder().copy(
                brush = Brush.verticalGradient(
                    listOf(
                        if (selectedTab == LoginTab.PARTNER) SunYellow.copy(alpha = 0.5f) else EmeraldGreen.copy(alpha = 0.5f),
                        BorderColor
                    )
                )
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                horizontalAlignment = Alignment.Start
            ) {
                if (selectedTab == LoginTab.PARTNER) {
                    // PARTNER LOGIN FORM
                    Text(
                        text = "Channel Partner Authentication",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = SunYellow
                    )
                    Text(
                        text = "Enter your Partner ID Code or Registered Mobile",
                        fontSize = 11.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(top = 2.dp, bottom = 14.dp)
                    )

                    // Partner Code / Phone
                    OutlinedTextField(
                        value = partnerCodeOrPhone,
                        onValueChange = { partnerCodeOrPhone = it },
                        label = { Text("Partner Code or Mobile *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("e.g. SUN-TVM-01 or 9847012345", color = Color.Gray, fontSize = 12.sp) },
                        leadingIcon = { Icon(Icons.Default.Person, contentDescription = null, tint = SunYellow) },
                        singleLine = true,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White,
                            focusedBorderColor = SunYellow,
                            unfocusedBorderColor = BorderColor,
                            focusedContainerColor = DarkBackground,
                            unfocusedContainerColor = DarkBackground
                        ),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // 4-Digit Security PIN
                    OutlinedTextField(
                        value = partnerPin,
                        onValueChange = { if (it.length <= 4 && it.all { c -> c.isDigit() }) partnerPin = it },
                        label = { Text("4-Digit Security PIN *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("e.g. 2277", color = Color.Gray, fontSize = 12.sp) },
                        leadingIcon = { Icon(Icons.Default.Lock, contentDescription = null, tint = SunYellow) },
                        trailingIcon = {
                            IconButton(onClick = { partnerPinVisible = !partnerPinVisible }) {
                                Icon(
                                    imageVector = if (partnerPinVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                                    contentDescription = null,
                                    tint = TextMuted
                                )
                            }
                        },
                        visualTransformation = if (partnerPinVisible) VisualTransformation.None else PasswordVisualTransformation(),
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
                        singleLine = true,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White,
                            focusedBorderColor = SunYellow,
                            unfocusedBorderColor = BorderColor,
                            focusedContainerColor = DarkBackground,
                            unfocusedContainerColor = DarkBackground
                        ),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    )

                    AnimatedVisibility(visible = partnerError.isNotEmpty()) {
                        Text(
                            text = partnerError,
                            color = Color(0xFFEF4444),
                            fontSize = 11.sp,
                            modifier = Modifier.padding(top = 6.dp)
                        )
                    }

                    // Helper badge
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 10.dp)
                            .background(SunYellow.copy(alpha = 0.1f), RoundedCornerShape(6.dp))
                            .padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "💡", fontSize = 12.sp)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "First-time Partner Login? Default PIN: 2277",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = SunYellow
                        )
                    }

                    Button(
                        onClick = {
                            if (partnerCodeOrPhone.trim().isEmpty()) {
                                partnerError = "Please enter your Partner Code or Registered Mobile."
                                return@Button
                            }
                            if (partnerPin.length != 4) {
                                partnerError = "Please enter your 4-digit security PIN."
                                return@Button
                            }
                            partnerError = ""
                            onLoginSuccess(false, partnerCodeOrPhone.trim().uppercase(), "file:///android_asset/partner-portal.html")
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = SunYellow),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = "Login to Partner Dashboard →",
                            color = Color(0xFF0D1321),
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 14.sp
                        )
                    }

                } else {
                    // STAFF / ADMIN LOGIN FORM
                    Text(
                        text = "Official Staff & Engineer Workspace",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = EmeraldGreen
                    )
                    Text(
                        text = "Sign in with Sunova official credentials",
                        fontSize = 11.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(top = 2.dp, bottom = 14.dp)
                    )

                    // Staff ID / Email
                    OutlinedTextField(
                        value = staffIdOrEmail,
                        onValueChange = { staffIdOrEmail = it },
                        label = { Text("Staff ID / Official Email *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("e.g. STAFF-ENG-01 or admin@sunova.in", color = Color.Gray, fontSize = 12.sp) },
                        leadingIcon = { Icon(Icons.Default.Badge, contentDescription = null, tint = EmeraldGreen) },
                        singleLine = true,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White,
                            focusedBorderColor = EmeraldGreen,
                            unfocusedBorderColor = BorderColor,
                            focusedContainerColor = DarkBackground,
                            unfocusedContainerColor = DarkBackground
                        ),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // Password
                    OutlinedTextField(
                        value = staffPassword,
                        onValueChange = { staffPassword = it },
                        label = { Text("Staff Password *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("••••••••", color = Color.Gray, fontSize = 12.sp) },
                        leadingIcon = { Icon(Icons.Default.VpnKey, contentDescription = null, tint = EmeraldGreen) },
                        trailingIcon = {
                            IconButton(onClick = { staffPasswordVisible = !staffPasswordVisible }) {
                                Icon(
                                    imageVector = if (staffPasswordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                                    contentDescription = null,
                                    tint = TextMuted
                                )
                            }
                        },
                        visualTransformation = if (staffPasswordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                        singleLine = true,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White,
                            focusedBorderColor = EmeraldGreen,
                            unfocusedBorderColor = BorderColor,
                            focusedContainerColor = DarkBackground,
                            unfocusedContainerColor = DarkBackground
                        ),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    )

                    AnimatedVisibility(visible = staffError.isNotEmpty()) {
                        Text(
                            text = staffError,
                            color = Color(0xFFEF4444),
                            fontSize = 11.sp,
                            modifier = Modifier.padding(top = 6.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = {
                            if (staffIdOrEmail.trim().isEmpty()) {
                                staffError = "Please enter your Staff ID or Email."
                                return@Button
                            }
                            staffError = ""
                            onLoginSuccess(true, staffIdOrEmail.trim(), "file:///android_asset/leads.html")
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = EmeraldGreen),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = "Access Staff Workspace →",
                            color = Color.White,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 14.sp
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Quick Tools Ribbon
        Text(
            text = "⚡ Instant Solar Tools (No Login Required)",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.fillMaxWidth(),
            textAlign = TextAlign.Start
        )

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Quote Calculator
            Card(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onQuickToolSelect("file:///android_asset/quotation-generator.html") },
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceColor),
                border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(BorderColor, BorderColor)))
            ) {
                Column(
                    modifier = Modifier.padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "📊", fontSize = 20.sp)
                    Text(
                        text = "Quote Bot",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }

            // KSEB Feasibility
            Card(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onQuickToolSelect("file:///android_asset/kseb-feasibility.html") },
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceColor),
                border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(BorderColor, BorderColor)))
            ) {
                Column(
                    modifier = Modifier.padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "⚡", fontSize = 20.sp)
                    Text(
                        text = "KSEB Grid",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }

            // Tech Locker
            Card(
                modifier = Modifier
                    .weight(1f)
                    .clickable { onQuickToolSelect("file:///android_asset/tech-locker.html") },
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceColor),
                border = CardDefaults.outlinedCardBorder().copy(brush = Brush.linearGradient(listOf(BorderColor, BorderColor)))
            ) {
                Column(
                    modifier = Modifier.padding(10.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "📁", fontSize = 20.sp)
                    Text(
                        text = "Tech Locker",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(top = 4.dp)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Footer Support
        Text(
            text = "Sunova Solar LLP • Kerala Operations • +91 90725 22277",
            fontSize = 10.5.sp,
            color = TextMuted.copy(alpha = 0.7f),
            textAlign = TextAlign.Center
        )
    }
}

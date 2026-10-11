package com.example.sunovaportal.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.sunovaportal.R
import com.example.sunovaportal.data.Dealer
import com.example.sunovaportal.data.DealerRepository

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
    var partnerCodeOrPhone by remember { mutableStateOf("") }
    var partnerPin by remember { mutableStateOf("") }
    var partnerPinVisible by remember { mutableStateOf(false) }
    var partnerError by remember { mutableStateOf("") }
    var matchedDealerInfo by remember { mutableStateOf<Dealer?>(null) }
    
    // Staff Form States
    var staffIdOrEmail by remember { mutableStateOf("") }
    var staffPassword by remember { mutableStateOf("") }
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

        // Official Branding Logo
        Box(
            modifier = Modifier
                .size(80.dp)
                .background(
                    brush = Brush.radialGradient(listOf(SunYellow.copy(alpha = 0.2f), Color.Transparent)),
                    shape = CircleShape
                ),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(id = R.drawable.sunova_logo),
                contentDescription = "Sunova Solar Logo",
                modifier = Modifier
                    .size(64.dp)
                    .padding(2.dp)
            )
        }

        Text(
            text = "SUNOVA SOLAR",
            fontSize = 24.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color.White,
            letterSpacing = 1.sp
        )

        Text(
            text = "Operations & Partner Portal",
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium,
            color = SunYellow,
            modifier = Modifier.padding(top = 2.dp)
        )

        Text(
            text = "PM Surya Ghar Authorized EPC Login",
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
                    .clickable { 
                        selectedTab = LoginTab.PARTNER 
                        partnerError = ""
                    }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "🤝 Partner Login",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (selectedTab == LoginTab.PARTNER) Color(0xFF0D1321) else Color.White
                )
            }

            // Staff Tab
            Box(
                modifier = Modifier
                    .weight(1f)
                    .background(
                        color = if (selectedTab == LoginTab.STAFF) EmeraldGreen else Color.Transparent,
                        shape = RoundedCornerShape(9.dp)
                    )
                    .clickable { 
                        selectedTab = LoginTab.STAFF 
                        staffError = ""
                    }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "🏢 Staff / Admin",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
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
                        text = "Enter your Partner Code (e.g. TVM-BENJ) or 10-digit mobile number",
                        fontSize = 11.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(top = 2.dp, bottom = 14.dp)
                    )

                    // Partner Code / Phone
                    OutlinedTextField(
                        value = partnerCodeOrPhone,
                        onValueChange = { 
                            partnerCodeOrPhone = it
                            partnerError = ""
                            matchedDealerInfo = DealerRepository.findDealer(it)
                        },
                        label = { Text("Partner Code or Registered Mobile *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("e.g. TVM-BENJ or 9037273767", color = Color.Gray, fontSize = 12.sp) },
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

                    // Show detected dealer confirmation if matched
                    matchedDealerInfo?.let { dealer ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 6.dp)
                                .background(EmeraldGreen.copy(alpha = 0.15f), RoundedCornerShape(6.dp))
                                .padding(horizontal = 8.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = "✓", color = EmeraldGreen, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "${dealer.name} • ${dealer.area}, ${dealer.district}",
                                color = EmeraldGreen,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // 4-Digit Security PIN
                    OutlinedTextField(
                        value = partnerPin,
                        onValueChange = { 
                            if (it.length <= 4 && it.all { c -> c.isDigit() }) {
                                partnerPin = it
                                partnerError = ""
                            }
                        },
                        label = { Text("4-Digit Security PIN *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("Enter 4-digit PIN", color = Color.Gray, fontSize = 12.sp) },
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
                            fontSize = 11.5.sp,
                            fontWeight = FontWeight.Medium,
                            modifier = Modifier.padding(top = 8.dp)
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
                            text = "Default PIN is last 4 digits of registered mobile, or 2277",
                            fontSize = 10.5.sp,
                            color = SunYellow
                        )
                    }

                    Button(
                        onClick = {
                            val input = partnerCodeOrPhone.trim()
                            if (input.isEmpty()) {
                                partnerError = "Please enter your Partner Code or Registered Mobile Number."
                                return@Button
                            }
                            if (partnerPin.length != 4) {
                                partnerError = "Please enter your 4-digit security PIN."
                                return@Button
                            }

                            // Validate against authorized dealers list
                            val dealer = DealerRepository.findDealer(input)
                            val isSpecialDemo = input.equals("SUN-TVM-01", ignoreCase = true) || input.equals("DEMO", ignoreCase = true)

                            if (dealer == null && !isSpecialDemo) {
                                partnerError = "Access Denied: '$input' is not registered in our dealer network. Please enter a valid Partner Code or Mobile."
                                return@Button
                            }

                            // Validate PIN
                            val isPinValid = if (dealer != null) {
                                DealerRepository.validatePin(dealer, partnerPin)
                            } else {
                                partnerPin == "2277"
                            }

                            if (!isPinValid) {
                                val expectedHint = if (dealer != null && dealer.phone.length >= 4) dealer.phone.takeLast(4) else "2277"
                                partnerError = "Invalid security PIN. Default PIN for this partner is $expectedHint."
                                return@Button
                            }

                            partnerError = ""
                            val activeCode = dealer?.code ?: "SUN-TVM-01"
                            onLoginSuccess(false, activeCode, "https://sunovasolar.in/partner-portal.html")
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
                        text = "Sign in with Sunova staff ID, email, or mobile number",
                        fontSize = 11.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(top = 2.dp, bottom = 14.dp)
                    )

                    // Staff ID / Email / Phone
                    OutlinedTextField(
                        value = staffIdOrEmail,
                        onValueChange = { 
                            staffIdOrEmail = it
                            staffError = ""
                        },
                        label = { Text("Staff ID / Email / Mobile *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("e.g. STAFF-ENG-01, ADMIN, or 9072522277", color = Color.Gray, fontSize = 12.sp) },
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
                        onValueChange = { 
                            staffPassword = it
                            staffError = ""
                        },
                        label = { Text("Staff Password / PIN *", color = TextMuted, fontSize = 12.sp) },
                        placeholder = { Text("Enter staff password", color = Color.Gray, fontSize = 12.sp) },
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
                            fontSize = 11.5.sp,
                            fontWeight = FontWeight.Medium,
                            modifier = Modifier.padding(top = 8.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = {
                            val rawStaff = staffIdOrEmail.trim()
                            val rawPass = staffPassword.trim()

                            if (rawStaff.isEmpty()) {
                                staffError = "Please enter your Staff ID, Email, or Mobile."
                                return@Button
                            }
                            if (rawPass.isEmpty()) {
                                staffError = "Please enter your password or staff PIN."
                                return@Button
                            }

                            val staffUpper = rawStaff.uppercase()
                            val isAuthorizedUser = staffUpper == "ADMIN" ||
                                                   staffUpper == "SUN-ADMIN" ||
                                                   rawStaff.lowercase().endsWith("@sunovasolar.in") ||
                                                   staffUpper.startsWith("STAFF") ||
                                                   staffUpper.startsWith("SUN-") ||
                                                   (rawStaff.length == 10 && rawStaff.all { it.isDigit() })

                            if (!isAuthorizedUser) {
                                staffError = "Access Denied: '$rawStaff' is not recognized as an authorized Sunova staff user."
                                return@Button
                            }

                            val validStaffPasswords = listOf("Sunova@26", "admin123", "admin", "2277", "9072522277")
                            val isPassValid = validStaffPasswords.contains(rawPass) || 
                                              (rawStaff.length == 10 && rawPass == rawStaff.takeLast(4))

                            if (!isPassValid) {
                                staffError = "Invalid password. Access restricted to authorized Sunova personnel."
                                return@Button
                            }

                            staffError = ""
                            onLoginSuccess(true, rawStaff, "https://sunovasolar.in/login.html")
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

        // Operations Tools Ribbon
        Text(
            text = "⚡ Authorized EPC Tools",
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
                    .clickable { onQuickToolSelect("https://sunovasolar.in/quotation-generator.html") },
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
                    .clickable { onQuickToolSelect("https://sunovasolar.in/kseb-feasibility.html") },
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
                    .clickable { onQuickToolSelect("https://sunovasolar.in/tech-locker.html") },
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

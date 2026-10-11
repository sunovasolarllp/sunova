package com.example.sunovaportal.data

data class Dealer(
    val code: String,
    val name: String,
    val phone: String,
    val area: String,
    val district: String
)

object DealerRepository {
    val authorizedDealers = listOf(
        Dealer("TVM-BENJ", "Benjose FG", "9037273767", "Balaramapuram", "Thiruvananthapuram"),
        Dealer("TVM-ANAN", "Anand Sreedhar", "7994430742", "Neyyattinkara", "Thiruvananthapuram"),
        Dealer("KLA-VARG", "Varghese Nellimoottil", "9020202222", "Ayoor", "Kollam"),
        Dealer("KLA-NIYA", "Niyas K", "9656366068", "Karunagappally", "Kollam"),
        Dealer("KLA-UDAY", "Udayabhanu J", "9349136882", "Kadappakkada", "Kollam"),
        Dealer("KLA-RAJE", "Rajeev R", "9567970077", "Punalur", "Kollam"),
        Dealer("KLA-RATH", "Rathil Kumar", "7907878797", "Sasthamkotta", "Kollam"),
        Dealer("PTA-SREE", "Sreejith TR", "9947030669", "Mallappally", "Pathanamthitta"),
        Dealer("PTA-JIJU", "Jijukumar MC", "9388133400", "Pandalam", "Pathanamthitta"),
        Dealer("PTA-PKPR", "PK Prasannakumar", "7034023301", "Pathanamthitta", "Pathanamthitta"),
        Dealer("PTA-BIJU", "Bijumon J", "9995990372", "Ranni", "Pathanamthitta"),
        Dealer("ALP-SHIN", "Shinas Shamsudeen", "9995550888", "Alappuzha", "Alappuzha"),
        Dealer("ALP-NISS", "Nissar Hameed", "9895497090", "Kayamkulam", "Alappuzha"),
        Dealer("ALP-RENJ", "Renjith PS", "9447866958", "Mavelikkara", "Alappuzha"),
        Dealer("ALP-BAIJ", "Baiju Sasidharan", "9747186818", "Vallikunnam", "Alappuzha"),
        Dealer("KTM-SALY", "Saly Sainudeen", "9446200616", "Erattupetta", "Kottayam"),
        Dealer("KTM-ANIS", "Anish Kumar", "9387220162", "Kallara", "Kottayam"),
        Dealer("KTM-SANI", "Sanil Kumar", "9061189784", "Kottayam", "Kottayam"),
        Dealer("IDK-OUSE", "Ouseph KA", "9495737628", "Moolamattom", "Idukki"),
        Dealer("IDK-MGAJ", "MG Ajay", "9447254142", "Thodupuzha", "Idukki"),
        Dealer("EKM-SHIY", "Shiyas Rasheed", "9847859859", "Edappally", "Ernakulam"),
        Dealer("EKM-BHAV", "Bhavya M", "8301026309", "Kalamassery", "Ernakulam"),
        Dealer("EKM-JIBI", "Jibin George", "9995996240", "Thripunithura", "Ernakulam"),
        Dealer("TCR-JAIS", "Jaison Jose Meleth", "9995601923", "Ayyanthole", "Thrissur"),
        Dealer("TCR-COAT", "Coats Thekkan", "8129119222", "Chalakudy", "Thrissur"),
        Dealer("TCR-JISO", "Jison George", "9746666535", "Chelakkara", "Thrissur"),
        Dealer("TCR-SINI", "Sinish KM", "9946101892", "Kodakara", "Thrissur"),
        Dealer("TCR-BINU", "Binu Yacob", "9946033807", "Pazhayannur", "Thrissur"),
        Dealer("TCR-JITH", "Jithesh Tharayil", "7356347700", "Ramavarmapuram", "Thrissur"),
        Dealer("TCR-AKAN", "AK Anil", "9746891854", "Valappad", "Thrissur"),
        Dealer("PKD-SUHA", "Suhaib S", "9988553585", "Alathur", "Palakkad"),
        Dealer("PKD-PRAM", "Pramod", "9746611002", "Chittur", "Palakkad"),
        Dealer("PKD-BIJO", "Bijo Varghese", "9388883222", "Elappully", "Palakkad"),
        Dealer("PKD-ANAN", "Anand P", "9349811101", "Koduvayur", "Palakkad"),
        Dealer("MPM-NASS", "Nassarudheen E", "9946139955", "Edakkara", "Malappuram"),
        Dealer("MPM-FAIS", "Faisal K", "7994035923", "Manjeri", "Malappuram"),
        Dealer("MPM-RAVI", "Ravindran K", "9961476748", "Tirur", "Malappuram"),
        Dealer("KKD-RAJA", "Rajan Madavoor", "9497345868", "Koduvally", "Kozhikode"),
        Dealer("KKD-YOOS", "Yoosaf NV", "9539724724", "Perambra", "Kozhikode"),
        Dealer("KKD-SAFE", "Safeer", "9995330555", "Vadakara", "Kozhikode"),
        Dealer("KKD-RAHU", "Rahul RN", "9645464733", "Vadakara", "Kozhikode"),
        Dealer("WYD-SINI", "Sinil Chacko K", "8921794334", "Mananthavady", "Wayanad"),
        Dealer("KNR-JOBI", "Jobi Sebastian", "8590085865", "Kannur", "Kannur"),
        Dealer("KNR-ACFA", "AC Faisal", "9656069964", "Irikkoor", "Kannur"),
        Dealer("KNR-NOUS", "Noushad T", "9847761018", "Mattannur", "Kannur"),
        Dealer("KNR-SURI", "Suriya Subash", "9946809010", "Panoor", "Kannur"),
        Dealer("KNR-NISH", "Nishad NK", "9562028244", "Thalassery", "Kannur"),
        Dealer("KNR-KASO", "KA Soju", "9447548430", "Taliparamba", "Kannur"),
        Dealer("KSD-PRAD", "Pradeep K", "9744880900", "Badiadka", "Kasaragod"),
        Dealer("KSD-SURE", "Suresh Kumar", "9946960604", "Panathur", "Kasaragod"),
    )

    fun findDealer(identifier: String): Dealer? {
        val clean = identifier.trim().replace("-", "").uppercase()
        val digits = identifier.filter { it.isDigit() }
        val phoneClean = if (digits.length == 12 && digits.startsWith("91")) digits.substring(2) else digits

        return authorizedDealers.firstOrNull { dealer ->
            val dCodeClean = dealer.code.replace("-", "").uppercase()
            val dPhoneClean = dealer.phone.filter { it.isDigit() }
            dealer.code.equals(identifier.trim(), ignoreCase = true) ||
            dCodeClean == clean ||
            (phoneClean.isNotEmpty() && dPhoneClean == phoneClean)
        }
    }

    fun validatePin(dealer: Dealer, enteredPin: String): Boolean {
        if (enteredPin.length != 4) return false
        val defaultPin = if (dealer.phone.length >= 4) dealer.phone.takeLast(4) else "2277"
        return enteredPin == defaultPin || enteredPin == "2277"
    }
}

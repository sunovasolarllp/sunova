$dealers = @(
    @{ code = "TVM-BENJ"; name = "Benjose FG"; area = "Balaramapuram"; district = "Thiruvananthapuram" },
    @{ code = "TVM-ANAN"; name = "Anand Sreedhar"; area = "Neyyattinkara"; district = "Thiruvananthapuram" },
    @{ code = "KLA-VARG"; name = "Varghese Nellimoottil"; area = "Ayoor"; district = "Kollam" },
    @{ code = "KLA-NIYA"; name = "Niyas K"; area = "Karunagappally"; district = "Kollam" },
    @{ code = "KLA-UDAY"; name = "Udayabhanu J"; area = "Kadappakkada"; district = "Kollam" },
    @{ code = "KLA-RAJE"; name = "Rajeev R"; area = "Punalur"; district = "Kollam" },
    @{ code = "KLA-RATH"; name = "Rathil Kumar"; area = "Sasthamkotta"; district = "Kollam" },
    @{ code = "PTA-SREE"; name = "Sreejith TR"; area = "Mallappally"; district = "Pathanamthitta" },
    @{ code = "PTA-JIJU"; name = "Jijukumar MC"; area = "Pandalam"; district = "Pathanamthitta" },
    @{ code = "PTA-PKPR"; name = "PK Prasannakumar"; area = "Pathanamthitta"; district = "Pathanamthitta" },
    @{ code = "PTA-BIJU"; name = "Bijumon J"; area = "Ranni"; district = "Pathanamthitta" },
    @{ code = "ALP-SHIN"; name = "Shinas Shamsudeen"; area = "Alappuzha"; district = "Alappuzha" },
    @{ code = "ALP-NISS"; name = "Nissar Hameed"; area = "Kayamkulam"; district = "Alappuzha" },
    @{ code = "ALP-RENJ"; name = "Renjith PS"; area = "Mavelikkara"; district = "Alappuzha" },
    @{ code = "ALP-BAIJ"; name = "Baiju Sasidharan"; area = "Vallikunnam"; district = "Alappuzha" },
    @{ code = "KTM-SALY"; name = "Saly Sainudeen"; area = "Erattupetta"; district = "Kottayam" },
    @{ code = "KTM-ANIS"; name = "Anish Kumar"; area = "Kallara"; district = "Kottayam" },
    @{ code = "KTM-SANI"; name = "Sanil Kumar"; area = "Kottayam"; district = "Kottayam" },
    @{ code = "IDK-OUSE"; name = "Ouseph KA"; area = "Moolamattom"; district = "Idukki" },
    @{ code = "IDK-MGAJ"; name = "MG Ajay"; area = "Thodupuzha"; district = "Idukki" },
    @{ code = "EKM-SHIY"; name = "Shiyas Rasheed"; area = "Edappally"; district = "Ernakulam" },
    @{ code = "EKM-BHAV"; name = "Bhavya M"; area = "Kalamassery"; district = "Ernakulam" },
    @{ code = "EKM-JIBI"; name = "Jibin George"; area = "Thripunithura"; district = "Ernakulam" },
    @{ code = "TCR-JAIS"; name = "Jaison Jose Meleth"; area = "Ayyanthole"; district = "Thrissur" },
    @{ code = "TCR-COAT"; name = "Coats Thekkan"; area = "Chalakudy"; district = "Thrissur" },
    @{ code = "TCR-JISO"; name = "Jison George"; area = "Chelakkara"; district = "Thrissur" },
    @{ code = "TCR-SINI"; name = "Sinish KM"; area = "Kodakara"; district = "Thrissur" },
    @{ code = "TCR-BINU"; name = "Binu Yacob"; area = "Pazhayannur"; district = "Thrissur" },
    @{ code = "TCR-JITH"; name = "Jithesh Tharayil"; area = "Ramavarmapuram"; district = "Thrissur" },
    @{ code = "TCR-AKAN"; name = "AK Anil"; area = "Valappad"; district = "Thrissur" },
    @{ code = "PKD-SUHA"; name = "Suhaib S"; area = "Alathur"; district = "Palakkad" },
    @{ code = "PKD-PRAM"; name = "Pramod"; area = "Chittur"; district = "Palakkad" },
    @{ code = "PKD-BIJO"; name = "Bijo Varghese"; area = "Elappully"; district = "Palakkad" },
    @{ code = "PKD-ANAN"; name = "Anand P"; area = "Koduvayur"; district = "Palakkad" },
    @{ code = "MPM-NASS"; name = "Nassarudheen E"; area = "Edakkara"; district = "Malappuram" },
    @{ code = "MPM-FAIS"; name = "Faisal K"; area = "Manjeri"; district = "Malappuram" },
    @{ code = "MPM-RAVI"; name = "Ravindran K"; area = "Tirur"; district = "Malappuram" },
    @{ code = "KKD-RAJA"; name = "Rajan Madavoor"; area = "Koduvally"; district = "Kozhikode" },
    @{ code = "KKD-YOOS"; name = "Yoosaf NV"; area = "Perambra"; district = "Kozhikode" },
    @{ code = "KKD-SAFE"; name = "Safeer"; area = "Vadakara"; district = "Kozhikode" },
    @{ code = "KKD-RAHU"; name = "Rahul RN"; area = "Vadakara"; district = "Kozhikode" },
    @{ code = "WYD-SINI"; name = "Sinil Chacko K"; area = "Mananthavady"; district = "Wayanad" },
    @{ code = "KNR-JOBI"; name = "Jobi Sebastian"; area = "Kannur"; district = "Kannur" },
    @{ code = "KNR-ACFA"; name = "AC Faisal"; area = "Irikkoor"; district = "Kannur" },
    @{ code = "KNR-NOUS"; name = "Noushad T"; area = "Mattannur"; district = "Kannur" },
    @{ code = "KNR-SURI"; name = "Suriya Subash"; area = "Panoor"; district = "Kannur" },
    @{ code = "KNR-NISH"; name = "Nishad NK"; area = "Thalassery"; district = "Kannur" },
    @{ code = "KNR-KASO"; name = "KA Soju"; area = "Taliparamba"; district = "Kannur" },
    @{ code = "KSD-PRAD"; name = "Pradeep K"; area = "Badiadka"; district = "Kasaragod" },
    @{ code = "KSD-SURE"; name = "Suresh Kumar"; area = "Panathur"; district = "Kasaragod" }
)

$results = @()
$headers = @{ "User-Agent" = "SunovaSolarLocator/1.0" }

foreach ($dealer in $dealers) {
    $query = "$($dealer.area), $($dealer.district), Kerala, India"
    $encoded = [uri]::EscapeDataString($query)
    $url = "https://nominatim.openstreetmap.org/search?q=$encoded&format=json&limit=1"
    
    try {
        $response = Invoke-RestMethod -Uri $url -Headers $headers -ErrorAction Stop
        if ($response -and $response.Count -gt 0) {
            $dealer["lat"] = [float]$response[0].lat
            $dealer["lon"] = [float]$response[0].lon
        } else {
            # Fallback to district
            $queryFallback = "$($dealer.district), Kerala, India"
            $encodedFallback = [uri]::EscapeDataString($queryFallback)
            $urlFallback = "https://nominatim.openstreetmap.org/search?q=$encodedFallback&format=json&limit=1"
            $responseFallback = Invoke-RestMethod -Uri $urlFallback -Headers $headers -ErrorAction Stop
            if ($responseFallback -and $responseFallback.Count -gt 0) {
                $dealer["lat"] = [float]$responseFallback[0].lat
                $dealer["lon"] = [float]$responseFallback[0].lon
            } else {
                $dealer["lat"] = 0.0
                $dealer["lon"] = 0.0
            }
        }
    } catch {
        $dealer["lat"] = 0.0
        $dealer["lon"] = 0.0
    }
    
    Write-Host "$($dealer.code): $($dealer.lat), $($dealer.lon)"
    $results += $dealer
    Start-Sleep -Seconds 1
}

$results | ConvertTo-Json -Depth 10 | Out-File "dealers_geo.json" -Encoding utf8

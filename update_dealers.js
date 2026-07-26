const list = `1	KNR-JOBI	JOBI SEBASTIAN	Kannur	KANNUR	8590085865	Kannur Town / Cantonment
2	TVM-BENJ	BENJOSE FG	Balaramapuram	THIRUVANTHAPURAM	9037273767	Kanjiramkulam
3	TVM-ANAN	ANAND SREEDHAR	Neyyattinkara	THIRUVANTHAPURAM	7994430742	Neyyattinkara
4	KLA-VARG	VARGHESE NELLIMOOTTIL	Ayoor	KOLLAM	9020202222	Kottarakkara
5	KLA-NIYA	NIYAS K	Karunagappally	KOLLAM	9656366068	Ayoor
6	KLA-UDAY	UDAYABHANU J	Kadappakkada	KOLLAM	9349136882	Karunagappally North
7	KLA-RAJE	RAJEEV R	Punalur	KOLLAM	9567970077	Kadappakada
8	KLA-RATH	RATHIL KUMAR	Sasthamkotta	KOLLAM	7907878797	Karavaloor
9	PTA-SREE	SREEJITH TR	Mallappally	PATHANAMTHITTA	9947030669	Sasthamcotta
10	PTA-JIJU	JIJUKUMAR MC	Pandalam	PATHANAMTHITTA	9388133400	Vaipur
11	PTA-PKPR	PK PRASANNAKUMAR	Pathanamthitta	PATHANAMTHITTA	7034023301	Pandalam
12	PTA-BIJU	BIJUMON J	Ranni	PATHANAMTHITTA	9995990372	Kumbazha
13	ALP-SHIN	SHINAS SHAMSUDEEN	Alappuzha	ALAPPUZHA	9995550888	Ranni North
14	ALP-NISS	NISSAR HAMEED	Kayamkulam	ALAPPUZHA	9895497090	Alappuzha
15	ALP-RENJ	RENJITH PS	Mavelikkara	ALAPPUZHA	9447866958	Kayamkulam West
16	ALP-BAIJ	BAIJU SASIDHARAN	Vallikunnam	ALAPPUZHA	9747186818	Mavelikkara
17	KTM-SALY	SALY SAINUDEEN	Erattupetta	KOTTAYAM	9446200616	Vallikunnam
18	KTM-ANIS	ANISH KUMAR	Kallara	KOTTAYAM	9387220162	Erattupetta
19	KTM-SANI	SANIL KUMAR	Kottayam	KOTTAYAM	9061189784	Neendoor
20	IDK-OUSE	OUSEPH KA	Moolamattom	IDUKKI	9495737628	Manarcad
21	IDK-MGAJ	MG AJAY	Thodupuzha	IDUKKI	9447254142	Moolamattam
22	EKM-SHIY	SHIYAS RASHEED	Edappally	ERNAKULAM	9847859859	Thodupuzha
23	EKM-BHAV	BHAVYA M	Kalamassery	ERNAKULAM	8301026309	Thrikkakara
24	EKM-JIBI	JIBIN GEORGE	Thripunithura	ERNAKULAM	9995996240	Kalamassery
25	TCR-JAIS	JAISON JOSE MELETH	Ayyanthole	THRISSUR	9995601923	Mulanthuruthy
26	TCR-COAT	COATS THEKKAN	Chalakudy	THRISSUR	8129119222	Ayyanthole
27	TCR-JISO	JISON GEORGE	Chelakkara	THRISSUR	9746666535	Chalakudy
28	TCR-SINI	SINISH KM	Kodakara	THRISSUR	9946101892	Chelakkara
29	TCR-BINU	BINU YACOB	Pazhayannur	THRISSUR	9946033807	Kodakara
30	TCR-JITH	JITHESH THARAYIL	Ramavarmapuram	THRISSUR	7356347700	Pazhayannur
31	TCR-AKAN	AK ANIL	Valappad	THRISSUR	9746891854	Ramavarmapuram
32	PKD-SUHA	SUHAIB S	Alathur	PALAKKAD	9988553585	Valapad
33	PKD-PRAM	PRAMOD	Chittur	PALAKKAD	9746611002	Kuzhalmannam
34	PKD-BIJO	BIJO VARGHESE	Elappully	PALAKKAD	9388883222	Chittur
35	PKD-ANAN	ANAND P	Koduvayur	PALAKKAD	9349811101	Elappully
36	MPM-NASS	NASSARUDHEEN E	Edakkara	MALAPPURAM	9946139955	Koduvayur
37	MPM-FAIS	FAISAL K	Manjeri	MALAPPURAM	7994035923	Edakkara
38	MPM-RAVI	RAVINDRAN K	Tirur	MALAPPURAM	9961476748	Anakkayam
39	KKD-RAJA	RAJAN MADAVOOR	Koduvally	KOZHIKODE	9497345868	Tirur
40	KKD-YOOS	YOOSAF NV	Perambra	KOZHIKODE	9539724724	Narikkuni
41	KKD-SAFE	SAFEER	Vadakara	KOZHIKODE	9995330555	Chakkittapara
42	KKD-RAHU	RAHUL RN	Vadakara	KOZHIKODE	9645464733	Vadakara
43	WYD-SINI	SINIL CHACKO K	Mananthavady	WAYANAD	8921794334	Mananthavady
44	KNR-ACFA	AC FAISAL	Irikkoor	KANNUR	9656069964	Irikkur
45	KNR-NOUS	NOUSHAD T	Mattannur	KANNUR	9847761018	Mattannur
46	KNR-SURI	SURIYA SUBASH	Panoor	KANNUR	9946809010	Panoor
47	KNR-NISH	NISHAD NK	Thalassery	KANNUR	9562028244	Kathiroor
48	KNR-KASO	KA SOJU	Taliparamba	KANNUR	9447548430	Taliparamba
49	KSD-PRAD	PRADEEP K	Badiadka	KASARAGOD	9744880900	Badiadka
50	KSD-SURE	SURESH KUMAR	Panathur	KASARAGOD	9946960604	Balamthode`;

const fs = require('fs');

async function geocodeLocation(query, index) {
    await new Promise(resolve => setTimeout(resolve, index * 1100));
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
        console.log('Fetching', url);
        const res = await fetch(url, { headers: { 'User-Agent': 'SunovaSolarLocator/2.0' } });
        const data = await res.json();
        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }
    } catch (e) {
        console.error("Geocoding failed for", query);
    }
    return { lat: null, lon: null };
}

async function run() {
    const lines = list.split('\n').filter(l => l.trim());
    let out = 'const DEALERS = [\n';
    
    let promises = [];
    
    for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split('\t');
        if (parts.length < 7) continue;
        let [sl, code, name, area, district, phone, kseb] = parts;
        
        // Title Case for names and area/district
        const capitalize = s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        name = capitalize(name);
        area = capitalize(area);
        district = capitalize(district);
        if(district === 'Thiruvanthapuram') district = 'Thiruvananthapuram';
        kseb = kseb.trim();
        
        promises.push(
            geocodeLocation(`${kseb}, ${district}, Kerala, India`, i).then(coords => {
                if (!coords.lat) {
                    return geocodeLocation(`${area}, ${district}, Kerala, India`, i + 50).then(c => {
                        return { sl: parseInt(sl), code, name, area, district, phone, kseb, lat: c.lat, lon: c.lon };
                    });
                }
                return { sl: parseInt(sl), code, name, area, district, phone, kseb, lat: coords.lat, lon: coords.lon };
            })
        );
    }
    
    const results = await Promise.all(promises);
    results.sort((a,b) => a.sl - b.sl);
    
    for (const r of results) {
        out += `    { code: "${r.code}", name: "${r.name}", area: "${r.area}", district: "${r.district}", phone: "${r.phone}", kseb: "${r.kseb}", lat: ${r.lat ? r.lat.toFixed(4) : null}, lon: ${r.lon ? r.lon.toFixed(4) : null} },\n`;
    }
    out += '];\n';
    fs.writeFileSync('new_dealers.js', out);
    console.log('DONE');
}
run();

import json

old_dealers = [
    {'code': 'TVM-BENJ', 'lat': 8.4239, 'lon': 77.0371},
    {'code': 'TVM-ANAN', 'lat': 8.3995, 'lon': 77.0863},
    {'code': 'KLA-VARG', 'lat': 8.8787, 'lon': 76.8407},
    {'code': 'KLA-NIYA', 'lat': 9.0559, 'lon': 76.5360},
    {'code': 'KLA-UDAY', 'lat': 8.8871, 'lon': 76.6027},
    {'code': 'KLA-RAJE', 'lat': 9.0182, 'lon': 76.9298},
    {'code': 'KLA-RATH', 'lat': 9.0346, 'lon': 76.6268},
    {'code': 'PTA-SREE', 'lat': 9.4215, 'lon': 76.6358},
    {'code': 'PTA-JIJU', 'lat': 9.2273, 'lon': 76.6716},
    {'code': 'PTA-PKPR', 'lat': 9.2648, 'lon': 76.7870},
    {'code': 'PTA-BIJU', 'lat': 9.3826, 'lon': 76.7844},
    {'code': 'ALP-SHIN', 'lat': 9.4981, 'lon': 76.3388},
    {'code': 'ALP-NISS', 'lat': 9.1738, 'lon': 76.5009},
    {'code': 'ALP-RENJ', 'lat': 9.2458, 'lon': 76.5518},
    {'code': 'ALP-BAIJ', 'lat': 9.1673, 'lon': 76.5746},
    {'code': 'KTM-SALY', 'lat': 9.6828, 'lon': 76.7845},
    {'code': 'KTM-ANIS', 'lat': 9.7118, 'lon': 76.4367},
    {'code': 'KTM-SANI', 'lat': 9.5916, 'lon': 76.5222},
    {'code': 'IDK-OUSE', 'lat': 9.7709, 'lon': 76.8624},
    {'code': 'IDK-MGAJ', 'lat': 9.8959, 'lon': 76.7183},
    {'code': 'EKM-SHIY', 'lat': 10.0261, 'lon': 76.3125},
    {'code': 'EKM-BHAV', 'lat': 10.0468, 'lon': 76.3175},
    {'code': 'EKM-JIBI', 'lat': 9.9515, 'lon': 76.3419},
    {'code': 'TCR-JAIS', 'lat': 10.5312, 'lon': 76.1966},
    {'code': 'TCR-COAT', 'lat': 10.3015, 'lon': 76.3331},
    {'code': 'TCR-JISO', 'lat': 10.6970, 'lon': 76.3402},
    {'code': 'TCR-SINI', 'lat': 10.3664, 'lon': 76.2974},
    {'code': 'TCR-BINU', 'lat': 10.7101, 'lon': 76.4026},
    {'code': 'TCR-JITH', 'lat': 10.5513, 'lon': 76.2255},
    {'code': 'TCR-AKAN', 'lat': 10.3957, 'lon': 76.1030},
    {'code': 'PKD-SUHA', 'lat': 10.6436, 'lon': 76.5451},
    {'code': 'PKD-PRAM', 'lat': 10.7042, 'lon': 76.7329},
    {'code': 'PKD-BIJO', 'lat': 10.7410, 'lon': 76.7118},
    {'code': 'PKD-ANAN', 'lat': 10.6865, 'lon': 76.6315},
    {'code': 'MPM-NASS', 'lat': 11.3468, 'lon': 76.2976},
    {'code': 'MPM-FAIS', 'lat': 11.1180, 'lon': 76.1217},
    {'code': 'MPM-RAVI', 'lat': 10.9157, 'lon': 75.9238},
    {'code': 'KKD-RAJA', 'lat': 11.3499, 'lon': 75.9231},
    {'code': 'KKD-YOOS', 'lat': 11.5647, 'lon': 75.7486},
    {'code': 'KKD-SAFE', 'lat': 11.5975, 'lon': 75.5925},
    {'code': 'KKD-RAHU', 'lat': 11.5975, 'lon': 75.5925},
    {'code': 'WYD-SINI', 'lat': 11.8023, 'lon': 76.0029},
    {'code': 'KNR-JOBI', 'lat': 11.8745, 'lon': 75.3704},
    {'code': 'KNR-ACFA', 'lat': 11.9791, 'lon': 75.5684},
    {'code': 'KNR-NOUS', 'lat': 11.9312, 'lon': 75.5727},
    {'code': 'KNR-SURI', 'lat': 11.7583, 'lon': 75.5670},
    {'code': 'KNR-NISH', 'lat': 11.7481, 'lon': 75.4894},
    {'code': 'KNR-KASO', 'lat': 12.0366, 'lon': 75.3619},
    {'code': 'KSD-PRAD', 'lat': 12.5923, 'lon': 75.0566},
    {'code': 'KSD-SURE', 'lat': 12.4419, 'lon': 75.3340}
]
geo = {d['code']: (d['lat'], d['lon']) for d in old_dealers}

raw = """1	KNR-JOBI	JOBI SEBASTIAN	Kannur	KANNUR	8590085865	Kannur Town / Cantonment
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
14	ALP-NISS	NISSAR HAMEED	Kayamkulam	ALAPPUZHA	9895497090	Alappuzha (Town / North / South)
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
26	TCR-COAT	COATS THEKKAN	Chalakudy	THRISSUR	8129119222	Ayyanthole (Ayyanthol)
27	TCR-JISO	JISON GEORGE	Chelakkara	THRISSUR	9746666535	Chalakudy (Chalakkudy)
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
42	KKD-RAHU	RAHUL RN	Vadakara	KOZHIKODE	9645464733	Vadakara (Vatakara)
43	WYD-SINI	SINIL CHACKO K	Mananthavady	WAYANAD	8921794334	Mananthavady
44	KNR-ACFA	AC FAISAL	Irikkoor	KANNUR	9656069964	Irikkur
45	KNR-NOUS	NOUSHAD T	Mattannur	KANNUR	9847761018	Mattannur
46	KNR-SURI	SURIYA SUBASH	Panoor	KANNUR	9946809010	Panoor
47	KNR-NISH	NISHAD NK	Thalassery	KANNUR	9562028244	Kathiroor
48	KNR-KASO	KA SOJU	Taliparamba	KANNUR	9447548430	Taliparamba
49	KSD-PRAD	PRADEEP K	Badiadka	KASARAGOD	9744880900	Badiadka (Badiadkka)
50	KSD-SURE	SURESH KUMAR	Panathur	KASARAGOD	9946960604	Balamthode"""

lines = raw.strip().split('\n')
out = 'const DEALERS = [\n'
for line in lines:
    parts = line.split('\t')
    if len(parts) < 7: continue
    sl, code, name, area, district, phone, kseb = parts
    
    name = name.title()
    area = area.title()
    district = district.title()
    if district == 'Thiruvanthapuram': district = 'Thiruvananthapuram'
    
    lat, lon = geo.get(code, (0, 0))
    out += f'    {{ code: "{code}", name: "{name}", area: "{area}", district: "{district}", phone: "{phone}", lat: {lat}, lon: {lon}, kseb: "{kseb.strip()}" }},\n'
out += '];'

with open('new_dealers.js', 'w', encoding='utf-8') as f:
    f.write(out)

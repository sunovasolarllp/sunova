# Tally Prime Web Integration Guide | SUNOVA SOLAR LLP

This guide explains how to connect your local **Tally Prime** accounting database to a web server, custom database, or your Staff Dashboard.

---

## Method 1: Using Tally's Native XML API (Recommended)
Tally Prime features a built-in server that can listen to HTTP requests. By sending XML requests to Tally, you can retrieve ledgers, vouchers, and reports, or post new transactions.

### Step 1: Enable the API Port in Tally Prime
1. Launch **Tally Prime** on your main computer/server.
2. Press `F1` (Help) > `Settings` > `Startup`.
3. Locate **Enable ODBC/HTTP server** and set it to **Yes**.
4. Set the **Port** (default is `9000`, e.g., `http://localhost:9000`).
5. Restart Tally. Tally will now act as a local web server.

### Step 2: Fetch Data Using XML Queries
You can send HTTP POST requests to `http://localhost:9000` (or your public IP/cloud address) with an XML payload.

#### Example: Fetching all Ledgers (XML Payload)
```xml
<ENVELOPE>
    <HEADER>
        <VERSION>1</VERSION>
        <TALLYREQUEST>Export</TALLYREQUEST>
        <TYPE>Data</TYPE>
        <ID>Ledger</ID>
    </HEADER>
    <BODY>
        <DESC>
            <STATICVARIABLES>
                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
            </STATICVARIABLES>
        </DESC>
    </BODY>
</ENVELOPE>
```

#### Example: Python Script to Read Tally Ledgers
```python
import requests

url = "http://localhost:9000"
headers = {"Content-Type": "text/xml"}

xml_payload = """
<ENVELOPE>
    <HEADER>
        <VERSION>1</VERSION>
        <TALLYREQUEST>Export</TALLYREQUEST>
        <TYPE>Data</TYPE>
        <ID>Ledger</ID>
    </HEADER>
    <BODY>
        <DESC>
            <STATICVARIABLES>
                <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
            </STATICVARIABLES>
        </DESC>
    </BODY>
</ENVELOPE>
"""

try:
    response = requests.post(url, data=xml_payload, headers=headers)
    if response.status_code == 200:
        print("Tally Data successfully received:")
        print(response.text) # Prints XML response containing ledgers
    else:
        print(f"Error connecting: Status Code {response.status_code}")
except Exception as e:
    print(f"Connection failed: {e}")
```

---

## Method 2: Tally ODBC (Database Querying)
Tally Prime can act as an ODBC (Open Database Connectivity) provider. You can run SQL queries directly on your Tally data from languages like Python, PHP, or C# on your local network.

### Step 1: Install ODBC Drivers
* Ensure you are running 64-bit Tally Prime if your querying script is 64-bit.

### Step 2: SQL Example in Python
```python
import pyodbc

# Connect to local Tally instance
conn = pyodbc.connect("DSN=TallyODBC_9000")
cursor = conn.cursor()

# Run SQL on Tally ledgers
cursor.execute("SELECT $Name, $Parent, $ClosingBalance FROM Ledger")
for row in cursor.fetchall():
    print(f"Name: {row[0]}, Group: {row[1]}, Balance: {row[2]}")
```

---

## Method 3: Cloud Sync Connectors (Easiest for Production)
If you want to sync Tally data to your website automatically without maintaining local port forwarding, you can use specialized Tally connectors (such as **Tally2SQL**, **EasyConnect**, or **TallyHelper**).

1. Install the connector on the PC where Tally Prime is running.
2. Configure it to read Tally on port `9000` and push it to your online database (e.g., MySQL, PostgreSQL) hosting your website.
3. Your staff dashboard can then read ledger data securely from the online database.

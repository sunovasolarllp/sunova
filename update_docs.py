import re

with open('partner-portal.html', 'r', encoding='utf-8') as f:
    content = f.read()

docs_html = """
                        <div style="page-break-inside: avoid; margin-top: 1.5rem;">
                            <h4 style="margin: 1.2rem 0 0.5rem 0; font-family: 'Outfit', sans-serif; color: #0d1321; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem;">DOCUMENTS NEEDED FOR MNRE REGISTRATION (Cash Purchase)</h4>
                            <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; font-size: 0.8rem; line-height: 1.6;">
                                <li>KSEB BILL</li>
                                <li>PASSBOOK FRONT PAGE COPY / BLANK CHEQUE PHOTO</li>
                                <li>AADHAR CARD COPY FRONT & BACK</li>
                                <li>EMAIL ID</li>
                                <li>MOBILE NO</li>
                            </ul>

                            <h4 style="margin: 1.2rem 0 0.5rem 0; font-family: 'Outfit', sans-serif; color: #0d1321; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem;">DOCUMENTS NEEDED FOR LOAN</h4>
                            <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; font-size: 0.8rem; line-height: 1.6;">
                                <li>KSEB BILL</li>
                                <li>EMAIL ID (MUST BE ACCOUNT LINKED EMAIL)</li>
                                <li>AADHAR CARD</li>
                                <li>PANCARD</li>
                                <li>BLANK CHEQUE PHOTO / PASS BOOK FRONT PAGE PHOTO</li>
                                <li>LAND TAX</li>
                                <li>BUILDING TAX</li>
                                <li>GEOTAG PHOTOS OF HOUSE</li>
                            </ul>

                            <div style="background: rgba(239, 68, 68, 0.05); padding: 0.75rem; border-left: 4px solid #c5221f; margin-bottom: 1.5rem; font-size: 0.75rem; color: #c5221f;">
                                <strong>NB:</strong> CO-APPLICANT (HUSBAND, WIFE, SON, DAUGHTER, SON IN-LAW, DAUGHTER IN-LAW) NEEDED IF CONSUMER AGE IS 65 OR ABOVE AND IF CONSUMER HAS JOINT OWNERSHIP.
                            </div>

                            <h5 style="margin: 1.2rem 0 0.5rem 0; font-family: 'Outfit', sans-serif; color: #0d1321; font-weight: 700;">CO-APPLICANT DETAILS:</h5>
                            <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; font-size: 0.8rem; line-height: 1.6;">
                                <li>AADHAR CARD</li>
                                <li>PANCARD</li>
                                <li>ACCOUNT REGISTERED MOBILE NO (BOTH CONSUMER AND CO-APPLICANT MUST HAVE ACCOUNT IN SAME BANK NOT IN SAME BRANCH)</li>
                            </ul>
                            
                            <div style="background: rgba(40, 167, 69, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1.5rem; font-size: 0.75rem; font-weight: 600; color: #1e7e34; text-align: center;">
                                FOR 3KW CUSTOMERS LOAN AMOUNT WILL BE 90% OF QUOTATION AMOUNT<br>
                                FOR 5KW CUSTOMERS LOAN AMOUNT WILL BE 80% OF QUOTATION AMOUNT<br>
                                <span style="font-weight: 400; font-size: 0.7rem;">(LAST TWO YEAR ITR DOCUMENTS OR SALARY CERTIFICATE NEEDED WITH LAND TAX & BUILDING TAX)</span>
                            </div>
                        </div>

                        <div style="page-break-inside: avoid;">
                            <h4 style="margin: 1.2rem 0 0.5rem 0; font-family: 'Outfit', sans-serif; color: #0d1321; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem;">CUSTOMER ACCEPTANCE</h4>"""

target = """                        <div style="page-break-inside: avoid;">
                            <h4 style="margin: 1.2rem 0 0.5rem 0; font-family: 'Outfit', sans-serif; color: #0d1321; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem;">CUSTOMER ACCEPTANCE</h4>"""

content = content.replace(target, docs_html)

with open('partner-portal.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Docs HTML updated.")

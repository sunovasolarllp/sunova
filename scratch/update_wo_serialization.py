import re
import os

def update_serialization():
    files = [
        r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-portal.html",
        r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\quotation-generator.html"
    ]

    new_wo_generator = """        function getNextSerializedWONumber() {
            const year = new Date().getFullYear();
            const prefix = `WO-SUN-${year}-`;
            
            let allWOs = [];
            try {
                const globalWOs = JSON.parse(localStorage.getItem('global_work_orders') || '[]');
                if (Array.isArray(globalWOs)) allWOs = allWOs.concat(globalWOs);
            } catch(e) {}
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('partner_work_orders_')) {
                    try {
                        const pWOs = JSON.parse(localStorage.getItem(key) || '[]');
                        if (Array.isArray(pWOs)) allWOs = allWOs.concat(pWOs);
                    } catch(e) {}
                }
            }
            
            let maxSerial = 0;
            const serialRegex = new RegExp(`^WO-SUN-${year}-(\\\\d{4,})$`);
            allWOs.forEach(w => {
                const woNum = (w.woNumber || w.id || '').trim();
                const match = woNum.match(serialRegex);
                if (match) {
                    const num = parseInt(match[1], 10);
                    // Filter out legacy random numbers (> 5000 unless tracked in counter)
                    const trackedCounter = parseInt(localStorage.getItem('sunova_wo_last_serial_' + year) || '0', 10);
                    if (num <= trackedCounter || num < 1000) {
                        if (num > maxSerial) maxSerial = num;
                    }
                }
            });

            const storedCounter = parseInt(localStorage.getItem('sunova_wo_last_serial_' + year) || '0', 10);
            if (!isNaN(storedCounter) && storedCounter > maxSerial) {
                maxSerial = storedCounter;
            }

            const nextSerial = maxSerial + 1;
            const padded = String(nextSerial).padStart(4, '0');
            return `${prefix}${padded}`;
        }

        function generateWONumber() {
            return getNextSerializedWONumber();
        }"""

    old_wo_generator = """        function generateWONumber() {
            const year = new Date().getFullYear();
            const rand = Math.floor(1000 + Math.random() * 9000);
            return `WO-SUN-${year}-${rand}`;
        }"""

    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if old_wo_generator in content:
            content = content.replace(old_wo_generator, new_wo_generator)
            print(f"Updated generateWONumber in {os.path.basename(file_path)}")
        elif 'function generateWONumber()' in content:
            # regex replace
            pattern = r'function generateWONumber\(\)\s*\{[\s\S]*?return `WO-SUN-\$\{year\}-\$\{rand\}`;[\s\S]*?\}'
            content = re.sub(pattern, new_wo_generator.strip(), content)
            print(f"Regex replaced generateWONumber in {os.path.basename(file_path)}")

        # Also update handleSaveWorkOrder to persist sunova_wo_last_serial_YEAR
        old_save_hook = "localStorage.setItem('global_work_orders', JSON.stringify(globalWOs.slice(0, 300)));"
        new_save_hook = """localStorage.setItem('global_work_orders', JSON.stringify(globalWOs.slice(0, 300)));

            // Record serialized sequence counter
            const year = new Date().getFullYear();
            const match = woNumber.match(new RegExp(`^WO-SUN-${year}-(\\\\d+)`));
            if (match) {
                const savedNum = parseInt(match[1], 10);
                const currentCounter = parseInt(localStorage.getItem('sunova_wo_last_serial_' + year) || '0', 10);
                if (savedNum > currentCounter) {
                    localStorage.setItem('sunova_wo_last_serial_' + year, String(savedNum));
                }
            }"""
        if old_save_hook in content and "sunova_wo_last_serial_" not in content:
            content = content.replace(old_save_hook, new_save_hook)
            print(f"Injected sequence counter update into handleSaveWorkOrder in {os.path.basename(file_path)}")

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

update_serialization()

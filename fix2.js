const fs = require('fs');

const fileJs = "C:/Users/ADVAN/Downloads/assigment-management/js/facilities.js";
let js = fs.readFileSync(fileJs, 'utf8');

js = js.replace(
  `'<button class="btn btn-sm btn-light-info me-1" onclick="showBarcodeModal(\\'' + escapeHtml(r.barcode) + '\\', \\'' + escapeHtml(r.facility_name) + '\\')" title="Tampilkan Barcode">Scan</button>'`,
  `'<button class="btn btn-sm btn-light-info me-1" onclick="showBarcodeModal(\\'' + escapeHtml(r.barcode) + '\\', \\'' + escapeHtml(r.facility_name) + '\\')" title="Tampilkan Barcode"><i class="ki-outline ki-picture fs-4"></i> Scan</button>'`
);

fs.writeFileSync(fileJs, js);
console.log("Fixed icon!");

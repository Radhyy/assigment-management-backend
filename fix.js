const fs = require('fs');

const fileHtml = "C:/Users/ADVAN/Downloads/assigment-management/facilities.html";
let html = fs.readFileSync(fileHtml, 'utf8');

// Replace the literal `n that got injected
// The literal strings look like `n
html = html.replace(/`n\s*/g, '\n');

fs.writeFileSync(fileHtml, html);

const fileJs = "C:/Users/ADVAN/Downloads/assigment-management/js/facilities.js";
let js = fs.readFileSync(fileJs, 'utf8');

// Replace the table row button
js = js.replace(
  /'<button class="btn btn-sm btn-icon btn-light-info me-1" onclick="showBarcodeModal\(\\'([\w\s'-]+)\\', \\'([\w\s'-]+)\\'\)" title="Tampilkan Barcode"><i class="ki-outline ki-scan fs-3"><\/i><\/button>'/g,
  `'<button class="btn btn-sm btn-light-info me-1" onclick="showBarcodeModal(\\'' + escapeHtml(r.barcode) + '\\', \\'' + escapeHtml(r.facility_name) + '\\')" title="Tampilkan Barcode"><i class="ki-outline ki-eye fs-4 me-1"></i> Scan</button>'`
);

// We need to match the specific js that has concatenated string
// Oh wait, my replace string has regex for concatenated string which won't match. Let me just use string literal replace
js = js.replace(
  `'<button class="btn btn-sm btn-icon btn-light-info me-1" onclick="showBarcodeModal(\\'' + escapeHtml(r.barcode) + '\\', \\'' + escapeHtml(r.facility_name) + '\\')" title="Tampilkan Barcode"><i class="ki-outline ki-scan fs-3"></i></button>'`,
  `'<button class="btn btn-sm btn-light-info me-1" onclick="showBarcodeModal(\\'' + escapeHtml(r.barcode) + '\\', \\'' + escapeHtml(r.facility_name) + '\\')" title="Tampilkan Barcode">Scan</button>'`
);

// Reduce barcode sizes in JS
js = js.replace(/width: 2,/g, 'width: 1.5,');
js = js.replace(/height: 80,/g, 'height: 40,');
// Container width
js = js.replace(/width: 300px/g, 'width: 200px');
js = js.replace(/font-size: 14px;/g, 'font-size: 12px;');
js = js.replace(/font-size: 12px;/g, 'font-size: 10px;'); // Room name

fs.writeFileSync(fileJs, js);
console.log("Fixed!");

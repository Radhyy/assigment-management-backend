const fs = require('fs');

const fileJs = "C:/Users/ADVAN/Downloads/assigment-management/js/facilities.js";
let js = fs.readFileSync(fileJs, 'utf8');

// Reduce barcode sizes in JS
js = js.replace(/width: 1\.5,/g, 'width: 1,');
js = js.replace(/height: 40,/g, 'height: 30,');
// Make SVG responsive
js = js.replace(/printContents \+= svgEl\.outerHTML;/g, 'printContents += svgEl.outerHTML.replace("<svg ", "<svg style=\\"max-width: 100%; height: auto;\\" ");');

fs.writeFileSync(fileJs, js);
console.log("Fixed barcode layout!");

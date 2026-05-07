const fs = require('fs');

// 1. UPDATE HTML
const htmlPath = 'C:/Users/ADVAN/Downloads/assigment-management/reports.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const oldHtml = `<form id="form-report" class="form">
                        <div class="fv-row mb-7">
                            <label class="required fs-6 fw-bold mb-2">Judul Kerusakan</label>`;
const newHtml = `<form id="form-report" class="form">
                        <div class="fv-row mb-7">
                            <div class="d-flex flex-stack mb-2">
                                <label class="fs-6 fw-bold">Pilih Aset Fasilitas</label>
                                <div class="form-check form-switch form-check-custom form-check-solid form-check-sm">
                                    <input class="form-check-input" type="checkbox" id="toggle-manual-asset" value="1"/>
                                    <label class="form-check-label text-muted fs-7" for="toggle-manual-asset">Data tidak ada? (Manual)</label>
                                </div>
                            </div>
                            <div id="wrapper-asset-select">
                                <select class="form-select form-control-solid" name="facility_id" id="select_facility_id" data-control="select2" data-dropdown-parent="#modal-report" data-placeholder="Ketik untuk mencari aset (abjad/serial)...">
                                    <option value="">Pilih Aset...</option>
                                </select>
                            </div>
                            <div id="wrapper-asset-manual" style="display: none;">
                                <input type="text" class="form-control form-control-solid" name="manual_facility_name" placeholder="Ketik nama aset secara manual..." />
                            </div>
                        </div>
                        <div class="fv-row mb-7">
                            <label class="required fs-6 fw-bold mb-2">Judul Kerusakan</label>`;

if (html.includes(oldHtml)) {
    html = html.replace(oldHtml, newHtml);
    fs.writeFileSync(htmlPath, html);
    console.log('HTML updated.');
} else {
    console.log('HTML already updated or pattern not found.');
}

// 2. UPDATE JS
const jsPath = 'C:/Users/ADVAN/Downloads/assigment-management/js/reports.js';
let js = fs.readFileSync(jsPath, 'utf8');

if (!js.includes('loadFacilitiesForDropdown')) {
    js = js.replace(
        `async function init() {`,
        `async function loadFacilitiesForDropdown() {
        try {
            var response = await window.auth.fetch(APP_CONFIG.apiBaseUrl + "/facility-asset/datatables", {
                method: "POST",
                body: JSON.stringify({ draw: 1, start: 0, length: 1000 })
            });
            var json = await response.json();
            var data = json.data || [];
            
            // Sort by alphabet
            data.sort((a,b) => (a.facility_name || '').localeCompare(b.facility_name || ''));
            
            var sel = document.getElementById('select_facility_id');
            if(sel) {
                var opts = '<option value=""></option>';
                data.forEach(d => {
                    var label = (d.facility_name || '-') + ' (' + (d.barcode || d.facility_code || '-') + ') - ' + (d.room_name || 'Tanpa Ruangan');
                    opts += '<option value="'+d.facility_id+'">' + escapeHtml(label) + '</option>';
                });
                sel.innerHTML = opts;
            }
        } catch(e) {
            console.warn('Gagal load facilities', e);
        }
    }

    async function init() {`
    );

    js = js.replace(
        `await resolveReporterId();`,
        `await resolveReporterId();
        await loadFacilitiesForDropdown();`
    );

    js = js.replace(
        `resetReportForm();
                modal.show();`,
        `resetReportForm();
                $('#select_facility_id').val(null).trigger('change');
                document.getElementById('toggle-manual-asset').checked = false;
                document.getElementById('wrapper-asset-select').style.display = 'block';
                document.getElementById('wrapper-asset-manual').style.display = 'none';
                modal.show();`
    );

    js = js.replace(
        `var categoryFilter = document.querySelector('#filter-category');`,
        `var toggleManual = document.getElementById('toggle-manual-asset');
        if(toggleManual) {
            toggleManual.addEventListener('change', function() {
                var isManual = this.checked;
                document.getElementById('wrapper-asset-select').style.display = isManual ? 'none' : 'block';
                document.getElementById('wrapper-asset-manual').style.display = isManual ? 'block' : 'none';
                if(isManual) {
                    $('#select_facility_id').val(null).trigger('change');
                } else {
                    document.querySelector('input[name="manual_facility_name"]').value = '';
                }
            });
        }
        
        var categoryFilter = document.querySelector('#filter-category');`
    );

    // Update submitData
    const submitPattern = `var data = {
            report_number: generateReportNumber(),
            title: formData.get("title"),
            category_id: resolvedCategoryId,
            urgency: mapUrgency(formData.get("urgency")),
            description: formData.get("description"),
            location_floor: String(formData.get("location_floor") || "").trim() || null,
            location_room: String(formData.get("location_room") || "").trim() || null,
            location_detail: String(formData.get("location_detail") || "").trim() || null,
            reporter_id: currentReporterId,
            status: "submitted"
        };`;
        
    const submitNew = `
        var isManual = document.getElementById('toggle-manual-asset') ? document.getElementById('toggle-manual-asset').checked : false;
        var facId = formData.get("facility_id");
        var manualName = formData.get("manual_facility_name");
        
        var mainTitle = formData.get("title");
        if (isManual && manualName) {
            mainTitle = "[Manual: " + manualName + "] " + mainTitle;
        }
        
        var data = {
            report_number: generateReportNumber(),
            title: mainTitle,
            category_id: resolvedCategoryId,
            facility_id: (isManual || !facId) ? null : facId,
            urgency: mapUrgency(formData.get("urgency")),
            description: formData.get("description"),
            location_floor: String(formData.get("location_floor") || "").trim() || null,
            location_room: String(formData.get("location_room") || "").trim() || null,
            location_detail: String(formData.get("location_detail") || "").trim() || null,
            reporter_id: currentReporterId,
            status: "submitted"
        };`;

    if (js.includes(submitPattern)) {
        js = js.replace(submitPattern, submitNew);
    }
    
    fs.writeFileSync(jsPath, js);
    console.log('JS updated.');
} else {
    console.log('JS already updated.');
}

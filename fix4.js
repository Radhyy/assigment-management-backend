const fs = require('fs');

const fileHtml = "C:/Users/ADVAN/Downloads/assigment-management/facilities.html";
let html = fs.readFileSync(fileHtml, 'utf8');

const modalsHtml = `
    <!-- Modal Facility Form -->
    <div class="modal fade" tabindex="-1" id="modal_facility_form">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <form id="form_facility" onsubmit="event.preventDefault(); saveFacility();">
                    <div class="modal-header">
                        <h3 class="modal-title">Tambah Aset</h3>
                        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                            <i class="ki-outline ki-cross fs-1"></i>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="row g-5">
                            <div class="col-md-6">
                                <label class="required form-label">Nama Fasilitas</label>
                                <input type="text" class="form-control" name="facility_name" required placeholder="Contoh: Meja Rapat" />
                            </div>
                            <div class="col-md-6">
                                <label class="required form-label">Tipe Kategori</label>
                                <select class="form-select" name="facility_type" required>
                                    <option value="">Pilih Tipe</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="AC/Pendingin">AC/Pendingin</option>
                                    <option value="Elektronik">Elektronik</option>
                                    <option value="Alat Tulis">Alat Tulis</option>
                                    <option value="Jaringan">Jaringan</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Lantai</label>
                                <input type="text" class="form-control" name="floor_level" placeholder="Contoh: Lantai 2" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Ruangan</label>
                                <input type="text" class="form-control" name="room_name" placeholder="Contoh: Ruang Meeting A" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Brand</label>
                                <input type="text" class="form-control" name="brand" placeholder="Contoh: Informa" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Model</label>
                                <input type="text" class="form-control" name="model" placeholder="Model tipe barang" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Serial Number</label>
                                <input type="text" class="form-control" name="serial_number" placeholder="SN-XXXX" />
                            </div>
                            <div class="col-md-6">
                                <label class="required form-label">Kondisi</label>
                                <select class="form-select" name="condition_status" required>
                                    <option value="good">Good</option>
                                    <option value="need_repair">Need Repair</option>
                                    <option value="broken">Broken</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label">Catatan Tambahan</label>
                                <textarea class="form-control" name="notes" rows="2" placeholder="Catatan"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary" id="btn_save_facility">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal Detail Aset -->
    <div class="modal fade" tabindex="-1" id="modal_facility_detail">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Detail Aset: <span id="detail_facility_code" class="text-primary"></span></h3>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                        <i class="ki-outline ki-cross fs-1"></i>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Nama Fasilitas</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_facility_name"></span></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Tipe Kategori</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_facility_type"></span></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Kondisi</label>
                        <div class="col-lg-8" id="detail_condition_status"></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Lokasi</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_location"></span></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Brand / Model</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_brand_model"></span></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Serial Number</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_serial_number"></span></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Barcode SN</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_barcode"></span></div>
                    </div>
                    <div class="row mb-7">
                        <label class="col-lg-4 fw-semibold text-muted">Catatan</label>
                        <div class="col-lg-8"><span class="fw-bold fs-6 text-gray-800" id="detail_notes"></span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-warning" id="btn_edit_trigger">Edit Fasilitas</button>
                    <button type="button" class="btn btn-danger" id="btn_delete_trigger">Hapus Fasilitas</button>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>`;

html = html.replace('<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>', modalsHtml);
fs.writeFileSync(fileHtml, html);

const fileJs = "C:/Users/ADVAN/Downloads/assigment-management/js/facilities.js";
let js = fs.readFileSync(fileJs, 'utf8');

// Replace the edit functionality logic and SweetAlerts.
js = js.replace(
  /Swal\.fire\(\{\s*title: "Tambah Fasilitas"[^\}]*\}\);/m,
  `var modalEl = document.getElementById('modal_facility_form');
                document.getElementById('form_facility').reset();
                window.currentEditId = null;
                var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.show();`
);

js = js.replace(
  /"<td class=\\\"text-end pe-4\\\"><button class=\\\"btn btn-sm btn-light-primary\\\" onclick=\\\"alert\('Detail aset ' \+ '\" \+ escapeHtml\(r\.facility_code\) \+ \"'\)\\\">Detail<\/button><\/td>"/g,
  `"<td class=\\"text-end pe-4\\"><button class=\\"btn btn-sm btn-light-primary\\" onclick=\\"showDetail('"+r.facility_id+"')\\">Detail</button></td>"`
);


const customJs = `
    window.showDetail = function(id) {
        var asset = allFacilities.find(f => f.facility_id === id);
        if(!asset) return;
        
        window.currentEditId = id;
        document.getElementById('detail_facility_code').textContent = asset.facility_code || '-';
        document.getElementById('detail_facility_name').textContent = asset.facility_name || '-';
        document.getElementById('detail_facility_type').textContent = asset.facility_type || '-';
        document.getElementById('detail_condition_status').innerHTML = conditionBadge(asset.condition_status);
        document.getElementById('detail_location').textContent = [(asset.floor_level ? 'Lt. ' + asset.floor_level : ''), asset.room_name].filter(Boolean).join(' / ') || '-';
        document.getElementById('detail_brand_model').textContent = [(asset.brand || ''), (asset.model || '')].filter(Boolean).join(' - ') || '-';
        document.getElementById('detail_serial_number').textContent = asset.serial_number || '-';
        document.getElementById('detail_barcode').textContent = asset.barcode || '-';
        document.getElementById('detail_notes').textContent = asset.notes || '-';
        
        var modalEl = document.getElementById('modal_facility_detail');
        var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.show();
    };

    window.saveFacility = async function() {
        var form = document.getElementById('form_facility');
        var formData = new FormData(form);
        var data = Object.fromEntries(formData.entries());
        
        // Jika tambah baru, generate prefix
        if(!window.currentEditId) {
            data.facility_code = 'FAC-' + (data.facility_type === 'AC/Pendingin' ? 'AC' : data.facility_type === 'Elektronik' ? 'EL' : 'XX') + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            data.barcode = 'BAR-' + data.facility_code;
        }

        var method = window.currentEditId ? 'PUT' : 'POST';
        var url = APP_CONFIG.apiBaseUrl + '/facility-asset' + (window.currentEditId ? '/' + window.currentEditId : '');
        
        try {
            document.getElementById('btn_save_facility').disabled = true;
            document.getElementById('btn_save_facility').textContent = 'Menyimpan...';

            var response = await window.auth.fetch(url, {
                method: method,
                body: JSON.stringify(data)
            });
            var json = await response.json();
            
            if(!response.ok) throw new Error(json.message || 'Gagal menyimpan fasilitas');
            
            var modalEl = document.getElementById('modal_facility_form');
            var modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            
            Swal.fire("Berhasil", "Data fasilitas " + (window.currentEditId ? 'diperbarui' : 'ditambahkan'), "success");
            await loadFacilitiesPage();
        } catch(e) {
            Swal.fire("Gagal", e.message, "error");
        } finally {
            document.getElementById('btn_save_facility').disabled = false;
            document.getElementById('btn_save_facility').textContent = 'Simpan';
        }
    };
    
    document.getElementById('btn_edit_trigger')?.addEventListener('click', function() {
        var asset = allFacilities.find(f => f.facility_id === window.currentEditId);
        if(!asset) return;
        var form = document.getElementById('form_facility');
        form.elements['facility_name'].value = asset.facility_name || '';
        form.elements['facility_type'].value = asset.facility_type || '';
        form.elements['floor_level'].value = asset.floor_level || '';
        form.elements['room_name'].value = asset.room_name || '';
        form.elements['brand'].value = asset.brand || '';
        form.elements['model'].value = asset.model || '';
        form.elements['serial_number'].value = asset.serial_number || '';
        form.elements['condition_status'].value = asset.condition_status || 'good';
        form.elements['notes'].value = asset.notes || '';
        
        var modalDetail = bootstrap.Modal.getInstance(document.getElementById('modal_facility_detail'));
        modalDetail.hide();
        var modalForm = new bootstrap.Modal(document.getElementById('modal_facility_form'));
        modalForm.show();
    });

    document.getElementById('btn_delete_trigger')?.addEventListener('click', function() {
        Swal.fire({
            title: "Hapus Aset ini?",
            text: "Data tidak bisa dikembalikan setelah dihapus",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            customClass: { confirmButton: "btn btn-danger", cancelButton: "btn btn-light" }
        }).then(async function(res) {
            if(res.isConfirmed) {
                try {
                    var response = await window.auth.fetch(APP_CONFIG.apiBaseUrl + '/facility-asset/' + window.currentEditId, { method: 'DELETE' });
                    if(!response.ok) throw new Error("Gagal menghapus");
                    
                    var modalDetail = bootstrap.Modal.getInstance(document.getElementById('modal_facility_detail'));
                    modalDetail.hide();
                    
                    Swal.fire("Terhapus!", "Aset telah dihapus.", "success");
                    await loadFacilitiesPage();
                } catch(e) {
                    Swal.fire("Error", e.message, "error");
                }
            }
        });
    });

`;

js = js.replace(/window\.printAllBarcodes = function\(\) \{/, customJs + '\n    window.printAllBarcodes = function() {');

fs.writeFileSync(fileJs, js);
console.log("Pages added");

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const rooms = Array.from({ length: 30 }, (_, i) => ({
    name: `Ruang ${String(i + 1).padStart(2, '0')}`,
    floor: `Lantai ${Math.ceil((i + 1) / 10)}`
}));

const itemTypes = [
    { type: 'Furniture', name: 'Meja', brand: 'Informa', model: 'T100', prefix: 'TB', qty: 1 },
    { type: 'Furniture', name: 'Kursi', brand: 'Informa', model: 'C200', prefix: 'CH', qty: 5 },
    { type: 'AC/Pendingin', name: 'AC', brand: 'Daikin', model: '1.5 PK', prefix: 'AC', qty: 2 },
    { type: 'Elektronik', name: 'TV', brand: 'Samsung', model: 'Smart TV 43"', prefix: 'TV', qty: 1 },
    { type: 'Alat Tulis', name: 'Papan Tulis', brand: 'Joyko', model: 'Whiteboard 120x80', prefix: 'WB', qty: 1 },
    { type: 'Jaringan', name: 'Wifi Router', brand: 'Cisco', model: 'AP100', prefix: 'WF', qty: 1 }
];

let sql = '';
let assetCounter = 1;

rooms.forEach((room) => {
    itemTypes.forEach(typeDef => {
        for (let i = 0; i < typeDef.qty; i++) {
            const id = uuidv4();
            const code = `FAC-${typeDef.prefix}-${String(assetCounter).padStart(4, '0')}`;
            const facilityName = `${typeDef.name} ${room.name}` + (typeDef.qty > 1 ? ` #${i+1}` : '');
            const barcode = `BAR-${code}`;
            const sn = `SN-${code}-${Math.floor(Math.random() * 10000)}`;
            
            sql += `INSERT INTO facility_asset (facility_id, facility_code, facility_name, facility_type, floor_level, room_name, location_detail, brand, model, serial_number, barcode, condition_status) VALUES ('${id}', '${code}', '${facilityName}', '${typeDef.type}', '${room.floor}', '${room.name}', '${room.floor} / ${room.name}', '${typeDef.brand}', '${typeDef.model}', '${sn}', '${barcode}', 'good');\n`;
            
            assetCounter++;
        }
    });
});

fs.writeFileSync('database/seeds/postgres/facility-assets-rooms.sql', sql);
console.log('Seed SQL generated: database/seeds/postgres/facility-assets-rooms.sql');

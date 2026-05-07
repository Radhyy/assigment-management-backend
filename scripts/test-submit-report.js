const http = require('http');

const timestamp = Date.now();
const payload = {
  report_number: `RPT-${timestamp}`,
  title: "Test Rusak",
  description: "Testingan dari script",
  category_id: '44444444-4444-4444-4444-444444444443',
  facility_id: '55555555-5555-5555-5555-555555555553',
  urgency: "medium",
  location_floor: "1",
  location_room: "101",
  location_detail: "test",
  photo_before_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBg5hL9o8AAAAASUVORK5CYII="
};

const options = {
  hostname: 'localhost',
  port: 3032,
  path: '/api/facility-helpdesk/maintenance-report/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-user-role': 'REQUESTER',
    'x-user-id': '3'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    try {
      const json = JSON.parse(data);
      if (json.error || json.details) {
        console.log('\n=== ERROR DETAILS ===');
        console.log('Error:', json.error);
        console.log('Message:', json.message);
        console.log('Details:', json.details);
      }
    } catch (e) {}
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

console.log('Sending test submission...');
req.write(JSON.stringify(payload));
req.end();

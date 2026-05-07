const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'config', 'db-connection.env'), override: true });
const { uploadImageToS3 } = require('../src/utils/s3-upload');

(async () => {
  try {
    const buf = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBg5hL9o8AAAAASUVORK5CYII=', 'base64');
    const fakeFile = {
      originalname: 'test.png',
      buffer: buf,
      mimetype: 'image/png',
      size: buf.length
    };

    const url = await uploadImageToS3(fakeFile);
    console.log('UPLOAD SUCCESS:', url);
  } catch (err) {
    console.error('UPLOAD FAILED:', err);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  }
})();

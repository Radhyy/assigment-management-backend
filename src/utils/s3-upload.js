const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload image to AWS S3 bucket
 * @param {Object} file - Express multer file object with properties: originalname, buffer, mimetype, size
 * @returns {Promise<string>} - Public S3 URL of the uploaded file
 */
async function uploadImageToS3(file) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Generate unique key dengan timestamp dan original filename
    const timestamp = Date.now();
    const fileExtension = file.originalname.split(".").pop();
    const uniqueFileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
    const key = `uploads/${uniqueFileName}`;

    // Upload ke S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // Do not set ACL by default. Many buckets have "Bucket owner enforced" and
      // reject ACL headers. If public ACLs are required, set via environment
      // or remove bucket ownership enforcement.
    });

    await s3Client.send(command);

    // Return public URL
    const publicUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
    
    console.log(`File uploaded to S3: ${publicUrl}`);
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error && error.message ? error.message : error);
    if (error && error.$metadata) console.error('S3 $metadata:', error.$metadata);
    throw new Error(`S3 upload failed: ${error.message}`);
  }
}

module.exports = { uploadImageToS3 };

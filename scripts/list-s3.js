const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const region = process.env.AWS_DEFAULT_REGION || process.env.AWS_REGION || process.env.AWS_S3_REGION || 'ap-southeast-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_S3_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_S3_BUCKET || 'smk-telkom-s3';

if (!accessKeyId || !secretAccessKey) {
  console.error('Missing AWS credentials in environment.');
  process.exit(1);
}

const s3 = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey }
});

(async () => {
  try {
    console.log(`Listing objects in bucket: ${bucket} (region ${region})`);
    let continuationToken = undefined;
    let total = 0;
    do {
      const res = await s3.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: continuationToken, MaxKeys: 1000 }));
      if (res.Contents && res.Contents.length > 0) {
        res.Contents.forEach(obj => {
          console.log(`${obj.LastModified.toISOString()}\t${obj.Size}\t${obj.Key}`);
        });
        total += res.Contents.length;
      }
      continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined;
      // stop early if too many
      if (total >= 5000) break;
    } while (continuationToken);

    console.log('Total objects listed:', total);
  } catch (err) {
    console.error('S3 list error:', err.message || err);
    process.exit(1);
  }
})();

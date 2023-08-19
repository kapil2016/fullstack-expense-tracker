const AWS = require('aws-sdk');
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_BUKET_NAME = process.env.S3_BUKET_NAME

// Configure AWS with your access and secret key
AWS.config.update({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
});

// Create an S3 instance
const s3 = new AWS.S3();

exports.uploadToS3 = (filename, data) => {
    const params = {
        Bucket: S3_BUKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
                reject(err)
            } else {
                console.log('File uploaded successfully:', data.Location);
                resolve(data.Location)

            }
        });
    })

}

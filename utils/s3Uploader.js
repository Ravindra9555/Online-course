// utils/s3Uploader.js
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

// AWS S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Allowed mime types
const mimeTypes = {
  'image/jpeg': 'images',
  'image/png': 'images',
  'image/jpg': 'images',
  'application/pdf': 'pdfs',
  'video/mp4': 'videos',
  'video/mpeg': 'videos',
};

// Multer filter
const fileFilter = (req, file, cb) => {
  if (mimeTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, and MP4/MPEG videos are allowed'), false);
  }
};

// Multer upload middleware
const s3Upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const folder = mimeTypes[file.mimetype];
      const fileName = `${folder}/${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export default s3Upload;

const express = require("express");
const router = express.Router();

const result = require("dotenv").config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3Config = new aws.S3({
  secretAccessKey: result.parsed.CLOUDCUBE_SECRET_ACCESS_KEY,
  accessKeyId: result.parsed.CLOUDCUBE_ACCESS_KEY_ID,
  Bucket: process.env.AWS_BUCKET_NAME
});

const uploadConfig = multer({
  storage: multerS3({
    s3: s3Config,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    key: function(req, file, cb) {
      const fileName =
        "uts3l2343x2f/public/" +
        new Date().toISOString() +
        "-" +
        file.originalname;
      cb(null, fileName); //use Date.now() for unique file keys
    }
  })
});

router.post("/", uploadConfig.array("uploaded-image", 1), upload);
module.exports = router;

async function upload(req, res, next) {
  const uploadedFileData = req.files.pop();
  res.json({ message: "success", path: uploadedFileData.location });
}

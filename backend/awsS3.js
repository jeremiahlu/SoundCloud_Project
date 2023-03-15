const AWS = require("aws-sdk");
// name of your bucket here
const soundstrata = "soundstrata";
// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const multer = require("multer");
//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
// console.log(s3, "S3@&$@!$");

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {
  if (!file) throw new Error("No file provided");
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: soundstrata,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const multiplePublicFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};
// const multiplePublicFileUpload = async (files) => {
//   const urls = [];
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: file.originalname,
//       Body: file.buffer,
//       ACL: "public-read",
//     };
//     const { Location } = await s3.upload(params).promise();
//     urls.push(Location);
//   }
//   return urls;
// };

// --------------------------- Prviate UPLOAD ------------------------

const singlePrivateFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: soundstrata,
    Key,
    Body: buffer,
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePrivateFileUpload(file);
    })
  );
};

const retrievePrivateFile = (key) => {
  let fileUrl;
  if (key) {
    fileUrl = s3.getSignedUrl("getObject", {
      Bucket: soundstrata,
      Key: key,
    });
  }
  return fileUrl || key;
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }).single(nameOfKey);
// console.log("HIT$!#@!$@!$!@#!@!!!");

// const multipleMulterUpload = (fields) => {
//   return fields.map((field) => {
//     multer({ storage: storage }).single(field);
//   });
// };
const previewImageFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PNG, JPEG and SVG files are allowed.")
    );
  }
};

const urlFileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only MP3 files are allowed."));
  }
};

const multipleMulterUpload = (nameOfKey1, nameOfKey2) =>
  multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    // fileFilter: (req, file, cb) => {
    //   if (file.fieldname === nameOfKey1) {
    //     previewImageFileFilter(req, file, cb);
    //   } else if (file.fieldname === nameOfKey2) {
    //     urlFileFilter(req, file, cb);
    //   } else {
    //     cb(new Error("Invalid fieldname."));
    //   }
    // },
  }).fields([
    {
      name: nameOfKey1,
      // maxCount: 1,
    },
    {
      name: nameOfKey2,
      // maxCount: 1,
    },
  ]);

// const multipleMulterUpload = (nameOfKey) =>
//   multer({ storage: storage }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singlePrivateFileUpload,
  multiplePrivateFileUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload,
};

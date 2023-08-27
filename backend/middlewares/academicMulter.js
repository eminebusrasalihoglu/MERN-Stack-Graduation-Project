import multer from 'multer';
//configure how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, 'academicUploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file if it's not a jpg or png
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

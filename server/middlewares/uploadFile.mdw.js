const multer = require("multer");

function storage(name) {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./public/img/${name}`);
    },
    filename: (req, file, callback) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
        return callback(message, null);
      }

      var filename = `${file.originalname}`;
      callback(null, filename);
    },
  });
  return storage;
}

const upload = (name) => {
  return multer({ storage: storage(name) });
};

module.exports = upload;

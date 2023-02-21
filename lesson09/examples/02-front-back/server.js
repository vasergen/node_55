const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

// multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: "tmp",
    filename: (req, file, cb) => {
      const newFileName = `${+new Date()}_${file.originalname}`;
      cb(null, newFileName);
    },
  }),
  limits: {
    // fileSize: 1,
  },
  // fileFilter
});

const app = express();
app.use(morgan("dev"));
app.use(cors());

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

app.post("/api/upload", tryCatchWrapper(upload.single("image")), async (req, res) => {
  const { file } = req;
  console.log("req.file", file);

  try {
    const oldPath = file.path;
    const newPath = path.join(__dirname, "images", file.filename);

    // resize
    console.log("oldPath", oldPath);
    const image = await jimp.read(oldPath);
    await image.resize(50, 50);
    await image.writeAsync(oldPath);
    console.log("finished resizing");

    // move
    await fs.rename(oldPath, newPath); // move to different directory
  } catch (error) {
    await fs.unlink(req.file.path); // remove
    throw error;
  }

  return res.json({
    ok: true,
  });
});

app.post("/api/upload-multiple", upload.array("image"), async (req, res) => {
  const { files } = req;
  console.log("req.file", files);

  // ...

  return res.json({
    ok: true,
  });
});

app.use((error, req, res, next) => {
  if (error.message.includes("File too large")) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: error.message,
  });
});

// upload.fields() - upload from multiple fields

app.listen(3000, () => {
  console.log("listen on port 3000");
});

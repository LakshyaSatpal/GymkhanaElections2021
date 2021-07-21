const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 80;
require("dotenv").config();
require("./db/conn");
const fs = require("fs");

const staticPath = path.join(__dirname, "../public");
const Candidate = require("./model");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  try {
    const post = req.query.post || "all";
    let items;
    if (post === "all") {
      items = await Candidate.find();
    } else {
      items = await Candidate.find({ post });
    }
    res.render("index", { items: items, post });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", upload.single("poster"), async (req, res, next) => {
  try {
    const obj = new Candidate({
      name: req.body.name,
      post: req.body.post,
      intro: req.body.intro,
      poster: {
        data: fs.readFileSync(
          path.join(__dirname + "/temp/" + req.file.filename)
        ),
        contentType: "image/png",
      },
      email: req.body.email,
      phone: req.body.phone,
      fblink: req.body.fblink,
    });
    const result = await obj.save();
    fs.renameSync(
      path.join(__dirname + "/temp/" + req.file.filename),
      path.join(__dirname + "/uploads/" + req.file.filename)
    );
    res.render("success");
  } catch (error) {
    fs.unlinkSync(path.join(__dirname + "/temp/" + req.file.filename));
    res.status(500).render("register-error");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening to port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const app = express();
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");
const fs = require("fs");
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

mongoose.connect("mongodb+srv://ravipirathap:pirathap33@introtomdb.srqatwu.mongodb.net/?retryWrites=true&w=majority" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect("mongodb://localhost/heyyy", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const User = mongoose.model("User", {
  name: String,
  role: String,
  email: String,
  password: String,
  phonenumber: Number,
  fname: String,
  lname: String,
  nic: Number,
  passportno: Number,
  country: String,
});
const Activity = mongoose.model("Activity", {
  activityname: String,
  description: String,
  food: String,
  accomadation: String,
  images: Object,
});
const Order = mongoose.model("Order", {
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      Activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
      checkboxData: {
        type: [String], // an array of strings
        required: true,
      },
      Transport: String,
      Food: String,
      Accomadation: String,
      Price: Number,
    },
  ],
});
cloudinary.config({
  cloud_name: "dpxmtbyzi",
  api_key: 581845737163629,
  api_secret: "eK--TbMwrtfaJzGEK2I9gtXY1CQ",
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "User Not Found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.status(200).json({ status: "ok", data: token });
  } else {
    res.status(401).json({ error: "Invalid Password" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.send({ status: "ok", data: users });
  } catch (error) {
    console.log(error);
  }
});

app.get("/allactivity", async (req, res) => {
  try {
    const allactivity = await Activity.find({});

    res.send({ status: "ok", data: allactivity });
  } catch (error) {
    console.log(error);
  }
});
app.get("/dash/activity/:id", async (req, res) => {
  const activityId = req.params.id;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.send({ status: "ok", data: activity });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve activity" });
  }
});

app.post("/dash/activity", async (req, res) => {
  try {
    const { activityname, description, food, accomadation, public_id, url } =
      req.body; // Assuming you have name, location, and description fields in your form
    const createdActivity = await Activity.create({
      activityname,
      description,
      food,
      accomadation,
      images: { public_id, url },
    });
    await createdActivity.save();
    res.status(201).json(createdActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.put("/dash/activity/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { activityname, accomadation, description, food, public_id, url } =
      req.body;

    const updatedActivity = await Activity.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          activityname: activityname,
          accomadation: accomadation,
          description: description,
          food: food,
          "images.public_id": public_id,
          "images.url": url,
        },
      },
      {
        new: true,
        upsert: true,
        useFindAndModify: false,
      }
    );

    if (!updatedActivity) {
      return res.status(404).send("Activity not found");
    }

    res.status(200).json("Activity updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to update activity");
  }
});

app.delete("/dash/activity/:id", (req, res) => {
  Activity.deleteOne({ _id: req.params.id }) // Fix: Pass an object with _id field set to req.params.id

    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No data to delete");
      }
      res.json("Deleted id");
    })
    .catch((error) => console.error(error));
});

app.get("/dash/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve activity" });
  }
});

app.post("/dash/user", async (req, res) => {
  try {
    const { role, name, email, password } = req.body; // Assuming you have name, location, and description fields in your form
    const user = await User.create({
      role,
      name,
      email,
      password,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.put("/dash/user/:id", (req, res) => {
  User.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        role: req.body.role,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    },
    {
      upsert: true,
    }
  )
    .then((res) => res.json("Success"))
    .catch((error) => console.error(error));
});

app.delete("/dash/user/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No quote to delete");
      }
      res.json("Deleted id");
    })
    .catch((error) => console.error(error));
});

app.get("/allorders", async (req, res) => {
  try {
    const allorders = await Order.find({});

    res.send({ status: "ok", data: allorders });
  } catch (error) {
    console.log(error);
  }
});

app.get("/dash/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("User", "password")
      .populate("items.Activity");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/dash/orders", async (req, res) => {
  try {
    Order.findOne({ user: req.body._id });
    const order = new Order({
      user: req.body._id,
      items: req.body.items,
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;

    cloudinary.uploader
      .upload(file.tempFilePath, { folder: "images" })
      .then((result) => {
        removeTmp(file.tempFilePath);
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          error:
            "Failed to upload image to Cloudinary. Please try again later.",
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to upload image to Cloudinary. Please try again later.",
    });
  }
});
app.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "no Image selected" });
    cloudinary.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "deleted image" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

app.listen(5000, () => {
  console.log("Server connected on port 5000");
});

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
const authenticateToken = require("./Middleware/auth")
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

const stripe = require("stripe")("sk_test_51N3lwjH8XjLC6H8P7TMsDHdLwNwTSPFrizXL9KVYnGw8m3ARv4BqcqFaOKVuE6wuto3v9SXADWtQhq3Y1ufq9Jjc00cZb7e8SB");


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

cloudinary.config({
  cloud_name: "dolq5ge5g",
  api_key: 577799122689975,
  api_secret: "u6uc3xFRS2BuvOaoI8twMLunOvM",
});

// mongoose.connect(
//   "mongodb+srv://abikiruba:abi090227@cluster0.orqo6fs.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
mongoose.connect("mongodb://localhost/heyyy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  price: String,
  images: Object,
});

const Package = mongoose.model("Package", {
  package: String,
  description: String,
  details: [{ activity: String, cost: String }],
  totalprice: String,
  images: [{ url: String, caption: String }],
});

const Order = mongoose.model("Order",{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  items: [
    {
      package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        // required: true
      },
      quantity: {
        type: Number,
        // required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
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
    return res
      .status(401)
      .json({ error: "User doesn't exist. Please sign up." });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    let redirectTo;
    if (user.role === "admin") {
      redirectTo = "http://localhost:3000/dash";

    } else {
      redirectTo = "http://localhost:3000";
    }
    res.status(200).json({ status: "ok", data: token, redirectTo, userId: user._id });
  } else {
    res.status(401).json({ error: "Password didn't match." });
  }
});




app.post("/logout", async (req, res) => {
  try {
    // Remove the token from local storage
    localStorage.removeItem("token");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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

app.get("/allpackage", async (req, res) => {
  try {
    const allpackage = await Package.find({});

    res.send({ status: "ok", data: allpackage });
  } catch (error) {
    console.log(error);
  }
});

app.post("/packages", async (req, res) => {
  const { id } = req.body;
  const { package: package, description, details,totalprice, images } = req.body;
  const packageDetails = details.map(({ activity, cost}) => ({
    activity,
    cost,
  }));
  try {
    const user = await User.findById(id);

    // if (user.role !== "admin") {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const newPackage = new Package({
      package: package,
      description: description,
      details: packageDetails,
      totalprice: totalprice,
      images: images.map(({ url, public_id }) => ({ url, public_id })),
    });

    await newPackage.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/package/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const packageData = await Package.findById(id);
    res.send(packageData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method to update a package by ID
app.put("/package/:id", async (req, res) => {
  const { id } = req.params;
  const { package: packageName, description, details, images, totalprice } = req.body;
  const packageDetails = details.map((activity) => ({
    activity: activity.activity,
    cost: activity.cost,
  }));

  try {
    const packageData = await Package.findByIdAndUpdate(id, {
      package: packageName,
      description: description,
      details: packageDetails,
      totalprice: totalprice,
      images: images.map(({ url, public_id }) => ({ url, public_id })),
    });
    res.send(packageData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
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
    const { activityname, description, price, public_id, url } = req.body; // Assuming you have name, location, and description fields in your form
    const createdActivity = await Activity.create({
      activityname,
      description,
      price,
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
    const { activityname, description, price, public_id, url } = req.body;

    const updatedActivity = await Activity.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          activityname: activityname,
          description: description,
          price: price,
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

app.get("/user/:id", async (req, res) => {
  try {
    // Get the user ID from the request parameter
    const userId = req.params.id;

    // Check if the user is authenticated with a valid token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header provided" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the user ID matches the ID in the token
    if (decodedToken.userId !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Return the user object
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/dash/user", async (req, res) => {
  try {
    const { role, name, email, password } = req.body;
    const saltRounds = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with the hashed password
    const user = await User.create({
      role,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.put("/dash/user/:id", async (req, res) => {
  try {
    const { role, name, email, password } = req.body;
    const updateFields = {};
    if (role) updateFields.role = role;
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) {
      const saltRounds = 10;
      updateFields.password = await bcrypt.hash(password, saltRounds);
    }
    const result = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.json({ message: "Success", user: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
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
      // .populate("User", "password")
      .populate("items.package");

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
    // if (!req.user) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const order = new Order({
      // user: req.user._id,
      items: req.body.items,
    });

    await order.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } 
});
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
app.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "images",
    });
    removeTmp(file.tempFilePath);
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
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



app.listen(5000, () => {
  console.log("Server connected on port 5000");
});

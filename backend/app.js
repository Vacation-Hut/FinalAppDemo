const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

mongoose.connect("mongodb://localhost/heyyy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});
// const Activity = mongoose.model("Activity", {
//   activityname: String,
//   discription: String,
//   food: String,
//   accomadation: String
// });

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
const salt=await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password,salt);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password:encryptedPassword  });
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
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

// app.post('/dash/activity', async (req, res) => {
//   await Activity.create({
//     activityname,
//     discription,
//     food,
//     accomadation });
    
//   })

app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(
    { name: 'Yoda' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      upsert: true
    }
  )
    .then(result => res.json('Success'))
    .catch(error => console.error(error))
})

app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json('Deleted Darth Vadar\'s quote')
    })
    .catch(error => console.error(error))
})


app.listen(5000, () => {
  console.log("Server connected on port 5000");
});

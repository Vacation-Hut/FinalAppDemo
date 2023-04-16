const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv")
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// mongoose.connect("mongodb+srv://ravipirathap:pirathap33@introtomdb.srqatwu.mongodb.net/?retryWrites=true&w=majority" , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect("mongodb://localhost/heyyy" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: String,
  role : String,
  email: String,
  password: String,
  phonenumber : Number,
  fname : String,
  lname : String,
  nic : Number,
  passportno : Number,
  country : String
});
const Activity = mongoose.model("Activity", {
  activityname: String,
  discription: String,
  food: String,
  accomadation: String
});

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

app.post("/login", async (req, res) => {
  const { email,password } = req.body;

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

app.get('/users',async (req,res) => {
  try{
    const users = await User.find({});

    res.send({status:"ok",data : users})
  }catch(error){
    console.log(error)
  }
})
app.get('/dash/activity/:id', async (req, res) => {
 
  const activityId = req.params.id;
  console.log(activityId);
  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve activity' });
  }
  
});


app.post('/dash/activity', async (req, res) => {
  try {
    const { activityname, discription, food, accomadation } = req.body; // Assuming you have name, location, and description fields in your form
    const createdActivity = await Activity.create({
      activityname,
      discription,
      food,
      accomadation
    });
    await createdActivity.save();
    res.status(201).json(createdActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.put('/dash/activity/:id', (req, res) => {
  Activity.findOneAndUpdate(
    req.params.id,
    {
      $set: {
    activityname:req.body.activityname,
    discription:req.body.discription,
    food:req.body.activityname,
    accomadation:req.body.activityname 
      }
    },
    {
      upsert: true
    }
  )
    .then(result => res.json('Success'))
    .catch(error => console.error(error))
})

app.delete('/dash/activity/:id', (req, res) => {
  Activity.deleteOne({ _id: req.params.id }) // Fix: Pass an object with _id field set to req.params.id
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json('Deleted id')
    })
    .catch(error => console.error(error))
});

app.get('/allactivity',async (req,res) => {
  try{
    const allactivity = await Activity.find({});

    res.send({status:"ok",data : allactivity})
  }catch(error){
    console.log(error)
  }
})

app.get('/dash/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve activity' });
  }
});


app.post('/dash/user', async (req, res) => {
  try {
    const { role, name, email, password } = req.body; // Assuming you have name, location, and description fields in your form
    const user = await User.create({
        role,
        name,
        email,
        password });
  
    await user.save();
    res.status(201).json(user); }
   catch (err) {
    res.status(400).json({ message: err.message });
  }})
;
app.put('/dash/user/:id', (req, res) => {
  User.findOneAndUpdate(
    req.params.id,
    {
      $set: {
    role:req.body.role,
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
      }
    },
    {
      upsert: true
    }
  )
    .then(result => res.json('Success'))
    .catch(error => console.error(error))
})

app.delete('/dash/user/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }) 
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json('Deleted id')
    })
    .catch(error => console.error(error))
});




app.listen(5000, () => {
  console.log("Server connected on port 5000");
});

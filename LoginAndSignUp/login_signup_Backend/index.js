//import dotenv
require("dotenv").config();
// import express module
const express = require("express");
// import bodyParser to get req in body or url bassed
const bodyParser = require("body-parser");
// import mongoose for databse
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/Users");

const cors = require('cors');
// make an app
const app = express();

// const PORT
const PORT = process.env.PORT;

//database config
mongoose
  .connect("mongodb://127.0.0.1:27017/LoginAndSignUP", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

//middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// make routes
// get routes for check purpose
app.get("/", (req, res) => {
  res.send("hello there");
  res.end();
});

// for signup api
app.post("/api/signup", async (req, res) => {
  try {
    const { username, userpassword } = req.body;
    console.log(username, userpassword);

    if (!username || !userpassword) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

    // check for username is already taken or not
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(409).json({ error: "username already exits" });
    }

    // if not User.exists hashed the password
    const hashedPassword = await bcrypt.hash(userpassword, 10);
    // console.log(hashedPassword)

    // // create a new User
    const newUser = new User({ username, userpassword: hashedPassword });
     newUser.save()
   
  .then((savedProduct) => {
    console.log('New product created:', savedProduct);
  })
  .catch((error) => {
    console.error('Error creating product:', error);
  });

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { username, userpassword } = req.body;
        console.log(username, userpassword)
    //   Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the password
      const passwordMatch = await bcrypt.compare(userpassword, user.userpassword);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// listen to server
app.listen(PORT, "127.0.0.1", (req, res) =>
  console.log(`server is on ${PORT}`)
);

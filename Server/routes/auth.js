const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const amqplib = require('amqplib');
const dotenv = require("dotenv");
dotenv.config();

const RABBITMQ_URL = `amqps://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}/${process.env.RABBITMQ_USER}`;
const QUEUE_NAME = 'email_notifications';

// 1. Registrations
router.post("/signup", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    // 500 mean server error
  }
});

// Login work
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if(!user)return res.status(401).json("Email is not found.");
    
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalpassword = bytes.toString(CryptoJS.enc.Utf8);
    
    if(originalpassword !== req.body.password){
      return res.status(401).json("Wrong passsword")
    }
    
    const response = await fetch('https://email-worker.vercel.app/api/emailWorker', {
      method: 'POST',
  });

    // Send message to the queue
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({ email })));

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

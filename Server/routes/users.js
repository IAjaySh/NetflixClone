const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify  = require('../verifyToken');

// Update
router.put("/:id", verify,async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const UpdateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },{
        new:true
      });
      res.status(200).json(UpdateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can update only your account.");
  }
});

// Delete
router.delete(":/id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User is deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    req.status(403).json("you can delete only your account.");
  }
});

// GET
router.get("/find/:/id", verify, async (req, res) => {
    const query=req.query.new;
  if (req.user.isAdmin) {
    try {
      const users=query ? await find().sort({_id:1}).limit(2) : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
}
});

// Get All
router.get("/", verify,async(req, res)=>{
    const query=req.query.new;
    if(req.user.isAdmin){
        try{
            const users=query
              ? await User.find().sort({_id:-1}).limit(10)
              : await User.find();
            res.status(200).json(users);
        }catch(error){
            res.status(500).json(error);
        }
    }
})

// Get user state
router.get("/stats", async(req, res)=>{
  console.log("this state is working");
  const today=new Date();
  const lastYear=today.setFullYear(today.setFullYear()-1);
  const months=["Jan", "Feb", "March", "April", "May", 
  "June","July","Aug", "Sept", "Oct", "Nov", "Dec"];

  try{
    const data =await User.aggregate([
      {
        $project:{
          month:{$month: "$cretedAt"}
        }
      },{
        $group:{
          _id:"$month",
          total:{$sum:1}
        }
      }
    ]);
    res.status(200).json(data);
  }catch(error){
    res.status(500).json(error);
  }
})


module.exports=router;
const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// lets create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Allowed.");
  }
});

// delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("List is deleted.");
    } catch {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Allowed.");
  }
});

// get
router.get("/", verify, async (req, res) => {
  const { typeQ, genreQ } = req.query;
  let list = [];

  try {
    if (typeQ) {
      if (genreQ) {
        list =await List.aggregate([
          {$sample: { size: 10 }},
          {$match: { type:typeQ , genre:genreQ }}
        ]);
      }else{
        list =await List.aggregate([
          {$sample: { size: 10 }},
          { $match: { type:typeQ } }
        ]);
      } 
    } else {
      list =await List.aggregate([
        {
          $sample: {
            size: 10,
          },
        },
      ]);
    }
    res.status(200).json(list);
  } catch(error){
    res.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

 
// lets create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Allowed.");
  }
});


// lets update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        req.body.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateMovie);
    } catch {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Allowed.");
  }
});


// Delete Movie
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
       await Movie.findByIdAndDelete(req.body.params.id);
      res.status(200).json("Movie is deleted.");
    } catch {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Allowed.");
  }
});


// Get movies
router.get("/find/:id", verify, async (req, res) => {

  try {
       const movie=await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch {
      res.status(500).json(error);
    }
});


// Get random movies
router.get("/random", verify, async (req, res) => {
  const type=req.query.type;
  let movie;
  try {
     if(type==="series"){
      movie=await Movie.aggregate([
        {$match: {isSeries:true}},
        { $sample : {size:1}},
      ]);
     }else{
      movie=await Movie.aggregate([
        {$match: {isSeries:false}}, 
        { $sample : {size:1}},
      ])
     }
     res.status(200).json(movie)
  } catch(err){
    res.status(500).json(err);
  }
});


// get All movies
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies= await Movie.find();
      res.status(200).json(movies.reverse());
    } catch {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not Allowed.");
  }
});


module.exports = router;





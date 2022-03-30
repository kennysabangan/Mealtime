const Recipe = require("../models/recipe.model");
const User = require("../models/user.model");

module.exports = {
  getAllRecipes: (req, res) => {
    Recipe.find()
      .then((allRecipes) => {
        console.log(allRecipes);
        res.json(allRecipes);
      })
      .catch((err) => {
        console.log("Get all recipes failed");
        res.status(400).json(err);
      });
  },
  createNewRecipe: (req, res) => {
    const newRecipeObject = new Recipe(req.body);
    newRecipeObject.createdBy = req.jwtpayload.id;
    newRecipeObject
      .save()
      .then((newRecipe) => {
        User.findOneAndUpdate({ _id: req.jwtpayload.id }, { $push: { recipes: newRecipe } }, { new: true })
          .then(displayNew => {
            res.json(displayNew)
            console.log(displayNew);
          })
      })
      .catch((err) => {
        console.log("create recipe failed");
        res.status(400).json(err);
      });
  },
  getOneRecipe: (req, res) => {
    Recipe.findOne({ _id: req.params.id })
      .then((oneRecipe) => {
        console.log(oneRecipe);
        res.json(oneRecipe);
      })
      .catch((err) => {
        console.log("Find one recipe failed");
        res.status(400).json(err);
      });
  },
  deleteRecipe: (req, res) => {
    Recipe.deleteOne({ _id: req.params.id })
      .then((deleteRecipe) => {
        console.log(deleteRecipe);
        res.json(deleteRecipe);
      })
      .catch((err) => {
        console.log("Delete recipe failed");
        res.status(400).json(err);
      });
  },
  findRecipesByUser: (req, res) => {
    Recipe.find({ createdBy: req.jwtpayload.id })
      .then((recipesFromUser) => {
        console.log("devlog", req.jwtpayload.id);
        console.log(recipesFromUser);
        res.json(recipesFromUser);
      })
      .catch((err) => {
        console.log("Find recipes from user failed");
        res.status(400).json(err);
      });
  },
};

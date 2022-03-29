const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    // recipeName: {
    //   type: String,
    //   trim: true,
    // },
    // prepTime: {
    //   type: Number,
    //   default: 0,
    // },
    // ingredients: [],
    // instructions: [],
    recipes: [],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;

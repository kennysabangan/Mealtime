const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
    },
    prepTime: {
      type: Number,
      default: 0,
    },
    servings: {
      type: Number,
    },
    description: {
      tyep: String,
    },
    image: {
      type: String,
    },

    ingredients: [],
    instructions: [],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;

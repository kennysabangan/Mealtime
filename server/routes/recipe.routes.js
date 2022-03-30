const RecipeController = require("../controllers/recipes.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/recipe", RecipeController.getAllRecipes);
  app.post("/api/recipe", authenticate, RecipeController.createNewRecipe);
  app.get("/api/recipe/:id", RecipeController.getOneRecipe);
  app.delete("/api/recipe/:id", RecipeController.deleteRecipe);
  app.get(
    "/api/recipe/fromuser/:username",
    authenticate,
    RecipeController.findRecipesByUser
  );
};

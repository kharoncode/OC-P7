import { recipes } from "../utils/recipes.js";
import { getRecipe } from "../factories/recipe.js";

function init(){
    getRecipe(recipes);
}

init();
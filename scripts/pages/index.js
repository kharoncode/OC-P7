import { recipes } from "../utils/recipes.js";
import { getRecipeCard } from "../factories/recipe.js";

function init(){
    getRecipeCard(recipes);
}

init();
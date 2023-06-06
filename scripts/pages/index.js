import { recipes } from "../utils/recipes.js";
import { getRecipeCard } from "../factories/recipe.js";
import { getSelectList } from "../factories/select.js";

// DOM Elements
const ingredientSelect_elt = document.querySelector('.ingredients-select--list');
const appareilsSelect_elt = document.querySelector('.appareils-select--list');
const ustensilesSelect_elt = document.querySelector('.ustensiles-select--list');

function init(){
    const {ustensilsList, ingredientsList, applianceList} = getRecipeCard(recipes);
    getSelectList(ingredientsList, ingredientSelect_elt);
    getSelectList(applianceList, appareilsSelect_elt);
    getSelectList(ustensilsList, ustensilesSelect_elt);


}

init();
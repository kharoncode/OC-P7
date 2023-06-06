import { recipes } from "../utils/recipes.js";
import { getRecipeCard } from "../factories/recipe.js";
import { getSelectList } from "../factories/select.js";
import { displayErase } from "../factories/erase.js";

function initSearch(){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    searchInput_elt.addEventListener('keyup', (e)=>{
        displayErase(searchInputErase_elt, e.target)
    });
}

function initSelect(){
    const ingredientsSelect_elt = document.querySelector('.ingredients-select--list');
    const appareilsSelect_elt = document.querySelector('.appareils-select--list');
    const ustensilesSelect_elt = document.querySelector('.ustensiles-select--list');
    const ingredientsInput_elt = document.getElementById('ingredients');
    const appareilsInput_elt = document.getElementById('appareils');
    const ustensilesInput_elt = document.getElementById('ustensiles');
    const ingredientsInputErase_elt = document.getElementById('ingredientsErase');
    const appareilsInputErase_elt = document.getElementById('appareilsErase');
    const ustensilesInputErase_elt = document.getElementById('ustensilesErase');
    const {ustensilsList, ingredientsList, applianceList} = getRecipeCard(recipes);
    getSelectList(ingredientsList, ingredientsSelect_elt);
    getSelectList(applianceList, appareilsSelect_elt);
    getSelectList(ustensilsList, ustensilesSelect_elt);
    ingredientsInput_elt.addEventListener('keyup', (e)=>{
        displayErase(ingredientsInputErase_elt, e.target)
    });
    appareilsInput_elt.addEventListener('keyup', (e)=>{
        displayErase(appareilsInputErase_elt, e.target)
    });
    ustensilesInput_elt.addEventListener('keyup', (e)=>{
        displayErase(ustensilesInputErase_elt, e.target)
    });
}



function init(){
    initSelect();
    initSearch();
}

init();
import { recipes } from "../utils/recipes.js";
import { getRecipeCard, recetteCount } from "../factories/recipe.js";
import { getSelectList } from "../factories/select.js";
import { displayErase } from "../factories/erase.js";
import { showResultSelect, showResultSearch } from "../factories/search.js";

function initSearch(data){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    searchInput_elt.addEventListener('keyup', (e)=>{
        displayErase(searchInputErase_elt, e.target);
        console.log(showResultSearch(e.target.value, data))
    });
    submitSearchButton.addEventListener('click', ()=>{
        console.log(showResultSearch(searchInput_elt.value, data))
    })
}

function initSelect(ustensilsList, ingredientsList, applianceList){
    const ingredientsSelect_elt = document.querySelector('.ingredients-select--list');
    const appareilsSelect_elt = document.querySelector('.appareils-select--list');
    const ustensilesSelect_elt = document.querySelector('.ustensiles-select--list');
    const ingredientsInput_elt = document.getElementById('ingredients');
    const appareilsInput_elt = document.getElementById('appareils');
    const ustensilesInput_elt = document.getElementById('ustensiles');
    const ingredientsInputErase_elt = document.getElementById('ingredientsErase');
    const appareilsInputErase_elt = document.getElementById('appareilsErase');
    const ustensilesInputErase_elt = document.getElementById('ustensilesErase');
    getSelectList(ingredientsList, ingredientsSelect_elt, "ingredient");
    getSelectList(applianceList, appareilsSelect_elt, "appliance");
    getSelectList(ustensilsList, ustensilesSelect_elt, "ustensil");
    const ingredientsItems_elts = document.querySelectorAll('.ingredient-item');
    const appareilsItems_elts = document.querySelectorAll('.appliance-item');
    const ustensilesItems_elts = document.querySelectorAll('.ustensil-item');
    ingredientsInput_elt.addEventListener('keyup', (e)=>{
        displayErase(ingredientsInputErase_elt, e.target)
        console.log(showResultSelect(e.target.value, ingredientsList, ingredientsItems_elts))
    });
    appareilsInput_elt.addEventListener('keyup', (e)=>{
        displayErase(appareilsInputErase_elt, e.target)
        console.log(showResultSelect(e.target.value, applianceList, appareilsItems_elts))
    });
    ustensilesInput_elt.addEventListener('keyup', (e)=>{
        displayErase(ustensilesInputErase_elt, e.target)
        console.log(showResultSelect(e.target.value, ustensilsList, ustensilesItems_elts))
    });
}



function init(){
    const {ustensilsList, ingredientsList, applianceList} = getRecipeCard(recipes);
    const data = [...new Set(ustensilsList),... new Set(ingredientsList),...new Set(applianceList)];
    recetteCount();
    initSelect(ustensilsList, ingredientsList, applianceList);
    initSearch(data);
}

init();
import { recipes } from "../utils/recipes.js";
import { getRecipeCard, recetteCount } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { showResultSearch } from "../factories/search.js";

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

function init(){
    const {ustensilsList, ingredientsList, applianceList, titleList, tagList} = getRecipeCard(recipes);
    const data = [...new Set(ustensilsList),... new Set(ingredientsList),...new Set(applianceList),...new Set(titleList)];
    recetteCount();
    initSelect("ingredients", ingredientsList);
    initSelect("appareils", applianceList);
    initSelect("ustensiles", ustensilsList);
    initSearch(data);
}

init();
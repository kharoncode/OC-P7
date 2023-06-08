import { recipes } from "../utils/recipes.js";
import { getRecipeCard, recetteCount } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { findRecipeId } from "../factories/search.js";

function displayRecipesAfterSearch(e, data, recipeCard_elts){
    const result = findRecipeId(e.value, data);
            for(let i=0; i<recipeCard_elts.length; i++){
                recipeCard_elts[i].style.display = "none";
            }
            for(let i=0; i<result.length; i++){
                document.getElementById(`recette-${result[i]}`).style.display = "flex";
            }
            document.querySelector(".recipe-filter--result").textContent = `${result.length} recettes`;
}

function displayRecipeWithTag (tagList, recipeCard_elts){
    const tag_elts = document.querySelectorAll('.tag');
    if(tag_elts.length !== 0){
        let selectedRecipes = [];
        for(let i=0; i<tag_elts.length; i++){
            let value = tag_elts[i].textContent;
            let recipes = tagList.get(value);
            for (let j=0; j<recipes.length; j++){
                selectedRecipes.push(recipes[j]);
            }
        }
        selectedRecipes=[...new Set(selectedRecipes)]
        for(let i=0; i<recipeCard_elts.length; i++){
            recipeCard_elts[i].style.display = "none";
        }
        for(let i=0; i<selectedRecipes.length; i++){
            document.getElementById(`recette-${selectedRecipes[i]}`).style.display = "flex";
        }
        document.querySelector(".recipe-filter--result").textContent = `${selectedRecipes.length} recettes`;
    } else {
        for(let i=0; i<recipeCard_elts.length; i++){
            recipeCard_elts[i].style.display = "flex";
            document.querySelector(".recipe-filter--result").textContent = `${recipeCard_elts.length} recettes`;
        }
    }
}

function initSearch(data, recipeCard_elts){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');
    searchInput_elt.addEventListener('keyup', (e)=>{
        if(e.target.value.length>2){
            displayRecipesAfterSearch(e.target, data, recipeCard_elts);
        }
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        displayRecipesAfterSearch(searchInput_elt, data, recipeCard_elts);
    })
}

function init(){
    const {ustensilsList, ingredientsList, applianceList, tagList} = getRecipeCard(recipes);
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    recetteCount();
    initSelect("ingredients", ingredientsList);
    initSelect("appareils", applianceList);
    initSelect("ustensiles", ustensilsList);
    initSearch(recipes, recipeCard_elts);
    const list_elts = document.querySelectorAll(".btn-select-list");
    for (let i=0; i<list_elts.length; i++){
        list_elts[i].addEventListener('click',()=>{
            displayRecipeWithTag(tagList, recipeCard_elts);
        });
    }
}

init();
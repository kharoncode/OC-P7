import { recipes } from "../utils/recipes.js";
import { getRecipeCard, recetteCount } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { filtre } from "../factories/search.js";

function showNumberOfRecipe(length){
    if(length>0 && length<10){
        document.querySelector(".recipe-filter--result").textContent = `0${length} recettes`;
    }else{
        document.querySelector(".recipe-filter--result").textContent = `${length} recettes`;
    }
}

function displayRecipe(selectedRecipe_elts){
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    for(let i=0; i<recipeCard_elts.length; i++){
        recipeCard_elts[i].style.display = "none";
    }
    for(let i=0; i<selectedRecipe_elts.length; i++){
        document.getElementById(`recette-${selectedRecipe_elts[i]}`).style.display = "flex";
    }
    showNumberOfRecipe(selectedRecipe_elts.length);
}

function resetDisplayRecipe(){
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    for(let i=0; i<recipeCard_elts.length; i++){
        recipeCard_elts[i].style.display = "flex";
    }
    showNumberOfRecipe(recipeCard_elts.length);
}

function displayRecipesAfterSearch(e, data){
    /* const result = findRecipeId(e.value, data); */
    let valueArray = e.value.split(" ").filter(n=>n); 
    /* const result = filtre(valueArray, data); */
    const result = filtre(valueArray, data);
    displayRecipe(result);
}

function displayRecipeWithTag (tagList){
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
        displayRecipe(selectedRecipes)
    } else {
        resetDisplayRecipe()
    }
}

function initSearch(data){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');
    searchInput_elt.addEventListener('keyup', (e)=>{
        if(e.target.value.length>2){
            const t0 = performance.now();
            displayRecipesAfterSearch(e.target, data);
            const t1 = performance.now();
            console.log("displayRecipesAdterSearch a demandé " + (t1-t0) + " ms");
        }else{
            resetDisplayRecipe();
        }
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        displayRecipesAfterSearch(searchInput_elt, data);
    })
}

function init(){
    const {ustensilsList, ingredientsList, applianceList, tagList, newData} = getRecipeCard(recipes);
    recetteCount();
    initSelect("ingredients", ingredientsList);
    initSelect("appareils", applianceList);
    initSelect("ustensiles", ustensilsList);
    /* initSearch(recipes); */
    initSearch(newData);
    const list_elts = document.querySelectorAll(".btn-select-list");
    for (let i=0; i<list_elts.length; i++){
        list_elts[i].addEventListener('click',()=>{
            displayRecipeWithTag(tagList);
        });
    }
}

init();
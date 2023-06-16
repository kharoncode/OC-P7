import { recipes } from "../utils/recipes.js";
import { getRecipeCard, } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { filtre, filtreMap } from "../factories/search.js";

function showNumberOfRecipe(){
    const recipeCardSelected_elts = document.querySelectorAll(".recipeCard__selected");
    const recipeCount_elt = document.querySelector(".recipe-filter--result");
    let length = recipeCardSelected_elts.length;
    if(length===0){
        recipeCount_elt.textContent = `${length} recette`;
    }
    else if(length===1){
        recipeCount_elt.textContent = `0${length} recette`;
    }
    else if(length>1 && length<10){
        recipeCount_elt.textContent = `0${length} recettes`;
    }else{
        recipeCount_elt.textContent = `${length} recettes`;
    }
}

function displayRecipe(selectedRecipe_ids){
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    for(let i=0; i<recipeCard_elts.length; i++){
        recipeCard_elts[i].classList.remove("recipeCard__selected");
    }
    for(let i=0; i<selectedRecipe_ids.length; i++){
        document.getElementById(`recette-${selectedRecipe_ids[i]}`).classList.add("recipeCard__selected")
    }
    showNumberOfRecipe();
}

function resetDisplayRecipe(){
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    for(let i=0; i<recipeCard_elts.length; i++){
        recipeCard_elts[i].classList.add("recipeCard__selected");
    }
    showNumberOfRecipe();
}

function displayRecipesAfterSearch(e, data, test){
    let valueArray = e.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(" ").filter(n=>n.length>2 && isNaN(n));
    if(valueArray.length<1){ valueArray[0]=""; }
    const result = filtre(valueArray, data);
    /* const resultTest = filtreMap(valueArray, test); */
    displayRecipe(result);
    return result;
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

function initSearch(data, test){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');
    searchInput_elt.addEventListener('keyup', (e)=>{
        if(e.target.value.length>2){
            displayRecipesAfterSearch(e.target, data, test);
        }else{
            resetDisplayRecipe();
        }
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        displayRecipesAfterSearch(searchInput_elt, data, test);
    })
}

function init(){
    const {tagList, mapIdKeys, mapKeyIds} = getRecipeCard(recipes);
    showNumberOfRecipe();
    initSelect("ingredients");
    initSelect("appareils");
    initSelect("ustensiles");
    initSearch(mapIdKeys, mapKeyIds);
    const list_elts = document.querySelectorAll(".btn-select-list");
    for (let i=0; i<list_elts.length; i++){
        list_elts[i].addEventListener('click',()=>{
            displayRecipeWithTag(tagList);
        });
    }
    const tagErase_elts = document.querySelectorAll('.btn-tag img');
    for (let i=0; i<tagErase_elts.length; i++){
        tagErase_elts[i].addEventListener('click', (e)=>{
            e.target.parentElement.style.display = "none";
            e.target.parentElement.classList.remove('tag');
            let id = e.target.id.replace('tag','select');
            id = id.replace('-erase','');
            document.getElementById(`${id}`).classList.remove('selected');
            displayRecipeWithTag(tagList);
        })
    }
}

init();
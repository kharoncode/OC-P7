import { recipes } from "../utils/recipes.js";
import { getRecipeCard, } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { filtre, filtreMap, filtreMapBis, filtreMapTer, returnNewDataAfterSearch } from "../factories/search.js";

function showNumberOfRecipe(){
    const selectedRecipe_elts = document.querySelectorAll(".recipeCard__selected");
    const recipeCount_elt = document.querySelector(".recipe-filter--result");
    let length = selectedRecipe_elts.length;
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

function getIdOfSelectedRecipe(e, data, tagList){
    let selectedRecipes_list = new Set();

    // TAG
    let selectedRecipes_tags = new Set();
    const tag_elts = document.querySelectorAll('.tag');
    if(tag_elts.length !== 0){
        for(let i=0; i<tag_elts.length; i++){
            let recipes = tagList.get(tag_elts[i].textContent);
            recipes.forEach((e)=>{selectedRecipes_tags.add(`${e}`)})
        }
    }

    // SEARCH
    let valueArray = e.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(" ").filter(n=>n.length>2 && isNaN(n));
    if(valueArray.length<1){ valueArray[0]=""; };
    const selectedRecipes_search = filtre(valueArray, data);

    // RESULT
    if(tag_elts.length!==0){
        selectedRecipes_tags.forEach((id)=>{
            if(selectedRecipes_search.has(id)){
                selectedRecipes_list.add(id)
            }
        })
        console.log(selectedRecipes_list)
    }else{
        console.log(selectedRecipes_search)
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
    if(valueArray.length<1){ valueArray[0]=""; };

    /* console.time("IdKeys")
    for(let i=0; i<10000; i++){
        let test = filtre(valueArray, data);
    }
    console.timeEnd("IdKeys")

    console.time("KeyIds")
    for(let i=0; i<10000; i++){
        let resultTest = filtreMap(valueArray, test);
    }
    console.timeEnd("KeyIds") */
    
    /* console.time("KeyIdsBis")
    for(let i=0; i<100; i++){
        let resultTest = filtreMapBis(valueArray, test);
    }
    console.timeEnd("KeyIdsBis") */

    const result = Array.from(filtre(valueArray, data));
    displayRecipe(result);
}

function displayRecipeWithTag (tagList){
    const tag_elts = document.querySelectorAll('.tag');
    let selectedRecipes = new Set();
    if(tag_elts.length !== 0){
        for(let i=0; i<tag_elts.length; i++){
            let value = tag_elts[i].textContent;
            let recipes = tagList.get(value);
            recipes.forEach((e)=>{selectedRecipes.add(e)})
        }
        selectedRecipes = Array.from(selectedRecipes)
        displayRecipe(selectedRecipes);
    } else {
        resetDisplayRecipe()
    }
}

function initTag(tagList){
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

function initSearch(data, test, tagList){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');
    searchInput_elt.addEventListener('keyup', (e)=>{
        if(e.target.value.length>2){
            displayRecipesAfterSearch(e.target, data, test);
            getIdOfSelectedRecipe(e.target, data, tagList)
        }else{
                resetDisplayRecipe();
            }
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        displayRecipesAfterSearch(searchInput_elt, data, test);
    })

    /* const selectedRecipe_elts = document.querySelectorAll('.recipeCard__selected');
        console.log(selectedRecipe_elts.length)
        let newSet = []
        for(let i=0; i<selectedRecipe_elts.length; i++){
            newSet.push(selectedRecipe_elts[i].id.replace('recette-',''))
        }
        data = returnNewDataAfterSearch(newSet,data);
        console.log(data);

        if(e.target.value.length>2){
            displayRecipesAfterSearch(e.target, data, test);
        }else{
            const tag_elts = document.querySelectorAll('.tag');
            if(tag_elts.length!==0){
                displayRecipeWithTag(tagList);
            }else{
                resetDisplayRecipe();
            }
        }
        displayErase(searchInputErase_elt, e.target); */


}

function init(){
    const {tagList, mapIdKeys, mapKeyIds} = getRecipeCard(recipes);
    showNumberOfRecipe();
    initSelect();
    initTag(tagList);
    initSearch(mapIdKeys, mapKeyIds, tagList);
}

init();
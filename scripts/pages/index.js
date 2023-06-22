import { recipes } from "../utils/recipes.js";
import { getRecipeCard, } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { filtre, filtreMap, filtreMapBis } from "../factories/search.js";

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

function getIdOfSelectedRecipe(data, tagList, tagListById){
    let selectedRecipes_list = new Set();
    // TAG
    let selectedRecipes_tags = new Set();
    const tag_elts = document.querySelectorAll('.tag');
    if(tag_elts.length !== 0){
        for(let i=0; i<tag_elts.length; i++){
            let tempIds = new Set();
            let recipes = tagList.get(tag_elts[i].textContent);
            recipes.forEach((e)=>{tempIds.add(`${e}`)})
            if(i===0){
                tempIds.forEach((id)=>{selectedRecipes_tags.add(id)});
            }else{
                selectedRecipes_tags.forEach((id)=>{
                    if(tempIds.has(id)===false){
                        selectedRecipes_tags.delete(id);
                    }
                })
            }
        }
    }
    // SEARCH
    const searchInput_elt = document.getElementById('search');
    let valueArray = searchInput_elt.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(" ").filter(n=>n.length>2 && isNaN(n));
    if(valueArray.length<1){ valueArray[0]=""; };
    const selectedRecipes_search = filtre(valueArray, data);

    // TEST
    /* console.time("testList")
    for(let i=0; i<10000; i++){
        const testList = filtre(valueArray, test);
    }
    console.timeEnd("testList")

    console.time("testMap")
    for(let i=0; i<10000; i++){
        const testMap = filtreMap(valueArray, test);
    }
    console.timeEnd("testMap")

    console.time("testMapBis")
    for(let i=0; i<10000; i++){
        const testMapBis = filtreMapBis(valueArray, test);
    }
    console.timeEnd("testMapBis") */

    // RESULT
    if(tag_elts.length!==0){
        selectedRecipes_tags.forEach((id)=>{
            if(selectedRecipes_search.has(id)){
                selectedRecipes_list.add(id)
            }
        })
        displayRecipe(selectedRecipes_list);
        filterSelectItemsAfterSearch(selectedRecipes_list, tagListById)
    }else{
        displayRecipe(selectedRecipes_search);
        filterSelectItemsAfterSearch(selectedRecipes_search, tagListById)
    }
}

function displayRecipe(selectedRecipe_ids){
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    for(let i=0; i<recipeCard_elts.length; i++){
        recipeCard_elts[i].classList.remove("recipeCard__selected");
    }
    selectedRecipe_ids.forEach((id)=>{
        document.getElementById(`recette-${id}`).classList.add("recipeCard__selected");
    })
    showNumberOfRecipe();
}

function resetDisplayRecipe(){
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    for(let i=0; i<recipeCard_elts.length; i++){
        recipeCard_elts[i].classList.add("recipeCard__selected");
    }
    showNumberOfRecipe();
}

function filterSelectItemsAfterSearch(selectedRecipes_list, data){
    const selectItem_elts = document.querySelectorAll(".select-item");
    for(let i=0; i<selectItem_elts.length; i++){
        selectItem_elts[i].classList.add('none');
    }
    selectedRecipes_list.forEach((id)=>{
        data[id].forEach((e)=>{
            document.getElementById(`${e}-select`).classList.remove('none');
        })
    })
}


function initSearch(data, tagList, tagListById){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');

    searchInput_elt.addEventListener('keyup', (e)=>{
        if(e.target.value.length>2){
            getIdOfSelectedRecipe(data, tagList, tagListById)
        }else{
                resetDisplayRecipe();
            }
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        getIdOfSelectedRecipe(data, tagList, tagListById);
    })
    searchInputErase_elt.addEventListener('click', (e)=>{
        if(e.target.style.display === "block"){
            searchInput_elt.value="";
            e.target.style.display = "none";
            searchInput_elt.focus();
        }
        getIdOfSelectedRecipe(data, tagList, tagListById);
    })

    const list_elts = document.querySelectorAll(".btn-select-list");
    for (let i=0; i<list_elts.length; i++){
        list_elts[i].addEventListener('click',()=>{
            getIdOfSelectedRecipe(data, tagList, tagListById)
        });
    }

    const tagErase_elts = document.querySelectorAll('.btn-tag img');
    for (let i=0; i<tagErase_elts.length; i++){
        tagErase_elts[i].addEventListener('click', (e)=>{
            e.target.parentElement.classList.remove('tag');
            let id = e.target.id.replace('tag','select');
            id = id.replace('-erase','');
            document.getElementById(`${id}`).classList.remove('selected');
            getIdOfSelectedRecipe(data, tagList, tagListById);
        })
    }
}

function init(){
    const {tagList, mapIdKeys, mapKeyIds, tagListById} = getRecipeCard(recipes);
    showNumberOfRecipe();
    initSelect();
    initSearch(mapIdKeys, tagList, tagListById);
}

init();
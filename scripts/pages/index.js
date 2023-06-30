import { recipes } from "../utils/recipes.js";
import { getRecipeCard, } from "../factories/recipe.js";
import { displayErase, showResultSelect, removeTag, openCloseSelect } from "../factories/select.js";
import { filtre, filtreMap } from "../factories/search.js";

// Visual
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

function filterSelectItemsAfterSearch(selectedRecipes_list, data){
    const selectItem_elts = document.querySelectorAll(".select-item");
    for(let i=0; i<selectItem_elts.length; i++){
        selectItem_elts[i].classList.remove('filtered-item');
    }
    selectedRecipes_list.forEach((id)=>{
        data[id].forEach((e)=>{
            document.getElementById(`${e}-select`).classList.add('filtered-item');
        })
    })
}

function addTag(element, data, tagList, tagListById){
    const tagContainer_elt = document.querySelector('.tagsContainer');
    element.classList.add('selected');
    let id = element.id.replace('select','tag');
    let content = element.textContent;
    let tag_html = `<div id="${id}" class="btn btn-tag tag"><p>${content}</p><img id="${id}-erase" src="assets/icones/erase_tag.svg" alt="Effacer"></div>`;
    tagContainer_elt.insertAdjacentHTML('beforeend' , tag_html);
    document.getElementById(`${id}-erase`).addEventListener('click', (e)=>{
        e.target.parentElement.remove();
        let id = e.target.id.replace('tag','select');
        id = id.replace('-erase','');
        document.getElementById(`${id}`).classList.remove('selected');
        runSearch(data, tagList, tagListById);
    })
}

// Main function who return the final list of ids
function getIdOfSelectedRecipe(data, tagList){
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
    let valueArray = [""];
    if(searchInput_elt.value.length>2){
        valueArray = searchInput_elt.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(" ").filter(n=>n.length>2 && isNaN(n));
    }
    const selectedRecipes_search = filtreMap(valueArray, data);
    let test = selectedRecipes_search;
    console.log(test)

    // TEST
    /* console.time("filtre : id-keys")
    for(let i=0; i<10000; i++){
        const testList = filtre(valueArray, data);
    }
    console.timeEnd("filtre : id-keys")

    console.time("filtreMap : key-ids")
    for(let i=0; i<10000; i++){
        const testMap = filtreMap(valueArray, test);
    }
    console.timeEnd("filtreMap : key-ids") */

    // RESULT
    if(tag_elts.length!==0){
        selectedRecipes_tags.forEach((id)=>{
            if(selectedRecipes_search.has(id)){
                selectedRecipes_list.add(id)
            }
        })
        return selectedRecipes_list;
    }else{
        return selectedRecipes_search;
    }
}

// Initialisation
function runSearch(data, tagList, tagListById){
    const selectedRecipe_ids = getIdOfSelectedRecipe(data, tagList);
    displayRecipe(selectedRecipe_ids);
    filterSelectItemsAfterSearch(selectedRecipe_ids, tagListById);
}

function initSearch(data, tagList, tagListById){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');

    // search
    searchInput_elt.addEventListener('keyup', (e)=>{
        runSearch(data, tagList, tagListById);
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        runSearch(data, tagList, tagListById);
    })
    searchInputErase_elt.addEventListener('click', (e)=>{
        if(e.target.style.display === "block"){
            searchInput_elt.value="";
            e.target.style.display = "none";
            searchInput_elt.focus();
        }
        runSearch(data, tagList, tagListById);
    })
    // tag
    const list_elts = document.querySelectorAll(".btn-select-list");
    for (let i=0; i<list_elts.length; i++){
        list_elts[i].addEventListener('click',()=>{
            runSearch(data, tagList, tagListById);
        });
    }
}

function initSelect(data, tagList, tagListById){
    const names = ["ingredients","appareils","ustensiles"];
    for(let i=0; i<names.length; i++){
        const select_elt = document.querySelector(`.${names[i]}-select`);
        const selectArrow_elt = document.getElementById(`${names[i]}Arrow`);
        const input_elt = document.getElementById(`${names[i]}`);
        const inputErase_elt = document.getElementById(`${names[i]}Erase`);
        input_elt.addEventListener('keyup', (e)=>{
            const item_elts = document.querySelectorAll(`.${names[i]}-item`);
            displayErase(inputErase_elt, e.target);
            showResultSelect(e.target.value, item_elts);
        });
        selectArrow_elt.addEventListener('click', (e)=>{
            openCloseSelect(select_elt, e.target)});
        inputErase_elt.addEventListener('click', (e)=>{
            if(e.target.style.display === "block"){
                input_elt.value="";
                e.target.style.display = "none";
                const none_elts = document.querySelectorAll('.none');
                for(let i=0; i<none_elts.length; i++){
                    none_elts[i].classList.remove('none');
                }
                input_elt.focus()
            }
        })
    }
    const selectItem_elts = document.querySelectorAll(`.select-item`)
    for(let i=0; i<selectItem_elts.length; i++){
        selectItem_elts[i].addEventListener('click',(e)=>{
            if(e.target.matches('.selected')){
                removeTag(e.target);
            }else{
                addTag(e.target, data, tagList, tagListById);
            }
        }
    )}
}

function init(){
    const {tagList, mapIdKeys, mapKeyIds, tagListById} = getRecipeCard(recipes);
    showNumberOfRecipe();
    initSelect(mapKeyIds, tagList, tagListById);
    initSearch(mapKeyIds, tagList, tagListById);
}

init();
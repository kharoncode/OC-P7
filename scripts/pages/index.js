import { recipes } from "../utils/recipes.js";
import { getRecipeCard, recetteCount } from "../factories/recipe.js";
import { initSelect, displayErase } from "../factories/select.js";
import { showResultSearch } from "../factories/search.js";

function initSearch(data, recipeCard_elts){
    const searchInput_elt = document.getElementById('search');
    const searchInputErase_elt = document.getElementById('searchErase');
    const submitSearchButton = document.getElementById('submitSearch');
    searchInput_elt.addEventListener('keyup', (e)=>{
        if(e.target.value.length>2){
            const result = showResultSearch(e.target.value, data);
            for(let i=0; i<recipeCard_elts.length; i++){
                recipeCard_elts[i].style.display = "none";
            }
            for(let i=0; i<result.length; i++){
                document.getElementById(`recette-${result[i]}`).style.display = "flex";
            }
            document.querySelector(".recipe-filter--result").textContent = `${result.length} recettes`;
        }
        displayErase(searchInputErase_elt, e.target);
    });
    submitSearchButton.addEventListener('click', ()=>{
        console.log(showResultSearch(searchInput_elt.value, data));
    })
}

function init(){
    const {ustensilsList, ingredientsList, applianceList, titleList, tagList} = getRecipeCard(recipes);
    const data = [...new Set(ustensilsList),... new Set(ingredientsList),...new Set(applianceList),...new Set(titleList)];
    const recipeCard_elts = document.querySelectorAll('.recipeCard');
    recetteCount();
    initSelect("ingredients", ingredientsList);
    initSelect("appareils", applianceList);
    initSelect("ustensiles", ustensilsList);
    initSearch(recipes, recipeCard_elts);
    document.getElementById('submitSearch').addEventListener('click',()=>{
        const tag_elts = document.querySelectorAll('.tag');
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
    });
}

init();
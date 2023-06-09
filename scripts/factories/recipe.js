// DOM Elements
const recipesContainer_elt = document.querySelector('.recipesContainer');

function addIDToMap(mapElt, key, id){
    if(mapElt.has(key)){
        let temp = mapElt.get(key);
        temp.add(id);
        mapElt.set(key,temp)
    }else{
        mapElt.set(key,new Set([id]))
    }
}

function removeAccents (str){
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');}

  function tagFormat (str){
    return removeAccents(str).replace(/[' ']/g,'')
  }


function addSelectElt(data, category){
    let dataFormat = tagFormat(data);
    const selectContainer_elt = document.querySelector(`.${category}-select--list`);
    let select_html = `<li id="${dataFormat}-select" class="${category}-item select-item filtered-item">${data}</li>`;
    selectContainer_elt.insertAdjacentHTML('beforeend' , select_html);
}

export function getRecipeCard(recipes){
    let ustensilsList = new Set();
    let ingredientsList = new Set();
    let applianceList = new Set();
    let tagList = new Map(); 
    let tagListById = {};

    let mapKeyIds = new Map();
    let mapIdKeys = {};
    for(const recipe of recipes){
        let listOfTags = new Set();
        //Recipe
        const {id, image, name, ingredients, time, description, appliance, ustensils} = recipe;
        // Init Map
        let keysList = new Set();
        // Name Map
        let nameFormat = removeAccents(name.toLowerCase()).replace(/[.,']/g,'').split(' ');
        nameFormat.forEach((e)=>{ keysList.add(e); });
        
        // Ustensils Map
        for(const data in ustensils){
            let key = ustensils[data].toLowerCase();
            ustensilsList.add(key);
            addIDToMap(tagList, key, id);
            listOfTags.add(tagFormat(key));
            key = removeAccents(key).replace(/[.,()°']/g,' ').split(' ');
            key.forEach((e)=>{keysList.add(e)});
        }
        // Appliance (appareils)
        let applianceFormat = appliance.toLowerCase();
        // MAP
        applianceList.add(applianceFormat);
        addIDToMap(tagList, applianceFormat, id);
        listOfTags.add(tagFormat(applianceFormat));
        applianceFormat = removeAccents(applianceFormat).split(' ')
        applianceFormat.forEach((e)=>{keysList.add(e)});
        // Description Map
        let descriptionFormat = removeAccents(description.toLowerCase()).replace(/[.,()°'’-]/g,' ').split(' ');
        descriptionFormat.forEach((e)=>{keysList.add(e)});

        // DOM
        const recipeCard = document.createElement('section');
        recipeCard.classList.add("recipeCard","recipeCard__selected");
        recipeCard.setAttribute("id", `recette-${id}`);

        // IMG
        let picture = `./assets/images/mini/${image}`;
        const img = document.createElement('img');
        img.src = picture;
        img.alt = name;
        img.setAttribute('loading','lazy');

        // INFO
        const info = document.createElement('div');
        info.classList.add("recipeCard-info");
        // Titre
        const titre = document.createElement('h3');
        titre.textContent = name;
        // Description
        const recette = document.createElement('div');
        recette.classList.add("recipeCard-info_description");
        let recette_html = `<h4>Recette</h4><p>${description}</p>`;
        recette.insertAdjacentHTML('afterbegin', recette_html);
        // Ingredients
        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('recipeCard-info_ingredients');
        let ingredientTitre_html = "<h4>Ingrédients</h4>";
        ingredientsContainer.insertAdjacentHTML('afterbegin' , ingredientTitre_html);
        const ingredientListe = document.createElement('div');
        ingredientListe.classList.add("recipeCard-info_ingredients--liste");
        for(const data in ingredients){
            // DOM
            const {ingredient, quantity, unit} = ingredients[data];
            const div = document.createElement('div');
            div.classList.add("recipeCard-info_ingredients--liste-ingredient");
            let ingredient_html = `<h5>${ingredient}</h5><p>${quantity??"-"} ${unit??""}</p>`;
            div.insertAdjacentHTML('beforeend', ingredient_html);
            ingredientListe.appendChild(div);
            // Map
            let ingredientFormat = ingredient.toLowerCase();
            ingredientsList.add(ingredientFormat);
            addIDToMap(tagList,ingredientFormat,id);
            listOfTags.add(tagFormat(ingredientFormat));
            ingredientFormat = removeAccents(ingredientFormat).replace(/[.,()°']/g,' ').split(' ');
            ingredientFormat.forEach((e)=>{keysList.add(e)});
        }
        // Time
        const temps = document.createElement('div');
        temps.classList.add("recipeCard_time");
        temps.textContent = `${time}min`

        recipesContainer_elt.appendChild(recipeCard)
        recipeCard.appendChild(img);
        recipeCard.appendChild(info);
        recipeCard.appendChild(temps);
        info.appendChild(titre);
        info.appendChild(recette);
        info.appendChild(ingredientsContainer);
        ingredientsContainer.appendChild(ingredientListe);

        // Map compile
        keysList = Array.from(keysList).filter(n=>n.length>2 && isNaN(n));
        for(let i=0; i<keysList.length; i++){
            addIDToMap(mapKeyIds, keysList[i], id);
        }
        mapIdKeys[id]=keysList.join(' ');
        tagListById[id]=listOfTags;

    };
    
    // Add Item List in Select
    ustensilsList = Array.from(ustensilsList).sort((a,b)=>{return a.localeCompare(b);});
    ingredientsList=Array.from(ingredientsList).sort((a,b)=>{return a.localeCompare(b);});
    applianceList=Array.from(applianceList).sort((a,b)=>{return a.localeCompare(b);});
    ustensilsList.forEach((e)=>{
        addSelectElt(e,"ustensiles");
    });
    ingredientsList.forEach((e)=>{
        addSelectElt(e,"ingredients");
    });
    applianceList.forEach((e)=>{
        addSelectElt(e,"appareils");
    });

    return{tagList, mapIdKeys, mapKeyIds, tagListById};
}
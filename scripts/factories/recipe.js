// DOM Elements
const recipesContainer_elt = document.querySelector('.recipesContainer');

function addIDToMap(mapElt, key, id){
    key=key.toLowerCase();
    if(mapElt.has(`${key}`)){
        let temp = mapElt.get(`${key}`);
        temp.push(`${id}`);
        mapElt.set(`${key}`,temp)
    }else{
        mapElt.set(`${key}`,[`${id}`])
    }
}

function removeAccents (str){
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');}

export function getRecipeCard(recipes){
    let ustensilsList = [];
    let ingredientsList = [];
    let applianceList = [];
    let newData = {};
    let tagList = new Map();
    let recipeIDMap = new Map();
    for(const recipe in recipes){
        const {id, image, name, ingredients, time, description, appliance, ustensils} = recipes[recipe];
        let recipeData = []
        
        let nameFormat = removeAccents(name.toLowerCase()).replace(/[.,']/g,'').split(' ');
        recipeData = new Set([...recipeData, ...nameFormat]);
        
        for(const data in ustensils){
            let key = ustensils[data].toLowerCase();
            ustensilsList.push(key);
            addIDToMap(tagList, key, id);
            key = removeAccents(key).replace(/[.,()°']/g,' ').split(' ');
            recipeData = new Set([...recipeData, ...key]);
        }

        let applianceFormat = appliance.toLowerCase();
        applianceList.push(applianceFormat);
        applianceFormat = removeAccents(applianceFormat).split(' ')
        recipeData = new Set([...recipeData, ...applianceFormat]);
        addIDToMap(tagList, appliance, id);

        let descriptionFormat = removeAccents(description.toLowerCase()).replace(/[.,()°'’-]/g,' ').split(' ');
        recipeData = new Set([...recipeData, ...descriptionFormat]);

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
            const {ingredient, quantity, unit} = ingredients[data];
            const div = document.createElement('div');
            div.classList.add("recipeCard-info_ingredients--liste-ingredient");
            let ingredient_html = `<h5>${ingredient}</h5><p>${quantity??"-"} ${unit??""}</p>`;
            div.insertAdjacentHTML('beforeend', ingredient_html);
            ingredientListe.appendChild(div);
            let ingredientFormat = ingredient.toLowerCase();
            ingredientsList.push(ingredientFormat);
            ingredientFormat = removeAccents(ingredientFormat).replace(/[.,()°']/g,' ').split(' ');
            recipeData = new Set([...recipeData, ...ingredientFormat]);
            addIDToMap(tagList,ingredient,id);
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

        recipeData = Array.from(recipeData).filter(n=>n.length>2 && isNaN(n));
        for(let i=0; i<recipeData.length; i++){
            addIDToMap(recipeIDMap, recipeData[i], id);
        }
        newData[id]=recipeData.join(' ');
    }

    // Select
    ustensilsList=[...new Set(ustensilsList)].sort((a,b)=>{return a.localeCompare(b);});
    ingredientsList=[...new Set(ingredientsList)].sort((a,b)=>{return a.localeCompare(b);});
    applianceList=[...new Set(applianceList)].sort((a,b)=>{return a.localeCompare(b);});

    return{ustensilsList, ingredientsList, applianceList, tagList, newData, recipeIDMap};
}
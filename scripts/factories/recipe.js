// DOM Elements
const recipesContainer_elt = document.querySelector('.recipesContainer');

export function getRecipeCard(recipes){
    let ustensilsList = [];
    let ingredientsList = [];
    let applianceList = [];
    for(const recipe in recipes){
        const {id, image, name, servings, ingredients, time, description, appliance, ustensils} = recipes[recipe];
        for(const data in ustensils){
            ustensilsList.push(ustensils[data].toLowerCase());
        }
        applianceList.push(appliance.toLowerCase());

        const recipeCard = document.createElement('section');
        recipeCard.classList = "recipeCard"
        recipeCard.setAttribute("id", `recette-${id}`);
        recipesContainer_elt.appendChild(recipeCard)

        // IMG
        let picture = `./assets/images/mini/${image}`;
        const img = document.createElement('img');
        img.src = picture;
        img.alt = name;

        // INFO
        const info = document.createElement('div');
        info.classList = "recipeCard-info";
        // Titre
        const titre = document.createElement('h3');
        titre.textContent = name;
        // Description
        const recette = document.createElement('div');
        recette.classList = "recipeCard-info_description";
        let recetteTitre_html = "<h4>Recette</h4>";
        let recette_html = `<p>${description}</p>`
        recette.insertAdjacentHTML('afterbegin', recetteTitre_html);
        recette.insertAdjacentHTML('beforeend', recette_html);
        // Ingredients
        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList = 'recipeCard-info_ingredients';
        let ingredientTitre_html = "<h4>Ingrédients</h4>";
        ingredientsContainer.insertAdjacentHTML('afterbegin' , ingredientTitre_html);
        const ingredientListe = document.createElement('div');
        ingredientListe.classList = "recipeCard-info_ingredients--liste";
        for(const data in ingredients){
            const {ingredient, quantity, unit} = ingredients[data];
            ingredientsList.push(ingredient.toLowerCase());
            const div = document.createElement('div');
            div.classList = "recipeCard-info_ingredients--liste-ingredient"
            div.innerHTML = `<h5>${ingredient}</h5>
                            <p>${quantity??"-"} ${unit??""}</p>`
            ingredientListe.appendChild(div);
        }
        // Time
        const temps = document.createElement('div');
        temps.classList = "recipeCard_time";
        temps.textContent = `${time}min`

        recipeCard.appendChild(img);
        recipeCard.appendChild(info);
        recipeCard.appendChild(temps);
        info.appendChild(titre);
        info.appendChild(recette);
        info.appendChild(ingredientsContainer);
        ingredientsContainer.appendChild(ingredientListe);
    }
    ustensilsList=[...new Set(ustensilsList)].sort((a,b)=>{return a.localeCompare(b);});
    ingredientsList=[...new Set(ingredientsList)].sort((a,b)=>{return a.localeCompare(b);});
    applianceList=[...new Set(applianceList)].sort((a,b)=>{return a.localeCompare(b);});

    return{ustensilsList, ingredientsList, applianceList};
}
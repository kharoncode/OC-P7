// DOM Elements
const recipesContainer_elt = document.querySelector('.recipesContainer');

export function getRecipe(recipes){
    for(const recipe in recipes){
        const {id, image, name, servings, ingredients, time, description, appliance, ustensils} = recipes[recipe];

        let picture = `./assets/images/mini/${image}`;
        const img = document.createElement('img');
        img.src = picture;
        img.alt = name;
        recipesContainer_elt.appendChild(img)

    }
}
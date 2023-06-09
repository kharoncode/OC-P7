export function findRecipeId(value, data){
    value=value.toLowerCase();
    let recipeSearchList = []
    for(let i=0; i<data.length; i++){
        let {id, name, ingredients, description, appliance, ustensils} = data[i];
        name = name.toLowerCase();
        description = description.toLowerCase();
        appliance = appliance.toLowerCase();
        for(let i=0; i<ustensils.length; i++){
            ustensils[i] = ustensils[i].toLowerCase();
        }
        ustensils = ustensils.join(' ');
        let ingredient = [];
        for(let j=0; j<ingredients.length; j++){
            ingredient.push(ingredients[j].ingredient.toLowerCase());
        }
        ingredient = ingredient.join(' ');
        if(name.includes(value) || ingredient.includes(value) || description.includes(value) || appliance.includes(value) || ustensils.includes(value)){
            recipeSearchList.push(id);
            continue;
        }
    }
    return recipeSearchList;
    
}
export function showResultSearch(value, data){
    value=value.toLowerCase();
    if(value.length>2){
        for(let i=0; i<data.length; i++){
            let {id, name, ingredients, description, appliance, ustensils} = data[i];
            name = name.toLowerCase();
            description = name.toLowerCase();
            appliance = name.toLowerCase();
            ustensils = name.toLowerCase();
            let ingredient = [];
            for(let j=0; j<ingredients.length; j++){
                ingredient.push(ingredients[j].ingredient.toLowerCase);
            }
            if(name.includes(value) || ingredient.includes(value) || description.includes(value) || appliance.includes(value) || ustensils.includes(value)){
                console.log(`${id} ${name}`);
            }
        }
    }
}
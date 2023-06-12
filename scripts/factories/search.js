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

// TEST

function returnNewDataAfterSearch(ids,data){
    let newData = [];
    for(let i=0; i<ids.length; i++){
        newData.push(data[ids[i]-1])
    }
    return newData;
}

// search for multi value : value1 get data and return data11, value 2 get data1 and return data2, ...
export function filtreRecurcif(value, data){
    let valueArray = value.split(" ");
    let ids = findRecipeId(valueArray[0], data)
    let newData = returnNewDataAfterSearch(ids, data);
    if(valueArray.length>1){
        for(let i=1; i<valueArray.length; i++){
            if(valueArray[i].length<3){
                continue;
            }else{  
                ids = findRecipeId(valueArray[i], newData);
                newData = returnNewDataAfterSearch(ids, newData);
            }
        }
    }else{
        return ids;
    }
    return ids;
}

export function filtre(value, data){
    for(let i=0; i<value.length; i++){
        console.log("new data de [i="+i+"] = " + data.length);
        value[i]=value[i].trim();
        let ids = findRecipeId(value[i],data);
        if(i==(value.length-1)){
            return ids;
        }else{
            data = returnNewDataAfterSearch(ids,data);
            continue;
        }
    }
    
}

/* export function filtreBis(value, data){
        let i=0;
        value[i]=value[i].trim();
        let ids = findRecipeId(value[i],data);
        if(i==(value.length-1)){
            return ids;
        }else{
            data = returnNewDataAfterSearch(ids,data);

            filtreBis(value[i+1], data);
        }
    
    
} */
import { findRecipeId } from "./search";

function getTagData(data){
    let ustensilsList = [];
    let ingredientsList = [];
    let applianceList = [];
    let tagList = new Map()
    for(const recipe in data){
        const {id,ingredients, appliance, ustensils} = data[recipe];
        for(const ustensil in ustensils){
            let key = ustensils[ustensil].toLowerCase();
            ustensilsList.push(key);
            addTagList(tagList, key, id)
        }
        applianceList.push(appliance.toLowerCase());
        addTagList(tagList, appliance, id)
        for(const data in ingredients){
            const {ingredient} = ingredients[data];
            ingredientsList.push(ingredient.toLowerCase());
            addTagList(tagList,ingredient,id)
        }
    }
    return{ustensilsList, ingredientsList, applianceList, tagList};
};

function returnNewDataAfterSearch(ids,data){
    let newData = [];
    for(let i=0; i<ids.length; i++){
        for(let j=0; j<data.length; j++){
            if(data[j].id===id[i]){
                newData.push(data[i]);
            }
            break;
        }
    }
    return newData;
}

// search for multi value : value1 get data and return data11, value 2 get data1 and return data2, ...
function filtreRecurcif(value, data){
    let newData = data;
    let valueArray = value.split(" ");
    let ids = findRecipeId(valueArray[0], data)
    newData = returnNewDataAfterSearch(ids, data)
    if(valueArray.length=1){
        return ids;
    }else{
        for(let i=1; i<valueArray.length; i++){
            if(valueArray[i].length<3){
                continue;
            }else{  
                ids = findRecipeId(valueArray[i], newData);
                newData = returnNewDataAfterSearch(ids, newData);
            }

        }
    }
    return ids;
}


function filtre(value, data){
    if(value[i]==(value.length-1)){
        return findRecipeId(value[i], data)
    }else{
        ids = findRecipeId(valueArray[i], data);
        newData = returnNewDataAfterSearch(ids, newData);
        filtre(value[i+1], newData);
    }
}
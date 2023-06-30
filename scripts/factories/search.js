// with value return a list of id
function returnRecipeID(value, data){
    let recipeSearchList = new Set();
    for(const id in data){
        if(data[id].includes(value)){
            recipeSearchList.add(id);
        }
    }
    return recipeSearchList;
}

// with id create a new data base
function returnNewDataAfterSearch(ids,data){
    let newData = {};
    ids.forEach((id)=>{
        newData[id]=data[id];
    })
    return newData;
}

// Search with mapIdKeys
export function filtre(values, data){
    for(let i=0; i<values.length; i++){
        let ids = returnRecipeID(values[i],data);
        if(i===(values.length-1)){
            return ids;
        }else{
            data = returnNewDataAfterSearch(ids,data);
        }
    }
}
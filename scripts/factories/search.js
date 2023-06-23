// with value return a list of id
function returnRecipeID(value, data){
    let recipeSearchList = new Set();
    for(const id in data){
        if(data[id].includes(value)){
            recipeSearchList.add(id);
            continue;
        }
    }
    return recipeSearchList;
}

// with id create a new data base
export function returnNewDataAfterSearch(ids,data){
    let newData = {};
    ids.forEach((id)=>{
        newData[id]=data[id];
    })
    return newData;
}

// Search with mapIdKeys
export function filtre(value, data){
    for(let i=0; i<value.length; i++){
        let ids = returnRecipeID(value[i],data);
        if(i===(value.length-1)){
            return ids;
        }else{
            data = returnNewDataAfterSearch(ids,data);
            continue;
        }
    }
}

// Search with mapKeyIds
export function filtreMap(value, data){
    let ids = new Set();
    for(let i=0; i<value.length; i++){
        let tempIds = new Set();
        for(const keyValue of data){
            if(keyValue[0].startsWith(value[i])){
                if(i===0){
                    keyValue[1].forEach((id)=>{ids.add(id)});                  
                } else{
                    keyValue[1].forEach((id)=>{tempIds.add(id)});               
                }
            }
        }
        if(i>0){
            ids.forEach((id)=>{
                if(!tempIds.has(id)){
                    ids.delete(id);     
                }
            })
        }
    }
    return ids;
}
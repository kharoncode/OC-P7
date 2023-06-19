// with value return a list of id
function returnRecipeID(value, data){
    let recipeSearchList = [];
    for(const id in data){
        if(data[id].includes(value)){
            recipeSearchList.push(id);
            continue;
        }
    }
    return recipeSearchList;
}

// with id create a new data base
export function returnNewDataAfterSearch(ids,data){
    let newData = {};
    for(let i=0; i<ids.length; i++){
        newData[ids[i]]=data[ids[i]];
    }
    return newData;
}

// Search with mapIdKeys
export function filtre(value, data){
    for(let i=0; i<value.length; i++){
        let ids = returnRecipeID(value[i],data);
        if(i==(value.length-1)){
            return ids;
        }else{
            data = returnNewDataAfterSearch(ids,data);
            continue;
        }
    }
}

// Search with mapKeyIds
export function filtreMap(value, data){
    const findKey = (map, val) => [...map.keys()].filter(n => n.includes(val));
    let ids = new Set();
    findKey(data, value[0]).forEach((e)=>{data.get(e).forEach((id)=>{ids.add(id)})});
    for(let i=0; i<value.length; i++){
        if(findKey(data,value[i]).length>0){
            let tempIds = new Set();
            findKey(data, value[i]).forEach((e)=>{data.get(e).forEach((id)=>{tempIds.add(id)})});
            ids = new Set([...ids].filter(n=>[...tempIds].includes(n)));
            if(i==(value.length-1)){
                return Array.from(ids);
            }else{
                continue;
            }
        }else{
            return Array.from(ids);
        }
    }
}

// Search with mapKeyIds startsWith()
export function filtreMapBis(value, data){
    let ids = new Set();
    for(let i=0; i<value.length; i++){
        let tempIds = new Set();
        let test = new Set();
        for(const keyValue of data){
            if(keyValue[0].startsWith(value[i])){
                if(i===0){
                    keyValue[1].forEach((id)=>{ids.add(id)});                  
                } else{
                    keyValue[1].forEach((id)=>{tempIds.add(id)});
                    /* ids.forEach((id)=>{
                        if(!tempIds.has(id)){
                            ids.delete(id);     
                        }
                    }) */
                }
                if(value.length>1){
                    tempIds.forEach((id)=>{
                        if(ids.has(id)){
                            test.add(id);     
                        }
                    });
                    ids = test;
                } 
            }
        }
    }
    return ids;
}

// Search with mapKeyIds includes()
export function filtreMapTer(value, data){
    let ids = new Set();
    for(let i=0; i<value.length; i++){
        let tempIds = new Set();
        let test = new Set();
        for(const keyValue of data){
            if(keyValue[0].includes(value[i])){
                if(i===0){
                    keyValue[1].forEach((id)=>{ids.add(id)});
                } else{
                    keyValue[1].forEach((id)=>{tempIds.add(id)});
                    /* ids.forEach((id)=>{
                        if(!tempIds.has(id)){
                            ids.delete(id);     
                        }
                    }) */
                }
                if(value.length>1){
                    tempIds.forEach((id)=>{
                        if(ids.has(id)){
                            test.add(id);     
                        }
                        console.log(test);
                    });
                } 
            }
        }
    }
    return ids
}
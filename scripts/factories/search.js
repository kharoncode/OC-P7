// Search with newData
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
function returnNewDataAfterSearch(ids,data){
    let newData = {};
    for(let i=0; i<ids.length; i++){
        newData[ids[i]]=data[ids[i]];
    }
    return newData;
}

// search for multi value
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

// Search with recipeIDMap
export function filtreMap(value, data){
    const findKey = (map, val) => [...map.keys()].filter(n => n.includes(val));
    /* const filteredMap = new Map ( `${[...data.keys()].filter(k => k.includes(value))}`, value);
    console.log(filteredMap) */
    let ids = new Set()
    /* initValue.forEach((e)=>{ids.add(data.get(e))}) */
    for(let i=0; i<value.length; i++){
        findKey(data, value[i]).forEach((e)=>{data.get(e).forEach((id)=>{ids.add(id)})});
        
        /* const mapTest = new Map(); */
        /* let test = findKey(data,value[i]);
        let resultTest = new Set()
        test.forEach((e)=>{
            data.get(e).forEach((id)=>{
                resultTest.add(id);
            })
        }); */
        if([...data.keys()].includes(value[i])){
            console.log([...data.keys()].includes(value[i]))
            let tempsIds = new Set();
            findKey(data, value[i]).forEach((e)=>{data.get(e).forEach((id)=>{tempsIds.add(id)})});
            /* let tempIds = new Set([... data.get(value[i])]); */

            tempsIds.forEach((e)=>{
                ids = new Set([...ids].filter(n=>e.has(ids)));
            })
            if(i==(value.length-1)){
                return ids;
            }else{
                continue;
            }
        }else{
            return ids;
        }
    }
}
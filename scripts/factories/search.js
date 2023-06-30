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
    let result = new Set();
    ids.forEach((e)=>{
        result.add(`${e}`)
    })
    return result;
}
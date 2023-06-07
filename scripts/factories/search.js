export function showResultSearch(value, data){
    value=value.toLowerCase();
    if(value.length>2){
        for(let i=0; i<data.length; i++){
            if(data[i].includes(value)){
               console.log(data[i]);
            }

        }
    }
}
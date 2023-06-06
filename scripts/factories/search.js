export function showResultSelect(value, data, items){
    if(value.length>2){
        for(let i=0; i<data.length; i++){
            if(data[i].includes(value)){
               items[i].style.display="block";
            }else{
                items[i].style.display="none";
            }

        }
    }else{
        for(let i=0; i<items.length; i++){
            items[i].style.display="block";
        }
    }
}

export function showResultSearch(value, data){
    if(value.length>2){
        for(let i=0; i<data.length; i++){
            if(data[i].includes(value)){
               console.log(data[i]);
            }

        }
    }
}
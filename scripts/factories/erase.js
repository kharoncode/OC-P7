export function displayErase(erase_elt, input_elt){
    if(input_elt.value.length>2){
        erase_elt.style.display = "block";
    }else{
        erase_elt.style.display = "none";
    }
    erase_elt.addEventListener('click', ()=>{
        if(erase_elt.style.display === "block"){
            input_elt.value="";
            erase_elt.style.display = "none";
            input_elt.focus()
        }
    })
}
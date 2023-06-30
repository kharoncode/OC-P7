// SELECT
export function openCloseSelect(container, e){
    let display = window.getComputedStyle(container).display
    const select_elts = document.querySelectorAll('.dropdown-menu');
    select_elts.forEach((e)=>{
        e.style.display = "none";
    })
    const selectArrow_elts = document.querySelectorAll('.selectArrow');
    selectArrow_elts.forEach((e)=>{
        e.style.transform = "initial";
    })
    if(display === "none"){
            container.style.display = "block"
            e.style.transform = "rotateX(180deg)";
    } else if(display === "block"){
            container.style.display = "none";
            e.style.transform = "initial";
    }
}

// ERASE
export function displayErase(erase_elt, input_elt){
    if(input_elt.value.length>2){
        erase_elt.style.display = "block";
    }else{
        erase_elt.style.display = "none";
    }
}

// SEARCH
export function showResultSelect(value, items){
    value=value.toLowerCase();
    for(let i=0; i<items.length; i++){
        if(value.length>2){
            if(items[i].textContent.includes(value)){
            items[i].classList.remove('none');
            }else{
                items[i].classList.add('none');
            }
        }else{
            for(let i=0; i<items.length; i++){
                items[i].classList.remove('none');
            }
        }
    }
}

// TAG
export function removeTag(element){
    element.classList.remove('selected');
    let id = element.id.replace('select','tag');
    document.getElementById(`${id}`).remove();
}
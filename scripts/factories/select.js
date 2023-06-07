// SELECT
function getSelectList(data, e, name){
    for(let i=0; i<data.length; i++){
        let html = `<li class="${name}-item">${data[i]}</li>`;
        e.insertAdjacentHTML('beforeend' , html);
    }
}
function openCloseSelect(container, e){
    if(container.getAttribute("open") === "true"){
            container.style.height = "53px"
            container.setAttribute('open','false');
            e.style.transform = "initial";
    } else if(container.getAttribute("open")==="false"){
            container.style.height = "324px"
            container.setAttribute('open','true');
            e.style.transform = "rotateX(180deg";
    }
}

// ERASE
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
            const none_elts = document.querySelectorAll('.none');
            for(let i=0; i<none_elts.length; i++){
                none_elts[i].classList.remove('none');
            }
            input_elt.focus()
        }
    })
}

// SEARCH
function showResultSelect(value, items){
    value=value.toLowerCase();
    if(value.length>2){
        for(let i=0; i<items.length; i++){
            if(items[i].textContent.includes(value)){
               items[i].classList.remove('none');
            }else{
                items[i].classList.add('none');
            }

        }
    }else{
        for(let i=0; i<items.length; i++){
            items[i].classList.remove('none');
        }
    }
}

// INIT
export function initSelect(name, data){
    const select_elt = document.querySelector(`.${name}-select`)
    const selectlist_elt = document.querySelector(`.${name}-select--list`);
    const selectArrow_elt = document.getElementById(`${name}Arrow`)
    const input_elt = document.getElementById(`${name}`);
    const inputErase_elt = document.getElementById(`${name}Erase`);
    getSelectList(data, selectlist_elt, name);
    const items_elts = document.querySelectorAll(`.${name}-item`)
    input_elt.addEventListener('keyup', (e)=>{
        displayErase(inputErase_elt, e.target)
        showResultSelect(e.target.value, items_elts);
    });
    selectArrow_elt.addEventListener('click', (e)=>{
        openCloseSelect(select_elt, e.target)});
}
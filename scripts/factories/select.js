// SELECT
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
}

// SEARCH
function showResultSelect(value, items){
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
function addTag(element){
    element.classList.add('selected');
    let id = element.id.replace('select','tag');
    document.getElementById(`${id}`).classList.add('tag');
}
function removeTag(element){
    element.classList.remove('selected');
    let id = element.id.replace('select','tag');
    document.getElementById(`${id}`).classList.remove('tag');
}

// INIT
export function initSelect(){
    const names = ["ingredients","appareils","ustensiles"];
    for(let i=0; i<names.length; i++){
        const select_elt = document.querySelector(`.${names[i]}-select`);
        const selectArrow_elt = document.getElementById(`${names[i]}Arrow`);
        const input_elt = document.getElementById(`${names[i]}`);
        const inputErase_elt = document.getElementById(`${names[i]}Erase`);
        const item_elts = document.querySelectorAll(`.${names[i]}-item`);
        input_elt.addEventListener('keyup', (e)=>{
            displayErase(inputErase_elt, e.target);
            showResultSelect(e.target.value, item_elts);
        });
        selectArrow_elt.addEventListener('click', (e)=>{
            openCloseSelect(select_elt, e.target)});
        inputErase_elt.addEventListener('click', (e)=>{
            if(e.target.style.display === "block"){
                input_elt.value="";
                e.target.style.display = "none";
                const none_elts = document.querySelectorAll('.none');
                for(let i=0; i<none_elts.length; i++){
                    none_elts[i].classList.remove('none');
                }
                input_elt.focus()
            }
        })
    }
    const selectItem_elts = document.querySelectorAll(`.select-item`)
    for(let i=0; i<selectItem_elts.length; i++){
        selectItem_elts[i].addEventListener('click',(e)=>{
            if(e.target.matches('.selected')){
                removeTag(e.target);
            }else{
                addTag(e.target);
            }
        }
    )}
}
// SELECT
function getSelectTagList(data, select_elt, tag_elt, name){
    for(let i=0; i<data.length; i++){
        let select_html = `<li id="${name}-select-${i}" class="${name}-item">${data[i]}</li>`;
        select_elt.insertAdjacentHTML('beforeend' , select_html);
        let tag_html = `<div id="${name}-tag-${i}" class="btn btn-tag"><p>${data[i]}</p><img id="${name}-tag-${i}-erase" src="assets/icones/erase_tag.svg" alt="Effacer"></div>`;
        tag_elt.insertAdjacentHTML('beforeend' , tag_html);
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
    document.getElementById(`${id}`).style.display = "flex";
    document.getElementById(`${id}`).classList.add('tag');
}
function removeTag(element){
    element.classList.remove('selected');
    let id = element.id.replace('select','tag');
    document.getElementById(`${id}`).style.display = "none";
    document.getElementById(`${id}`).classList.remove('tag');
}

// INIT
export function initSelect(name, data){
    const select_elt = document.querySelector(`.${name}-select`)
    const selectlist_elt = document.querySelector(`.${name}-select--list`);
    const selectArrow_elt = document.getElementById(`${name}Arrow`)
    const input_elt = document.getElementById(`${name}`);
    const inputErase_elt = document.getElementById(`${name}Erase`);
    const tagContainer_elt = document.querySelector('.recipes-tags');
    getSelectTagList(data, selectlist_elt, tagContainer_elt, name);
    const item_elts = document.querySelectorAll(`.${name}-item`)
    const tagErase_elts = document.querySelectorAll('.btn-tag img');
    // add/remove Tag when clicling on select element
    for(let i=0; i<item_elts.length; i++){
        item_elts[i].addEventListener('click',(e)=>{
            if(e.target.matches('.selected')){
                removeTag(e.target);
            }else{
                addTag(e.target);
            }
        }
    )}
    // remove Tag when clicking on the tag's cross
    for (let i=0; i<tagErase_elts.length; i++){
        tagErase_elts[i].addEventListener('click', (e)=>{
            e.target.parentElement.style.display = "none";
            e.target.parentElement.classList.remove('tag');
            let id = e.target.id.replace('tag','select');
            id = id.replace('-erase','');
            document.getElementById(`${id}`).classList.remove('selected');
        })
    }
    input_elt.addEventListener('keyup', (e)=>{
        displayErase(inputErase_elt, e.target);
        showResultSelect(e.target.value, item_elts);
    });
    selectArrow_elt.addEventListener('click', (e)=>{
        openCloseSelect(select_elt, e.target)});
}
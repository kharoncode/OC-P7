export function getSelectList(data, e, name){
    for(let i=0; i<data.length; i++){
        let html = `<li class="${name}-item">${data[i]}</li>`;
        e.insertAdjacentHTML('beforeend' , html);
    }
}
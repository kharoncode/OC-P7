export function getSelectList(data, e){
    for(let i=0; i<data.length; i++){
        let html = `<li>${data[i]}</li>`;
        e.insertAdjacentHTML('beforeend' , html);
    }
}
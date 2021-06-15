// document.body.addEventListener('click', e => console.log(e));

let addTODO = document.querySelector('#btn-make-todo'),
modal = document.querySelector('#cover-modal'),
btnClose = document.querySelector('#btn-close'),    
textDescription = document.querySelector('#todo-description'),
btnsEdits = document.getElementsByClassName('edit');

addTODO.addEventListener('mouseover', () => document.querySelector('#toast').style.display = 'inline');
addTODO.addEventListener('mouseleave', () => document.querySelector('#toast').style.display = 'none');
addTODO.addEventListener('click', () => modal.classList = "cover-modal show");
btnClose.addEventListener('click', () => {
    modal.classList = "cover-modal hide";
    document.querySelector('#txtTarea').value = "";
    document.querySelector('#txt-todo-description').value = "";
    document.querySelector('#sel-todo-name').value = "Elige una categoría";
    document.querySelector('#txt-todo-date').value = "";
});
document.addEventListener("DOMContentLoaded", fetchTasks);

const form = document.querySelector('#form-add-todo');
const listaTareas = document.querySelector('#todos');


const petition = (options) => {
  let {request, url, success, error, data} = options;

  let objetoAjax = new XMLHttpRequest();
  
  //Abriendo conexión
  objetoAjax.open(request || 'GET', url, true);
  objetoAjax.setRequestHeader("Content-type", "application/json; charset=utf-8");

  objetoAjax.onreadystatechange = () => {
    
    if(objetoAjax.readyState !== 4) return;
    
    if(objetoAjax.status >= 200 && objetoAjax.status < 300){
      success(JSON.parse(objetoAjax.responseText));
    } else{
      error(`Error: ${objetoAjax.status}`);
    }
  };
  
  //Mandamos petición
  objetoAjax.send(JSON.stringify(data));
}

  function settingTemplate(data){
    let templateCard = document.querySelector('#card-template').content,    
    todosContainer = document.querySelector('#todos');
    fragmento = document.createDocumentFragment();

    // if(data.length === 0){
    //   document.querySelector("#img-done").style.display = "block";
    //   document.querySelector("#empty-todos").style.display = "block";
      // let message = document.createElement('p');
      // let image = document.createElement('img');
      // image.src = "/img/done.png";
      // image.width = 300;
      // image.height = 300;
      // image.className = "img-done";
      // image.id = "img-done";

      // message.className = "empty-todos";
      // message.id = "empty-todos";
      // message.innerHTML = "No tienes tareas pendientes por el momento";

      // todosContainer.appendChild(image);
      // todosContainer.appendChild(message);
    // } else{

      todosContainer.classList.add('flex-direction');

      removeCards();
  
      data.forEach(element => {
        let copia = document.importNode(templateCard, true);
        copia.querySelector('.todo-name').textContent = element.tarea.nombre;
        copia.querySelector('.todo-id').textContent = element.id;
        copia.querySelector('.todo-description').textContent = element.tarea.descripcion;
        copia.querySelector('.todo-category').textContent = element.categoria;
        copia.querySelector('.todo-date-limit').textContent = element.fecha_limite;
        copia.querySelector('.todo-state').textContent = element.estado;
        fragmento.appendChild(copia);    
      });
      
      document.querySelector("#todos").appendChild(fragmento);
      document.querySelector("#img-done").style.display = "none";
      document.querySelector("#empty-todos").style.display = "none";
    // }

  }

  function removeCards(){
    let cards = document.querySelectorAll('.todo');
    cards.forEach(element => element.remove());
  }


//Agrega una nueva tarea
form.addEventListener("submit", e => {
  e.preventDefault();
  addTask();
  fetchTasks();
});

//Elimina una nueva tarea
listaTareas.addEventListener("click", function(e){
  if(e.target.classList.contains("edit") || e.target.classList.contains("fa-edit")){
    console.log(e.target.parentElement.parentElement);

  } else if(e.target.classList.contains("delete") || e.target.classList.contains("fa-trash-alt")){
    deleteTask(e);
    fetchTasks();
  }
});

//Functions to manage frontend data.

function fetchTasks(){
  petition({
    url: '../../backend/index.php',
    success : (res) => settingTemplate(res),
    error : (err) => alert(err)
  })
}

function addTask(){
  petition({
    request: 'POST',
    url: '../../backend/index.php',
    success : (res) => settingTemplate(res),
    error : (err) => alert(err),
    data: {
      tarea:{
        nombre : document.querySelector('#txtTarea').value,
        descripcion : document.querySelector('#txt-todo-description').value
      },
      categoria : document.querySelector('#sel-todo-name').value,
      fecha_limite : document.querySelector('#txt-todo-date').value,
      estado : "pendiente"
    }
  })
}

function deleteTask(e){
  const tareaSelecconada = e.target.parentElement.parentElement;
  const id = parseInt(tareaSelecconada.querySelector('.todo-id').innerHTML, 10);

  petition({
    request: 'DELETE',
    url: `../../backend/index.php?id=${id}`,
    success : (res) => settingTemplate(res),
    error : (err) => alert(err)
  })
}

function editTask(e){

}

// readyState:  + ${objetoAjax.readyState}
//             responseText: ${objetoAjax.responseText},
//             responseXML: ${objetoAjax.responseXML},
//             status: ${objetoAjax.status},
//             statusText: ${objetoAjax.statusText}
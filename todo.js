
const toDOForm = document.querySelector(".js-todo");
const toDOInput = toDOForm.querySelector("input");
const toDOList = document.querySelector(".js-todoList");

const ToDos_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDOList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })

    toDos = cleanToDos;
    saveToDo();
}

function saveToDo(){
    localStorage.setItem(ToDos_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li =document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.addEventListener("click", deleteToDo);
    delBtn.innerText = '❌';
    const newId = toDos.length + 1
    const span = document.createElement('span');
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDOList.appendChild(li);

    const toDoObj = {
        text:text,
        id:newId
    };

    toDos.push(toDoObj);
    saveToDo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDOInput.value;
    paintToDo(currentValue);
    toDOInput.value = "";

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(ToDos_LS);

    if(loadedToDos !== null){
        const parsedToDOs = JSON.parse(loadedToDos);
        parsedToDOs.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDOForm.addEventListener("submit", handleSubmit);
}

init();
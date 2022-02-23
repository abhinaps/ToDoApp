const inputEl = document.querySelector(".todo-input")
const inputBtnEl = document.querySelector(".todo-btn")
const listEl = document.querySelector(".todo-list")
const filterOptionEl = document.querySelector(".filter-todo")


document.addEventListener("DOMContentLoaded", getToDos)
inputBtnEl.addEventListener("click", addTodo)
listEl.addEventListener("click", deleteCheck)
filterOptionEl.addEventListener("click", filterTodo)

function addTodo(event){
    event.preventDefault();
    listEl.innerHTML += makeItem(inputEl.value)
    saveToLocal(inputEl.value)
    inputEl.value = ""
} 

function deleteCheck(event){
    event.preventDefault();
    let item = event.target
    if (item.classList[0] === "delete"){
        item.parentElement.classList.add("fall")
        item.parentElement.addEventListener("transitionend", () => item.parentElement.remove())
        deleteToDos(item.parentElement.innerText)  
    }else if (item.classList[0] === "check"){
        item.parentElement.classList.toggle("completed")
    }
}

function filterTodo(e){
    const todos = listEl.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex" 
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
        }
    })
}

function saveToLocal(todo) {
    let todos
    if(JSON.parse(localStorage.getItem("todos")) === null ){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getToDos(e){
    let todos
    if(JSON.parse(localStorage.getItem("todos")) === null ){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(todo => {
        listEl.innerHTML += makeItem(todo)
    })
}

function deleteToDos(todo){
    let todos
    if(JSON.parse(localStorage.getItem("todos")) === null ){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    let todoIndex = todos.indexOf(todo)
    todos.splice(todoIndex, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const makeItem = str => `<div class="todo">
                            <li class="todo-item">${str}</li>
                            <button class="check"><i class="fa-solid fa-square-check"></i></button>
                            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                        </div>` 
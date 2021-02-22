const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    addTodo();
  }
});
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //add the div of a new todo item
  if (todoInput.value !== "") {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //add li inside the todoDiv
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add a completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //add a trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //make input empty
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    item.parentElement.classList.add("fall");
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
        case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}






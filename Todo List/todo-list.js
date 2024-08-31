console.log(JSON.parse(localStorage.getItem("todolist")));

const todoList = JSON.parse(localStorage.getItem("todolist")) || [
  { name: "make dinner", dueDate: "2/12/2024" },
  { name: "play games", dueDate: "12/12/2024" },
];
console.log(todoList);

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    //const name = todoObject.name ;
    //const dueDate = todoObject.dueDate
    const { name, dueDate } = todoObject;
    const html = `
     <div> ${name} </div>
     <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">
        Delete
      </button>
    </div>`;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        saveToStorage();
        renderTodoList();
      });
    });
}

document
  .querySelector(".js-add-todo-button")
  .addEventListener("click", () => addTodo());

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  // console.log(dueDate,name);

  if (name != "" && dueDate) {
    document.querySelector(".error-message").innerHTML = "";
    todoList.push({
      name,
      dueDate,
    });
  }
  // we write it as {name: valuevariable,dueDate: valuevariable } but in our case we have our value variable name same as property variable name .so we write it as {name,duedate}
  else {
    // document.write("enter details");
    if (!name)
      document.querySelector(".error-message").innerHTML =
        "Enter the Task details!";
    else if (!dueDate)
      document.querySelector(".error-message").innerHTML = "Enter the Date!";
    else
      document.querySelector(".error-message").innerHTML = "Enter the Details!";
  }

  saveToStorage();

  inputElement.value = "";

  renderTodoList();
}

function saveToStorage() {
  localStorage.setItem("todolist", JSON.stringify(todoList));
}

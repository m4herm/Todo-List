let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'Make dinner',
  dueDate:'2022-12-22'
}, {
  name: 'Wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();
function renderTodoList() { // better to be regular function 1/ easier to read. 2/ enables hoisting.
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class=" delete-todo-button deletetodo-button-js">
    Delete</button>
    `;
    todoListHTML += html;
    });

    document.querySelector('.js-todo-list')
      .innerHTML = todoListHTML; 

    document.querySelectorAll('.deletetodo-button-js')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          todoList.splice(index, 1);
          localStorage.removeItem('todoList');
          renderTodoList();
        });
      });  
  };

document.querySelector('.addtodo-button-js')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));

  inputElement.value = '';

  renderTodoList();
}
function handleKeyDown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

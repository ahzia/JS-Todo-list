import '../css/style.css';

let todos = [{
  index: 2,
  description: 'todo 4',
  completed: true,
},
{
  index: 0,
  description: ' todo 1',
  completed: false,
},
{
  index: 1,
  description: ' todo 3',
  completed: true,
},
];
function sortList() {
  todos.sort((todoA, todoB) => {
    if (todoA.index < todoB.index) {
      return -1;
    }
    if (todoA.index > todoB.index) {
      return 1;
    }
    return 0;
  });
}
function updateStatus(index) {
  todos[index].completed = !(todos[index].completed);
  updateLocalStorage(true);
}
function addCheckboxChangeEventListeners() {
  const checkboxes = document.querySelectorAll('input[type=checkbox][name=todoCheck]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const index = (event.target.id).replace('ch', '');
      updateStatus(index);
    });
  });
}
function displayList() {
  const section = document.getElementById('todos');
  const list = document.createElement('ul');
  list.id = 'list';
  todos.forEach((todo) => {
    const { description, completed, index } = todo;
    const liId = `li${index}`;
    const checkboxId = `ch${index}`;
    let todoCard = `<li id=${liId} class= "todo" >`;
    if (completed) {
      todoCard += `<input type="checkbox" name="todoCheck" checked id="${checkboxId}">`;
    } else {
      todoCard += `<input type="checkbox" name="todoCheck" id="${checkboxId}">`;
    }
    todoCard += `<p>${description}</p>
    </li>
    <hr>`;
    list.insertAdjacentHTML('beforeend', todoCard);
  });
  section.innerHTML = '';
  section.appendChild(list);
  addCheckboxChangeEventListeners();
}
function updateLocalStorage(update, sort) {
  const listFromStorage = window.localStorage.getItem('todos');
  if (update) {
    // update local storage
    if (sort) {
      sortList();
    }
    window.localStorage.setItem('todos', JSON.stringify(todos));
  } else if (listFromStorage != null) {
    // get data from local storage
    todos = JSON.parse(window.localStorage.getItem('todos'));
  } else {
    // inialize local storage
    sortList();
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }
  displayList();
}

updateLocalStorage();

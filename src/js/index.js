import '../css/style.css';
import list from './list.js';
import getDragAfterElement from './drag.js';

const newList = new list();

// This first function ensures that the document has being already created
document.addEventListener('DOMContentLoaded', () => {
  const draggables = document.querySelectorAll('.draggable');
  const container = document.getElementById('list');
  const addButton = document.getElementById('add');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      // end of list
      container.appendChild(draggable);
    } else {
      // insert before (after element)
      container.insertBefore(draggable, afterElement);
    }
  });
  container.addEventListener('drop', (event) => {
    event.preventDefault();
    newList.arrangeTodos();
    newList.updateLocalStorage(true, true, false);
    // reload the page to refresh the event EventListener
    document.location.reload();
  }, false);
  addButton.addEventListener('click', () => {
    const text = document.getElementById('todoInput').value;
    if (text !== '') {
      newList.addNew(text);
    }
  });
});
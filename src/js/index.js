import '../css/style.css';
import List from './list.js';
import getDragAfterElement from './drag.js';

const NewList = new List();
const eventListener = () => {
  document.querySelector('ul').onclick = (event) => {
    const { target } = event;
    const { id } = target;
    if (id.includes('idel')) {
      const divId = (id).replace('idel', '');
      NewList.remove(divId);
      eventListener();
    } else if (id.includes('del')) {
      const divId = (id).replace('del', '');
      NewList.remove(divId);
      eventListener();
    } else if (id.includes('ch')) {
      const index = id.replace('ch', '');
      NewList.updateStatus(index);
    } else if (id.includes('in')) {
      const input = document.getElementById(id);
      const index = id.replace('in', '');
      const liId = `li${index}`;
      const inputContainer = document.getElementById(liId);
      const moveDivId = `mv${index}`;
      const moveDiv = document.getElementById(moveDivId);
      const deleteDivId = `del${index}`;
      const deleteDiv = document.getElementById(deleteDivId);
      const liFocus = document.querySelector('.liFocus');
      const hidden = document.querySelector('.hidetemp');
      const visible = document.querySelector('.visible');
      const inFocus = document.querySelector('.inFocus');
      if (visible) {
        visible.classList.remove('visible');
      }
      if (hidden) {
        hidden.classList.remove('hidetemp');
      }
      if (liFocus) {
        liFocus.classList.remove('liFocus');
      }
      if (inFocus) {
        inFocus.classList.remove('inFocus');
      }
      inputContainer.classList.add('liFocus');
      moveDiv.classList.add('hidetemp');
      deleteDiv.classList.add('visible');
      input.classList.add('inFocus');
      input.addEventListener('change', (e) => {
        const { value } = e.target;
        NewList.update(index, value);
      });
    }
  };
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });
  const container = document.getElementById('list');
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
    NewList.arrangeTodos();
    NewList.updateLocalStorage(true, true);
    // reload the page to refresh the event EventListener
    eventListener();
  }, false);
};
// This first function ensures that the document has being already created
document.addEventListener('DOMContentLoaded', () => {
  eventListener();
  const addButton = document.getElementById('add');
  addButton.addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const text = input.value;
    if (text !== '') {
      NewList.addNew(text);
      input.value = '';
      eventListener();
    }
  });
  const clearAllButton = document.getElementById('clearAll');
  clearAllButton.addEventListener('click', () => {
    NewList.clearAll();
    eventListener();
  });
});

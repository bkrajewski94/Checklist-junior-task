import { handleDragStart, handleDragOver, handleDrop } from './dragAndDrop.js';
import { removeGoal, itemChecked, addListItem } from './userInteractions.js';

const addButton = document.getElementById('add');
const inputField = document.getElementById('input');
const ENTER_KEY = 13;

//handles user interactions by creating event listeners
export const createEventListeners = () => {
  document.addEventListener(
    'click',
    function(event) {
      if (event.target.matches('.trashbin')) {
        //delete element
        let grabListId = parseInt(event.target.parentElement.parentElement.id);
        removeGoal(grabListId);
      } else if (event.target.matches('.checkMe')) {
        // done/undone
        let grabListId = parseInt(event.target.parentElement.parentElement.id);
        itemChecked(grabListId);
      } else if (event.target.matches('#add')) {
        //add a new element
        inputField.value ? addListItem(inputField.value) : '';
        inputField.value = '';
      }
    },
    false
  );

  //start dragging
  document.addEventListener(
    'dragstart',
    function(event) {
      if (event.target.matches('li')) {
        handleDragStart(event);
      }
    },
    false
  );

  //select dropping spot
  document.addEventListener(
    'dragover',
    function(event) {
      if (event.target.matches('.fancy-checkbox')) {
        handleDragOver(event);
      }
    },
    false
  );

  //drop dragged element
  document.addEventListener(
    'drop',
    function(event) {
      if (event.target.matches('.fancy-checkbox')) {
        handleDrop(event);
      }
    },
    false
  );

  //press enter instead of add-button
  inputField.addEventListener('keyup', e => {
    e.keyCode === ENTER_KEY ? addButton.click() : '';
  });
};

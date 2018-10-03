import 'reset.css';
import './style.scss';

window.ToDoList = [];

import { createEventListeners } from './eventListeners.js';
import { fetchFromServer } from './ApiHandlers.js';
// import { render } from './renderOnPage.js';
// import { handleDragStart, handleDragOver, handleDrop } from './dragAndDrop.js';

///////////////////////////////////////////Global variables/////////////////////////////////////////////////

// const addButton = document.getElementById('add');
// const inputField = document.getElementById('input');
// let list = document.getElementById('list'); //<ul>
// const ENTER_KEY = 13;
// let dragSrcEl = null;

///////////////////Rendering function (the only function able to manipulate the DOM)////////////////////////

// function render(ToDoList) {
//   list.innerHTML = '';
//   ToDoList.forEach(item => {
//     list.innerHTML += `
//     <li id="${item.ID}" draggable="true">
//       <div class="fancy-checkbox">
//         <div class="${
//           item.Finished != 0 ? 'checkMe checked' : 'checkMe'
//         }"></div>
//         <span class="${
//           item.Finished != 0 ? 'goal undone done' : 'goal undone'
//         }">${item.Content}</span>
//         <button class="${
//           item.Finished != 0 ? 'trashbin trashbinChecked' : 'trashbin'
//         }"></button>
//       </div>
//     </li>
//     `;
//   });
// }

/////////////Other functions manipulating local object (DOM representation)////////////////////////////////////

// //handles delete button
// const removeGoal = listElementId => {
//   const index = ToDoList.findIndex(x => x.id === listElementId);

//   if (index > -1) {
//     ToDoList.splice(index, 1);
//   }

//   deleteData(listElementId, 'https://qunabu.com/api/todo/');
// };

// //handles done/undone button
// const itemChecked = listElementId => {
//   const index = ToDoList.findIndex(x => x.ID === listElementId);
//   ToDoList[index].Finished == 0
//     ? (ToDoList[index].Finished = 1)
//     : (ToDoList[index].Finished = 0);
//   patchOnServer(listElementId, ToDoList[index]);
// };

// //handles add button
// const addListItem = text => {
//   let specifySort;
//   ToDoList.length > 0
//     ? (specifySort = parseInt(ToDoList[ToDoList.length - 1].Sort) + 1)
//     : (specifySort = 0);
//   typeof text === 'number' ? text.toString() : '';
//   let objectHolder = { Content: text, Finished: 0, Sort: specifySort };
//   renderOnServer(objectHolder);
// };

// //handles swaping array elements
// function relocate_element(arr, new_index, old_index) {
//   if (new_index >= arr.length) {
//     var k = new_index - arr.length + 1;
//     while (k--) {
//       arr.push(undefined);
//     }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//   return arr;
// }

// //selects array elements for swapping
// const changeElementsOrder = (newId, oldId) => {
//   const newIndex = ToDoList.findIndex(x => x.ID === newId);
//   const oldIndex = ToDoList.findIndex(x => x.ID === oldId);
//   const draggedGoals = relocate_element(ToDoList, newIndex, oldIndex);

//   ToDoList = [];
//   ToDoList = JSON.parse(JSON.stringify(draggedGoals));

//   render(ToDoList);
// };

// //handles start of dragging process
// function handleDragStart(e) {
//   dragSrcEl = e.target;
//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', e.target.id);
// }

// //handles "place to drop" selection
// function handleDragOver(e) {
//   if (e.preventDefault) {
//     e.preventDefault();
//   }
//   e.dataTransfer.dropEffect = 'move';
// }

// //handles dropping (end of dragging process)
// function handleDrop(e) {
//   let newId = parseInt(e.target.parentElement.id);
//   let oldId = parseInt(e.dataTransfer.getData('text/html'));
//   newId != oldId ? (changeElementsOrder(newId, oldId), setSortParameter()) : '';
// }

// //handles user interactions by creating event listeners
// const createEventListeners = () => {
//   document.addEventListener(
//     'click',
//     function(event) {
//       if (event.target.matches('.trashbin')) {
//         //delete element
//         let grabListId = parseInt(event.target.parentElement.parentElement.id);
//         removeGoal(grabListId);
//       } else if (event.target.matches('.checkMe')) {
//         // done/undone
//         let grabListId = parseInt(event.target.parentElement.parentElement.id);
//         itemChecked(grabListId);
//       } else if (event.target.matches('#add')) {
//         //add a new element
//         inputField.value ? addListItem(inputField.value) : '';
//         inputField.value = '';
//       }
//     },
//     false
//   );

//   //start dragging
//   document.addEventListener(
//     'dragstart',
//     function(event) {
//       if (event.target.matches('li')) {
//         handleDragStart(event);
//       }
//     },
//     false
//   );

//   //select dropping spot
//   document.addEventListener(
//     'dragover',
//     function(event) {
//       if (event.target.matches('.fancy-checkbox')) {
//         handleDragOver(event);
//       }
//     },
//     false
//   );

//   //drop dragged element
//   document.addEventListener(
//     'drop',
//     function(event) {
//       if (event.target.matches('.fancy-checkbox')) {
//         handleDrop(event);
//       }
//     },
//     false
//   );

//   //press enter instead of add-button
//   inputField.addEventListener('keyup', e => {
//     e.keyCode === ENTER_KEY ? addButton.click() : '';
//   });
// };

// const renderOnServer = elementToRender => {
//   fetch('https://qunabu.com/api/todos', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(elementToRender)
//   }).then(() => fetchFromServer());
// };

// const fetchFromServer = () => {
//   fetch('https://qunabu.com/api/todos')
//     .then(r => r.json())
//     .then(data => (ToDoList = data.todos))
//     .then(() => render(ToDoList));
// };

// const patchOnServer = (id, toDoItem) => {
//   fetch('https://qunabu.com/api/todo/' + id, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(toDoItem)
//   }).then(() => fetchFromServer());
// };

// function deleteData(id, url) {
//   return fetch(url + '/' + id, {
//     method: 'DELETE'
//   })
//     .then(response => response.json())
//     .then(() => fetchFromServer());
// }

// const setSortParameter = () => {
//   for (let i = 0; i < ToDoList.length; i++) {
//     ToDoList[i].Sort = i;
//   }
//   updateSortOnServer(ToDoList);
// };

// const updateSortOnServer = arr => {
//   console.log(arr);
//   arr.forEach(record => {
//     fetch('https://qunabu.com/api/todo/' + record.ID, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(record)
//     }).then(() => console.log('Uploading of ' + record.Content + ' done.'));
//   });
// };

/////////////////////////////End of functions////////////////////////////////////////////////////////////

createEventListeners();
fetchFromServer();
setInterval(fetchFromServer, 900000); //refresh every 15 minutes

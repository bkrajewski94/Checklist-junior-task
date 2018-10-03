import { render } from './renderOnPage.js';

//renders function on server
export const renderOnServer = elementToRender => {
  fetch('https://qunabu.com/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(elementToRender)
  }).then(() => fetchFromServer());
};

//fetches data from server
export const fetchFromServer = () => {
  fetch('https://qunabu.com/api/todos')
    .then(r => r.json())
    .then(data => (ToDoList = data.todos))
    .then(() => render(ToDoList));
};

//patching data on server
export const patchOnServer = (id, toDoItem) => {
  fetch('https://qunabu.com/api/todo/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toDoItem)
  }).then(() => fetchFromServer());
};

//deletes data
export const deleteData = (id, url) => {
  return fetch(url + '/' + id, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => fetchFromServer());
};

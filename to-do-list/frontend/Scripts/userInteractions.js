import { deleteData, patchOnServer, renderOnServer } from './ApiHandlers.js';

//handles delete button
export const removeGoal = listElementId => {
  const index = ToDoList.findIndex(x => x.id === listElementId);

  if (index > -1) {
    ToDoList.splice(index, 1);
  }

  deleteData(listElementId, 'https://qunabu.com/api/todo/');
};

//handles done/undone button
export const itemChecked = listElementId => {
  const index = ToDoList.findIndex(x => x.ID === listElementId);
  ToDoList[index].Finished == 0
    ? (ToDoList[index].Finished = 1)
    : (ToDoList[index].Finished = 0);
  patchOnServer(listElementId, ToDoList[index]);
};

//handles add button
export const addListItem = text => {
  let specifySort;
  ToDoList.length > 0
    ? (specifySort = parseInt(ToDoList[ToDoList.length - 1].Sort) + 1)
    : (specifySort = 0);
  typeof text === 'number' ? text.toString() : '';
  let objectHolder = { Content: text, Finished: 0, Sort: specifySort };
  renderOnServer(objectHolder);
};

import { render } from './renderOnPage.js';

let dragSrcEl = null;

//handles swaping array elements
export const relocate_element = (arr, new_index, old_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

//selects array elements for swapping
export const changeElementsOrder = (newId, oldId) => {
  const newIndex = ToDoList.findIndex(x => x.ID === newId);
  const oldIndex = ToDoList.findIndex(x => x.ID === oldId);
  const draggedGoals = relocate_element(ToDoList, newIndex, oldIndex);

  ToDoList = [];
  ToDoList = JSON.parse(JSON.stringify(draggedGoals));

  render(ToDoList);
};

//handles start of dragging process
export function handleDragStart(e) {
  dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.id);
}

//handles "place to drop" selection
export function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
}

//handles dropping (end of dragging process)
export function handleDrop(e) {
  let newId = parseInt(e.target.parentElement.id);
  let oldId = parseInt(e.dataTransfer.getData('text/html'));
  newId != oldId ? (changeElementsOrder(newId, oldId), setSortParameter()) : '';
}

const setSortParameter = () => {
  for (let i = 0; i < ToDoList.length; i++) {
    ToDoList[i].Sort = i;
  }
  updateSortOnServer(ToDoList);
};

const updateSortOnServer = arr => {
  arr.forEach(record => {
    fetch('https://qunabu.com/api/todo/' + record.ID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    }).then(() => console.log('Uploading of ' + record.Content + ' done.'));
  });
};

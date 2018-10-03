let list = document.getElementById('list'); //<ul>

//Redners data on page
export const render = ToDoList => {
  list.innerHTML = '';
  ToDoList.forEach(item => {
    list.innerHTML += `
      <li id="${item.ID}" draggable="true">
        <div class="fancy-checkbox">
          <div class="${
            item.Finished != 0 ? 'checkMe checked' : 'checkMe'
          }"></div>
          <span class="${
            item.Finished != 0 ? 'goal undone done' : 'goal undone'
          }">${item.Content}</span>  
          <button class="${
            item.Finished != 0 ? 'trashbin trashbinChecked' : 'trashbin'
          }"></button>
        </div>
      </li>
      `;
  });
};

import 'reset.css';
import './style.scss';

window.ToDoList = [];

import { createEventListeners } from '/Scripts/eventListeners.js';
import { fetchFromServer } from '/Scripts/ApiHandlers.js';

createEventListeners();
fetchFromServer();
setInterval(fetchFromServer, 900000); //refresh every 15 minutes

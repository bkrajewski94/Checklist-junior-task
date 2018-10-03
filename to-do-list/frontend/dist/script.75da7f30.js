// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/reset.css/reset.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./assets\\checkbox_empty.png":[["checkbox_empty.879a13f3.png","assets/checkbox_empty.png"],"assets/checkbox_empty.png"],"./assets\\checkbox_checked.png":[["checkbox_checked.a4226df0.png","assets/checkbox_checked.png"],"assets/checkbox_checked.png"],"./assets\\trashbin_unchecked.png":[["trashbin_unchecked.49983eee.png","assets/trashbin_unchecked.png"],"assets/trashbin_unchecked.png"],"./assets\\trashbin_checked.png":[["trashbin_checked.9b653d9e.png","assets/trashbin_checked.png"],"assets/trashbin_checked.png"],"./assets\\add.png":[["add.86b35522.png","assets/add.png"],"assets/add.png"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"Scripts/renderOnPage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;
var list = document.getElementById('list'); //<ul>
//Redners data on page

var render = function render(ToDoList) {
  list.innerHTML = '';
  ToDoList.forEach(function (item) {
    list.innerHTML += "\n      <li id=\"".concat(item.ID, "\" draggable=\"true\">\n        <div class=\"fancy-checkbox\">\n          <div class=\"").concat(item.Finished != 0 ? 'checkMe checked' : 'checkMe', "\"></div>\n          <span class=\"").concat(item.Finished != 0 ? 'goal undone done' : 'goal undone', "\">").concat(item.Content, "</span>  \n          <button class=\"").concat(item.Finished != 0 ? 'trashbin trashbinChecked' : 'trashbin', "\"></button>\n        </div>\n      </li>\n      ");
  });
};

exports.render = render;
},{}],"Scripts/dragAndDrop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDragStart = handleDragStart;
exports.handleDragOver = handleDragOver;
exports.handleDrop = handleDrop;
exports.changeElementsOrder = exports.relocate_element = void 0;

var _renderOnPage = require("./renderOnPage.js");

var dragSrcEl = null; //handles swaping array elements

var relocate_element = function relocate_element(arr, new_index, old_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;

    while (k--) {
      arr.push(undefined);
    }
  }

  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}; //selects array elements for swapping


exports.relocate_element = relocate_element;

var changeElementsOrder = function changeElementsOrder(newId, oldId) {
  var newIndex = ToDoList.findIndex(function (x) {
    return x.ID === newId;
  });
  var oldIndex = ToDoList.findIndex(function (x) {
    return x.ID === oldId;
  });
  var draggedGoals = relocate_element(ToDoList, newIndex, oldIndex);
  ToDoList = [];
  ToDoList = JSON.parse(JSON.stringify(draggedGoals));
  (0, _renderOnPage.render)(ToDoList);
}; //handles start of dragging process


exports.changeElementsOrder = changeElementsOrder;

function handleDragStart(e) {
  dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.id);
} //handles "place to drop" selection


function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
} //handles dropping (end of dragging process)


function handleDrop(e) {
  var newId = parseInt(e.target.parentElement.id);
  var oldId = parseInt(e.dataTransfer.getData('text/html'));
  newId != oldId ? (changeElementsOrder(newId, oldId), setSortParameter()) : '';
}

var setSortParameter = function setSortParameter() {
  for (var i = 0; i < ToDoList.length; i++) {
    ToDoList[i].Sort = i;
  }

  updateSortOnServer(ToDoList);
};

var updateSortOnServer = function updateSortOnServer(arr) {
  arr.forEach(function (record) {
    fetch('https://qunabu.com/api/todo/' + record.ID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    }).then(function () {
      return console.log('Uploading of ' + record.Content + ' done.');
    });
  });
};
},{"./renderOnPage.js":"Scripts/renderOnPage.js"}],"Scripts/ApiHandlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteData = exports.patchOnServer = exports.fetchFromServer = exports.renderOnServer = void 0;

var _renderOnPage = require("./renderOnPage.js");

//renders function on server
var renderOnServer = function renderOnServer(elementToRender) {
  fetch('https://qunabu.com/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(elementToRender)
  }).then(function () {
    return fetchFromServer();
  });
}; //fetches data from server


exports.renderOnServer = renderOnServer;

var fetchFromServer = function fetchFromServer() {
  fetch('https://qunabu.com/api/todos').then(function (r) {
    return r.json();
  }).then(function (data) {
    return ToDoList = data.todos;
  }).then(function () {
    return (0, _renderOnPage.render)(ToDoList);
  });
}; //patching data on server


exports.fetchFromServer = fetchFromServer;

var patchOnServer = function patchOnServer(id, toDoItem) {
  fetch('https://qunabu.com/api/todo/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toDoItem)
  }).then(function () {
    return fetchFromServer();
  });
}; //deletes data


exports.patchOnServer = patchOnServer;

var deleteData = function deleteData(id, url) {
  return fetch(url + '/' + id, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function () {
    return fetchFromServer();
  });
};

exports.deleteData = deleteData;
},{"./renderOnPage.js":"Scripts/renderOnPage.js"}],"Scripts/userInteractions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListItem = exports.itemChecked = exports.removeGoal = void 0;

var _ApiHandlers = require("./ApiHandlers.js");

//handles delete button
var removeGoal = function removeGoal(listElementId) {
  var index = ToDoList.findIndex(function (x) {
    return x.id === listElementId;
  });

  if (index > -1) {
    ToDoList.splice(index, 1);
  }

  (0, _ApiHandlers.deleteData)(listElementId, 'https://qunabu.com/api/todo/');
}; //handles done/undone button


exports.removeGoal = removeGoal;

var itemChecked = function itemChecked(listElementId) {
  var index = ToDoList.findIndex(function (x) {
    return x.ID === listElementId;
  });
  ToDoList[index].Finished == 0 ? ToDoList[index].Finished = 1 : ToDoList[index].Finished = 0;
  (0, _ApiHandlers.patchOnServer)(listElementId, ToDoList[index]);
}; //handles add button


exports.itemChecked = itemChecked;

var addListItem = function addListItem(text) {
  var specifySort;
  ToDoList.length > 0 ? specifySort = parseInt(ToDoList[ToDoList.length - 1].Sort) + 1 : specifySort = 0;
  typeof text === 'number' ? text.toString() : '';
  var objectHolder = {
    Content: text,
    Finished: 0,
    Sort: specifySort
  };
  (0, _ApiHandlers.renderOnServer)(objectHolder);
};

exports.addListItem = addListItem;
},{"./ApiHandlers.js":"Scripts/ApiHandlers.js"}],"Scripts/eventListeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEventListeners = void 0;

var _dragAndDrop = require("./dragAndDrop.js");

var _userInteractions = require("./userInteractions.js");

var addButton = document.getElementById('add');
var inputField = document.getElementById('input');
var ENTER_KEY = 13; //handles user interactions by creating event listeners

var createEventListeners = function createEventListeners() {
  document.addEventListener('click', function (event) {
    if (event.target.matches('.trashbin')) {
      //delete element
      var grabListId = parseInt(event.target.parentElement.parentElement.id);
      (0, _userInteractions.removeGoal)(grabListId);
    } else if (event.target.matches('.checkMe')) {
      // done/undone
      var _grabListId = parseInt(event.target.parentElement.parentElement.id);

      (0, _userInteractions.itemChecked)(_grabListId);
    } else if (event.target.matches('#add')) {
      //add a new element
      inputField.value ? (0, _userInteractions.addListItem)(inputField.value) : '';
      inputField.value = '';
    }
  }, false); //start dragging

  document.addEventListener('dragstart', function (event) {
    if (event.target.matches('li')) {
      (0, _dragAndDrop.handleDragStart)(event);
    }
  }, false); //select dropping spot

  document.addEventListener('dragover', function (event) {
    if (event.target.matches('.fancy-checkbox')) {
      (0, _dragAndDrop.handleDragOver)(event);
    }
  }, false); //drop dragged element

  document.addEventListener('drop', function (event) {
    if (event.target.matches('.fancy-checkbox')) {
      (0, _dragAndDrop.handleDrop)(event);
    }
  }, false); //press enter instead of add-button

  inputField.addEventListener('keyup', function (e) {
    e.keyCode === ENTER_KEY ? addButton.click() : '';
  });
};

exports.createEventListeners = createEventListeners;
},{"./dragAndDrop.js":"Scripts/dragAndDrop.js","./userInteractions.js":"Scripts/userInteractions.js"}],"script.js":[function(require,module,exports) {
"use strict";

require("reset.css");

require("./style.scss");

var _eventListeners = require("/Scripts/eventListeners.js");

var _ApiHandlers = require("/Scripts/ApiHandlers.js");

window.ToDoList = [];
(0, _eventListeners.createEventListeners)();
(0, _ApiHandlers.fetchFromServer)();
setInterval(_ApiHandlers.fetchFromServer, 900000); //refresh every 15 minutes
},{"reset.css":"node_modules/reset.css/reset.css","./style.scss":"style.scss","/Scripts/eventListeners.js":"Scripts/eventListeners.js","/Scripts/ApiHandlers.js":"Scripts/ApiHandlers.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49461" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.map
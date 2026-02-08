"use strict";
var TodoItem = /** @class */ (function () {
    function TodoItem(_description, identifier) {
        this._description = _description;
        this._creationTimestamp = new Date().getTime();
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for the example; for any real project, use 
            // UUIDs instead: https://www.npmjs.com/package/uuid 
            this._identifier = Math.random().toString(36).substr(2, 9);
        }
    }
    Object.defineProperty(TodoItem.prototype, "creationTimestamp", {
        get: function () {
            return this._creationTimestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "identifier", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    return TodoItem;
}());
var TodoList = /** @class */ (function () {
    function TodoList(todoList) {
        this._todoList = [];
        // first we make sure that we have received a valid array 
        // reference: https://developer.mozilla.org/en-
        // US/docs/Web/JavaScript/Reference/Global_Objects
        // /Array/isArray 
        if (Array.isArray(todoList) && todoList.length) {
            this._todoList = this._todoList.concat(todoList);
        }
    }
    Object.defineProperty(TodoList.prototype, "todoList", {
        get: function () {
            return this._todoList;
        },
        enumerable: true,
        configurable: true
    });
    TodoList.prototype.addTodo = function (todoItem) {
        if (todoItem) {
            // the value is "truthy": 
            // not null, not undefined, not NaN, not an empty string, 
            // not 0, not false 
            this._todoList = this._todoList.concat(todoItem);
        }
    };
    TodoList.prototype.removeTodo = function (itemId) {
        if (itemId) {
            this._todoList = this._todoList.filter(function (item) {
                if (item.identifier === itemId) {
                    return false; // drop 
                }
                else {
                    return true; // keep 
                }
            });
        }
    };
    return TodoList;
}());
var HTMLTodoListView = /** @class */ (function () {
    function HTMLTodoListView() {
        this.todoInput = document.getElementById('todoInput');
        this.todoListDiv = document.getElementById('todoListContainer');
        this.todoListFilter = document.getElementById('todoFilter');
        // defensive checks
        if (!this.todoInput) {
            throw new Error("Could not find the todoInput HTML input element. Is the HTML correct?");
        }
        if (!this.todoListDiv) {
            throw new Error("Could not find the todoListContainer HTML div. Is the HTML correct?");
        }
        if (!this.todoListFilter) {
            throw new Error("Could not find the todoFilter HTML input element. Is the HTML correct?");
        }
    }
    HTMLTodoListView.prototype.clearInput = function () {
        this.todoInput.value = '';
    };
    HTMLTodoListView.prototype.getFilter = function () {
        return this.todoListFilter.value.toUpperCase();
    };
    HTMLTodoListView.prototype.getInput = function () {
        var todoInputValue = this.todoInput.value.trim();
        var retVal = new TodoItem(todoInputValue);
        return retVal;
    };
    HTMLTodoListView.prototype.render = function (todoList) {
        console.log("Updating the rendered todo list");
        this.todoListDiv.innerHTML = '';
        this.todoListDiv.textContent = ''; // Edge, ...
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'todoList');
        this.todoListDiv.appendChild(ul);
        todoList.forEach(function (item) {
            var li = document.createElement('li');
            li.setAttribute('class', 'todo-list-item');
            li.innerHTML = "<a href='#' onclick='todoIt.removeTodo(\"" + item.identifier + "\")'>" + item.description + "</a>";
            ul.appendChild(li);
        });
    };
    HTMLTodoListView.prototype.filter = function () {
        console.log("Filtering the rendered todo list");
        var todoListHtml = document.getElementById('todoList');
        if (todoListHtml == null) {
            console.log("Nothing to filter");
            return;
        }
        var todoListFilterText = this.getFilter();
        todoListHtml.childNodes.forEach(function (item) {
            var itemText = item.textContent;
            if (itemText !== null) {
                itemText = itemText.toUpperCase();
                if (itemText.startsWith(todoListFilterText)) {
                    item.style.display = "list-item";
                }
                else {
                    item.style.display = "none";
                }
            }
        });
    };
    return HTMLTodoListView;
}());

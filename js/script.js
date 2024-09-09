// grab all elements 
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// Local Storage class
class Storage {
    static addToStorage(todoArr){
        localStorage.setItem("todo", JSON.stringify(todoArr));
    }

    static getStorage(){
        return localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
    }
}

// Empty array for todos
let todoArr = Storage.getStorage();

// Form event listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
        alert("Todo cannot be empty");
        return;
    }

    let id = Date.now(); // Use Date.now() for unique ID
    const todo = new Todo(id, input.value.trim());
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    Storage.addToStorage(todoArr); // Add to storage
});

// Todo class
class Todo {
    constructor(id, todo) {
        this.id = id;
        this.todo = todo;
    }
}

// Display todos in the DOM
class UI {
    static displayData() {
        const displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                    <p>${item.todo}</p>
                    <span class="remove" data-id=${item.id}>🗑️</span>
                </div>
            `;
        });
        lists.innerHTML = displayData.join(" ");
    }

    static clearInput() {
        input.value = "";
    }

    static removeTodo() {
        lists.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove")) {
                UI.removeArrayTodo(e.target.dataset.id);
                e.target.parentElement.remove();
            }
        });
    }

    static removeArrayTodo(id) {
        todoArr = todoArr.filter((item) => item.id !== Number(id));
        Storage.addToStorage(todoArr);
    }
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
});

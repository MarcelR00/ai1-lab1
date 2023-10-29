//Klasa todo
class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
    
    addTask(title, dueDate) {
        if (title.length < 3 || title.length > 255) {
            alert("Co najmniej 3 znaki, nie więcej niż 255 znaków.");
            return;
        }
        if (dueDate && new Date(dueDate) < new Date()) {
            alert("Data musi być pusta lub w przyszłości.");
            return;
        }
        this.tasks.push({ title, dueDate });
        this.saveTasks();
        this.draw();
    }

    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            this.saveTasks();
            this.draw();
        }
    }

    editTask(index, newTitle) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].title = newTitle;
            this.saveTasks();
            this.draw();
        }
    }

    draw() {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";
        const searchTerm = document.getElementById("search").value.trim().toLowerCase(); //wyszukiwanie
    
        this.tasks.forEach((task, index) => {
            if (task.title) {
                const title = task.title.toLowerCase();
    
                if (title.includes(searchTerm)) {
                    const listItem = document.createElement("li");
                    listItem.className = "task-item";
                    const highlightedTitle = this.highlightSearchTerm(task.title, searchTerm);
                    listItem.innerHTML = `
                        <span contentEditable="true">${highlightedTitle}</span>
                        <div class="date-container">
                            <input type="date" value="${task.dueDate || ''}">
                        </div>
                        <button data-index="${index}" class="edit-button">Edytuj</button>
                        <button data-index="${index}" class="delete-button">Usuń</button>
                        `;

                    listItem.querySelector("span").addEventListener("blur", () => {
                    task.title = listItem.querySelector("span").textContent;
                    this.saveTasks();
                    });
    
                    taskList.appendChild(listItem);
    
                    //Edycja zadania
                    listItem.querySelector(".edit-button").addEventListener("click", () => {
                        const currentIndex = listItem.querySelector(".edit-button").getAttribute("data-index");
                        this.editTask(currentIndex, prompt("Edytuj tytuł zadania:", this.tasks[currentIndex].title));
                    });
    
                    //Usuwanie zadania
                    listItem.querySelector(".delete-button").addEventListener("click", () => {
                        const currentIndex = listItem.querySelector(".delete-button").getAttribute("data-index");
                        this.deleteTask(currentIndex);
                    });
                }
            }
        });
    }

    highlightSearchTerm(text, term) {
        const regex = new RegExp(term, 'gi');
        return text.replace(regex, match => `<mark>${match}</mark>`);
    }
    

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

const todo = new Todo();

//Dodawanie zadania
const addTaskButton = document.getElementById("add-task");
const newTaskInput = document.getElementById("new-task");
const dueDateInput = document.getElementById("due-date");
addTaskButton.addEventListener("click", () => {
    const newTask = newTaskInput.value.trim();
    const dueDate = dueDateInput.value;
    todo.addTask(newTask, dueDate);
    newTaskInput.value = "";
    dueDateInput.value = "";
});

//Wyszukiwarka
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    //Sprawdź, czy wprowadzona fraza ma co najmniej 2 znaki
    if (searchTerm.length >= 2 || searchTerm.length === 0) {
        todo.draw();
    }
});

todo.draw();
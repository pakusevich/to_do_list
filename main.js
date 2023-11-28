let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let showAllButton = document.querySelector("#tasks-all");
let showNotCompletedButton = document.querySelector("#tasks-not-complete");
let taskList = document.querySelector(".task-list");

let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);
showAllButton.addEventListener("click", showAllHandler);
showNotCompletedButton.addEventListener("click", showNotCompletedHandler);

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code == "Enter") addTaskHandler();
})

function addTaskHandler() {
    if (taskNameInput.value) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task(taskNameInput.value);
        newTask.createIn(taskList);
        tasks.push(newTask);

        taskNameInput.value = "";
    } else {
        alert("Please fill in the field with a task name");
    }
}


class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.div = null;
        this.ifDeleted = false;
    }

    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        let input = document.createElement("input");
        input.addEventListener("click", () => this.changeState(this.div));
        input.type = "checkbox";

        let p = document.createElement("p");
        p.innerText = this.text;

        let editButton = document.createElement("button");
        editButton.dataset.id = "button-edit";
        editButton.innerText = "Edit Task";
        editButton.addEventListener("click", () => this.editTask(p));

        let deleteButton = document.createElement("button");
        deleteButton.dataset.id = "button-delete";
        deleteButton.innerText = "Delete Task";
        deleteButton.addEventListener("click", () => this.deleteTask());

        this.div.append(input);
        this.div.append(p);
        this.div.append(editButton);
        this.div.append(deleteButton);

        if (this.isDone) {
            this.div.classList.add("completed");
            input.checked = true;
        }
        if (!this.ifDeleted) {
            element.append(this.div);
        }
    }

    changeState(element) {
        this.isDone = !this.isDone;
        element.classList.toggle("completed");
    }

    deleteTask() {
        this.div.remove();
        this.ifDeleted = true;
    }

    editTask(element) {
        element.innerText = "";
        let editedText = document.createElement("input");
        alert("Please press 'Enter' once you update the input field");
        editedText.setAttribute("type", "text");
        element.append(editedText);
        editedText.addEventListener("keydown", function (e) {
            if (e.code == "Enter") {
                element.innerText = editedText.value;
            }
        });
    }
}

function showAllHandler() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        task.createIn(taskList);
    });
}
function showNotCompletedHandler() {
    taskList.innerHTML = "";
    tasks
        .filter(task => task.isDone == false)
        .forEach(task => {
            task.createIn(taskList);
        });
}
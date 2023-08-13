let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");


window.onload = function () {
    theInput.focus();
};

//add
theAddButton.onclick = function () {
    if (theInput.value === '') {
        swal({
            title: "Error!",
            text: "Enter Task name",
            type: "error",
            confirmButtonText: "OK"
        });
    }
    else {
        let noTasksMsg = document.querySelector(".no-tasks-message");
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            noTasksMsg.remove();
        }

        let mainSpan = document.createElement("span");
        let text = document.createTextNode(theInput.value);
        mainSpan.appendChild(text);
        mainSpan.className = "task-box";

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash fa-2xl'>delete</i>";
        deleteBtn.className = 'delete';
        mainSpan.appendChild(deleteBtn);

        let editBtn = document.createElement("span");
        editBtn.innerHTML = "<i class='fa-solid fa-pencil fa-2xl'>edit</i>";
        editBtn.className = 'edit';
        mainSpan.appendChild(editBtn);

        tasksContainer.appendChild(mainSpan);

        theInput.value = "";

        theInput.focus();
    }
    calculateTasks();
}


//Delete
document.addEventListener('click', function (e) {
    if (e.target.className == "delete")
        e.target.parentNode.remove();
    if (tasksContainer.childElementCount == 0)
        createNoTasks();

    //edit
    if (e.target.classList.contains('edit')) {
        let taskBox = e.target.parentNode;
        let taskName = taskBox.textContent;

        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskName;
        editInput.classList = "editInp"
        taskBox.innerHTML = '';
        taskBox.appendChild(editInput);

        editInput.focus();

        editInput.addEventListener('blur', function () {
            let newTaskName = editInput.value;
            if (newTaskName !== '') {
                taskBox.innerHTML = newTaskName;
                let deleteBtn = document.createElement("span");
                deleteBtn.innerHTML = "<i class='fa-solid fa-trash fa-2xl'>delete</i>";
                deleteBtn.className = 'delete';
                taskBox.appendChild(deleteBtn);

                let editBtn = document.createElement("span");
                editBtn.innerHTML = "<i class='fa-solid fa-pencil fa-2xl'>edit</i>";
                editBtn.className = 'edit';
                taskBox.appendChild(editBtn);
            }
            else {
                taskBox.remove();
                if (tasksContainer.childElementCount === 0) {
                    createNoTasks();
                }
            }
        });
    }


    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished");
    }
    calculateTasks();
})

function createNoTasks() {
    let msgSpan = document.createElement("span");
    let msgText = document.createTextNode("No Tasks To Show");
    msgSpan.className = 'no-tasks-message';
    msgSpan.appendChild(msgText);
    tasksContainer.appendChild(msgSpan);
}


function calculateTasks() {
    tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;
    tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
}

function deleteAll() {
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
}

function finishAll() {
    const mainSpan = document.querySelectorAll(".tasks-content .task-box");
    mainSpan.forEach(task => {
        task.classList.add("finished")
    })
}
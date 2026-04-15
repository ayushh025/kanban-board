// Select DOM elements
const todo = document.querySelector("#to-do");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const toggleModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");
const addTaskBtn = document.querySelector("#add-new-task");
const errMsgCon = document.querySelector(".err-msg");
const columns = document.querySelectorAll(".task-column");

// Variables for drag functionality and local storage
let dragElement = null;
const savedTask = JSON.parse(localStorage.getItem("tasks"));
const allTasks = {};

// Show saved task
if (savedTask) {
  for (const colId in savedTask) {
    const col = document.querySelector(`#${colId}`);
    savedTask[colId].forEach((task) => {
      createTask(task.title, task.desc, col);
    });
  }
}

// Open modal on button click
toggleModal.addEventListener("click", () => {
  modal.classList.add("active");
});

// Close modal when clicking on background
bg.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Handle new task creation
addTaskBtn.addEventListener("click", () => {
  errMsgCon.innerHTML = "";
  const taskTitle = document.querySelector("#task-title-input");
  const taskDesc = document.querySelector("#task-desc-input");
  let isValid = true;

  // Validate input fields
  if (taskTitle.value.trim() === "") {
    const titleErr = document.createElement("p");
    titleErr.textContent = "Please Enter Title";
    errMsgCon.append(titleErr);
    isValid = false;
  }
  if (taskDesc.value.trim() === "") {
    const DescErr = document.createElement("p");
    DescErr.textContent = "Please Enter Description";
    errMsgCon.append(DescErr);
    isValid = false;
  }

  // If valid, create task and close modal
  if (isValid) {
    createTask(taskTitle.value, taskDesc.value, todo);
    taskTitle.value = "";
    taskDesc.value = "";
    modal.classList.remove("active");
  }
});

// Apply drag and drop functionality to all columns
addDragEff(todo);
addDragEff(progress);
addDragEff(done);

// Function to update count and task
function updateCount() {
  columns.forEach((col) => {
    const count = col.querySelector(".right");
    const tasks = col.querySelectorAll(".task");
    count.textContent = tasks.length;

    allTasks[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").textContent,
        desc: t.querySelector("p").textContent,
      };
    });
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Function to create a new task
function createTask(taskTitle, taskDesc, column) {
  const task = document.createElement("div");
  task.draggable = true;
  task.classList.add("task");
  const h2 = document.createElement("h2");
  h2.textContent = taskTitle;
  const p = document.createElement("p");
  p.textContent = taskDesc;
  const btn = document.createElement("button");
  btn.textContent = "Delete";
  task.append(h2, p, btn);

  // Delete task and update storage
  btn.addEventListener("click", () => {
    task.remove();
    updateCount();
  });

  // Drag logic on task
  task.addEventListener("dragstart", () => {
    dragElement = task;
  });

  column.append(task);
  updateCount();
}

function addDragEff(column) {
  column.addEventListener("dragenter", (e) => {
    if (dragElement) {
      e.preventDefault();
      column.classList.add("dragover");
    }
  });
  column.addEventListener("dragleave", (e) => {
    if (dragElement) {
      e.preventDefault();
      column.classList.remove("dragover");
    }
  });
  column.addEventListener("dragover", (e) => {
    if (dragElement) e.preventDefault();
  });
  column.addEventListener("drop", () => {
    if (dragElement) {
      column.classList.remove("dragover");
      column.append(dragElement);
      updateCount();
      dragElement = null;
    }
  });
}

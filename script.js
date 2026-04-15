const todo = document.querySelector("#to-do");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
const togglModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");
const addTaskBtn = document.querySelector("#add-new-task");
const errMsgCon = document.querySelector(".err-msg");

let dragElement = null;

tasks.forEach((task) => {
  task.addEventListener("drag", () => {
    dragElement = task;
  });
});
togglModal.addEventListener("click", () => {
  modal.classList.add("active");
});
bg.addEventListener("click", () => {
  modal.classList.remove("active");
});
addTaskBtn.addEventListener("click", () => {
  errMsgCon.innerHTML = "";
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDesc = document.querySelector("#task-desc-input").value;
  let isValid = true;

  if (taskTitle.trim() === "") {
    const titleErr = document.createElement("p");
    titleErr.textContent = "Please Enter Title";
    errMsgCon.append(titleErr);
    isValid = false;
  }
  if (taskDesc.trim() === "") {
    const DescErr = document.createElement("p");
    DescErr.textContent = "Please Enter Description";
    errMsgCon.append(DescErr);
    isValid = false;
  }
  if (isValid) {
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

    // Delete logic
    btn.addEventListener("click", () => {});

    // Drag logic
    task.addEventListener("drag", () => {
      dragElement = task;
    });

    todo.append(task);
    modal.classList.remove("active");
  }
});

addDragEff(todo);
addDragEff(progress);
addDragEff(done);

function addDragEff(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("dragover");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("dragover");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", () => {
    column.classList.remove("dragover");
    column.append(dragElement);
  });
}

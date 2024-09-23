const weekDay = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];

const date = new Date();
let day = weekDay[date.getDay()];
document.getElementById(`today`).innerHTML = day;

const taskInput = document.getElementById("newTask");
const newTask = document.getElementById("addTask");
const taskList = document.getElementById("tasksList");
const shown = document.getElementsByClassName("cant");

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    shown[0].style.display = "block";
    return;
  }
  shown[0].style.display = "none";

  const item = document.createElement(`li`);
  item.draggable = true;
  item.innerHTML = `
    <span>
        <i class="fa fa-square-o checkBox"></i>
        <i class="fa fa-check correctIcon" style="display: none;"></i> 
        <span class="task-text">${text}</span>
    </span>
    <div>
        <span class="deleteBtn"><i class="fa fa-close" id="closeIcon"></i></span>
    </div>`;

  item.classList.add(`slide-in`);
  taskList.appendChild(item);
  taskInput.value = "";

  item.querySelector(`.deleteBtn`).addEventListener(`click`, (e) => {
    e.stopPropagation();
    removeTask(item, `swipe-left`);
  });

  const textTask = item.querySelector(".task-text");
  const cancel = item.querySelector(`.checkBox`);
  const correctIcon = item.querySelector(`.correctIcon`);

  item.addEventListener(`click`, () => {
    textTask.style.textDecorationLine =
      textTask.style.textDecorationLine === "line-through"
        ? "none"
        : "line-through";
    item.style.backgroundColor =
      item.style.backgroundColor === "rgb(64, 42, 162)"
        ? "#f9f9f9"
        : "rgb(64, 42, 162)";
    item.style.color = item.style.color === "white" ? "black" : "white";

    if (cancel.style.display !== "none") {
      cancel.style.display = "none";
      correctIcon.style.display = "inline";
    } else {
      cancel.style.display = "inline";
      correctIcon.style.display = "none";
    }
  });

  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null);
    e.target.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });

  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const siblings = [...taskList.querySelectorAll("li:not(.dragging)")];

    const nextSibling = siblings.find((sibling) => {
      return (
        e.clientY <=
        sibling.getBoundingClientRect().top + sibling.offsetHeight / 2
      );
    });

    taskList.insertBefore(draggingItem, nextSibling);
  });
}
function removeTask(item, direction) {
  item.classList.add(direction);
  item.addEventListener(`transitionend`, () => {
    item.remove();
  });
}
newTask.addEventListener(`click`, addTask);
taskInput.addEventListener(`keypress`, (e) => {
  if (e.key === `Enter`) {
    addTask();
  }
});

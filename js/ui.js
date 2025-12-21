// UI rendering and DOM manipulation

import {
  addTask,
  toggleTask,
  deleteTask,
  getTasksByFilter,
} from "./service.js";

const taskList = document.getElementById("tasks");
const form = document.getElementById("task-form");
const input = document.getElementById("task-title");
const filterButtons = document.querySelectorAll(".filters button");

export function initUI() {
  form.addEventListener("submit", handleAddTask);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      loadTasks(btn.dataset.filter);
    });
  });

  loadTasks();
}

async function handleAddTask(e) {
  e.preventDefault();

  try {
    await addTask(input.value);
    input.value = "";
    loadTasks();
  } catch (err) {
    alert(err.message);
  }
}

async function loadTasks(filter = "all") {
  const tasks = await getTasksByFilter(filter);
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  // Filter out invalid tasks (no title or only whitespace) that can appear in localStorage
  const validTasks = tasks.filter(
    (t) => t && t.title && t.title.toString().trim() !== ""
  );

  if (validTasks.length === 0) {
    taskList.innerHTML = "<li>No tasks found</li>";
    return;
  }

  validTasks.forEach((task) => {
    const li = document.createElement("li");

    // Checkbox = completed state
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", async () => {
      await toggleTask(task.id);
      loadTasks();
    });

    // Task title
    const span = document.createElement("span");
    span.textContent = task.title;
    span.style.marginLeft = "8px";

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    // Right-click to delete
    li.addEventListener("contextmenu", async (e) => {
      e.preventDefault();
      await deleteTask(task.id);
      loadTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

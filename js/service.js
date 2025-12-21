// Business logic and validation

import { getAllTasks, saveAllTasks } from "./data.js";

function generateId() {
  return Date.now().toString();
}

export async function addTask(title) {
  if (!title || title.trim() === "") {
    throw new Error("Task title cannot be empty");
  }

  const tasks = await getAllTasks();

  const newTask = {
    id: generateId(),
    title: title.trim(),
    completed: false,
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  await saveAllTasks(tasks);

  return newTask;
}

export async function toggleTask(taskId) {
  const tasks = await getAllTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  task.completed = !task.completed;
  await saveAllTasks(tasks);

  return task;
}

export async function deleteTask(taskId) {
  const tasks = await getAllTasks();
  const filtered = tasks.filter((t) => t.id !== taskId);

  if (tasks.length === filtered.length) {
    throw new Error("Task not found");
  }

  await saveAllTasks(filtered);
  return true;
}

export async function getTasksByFilter(filter = "all") {
  const tasks = await getAllTasks();

  switch (filter) {
    case "completed":
      return tasks.filter((t) => t.completed);
    case "pending":
      return tasks.filter((t) => !t.completed);
    default:
      return tasks;
  }
}

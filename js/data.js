// Data access (localStorage)

const STORAGE_KEY = "tasks";

// Simulate DB latency
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAllTasks() {
  await delay();
  const data = localStorage.getItem(STORAGE_KEY);
  const tasks = data ? JSON.parse(data) : [];

  // Sanitize stored tasks: remove any entries without a non-empty title
  const sanitized = tasks.filter(
    (t) => t && t.title && t.title.toString().trim() !== ""
  );

  if (sanitized.length !== tasks.length) {
    // Persist cleaned data back to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  }

  return sanitized;
}

export async function saveAllTasks(tasks) {
  await delay();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return true;
}

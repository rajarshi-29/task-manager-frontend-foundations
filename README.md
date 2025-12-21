# Task Manager 

A minimal task management application built using **HTML, CSS, and Vanilla JavaScript**.

This project was created to **lock JavaScript and frontend fundamentals** before starting backend development.

---

## 🎯 Purpose

- Strengthen JavaScript fundamentals
- Understand async flow and modules
- Practice clean separation of concerns
- Prepare for backend (Node.js + Express)

---

## 🧠 Architecture

UI → Service → Data


- **UI (`ui.js`)**: DOM rendering & event handling
- **Service (`service.js`)**: Business logic & validation
- **Data (`data.js`)**: Persistence using `localStorage`

This structure directly maps to a backend REST API architecture.

---

## ✨ Features

- Add / delete tasks
- Mark tasks as completed
- Filter tasks (All / Pending / Completed)
- Persistent storage using `localStorage`
- Async operations with `async/await`
- Error handling & validation

---

## 🔁 Backend Mapping

| Frontend Function | Backend Equivalent |
|------------------|-------------------|
| addTask()        | POST /tasks       |
| getTasks()       | GET /tasks        |
| toggleTask()     | PATCH /tasks/:id  |
| deleteTask()     | DELETE /tasks/:id |

---

## 🚀 Tech Stack

- HTML
- CSS
- JavaScript (ES Modules)

No frameworks. No libraries.

---

## 📌 Next Step

This project can be directly converted into a **Node.js + Express backend** by replacing the data layer with a database and exposing REST APIs.

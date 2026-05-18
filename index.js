#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(process.cwd(), "tasks.json");

function ensureTasksFile() {
    if (!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, JSON.stringify([], null, 2));
    }
}

function loadTasks() {
    ensureTasksFile();
    const fileContent = fs.readFileSync(TASKS_FILE, "utf8");
    try {
        const tasks = JSON.parse(fileContent);
        return Array.isArray(tasks) ? tasks : [];
    } catch {
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function nextId(tasks) {
    if (tasks.length === 0) {
        return 1;
    }

    return Math.max(...tasks.map((task) => task.id)) + 1;
}

function currentTimestamp() {
    return new Date().toISOString();
}



function addTask(description) {
  if (!description) {
    console.log("Task description is required.");
    return;
  }

  const tasks = loadTasks();
  const task = {
    id: nextId(tasks),
    description,
    status: "todo",
    createdAt: currentTimestamp(),
    updatedAt: currentTimestamp(),
  };

  tasks.push(task);
  saveTasks(tasks);

  console.log(`Task added successfully (ID: ${task.id})`);
}


const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    console.log("Add command selected");
    break;
  case "update":
    console.log("Update command selected");
    break;
  case "delete":
    console.log("Delete command selected");
    break;
  case "mark-in-progress":
    console.log("Mark in progress command selected");
    break;
  case "mark-done":
    console.log("Mark done command selected");
    break;
  case "list":
    console.log("List command selected");
    break;
  default:
    console.log("Unknown command");
}
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

function listTasks(statusFilter = null) {
    const tasks = loadTasks();

    const filteredTasks = statusFilter
    ? tasks.filter((tasks) => tasks.status === statusFilter)
    : tasks;

    if (filteredTasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    filteredTasks.forEach((task) => {
        console.log(
            `[${task.id}] ${task.description} | ${task.status} | Created: ${task.createdAt} | Updated: ${task.updatedAt}`
        );
    });
}

function updateTask(id, newDescription) {
    if (!id) {
        console.log("Task ID is required.");
        return;
    }

    const tasks = loadTasks();
    const task = tasks.find((item) => item.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found`)
        return;
    }

    task.description = newDescription.trim();
    task.updatedAt = currentTimestamp();

    saveTasks(tasks);
    console.log(`Task ${id} updated succesfully`);
}

function deleteTask(id) {
    if (!id) {
        console.log("Task ID is required.")
        return;
    }

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) {
        console.log(`Task with ID ${id} not found.`)
        return;
    }

    tasks.splice(taskIndex, 1);
    saveTasks(tasks);

    console.log(`Task ${id} deleted successfully.`)
}

function markTaskStatus(id, status) {
    if (!id) {
        console.log("Task ID required.");
        return;
    }

    const tasks = loadTasks();
    const task = tasks.find((item) => item.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = status;
    task.updatedAt = currentTimestamp();

    saveTasks(tasks);
    console.log(`Task ${id} marked as ${status}.`)
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    addTask(args.slice(1).join(" "));
    break;

  case "update": {
    const id = Number(args[1]);
    const newDescription = args.slice(2).join(" ");
    updateTask(id, newDescription);
    break;
  }

  case "delete": {
    const id = Number(args[1]);
    deleteTask(id);
    break;
  }

  case "mark-in-progress": {
    const id = Number(args[1]);
    markTaskStatus(id, "in-progress");
    break;
  }

  case "mark-done": {
    const id = Number(args[1]);
    markTaskStatus(id, "done");
    break;
  }

  case "list": {
    const status = args[1];

    if (!status) {
      listTasks();
      break;
    }

    if (status === "done" || status === "todo" || status === "in-progress") {
      listTasks(status);
    } else {
      console.log("Invalid list status. Use: done, todo, or in-progress.");
    }

    break;
  }

  default:
    console.log("Unknown command");
}
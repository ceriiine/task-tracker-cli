#!/usr/bin/env node

const { addTask, deleteTask, updateTask, updateStatus, listTasks } = require('./dataAccess');

// Access command-line arguments
const [command, ...args] = process.argv.slice(2);

try {
    switch (command) {
        case "add":
            // Add a new task
            if (!args[0]) throw new Error("You must provide a task description.");
            const id = addTask(args[0]);
            console.log(`Task added successfully (ID: ${id})`);
            break;

        case "update":
            // Update an existing task
            if (args.length < 2) throw new Error("You must provide a task ID and a new description.");
            updateTask(Number(args[0]), args.slice(1).join(" "));
            console.log("Task updated successfully.");
            break;

        case "delete":
            // Delete a task
            if (!args[0]) throw new Error("You must provide a task ID.");
            deleteTask(Number(args[0]));
            console.log("Task deleted successfully.");
            break;

        case "mark-in-progress":
            // Mark a task as in progress
            if (!args[0]) throw new Error("You must provide a task ID.");
            updateStatus(Number(args[0]), "in-progress");
            console.log("Task marked as in progress.");
            break;

        case "mark-done":
            // Mark a task as done
            if (!args[0]) throw new Error("You must provide a task ID.");
            updateStatus(Number(args[0]), "done");
            console.log("Task marked as done.");
            break;

        case "list":
            // List tasks
            if (args[0]) {
                if (!["todo", "in-progress", "done"].includes(args[0])) {
                    throw new Error('Invalid status. Use "todo", "in-progress", or "done".');
                }
                const filteredTasks = listTasks(args[0]);
                console.log(`Tasks (${args[0]}):`, filteredTasks);
            } else {
                const allTasks = listTasks();
                console.log("All tasks:", allTasks);
            }
            break;

        default:
            console.error(`Unknown command: ${command}`);
            console.log("Available commands:");
            console.log("  add <description>");
            console.log("  update <id> <new description>");
            console.log("  delete <id>");
            console.log("  mark-in-progress <id>");
            console.log("  mark-done <id>");
            console.log("  list [status]");
            break;
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
}

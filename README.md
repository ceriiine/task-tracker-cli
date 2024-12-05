# Task Tracker CLI

A simple Command Line Interface (CLI) application to manage a TODO list. The tool allows to create, update, delete, and list tasks directly from the terminal. ([This is an implementation of Roadmap.sh backend project](https://roadmap.sh/projects/task-tracker) )

## Features

- **Add Tasks:** Add a new task with a description.
- **Update Tasks:** Modify the description of an existing task.
- **Delete Tasks:** Remove a task.
- **Task Status Management:** Mark a task as `in-progress`, or `done`.
- **List Tasks:** View all tasks or filter them by their status.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ceriiine/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. Make the `cli.js` file executable:
   ```bash
   chmod +x cli.js
   ``` 

3. Make the cli executable globally
   ```bash
   npm link
   ```


## Usage

After installation, you can use the following commands to manage your tasks:

### Add a Task

Add a new task by providing a description:
```bash
task-cli add "<task description>"
```
Example:
```bash
task-cli add "Complete the project documentation"
```
### Update a Task

Update the description of an existing task using its ID:
```bash
task-cli update <task_id> "<new description>"
```
Example:
```bash
task-cli update 1 "Finalize the README file"
```
### Delete a Task

Remove a task from the list using its ID:
```bash
task-cli delete <task_id>
```
Example:
```bash
task-cli delete 2
```
### Mark a Task as In-Progress

Change the status of a task to in-progress using its ID:
```bash
task-cli mark-in-progress <task_id>
```
Example:
```bash
task-cli mark-in-progress 3
```
### Mark a Task as Done

Change the status of a task to done using its ID:
```bash
task-cli mark-done <task_id>
```
Example:
```bash
task-cli mark-done 3
```
### List Tasks

Display all tasks or filter them by status:
```bash
task-cli list [status]
```
- Without a status: Lists all tasks.
- With a status (todo, in-progress, done): Lists tasks with the specified status.

Examples:
```bash
task-cli list        # Lists all tasks
task-cli list todo   # Lists tasks with "todo" status
task-cli list done   # Lists tasks with "done" status
```


## File Structure

The project has the following file structure:
```txt
task-tracker-cli/
│
├── db.json            # Stores the task data (JSON format)
├── cli.js             # The command-line interface script
├── dataAccess.js      # Handles task data operations (CRUD operations)
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

**db.json**: This file contains the list of tasks in JSON format. The tasks are stored with the properties: id, description, status, createdAt, and updatedAt.

**cli.js**: The script that manages the command line interface.

**dataAccess.js**: Contains functions for adding, deleting, updating, and listing tasks, as well as managing the task database (db.json).

**package.json**: Contains the project details and script configuration for running the CLI.

**README.md**: This file, which contains the documentation and instructions for using the task tracker.

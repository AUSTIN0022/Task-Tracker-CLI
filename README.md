# Task Tracker CLI

A simple command-line interface (CLI) application to manage and track tasks using a JSON file as a storage backend.

## Features
- Add new tasks
- Update task descriptions
- Delete tasks
- Mark tasks as in-progress or done
- List all tasks or filter by status (todo, in-progress, done)

## Installation
Ensure you have **Node.js** installed on your system. Then, clone or download this repository and navigate to the project folder.

```sh
cd task-cli
```

## Usage
Run the script using Node.js with the following commands:

### Adding a Task
```sh
node task-cli.js add "Buy groceries"
```
**Output:** `Task added successfully (ID: 1)`

### Updating a Task
```sh
node task-cli.js update 1 "Buy groceries and cook dinner"
```
**Output:** `Task updated successfully (ID: 1)`

### Deleting a Task
```sh
node task-cli.js delete 1
```
**Output:** `Task (ID: 1) deleted successfully`

### Marking a Task as In-Progress
```sh
node task-cli.js mark-in-progress 1
```
**Output:** `Task marked as in-progress (ID: 1)`

### Marking a Task as Done
```sh
node task-cli.js mark-done 1
```
**Output:** `Task marked as done (ID: 1)`

### Listing All Tasks
```sh
node task-cli.js list
```
**Output:** Displays all tasks in a table format.

### Listing Tasks by Status
```sh
node task-cli.js list done
node task-cli.js list todo
node task-cli.js list in-progress
```
**Output:** Shows tasks filtered by status.

### Displaying Help
```sh
node task-cli.js help
```
**Output:** Shows all available commands and their usage.

### Exiting the CLI
```sh
node task-cli.js exit
```
**Output:** `Bye`

## File Storage
Tasks are stored in a `tasks.json` file, automatically created in the working directory.

## Error Handling
- Invalid command inputs are handled with appropriate error messages.
- Prevents invalid IDs and incorrect arguments.

## Future Improvements
- Add support for due dates and priorities.
- Implement a UI for better visualization.
- Add task persistence across multiple users.

Enjoy tracking your tasks efficiently! 🚀


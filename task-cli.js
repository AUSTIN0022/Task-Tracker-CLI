import fs from 'fs';
const filePath = 'tasks.json'

const args = process.argv.slice(2);
const command = args[0];

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8', (err) => {
        if(err) {
            console.log("error creating File");
        }
    });
}

let tasks = [];
try {
    const data = fs.readFileSync(filePath, 'utf8');
    tasks = JSON.parse(data);
} catch (error) {
    console.error('Error loading tasks:', error.message);
    tasks = [];
}

const commands = ['add', 'update', 'delete', 'list', 'mark-in-progress', 'mark-done'];

function savedata(data) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) console.error("Error saving tasks:", err);
    });
}


let ID = 0;
if(Array.isArray(tasks) && tasks.length > 0) {
    ID = tasks.length ? Math.max(...tasks.map(task => task.id || 0)) + 1 : 1;
}

function addTask(description) { 
    let task = {
        "id": ID,
        "description": description,
        "status": "todo",
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString()
     }
     tasks.push(task);
     savedata(tasks);
     ID++;

    return console.log(`Task added successfully (ID: ${task.id})`);
}
function updateTask(id, description) {
    const index = tasks.findIndex(task => task.id === id);
    if(index === -1) { 
        console.log(`task with ID:${id} not found`);
        return;
    }
    tasks[index].description = description;
    tasks[index].updatedAt = new Date();
    savedata(tasks);
    console.log(`Task updated sucessfully (ID: ${id})`);
}
function deleteTask(id) { 
    const index = tasks.findIndex(task => task.id === id);

    if(index === -1) { 
        console.log(`task with ID:${id} not found`);
        return;
    }
    tasks.splice(index,1);
    savedata(tasks);
    return console.log(`Task (ID: ${id}) deleted successfully)`);
    
}
function markTaskInProgress(id) {  
    const index = tasks.findIndex(task => task.id === id);
    if(index === -1) { 
        console.log(`task with ID:${id} not found`);
        return;
    }
    tasks[index].status = 'in-progress';
    tasks[index].updatedAt = new Date();
    savedata(tasks);
    console.log(`Task marked as in-progress (ID: ${id})`);
}
function markTaskDone(id) {  
    const index = tasks.findIndex(task => task.id === id);
    if(index === -1) { 
        console.log(`task with ID:${id} not found`);
        return;
    }
    tasks[index].status = 'done';
    tasks[index].updatedAt = new Date();
    savedata(tasks);
    console.log(`Task marked as done (ID: ${id})`);
}
function listTasks(status = null) { 
    let filteredTasks = tasks;

    if(status) {
        filteredTasks = tasks.filter(task => task.status === status);
    }

    if(filteredTasks.length === 0) {
        console.log(`No tasks found${status ? ` with status '${status}'` : ''}.`);
        return;
    }
    console.table(filteredTasks, ["id", "description", "status", "createdAt", "updatedAt"]);
}

try{
        if (command === 'exit') {
            console.log("Bye");
            process.exit(0); 
        }
    
        if (command === 'help') {
            console.log('Available commands:');
            console.log('  add "task description" - Add a new task');
            console.log('  update <id> "new description" - Update task description');
            console.log('  delete <id> - Delete a task');
            console.log('  list - Show all tasks');
            console.log('  mark-in-progress <id> - Mark task as in progress');
            console.log('  mark-done <id> - Mark task as done');
            console.log('  exit - Exit the application');
        }

        if(commands.includes(command)) {
            const id = parseInt(args[1]);

            switch (command) {
                case 'add' : 
                    if (args.length !== 2) {
                        console.log('Usage: add "task description"');
                    } else {
                        const taskDescription = args.slice(1).join(' ').replace(/^"|"$/g, '');
                        addTask(taskDescription);
                    }
                
                    break;
                case 'update': 
                        if(args.length != 3) {
                            console.log('usage: update <id> <task> ');
                        } else if( isNaN(id)) {
                            console.error('Invalid ID. Please provide a number.');
                        } else {
                            updateTask(id, args[2]);
                        }
                    break;
                case 'delete': 
                        if(args.length != 2) {
                            console.log('usage: delete <id>');
                        } else if( isNaN(id)) {
                            console.error('Invalid ID. Please provide a number.');
                        } else {
                            deleteTask(id);
                        }
                    break;
                case 'mark-in-progress': 
                         if(args.length != 2) {
                            console.log('usage: mark-in-progress <id>');
                         } else if( isNaN(id)) {
                            console.error('Invalid ID. Please provide a number.');
                         } else {
                            markTaskInProgress(id);
                        }
                    break;
                case 'mark-done': 
                        if(args.length != 2) {
                            console.log('usage: mark-in-progress <id>');
                        } else if( isNaN(id)) {
                            console.error('Invalid ID. Please provide a number.');
                        } else {
                            markTaskDone(id);
                        }
                         
                    break;
                case 'list': 
                        if(args.length > 2) {
                            console.log('usage: list');
                        }
                        if(args[1] === "done") {
                            listTasks("done");
                        } else if(args[1] == "in-progress") {
                            listTasks("in-progress")
                        } else {
                            listTasks();
                        }
                    break;
            }
        } else {
            console.log(`command: "${args[0]} not found"`)
        }
    } catch(err) {
    console.log(`error: ${err}`);
}

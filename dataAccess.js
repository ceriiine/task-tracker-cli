var fs = require('fs')
var path = require('path')

//Database file name
const dbFileName = 'db.json'

// Read the list of tasks from the database
function readTasks(fileName){

    var fileData = []
    var filePath = path.resolve(__dirname, fileName) 
    if (fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8')
        if (data != ''){
            fileData = JSON.parse(data)
        }
    }
    return fileData
}

// Write the list of tasks to the database
function writeTasks(tasksData, fileName){
    var filePath = path.resolve(__dirname, fileName)
    fs.writeFileSync(filePath, JSON.stringify(tasksData, null, 2), 'utf-8')
}

// Get the nex ID 
function getNextId(tasksData){
    if (tasksData.length === 0){
        return 1
    } else {
        return Math.max(...tasksData.map(task => task.id)) + 1
    }
}

//Add an element to the database
function addTask(description){
    if (description != ""){ 
        const tasksData = readTasks(dbFileName)
        const currentTime = new Date()
        const newTask = {
            id: getNextId(tasksData),
            description: description,
            status: "todo",
            createdAt: currentTime,
            updatedAt: currentTime
        }
        tasksData.push(newTask)
        writeTasks(tasksData, dbFileName)
        return newTask.id

    }else{
        throw new Error("You cannot create a task without a description");
    }
}

//Delete and element from the database
function deleteTask(id){
    var tasksData = readTasks(dbFileName);
    
    const taskIndex = tasksData.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`);
    }

    tasksData.splice(taskIndex, 1)

    writeTasks(tasksData, dbFileName)
}

//Update an element in the database
function updateTask(id, description) {
    if (!description) {
        throw new Error("You cannot update a task without a new description");
    }

    const tasksData = readTasks(dbFileName);

    const taskIndex = tasksData.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`);
    }

    tasksData[taskIndex] = {
        ...tasksData[taskIndex],
        description: description,
        updatedAt: new Date()
    };

    writeTasks(tasksData, dbFileName);
}

//Update the status of a task
function updateStatus(id, newStatus){
    
    if (!["in-progress", "todo", "done"].includes(newStatus)) {
        throw new Error('Invalid status value')
    }

    const tasksData = readTasks(dbFileName);

    const taskIndex = tasksData.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`);
    }


    tasksData[taskIndex] = {
        ...tasksData[taskIndex],
        status: newStatus,
        updatedAt: new Date()
    };
        
    writeTasks(tasksData, dbFileName);  
}

//List elements with status (or all elements if status not provided)
function listTasks(status) {
    const tasksData = readTasks(dbFileName);

    if (status) {
        if (!["in-progress", "todo", "done"].includes(status)) {
            throw new Error('Invalid status value');
        }
        return tasksData.filter(task => task.status === status);
    }

    return tasksData; // If no status is provided, return all tasks
}

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    updateStatus,
    listTasks
};
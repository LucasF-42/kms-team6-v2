class Task {
    constructor(name, description, category, status) {
        this.name= name;
        this.description = description;
        this.category = status;
        this.status=status;
    }
}


const taskList = [];

taskList.push(new Task("Example0", "Test", 0, 0));
taskList.push(new Task("Example1", "Test", 0, 0));
taskList.push(new Task("Example2", "Test", 0, 0));
taskList.push(new Task("Example3", "Test", 0, 0));


module.exports = {
    Task,

    createTask: (newTask) => {
        taskList.push(newTask);
    },

    getTasks: () => {
        return taskList;
    },

    updateTask: (index, newTask) => {
        taskList[index] = newTask;
    },

    deleteTask: (index) => {
        taskList.splice(index, 1);
    },
}
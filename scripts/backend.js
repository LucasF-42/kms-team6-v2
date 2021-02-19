'esversion: 6';

class Task {
    constructor(name, description, category, priority, isDone) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.isDone = isDone;
    }
}

const priorities = ["lowest", "low", "medium", "high", "very high", "critical"];


const taskList = [];


module.exports = {
    Task,
    priorities,

    createTask: (newTask) => {
        taskList.push(newTask);
    },

    getTasks: () => {
        return taskList;
    },

    updateTask: (index, newTask) => {
        if(index < 0 || index > taskList.length) {
            // TODO: How to handle that stuff?
            return false;
        }
        if(!(newTask instanceof Task)) {
            return false;
        }
        taskList[index] = newTask;
        return true;
    },

    deleteTask: (index) => {
        taskList.splice(index, 1);
    },

    search: (searchWord) => {
        return taskList.filter(task => {
            if(searchWord==="") return true;
            return task.name.toLowerCase().includes(searchWord);
        });
    }
}
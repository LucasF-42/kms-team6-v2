'esversion: 6';

const assert = require('assert');
const backend = require('../backend');
const Task = backend.Task;
const priorities = backend.priorities;

function checkTaskEquality(task1, task2) {
    let t1Array = Object.values(task1);
    let t2Array = Object.values(task2);
    for(let i = 0; i < Object.keys(task1).length; i++) {
        if(!(t1Array[i] === t2Array[i])) {
            return false;
        }
    }
    return true;
}

describe('Backend', function () {
    describe('#Task.constructor', function () {
        it('creates a task', function () {
            const name = "Name";
            const description = "Description";
            const category = 0;
            const priority = 0;
            const isDone = 0;

            const task = new Task(name, description, category, priority, isDone);

            assert.strictEqual(task.name, name);
            assert.strictEqual(task.description, description);
            assert.strictEqual(task.category, category);
            assert.strictEqual(task.priority, priority);
            assert.strictEqual(task.isDone, isDone);
        })
    });

    describe('#Task deletion', function () {
        let task1 = new Task("task1", "description", 0, 1, 0);
        let task2 = new Task("task2", "description", 0, 2, 0);
        let task3 = new Task("task3", "description", 0, 3, 0);
        let task4 = new Task("task4", "description", 0, 4, 0);

        beforeEach(function () {
            let backEndLength = backend.getTasks().length;
            for (let i = 0; i < backEndLength; i++) {
                backend.getTasks().pop();
            }
            backend.createTask(task1);
            backend.createTask(task2);
            backend.createTask(task3);
            backend.createTask(task4);
        });
        it('deleting an element removes it from the list and leaves behind no undefined element', function() {
            let idx = 0;
            const taskList = backend.getTasks();
            backend.deleteTask(idx);
            assert.notStrictEqual(taskList[idx++], undefined);
            backend.deleteTask(idx);
            assert.notStrictEqual(taskList[idx++], undefined);
        });
        // TODO: Needs more test cases? Deleting at the beginning/end of an array?
        it('deleting an element only deletes the element at the given index and does not change order of the list', function () {
            let idx = 1;
            let followIndex = idx+1;
            let origTaskList = [];
            let listLength = backend.getTasks().length;
            // Copying the list
            for(let i = 0; i < listLength; i++) {
                const t = backend.getTasks()[i];
                origTaskList.push(new Task(t.name, t.description, t.category, t.priority, t.isDone));
            }
            // actual test
            backend.deleteTask(idx);
            for(let i = 0; i < --listLength; i++) {
                if(i >= idx) {
                    assert.ok(checkTaskEquality(backend.getTasks()[idx], origTaskList[followIndex]));
                } else {
                    assert.ok(checkTaskEquality(backend.getTasks()[i], origTaskList[i]));
                }
            }
        });
        it('deleting an element decreases list size', function () {
            let prevLength = backend.getTasks().length;

            for(let i = 0; i < prevLength; i++) {
                backend.deleteTask(0);
                assert.strictEqual(backend.getTasks().length, --prevLength);
            }
        });
    });

    describe('#Task update', function () {
        let task1 = new Task("task1", "description", 0, 1, 0);
        let task2 = new Task("task2", "description", 0, 2, 0);
        let task3 = new Task("task3", "description", 0, 3, 0);
        let task4 = new Task("task4", "description", 0, 4, 0);
        const comparisonList = [
            new Task(task1.name, task1.description, task1.category, task1.priority, task1.isDone),
            new Task(task2.name, task2.description, task2.category, task2.priority, task2.isDone),
            new Task(task3.name, task3.description, task3.category, task3.priority, task3.isDone),
            new Task(task4.name, task4.description, task4.category, task4.priority, task4.isDone)
        ];

        beforeEach(function () {
            let backEndLength = backend.getTasks().length;
            for (let i = 0; i < backEndLength; i++) {
                backend.getTasks().pop();
            }
            backend.createTask(task1);
            backend.createTask(task2);
            backend.createTask(task3);
            backend.createTask(task4);
        });

        /*
            - update changes only the changed field of a task
            - update can change multiple fields of a task
            - update does not change the order of the elements
            - update does not change list size
            - update leaves no holes in the list
                -> make a test case where someone enters null or an undefined value?
            - update can not be performed on an index that holds an undefined element
                -> that one will break!
         */
        it('update effects only the field of a task that was changed', function () {
            const idx =1;
            let taskToCompareBy = comparisonList[idx];
            let updatedTasks = [
                new Task("task2a", taskToCompareBy.description, taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone),
                new Task(taskToCompareBy.name, "decription2", taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone),
                new Task(taskToCompareBy.name, taskToCompareBy.description, 1, taskToCompareBy.priority, taskToCompareBy.isDone),
                new Task(taskToCompareBy.name, taskToCompareBy.description, taskToCompareBy.category, taskToCompareBy.priority+1, taskToCompareBy.isDone),
                new Task(taskToCompareBy.name, taskToCompareBy.description, taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone+1)
            ];
            const numberOfFieldsInTask = Object.values(updatedTasks[0]).length;
            let currentField;
            let backendList = backend.getTasks();
            // TODO: Possibly way too complicated for too little gain?
            // outer loop so we do an update on ever field
            for(let taskField = 0; taskField < numberOfFieldsInTask; taskField++) {
                currentField = Object.keys(updatedTasks[0])[taskField];
                backend.updateTask(idx, updatedTasks[taskField])
                // for each update we have to check the whole list
                for(let i = 0; i < backend.getTasks().length; i++) {
                    // for each task, we have to check every field.
                    for(let currentFieldIdx = 0; currentFieldIdx < numberOfFieldsInTask; currentFieldIdx++) {
                        if(currentFieldIdx === taskField && i === idx) {
                            assert.strictEqual(Object.values(backend.getTasks()[idx])[taskField], Object.values(updatedTasks[taskField])[taskField],
                                `The ${currentField} has does not match the updated name!`);
                            assert.notStrictEqual(Object.values(backend.getTasks()[idx])[taskField], Object.values(taskToCompareBy)[taskField],
                                `The ${currentField} was not changed at all!`);
                            continue;
                        }
                        assert.strictEqual(Object.values(backend.getTasks()[i])[currentFieldIdx], Object.values(comparisonList[i])[currentFieldIdx],
                                `Another field of the list was changed, namely: ${Object.keys(updatedTasks[0])[currentFieldIdx]}`);
                    }
                }
            }
        });
        it('update can change multiple fields in a task', function () {
            const idx = 2;
            let taskToCompareBy = comparisonList[idx];
            const testTasks = [
                new Task("task2a", "description2", taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone),
                new Task(taskToCompareBy.name, taskToCompareBy.description, 3, 5, taskToCompareBy.isDone),
                new Task("task2a", "description2", 2, 4, taskToCompareBy.isDone+1)
            ];

            for(let i = 0; i < testTasks.length; i++) {
                backend.updateTask(idx, testTasks[i]);
                assert.ok(!checkTaskEquality(backend.getTasks()[idx], taskToCompareBy));
                assert.ok(checkTaskEquality(backend.getTasks()[idx], testTasks[i]));
                backend.updateTask(idx, taskToCompareBy);
            }
        });
        it('updating a task does not change the order of the list', function () {
            const idx = 2;
            let taskToCompareBy = comparisonList[idx];
            const updatedTask = new Task("task2a", taskToCompareBy.description, taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone);
            backend.updateTask(idx, updatedTask);
            for(let i = 0; i < backend.getTasks().length; i++) {
                if(i === idx) {
                    assert.strictEqual(backend.getTasks()[idx], updatedTask);
                    assert.ok(!checkTaskEquality(backend.getTasks()[idx], taskToCompareBy));
                } else {
                    assert.ok(checkTaskEquality(backend.getTasks()[i], comparisonList[i]));
                }
            }
        });
        it('updating a task does not change list size', function () {
            const idx = 0;
            let taskToCompareBy = comparisonList[idx];
            const originalListSize = backend.getTasks().length;
            const updatedTask = new Task("task1a", taskToCompareBy.description, taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone);
            backend.updateTask(idx, updatedTask);
            assert.strictEqual(backend.getTasks().length, originalListSize);
        });
        it('updating a task does not create undefined elements within the list', function () {
            const idx = 2;
            const originalListSize = backend.getTasks().length;
            let taskToCompareBy = comparisonList[idx];
            const updatedTask = new Task("task1a", taskToCompareBy.description, taskToCompareBy.category, taskToCompareBy.priority, taskToCompareBy.isDone);
            backend.updateTask(idx, updatedTask);
            for(let i = 0; i < originalListSize; i++) {
                assert.notStrictEqual(backend.getTasks()[i], undefined);
            }
        });
       it('The offered argument has to be of type Task', function () {
           let test = {
               name : "Test",
               description : "desc",
               category : 0,
               priority : 1,
               isDone : 0
           };
           //backend.updateTask(1, undefined);
           backend.updateTask(2, test);
           for(let i = 0; i < backend.getTasks().length; i++) {
               assert.ok(backend.getTasks()[i] instanceof Task,
                   `${(backend.getTasks()[i] === undefined) ? "Undefined element" : "Non Task-element"} in the list!`);
           }
       });
       it('The given index has to be within the bounds of the list', function () {
           const updatedTask = new Task("task1a", "desc", 1, 5, 0);
           const baseListSize = backend.getTasks().length;
           assert.ok(!(backend.updateTask(100, updatedTask)));
           assert.strictEqual(backend.getTasks().length, baseListSize);
           assert.ok(!(backend.updateTask(-1, updatedTask)));
           assert.strictEqual(backend.getTasks().length, baseListSize);
       });
    });
});
'esversion: 6';

const assert = require('assert');
const backend = require('../backend');
const Task = backend.Task;
const testName = "Name";
const testDescription = "Description";
const testCategory = 0;
const testPriority = 0;
const testIsDone = 0;
const testTaskList = [];

function returnList(){
  return testTaskList
}

describe('Backend', function() {
  describe('#Task.constructor', function() {
    it('creates a task', function() {
      const task = new Task(testName, testDescription, testCategory, testPriority, testIsDone);

      assert.strictEqual(task.name, testName);
      assert.strictEqual(task.description, testDescription);
      assert.strictEqual(task.category, testCategory);
      assert.strictEqual(task.priority, testPriority);
      assert.strictEqual(task.isDone, testIsDone);
    })
  });
  describe('#createTask', function () {
    it('pushes a task onto the list', function () {
      const createTaskTest = new Task(testName, testDescription, testCategory, testPriority, testIsDone);
      testTaskList.push(createTaskTest); //Tested Code -> taskList.push(newTask);
      assert.strictEqual(testTaskList[0], createTaskTest);
      testTaskList.pop(); //empties the array
      assert.strictEqual(testTaskList.length, 0);
    })
    it('creates a task increases the length of the array', function () {
      const createTaskTest = new Task(testName, testDescription, testCategory, testPriority, testIsDone);
      assert.strictEqual(testTaskList.length, 0);
      testTaskList.push(createTaskTest); //Tested Code -> taskList.push(newTask);
      assert.strictEqual(testTaskList.length, 1);
      testTaskList.pop(); //empties the array
      assert.strictEqual(testTaskList.length, 0);
    })
    it('creates several tasks without issue', function (){
      const createTaskTest = new Task(testName, testDescription, testCategory, testPriority, testIsDone);
      const testingThreshold = 500;
      let i;
      assert.strictEqual(testTaskList.length, 0);
      for (i=0;i < testingThreshold;i++){
        testTaskList.push(createTaskTest); //Tested Code -> taskList.push(newTask);
      }
      assert.strictEqual(testTaskList.length, testingThreshold);
      for (i=0;i < testingThreshold;i++){
        testTaskList.pop(); //empties the array
      }
      assert.strictEqual(testTaskList.length, 0);
    })
  })
  describe('#getTasks', function () {
    it('accesses a list',function () {
      let testTaskListTesterList = [];
      assert.strictEqual(typeof testTaskListTesterList, typeof returnList());
    })
    it('tasks that are created are a part of the list', function () {
      const createTaskTest = new Task(testName, testDescription, testCategory, testPriority, testIsDone);
      returnList().push(createTaskTest);
      assert.strictEqual(returnList()[0], createTaskTest);
      testTaskList.pop(); //empties the array
      assert.strictEqual(testTaskList.length, 0);
    })
  })
  describe('#updateTask', function () {
    it('updates a task',function () {
      const originalTaskTest = new Task(testName, testDescription, testCategory, testPriority, testIsDone);
      const newTaskTest = new Task(testName+"a", testDescription+"a", testCategory+1, testPriority+1, testIsDone);
      testTaskList.push(originalTaskTest);
      assert.strictEqual(testTaskList[0], originalTaskTest);
      assert.notStrictEqual(originalTaskTest, newTaskTest);
      testTaskList[0] = newTaskTest;
      assert.notStrictEqual(testTaskList[0], originalTaskTest);
      assert.strictEqual(testTaskList[0], newTaskTest);
    })

  })
});
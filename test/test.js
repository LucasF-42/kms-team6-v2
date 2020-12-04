'esversion: 6';

const assert = require('assert');
const backend = require('../backend');
const Task = backend.Task;
const priorities = backend.priorities;

describe('Backend', function() {
  describe('#Task.constructor', function() {
    it('creates a task', function() {
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
});
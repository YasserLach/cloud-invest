const { db } = require('../firebase-config');
const { validateTask } = require('../taskModel/Task');


const addNewTask = async (req,res) =>{
    try{
        const { error, value } = validateTask(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
          }
          try {
            const task = await db.collection('tasks').add(value);
            res.status(201).send({ id: task.id, ...value });
          } catch (err) {
            res.status(500).send('Error creating task');
          }
    } catch (error) {
        res.send('Error adding task');
    }

}

const getTasks = async (req,res) =>{
    try{
        const tasks = await db.collection('tasks').get();
        const taskList = tasks.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(taskList);
    } catch (error) {
        res.send('Error getting tasks');
    }
}


const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await db.collection('tasks').doc(taskId).get();
      
      if (!task.exists) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const deletedTask = await db.collection('tasks').doc(taskId).delete();
      res.status(200).json({ message: "Task deleted successfully" }); // send JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      
      const { error, value } = validateTask(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const taskRef = db.collection('tasks').doc(taskId);
      const taskSnapshot = await taskRef.get();
      if (!taskSnapshot.exists) {
        return res.status(404).send('Task not found');
      }
  
      await taskRef.update(value);
      const updatedTaskSnapshot = await taskRef.get();
      res.status(200).send({ id: updatedTaskSnapshot.id, ...updatedTaskSnapshot.data() });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).send('Error updating task');
    }
  }

const getTaskById = async (req,res) =>{
    try{
        const taskId = req.params.id;
        const task = await db.collection('tasks').doc(taskId).get();
        if (!task.exists) {
            return res.status(404).send('Task not found');
          }
        res.status(200).send({ id: task.id, ...task.data() });
    } catch (error) {
        res.send('Error getting task');
    }
}

module.exports = {
    addNewTask,
    getTasks,
    deleteTask,
    updateTask,
    getTaskById
}
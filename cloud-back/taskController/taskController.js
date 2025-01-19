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
            res.status(201).send("Task added successfully");
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


const deleteTask = async (req,res) =>{
    try{
        const taskId = req.params.id;
        const task = await db.collection('tasks').doc(taskId).get();
        if (!task.exists) {
            return res.status(404).send('Task not found');
          }
            await db.collection('tasks').doc(taskId).delete();
            res.send('Task deleted successfully');
    } catch (error) {
        res.send('Error getting task');
    }
}

const updateTask = async (req,res) =>{
    try{
        const taskId = req.params.id;
        const { error, value } = validateTask(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
          }
        const task = await db.collection('tasks').doc(taskId).get();
        if (!task.exists) {
            return res.status(404).send('Task not found');
          }
        await db.collection('tasks').doc(taskId).update(value);
        res.send('Task updated successfully');
    } catch (error) {
        res.send('Error updating task');
    }
}

module.exports = {
    addNewTask,
    getTasks,
    deleteTask,
    updateTask
}
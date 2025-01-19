
const { Router } = require('express');

const taskCntr = require('../taskController/taskController');

const router = Router();

router.post('/', taskCntr.addNewTask);
router.get('/', taskCntr.getTasks);
router.delete('/:id', taskCntr.deleteTask);
router.put('/:id', taskCntr.updateTask);

module.exports = router;
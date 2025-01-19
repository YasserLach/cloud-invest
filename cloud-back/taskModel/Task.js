
const Joi = require('joi');


const taskEntity = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});


const validateTask = (task) => {
  return taskEntity.validate(task);
};

module.exports = { validateTask };

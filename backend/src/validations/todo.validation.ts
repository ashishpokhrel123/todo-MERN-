const Joi = require("joi");
const todoSchema = Joi.object({
  task: Joi.string().required(),
 
});

module.exports = todoSchema;

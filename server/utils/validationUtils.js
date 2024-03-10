const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validateTodo = data => {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    userId: Joi.string().required().label("userId"),
  });
  return schema.validate(data);
};

const validateUser = data => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = {validateTodo, validateUser};

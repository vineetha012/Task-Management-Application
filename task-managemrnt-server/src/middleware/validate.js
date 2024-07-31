const joi =require('joi');
const { pick } = require('../utils/common') ;

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'files']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: true })
    .validate(object);

  if (error) {
    const errorMessage = error.details.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.message.replace(/\"/g, '');
  }, '');
    return res.status(400).json({
      statusCode: 400,
      success: false,
      error: {
        message: errorMessage
      }
  });
  }
  Object.assign(req, value);
  return next();
};

module.exports= validate;

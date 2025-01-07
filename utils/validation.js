const Joi = require('joi');

const validatePreferences = (data) => {
    const schema = Joi.object({
        theme: Joi.string().valid('dark', 'light').required(),
        notifications: Joi.string().valid('enabled', 'disabled').required(),
        language: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { validatePreferences };
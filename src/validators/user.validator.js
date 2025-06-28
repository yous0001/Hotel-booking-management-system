import Joi from 'joi';

export const registerSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters',
            'string.max': 'Name must be at most 30 characters',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email is required',
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password is required',
        }),
    })
};

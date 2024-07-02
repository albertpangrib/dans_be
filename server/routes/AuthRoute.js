const Joi = require('joi');
const AuthController = require('../controllers/AuthController');
const router = require('express').Router();
const RequestValidation = require('../middlewares/RequestValidation')

router.post(
    '/login',
    RequestValidation.validateRequest(
    {
        body: Joi.object().keys({
            username: Joi.string().min(1).required(),
            password: Joi.string().min(1).required()
        })
    },
        'body'
    ),
    AuthController.login
);
module.exports = router;
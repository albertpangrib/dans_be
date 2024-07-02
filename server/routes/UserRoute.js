const auth = require("../middlewares/Auth");
const RequestValidation = require("../middlewares/RequestValidation");
const Joi = require("joi");
const UserController = require("../controllers/UserController");

const router = require("express").Router();

router.get(
    '',
    auth,
    RequestValidation.validateRequest(
        {
            query: Joi.object().keys({
                fullName: Joi.string().optional(),
                username: Joi.string().optional(),
                email: Joi.string().optional(),
                createdAt: Joi.string().optional()
            })
        },
        'query'
    ),
    UserController.getUserList
);

module.exports = router;
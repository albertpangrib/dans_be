const Joi = require('joi');
const router = require('express').Router();
const RequestValidation = require('../middlewares/RequestValidation');
const DansController = require('../controllers/DansController');
const auth = require("../middlewares/Auth");

router.get(
    '',
    auth,
    RequestValidation.validateRequest(
        {
            query: Joi.object().keys({
                description: Joi.string().min(1).optional(),
                location: Joi.string().min(1).optional(),
                full_time: Joi.boolean().optional(),
                page: Joi.number().min(1).optional()
            })
        },
        'query'
    ),
    DansController.getDansList
);

router.get(
    '/:id',
    auth,
    RequestValidation.validateRequest(
        {
            params: Joi.object().keys({
                id: Joi.string().min(1).required()
            })
        },
        'params'
    ),
    DansController.getDansDetail
);

module.exports = router;
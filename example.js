'use strict';

const express = require('express');
const router = express.Router();
const {Email, User} = require('@models');
const logger = require('@logger');
const {validateBody} = require('@middlewares/auth/code');
const {parseEmail} = require('@utils/parse-email');
const randomCode = require('@utils/random-code');

/**
 * @name Resend validation code
 * @description Resend email validation code
 * @route {POST} /api/resend
 * @bodyparam {string} [email] User email
 */
router.post('/resend', validateBody, (req, res) => {
    return User.findOne({email: parseEmail(req.body.email)})
        .then((user) => {
            if (!user) {
                throw new Error('user_not_found');
            }
            user.code = randomCode(8);
            return user.save();
        })
        .then((user) => {
            return Email.create({
                type: 'code-resend',
                user: user._id,
                mail: user.email,
                code: user.code
            });
        })
        .then(() => {
            return res.status(200).json({});
        })
        .catch((error) => {
            if(error.message === 'user_not_found') {
                return res.status(400).json({
                    errorCode: 'user_not_found',
                    userMessage: 'User not found'
                });
            }
            logger.error(`POST /api/code/resend general error: ${error.message}`);
            return res.status(500).json({
                errorCode: 'internal_error',
                userMessage: 'Internal error'
            });
        });
});

/**
 * @name Testing declaration 2
 * @description Other declaration testing
 * @route {GET} /api/testing
 * @queryparam {string} [name] User name
 * @queryparam (optional) {number} [age] User age
 * @response {200} Caso correcto
 * @responsebody {string} [name1] User name 1
 * @responsebody {string} [name2] User name 2
 * @responsebody {string} [name3] User name 3
 * @responsebody {string} [name4] User name 4
 * @responsebody {string} [name5] User name 5
 * @response {400} Falta el nombre
 * @responsebody {string} [code] Error code
 * @responsebody {string} [message] Error message
 */


/**
 * @name Testing declaration 3
 * @description Other declaration testing
 * @route {PUT} /api/testingbad
 * @queryparam User name
 */
module.exports = router;

/*
hola
 */

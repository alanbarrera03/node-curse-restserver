const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { login } = require('../controllers/auth');

const router = Router();


router.post('/login', [
    check( 'email', 'email is required' ).isEmail(),
    check( 'password', 'password is required' ).not().isEmpty(),
    validateFields
], login );


module.exports = router;
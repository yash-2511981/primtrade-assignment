const express = require('express');
const { isUserAllowed } = require('../middleware/rolevalidation');

const router = express.Router();

router.use('/users', isUserAllowed(['user', 'admin']), require('./user'));
router.use('/admin', isUserAllowed(['admin']), require('./admin'));

module.exports = router;
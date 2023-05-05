const router = require('express').Router();

const { notFound } = require('../controllers/notFound');

router.all('/*', notFound);

module.exports = router;

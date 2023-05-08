const notFoundRouter = require('express').Router();

const { notFound } = require('../controllers/notFound');

notFoundRouter.all('/*', notFound);

module.exports = { notFoundRouter };

const routerNotFound = require('express').Router();

const { notFound } = require('../controllers/notFound');

routerNotFound.all('/*', notFound);

module.exports = routerNotFound;

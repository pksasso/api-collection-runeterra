const { Router } = require('express');
const CollectionController = require('../controllers/collectionController');

const routes = Router();

routes.get('/collection', CollectionController.index);

module.exports = routes;
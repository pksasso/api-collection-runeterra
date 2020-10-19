const { Router } = require('express');
const CollectionController = require('../controllers/collectionController');
const CardsBySetController = require('../controllers/cardsBySetController');
const CollectionBySet = require('../controllers/collectionBySetController');

const routes = Router();

routes.get('/collection', CollectionController.index);
routes.get('/setcollection', CollectionBySet.index);
routes.get('/setmissing', CardsBySetController.index);

module.exports = routes;
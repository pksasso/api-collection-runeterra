// const Card = require('../models/cardModel');
const {deckDecoder} = require('../utils/decodeDeck');
const {collectionPlayerQuantity} = require('../utils/totalCollection');
const fullSet = require('../data/fullset-pt_br.json');

module.exports = {
  async index (req, res) {
    const code = req.query.code;
    const decodedDeck = deckDecoder(code);
    const result = collectionPlayerQuantity(decodedDeck);
    return res.json(result)
  },
} 
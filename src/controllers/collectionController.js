// const Card = require('../models/cardModel');
const {deckDecoder} = require('../utils/decodeDeck');
const {finalTotalResult} = require('../utils/totalCollection');
const fullSet = require('../data/fullset-pt_br.json');

module.exports = {
  async index (req, res) {
    const code = req.query.code;
    let decodedDeck;

    try{
      decodedDeck = deckDecoder(code);
    }catch(err){
      return res.json({error: 'Invalid Code'});
    }

    const result = finalTotalResult(decodedDeck);
    
    return res.json(result)
  },
} 
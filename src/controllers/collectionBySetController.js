const fullSet = require('../data/fullset-pt_br.json');
const {totalCountSeparatedBySet} = require('../utils/missingBySet');
const {collectionPlayerQuantity} = require('../utils/totalCollection');
const {deckDecoder} = require('../utils/decodeDeck');

module.exports = {

  async index (req, res) {
    const code = req.query.code;
    let decodedDeck;
    
    try{
      decodedDeck = deckDecoder(code);
    }catch(err){
      return res.json({error: 'Invalid Code'});
    }
    const result = totalCountSeparatedBySet(collectionPlayerQuantity(decodedDeck), fullSet);

    return res.json(result);
  },
}
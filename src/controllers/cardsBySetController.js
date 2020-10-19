const fullSet = require('../data/fullset-pt_br.json');
const {collectionMissing, separateBySet} = require('../utils/missingBySet');
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
    
    const missing = collectionMissing(decodedDeck, fullSet);
    const separeted = separateBySet(missing, fullSet);

    return res.json(separeted);
  },
}
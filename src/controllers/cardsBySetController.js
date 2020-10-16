const fullSet = require('../data/fullset-pt_br.json');
const {collectionMissing, separateBySet} = require('../utils/totalCollectionBySet');
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
    
    const missing = collectionMissing(decodedDeck);
    const separeted = separateBySet(missing);

    return res.json(separeted);
  },
}
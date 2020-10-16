const Card = require('../models/cardModel');

module.exports = {

  async index (req, res) {
    const set1 = await Card.find({set: 'Set1'});
    const set2 = await Card.find({set: 'Set2'});
    const set3 = await Card.find({set: 'Set3'});
    return res.json([set1,set2,set3])
  },
}
const runeterra = require('runeterra');

const deckDecoder = ( deckCode ) => {
  const decodedDeck = runeterra.DeckEncoder.decode(deckCode);
  return decodedDeck;
}

module.exports = { deckDecoder }
const rewire = require('rewire');
const {deckDecoder} = require('../utils/decodeDeck');

const fullset = require('../data/fullset-pt_br.json');

const {rarityCost} = require('../utils/rarityCost');
const {finalTotalResult} = require('../utils/totalCollection');

const totalCollection = rewire('../utils/totalCollection.js');
const collectionFullQuantity = totalCollection.__get__('collectionFullQuantity');
const collectionFullCost = totalCollection.__get__('collectionFullCost');
const collectionPlayerQuantity = totalCollection.__get__('collectionPlayerQuantity');

const mock = [{
  "cardCode": "01IO012",
  "name": "Disciplinas Gêmeas",
  "rarity": "Common",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
  "set": "Set1"
},
{
  "cardCode": "01IO015",
  "name": "Yasuo",
  "rarity": "Champion",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO015.png",
  "set": "Set1"
},
{
  "cardCode": "01IO020",
  "name": "Guardiã das Máscaras",
  "rarity": "Common",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO020.png",
  "set": "Set3"
},
{
  "cardCode": "01IO045",
  "name": "Arauto da Primavera",
  "rarity": "Common",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO045.png",
  "set": "Set1"
},
{
  "cardCode": "01IO008",
  "name": "Fada das Lâminas",
  "rarity": "Rare",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO008.png",
  "set": "Set2"
},
{
  "cardCode": "01IO040",
  "name": "Lâmina Vital Kinkou",
  "rarity": "Common",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO040.png",
  "set": "Set1"
},
{
  "cardCode": "01IO041",
  "name": "Karma",
  "rarity": "Champion",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO041.png",
  "set": "Set2"
},
{
  "cardCode": "01IO011",
  "name": "Retorno",
  "rarity": "Epic",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO011.png",
  "set": "Set1"
},
{
  "cardCode": "01IO009",
  "name": "Zed",
  "rarity": "Champion",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO009.png",
  "set": "Set3"
}]

const mock2 = [{
  "cardCode": "01IO012",
  "name": "Disciplinas Gêmeas",
  "rarity": "Common",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
  "set": "Set1"
},
{
  "cardCode": "01IO012",
  "name": "Disciplinas Gêmeas",
  "rarity": "Epic",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
  "set": "Set1"
},
{
  "cardCode": "01IO012",
  "name": "Disciplinas Gêmeas",
  "rarity": "Rare",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
  "set": "Set1"
},
{
  "cardCode": "01IO012",
  "name": "Disciplinas Gêmeas",
  "rarity": "Champion",
  "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
  "set": "Set1"
},
]

test('Calculate total quantity of cards', () => {
  const expectedResult = 27;
  expect(collectionFullQuantity(mock)).toBe(expectedResult);
});

test('Calculate total cost of cards', () => {
  const expectedResult = 13800;
  expect(collectionFullCost(mock2)).toBe(expectedResult);
});

test('Calculate player quantity cards lenght', () => {
  const deckPlayer = deckDecoder('CEBQIAQDAEDQQCIFAIDAICA2DUWQEAIDFY3QEAICAMBQEAQGDQTACAIBAMLA');
  const expectedResult = 579;
  const data = collectionPlayerQuantity(deckPlayer).length;
  expect(data).toBe(expectedResult);
});

test('Calculate player quantity cards, exists count', () => {
  const deckPlayer = deckDecoder('CEBQIAQDAEDQQCIFAIDAICA2DUWQEAIDFY3QEAICAMBQEAQGDQTACAIBAMLA');
  const expectedResult = true;
  const data = collectionPlayerQuantity(deckPlayer);
  expect(Number.isInteger(data[0].count)).toEqual(expectedResult);
});

test('Calculate player quantity cards, exists missing', () => {
  const deckPlayer = deckDecoder('CEBQIAQDAEDQQCIFAIDAICA2DUWQEAIDFY3QEAICAMBQEAQGDQTACAIBAMLA');
  const expectedResult = true;
  const data = collectionPlayerQuantity(deckPlayer);
  expect(Number.isInteger(data[0].missing)).toEqual(expectedResult);
});

test('Return final result', () => {
  const deckPlayer = deckDecoder('CEBQIAQDAEDQQCIFAIDAICA2DUWQEAIDFY3QEAICAMBQEAQGDQTACAIBAMLA');
  const expectedResult = {
    "totalCost": 953100,
    "totalQuantity": 1737,
    "totalCostMissing": 922600,
    "totalQuantityMissing": 1697,
    "commonMissing": 763,
    "rareMissing": 563,
    "epicMissing": 242,
    "championMissing": 129,
    "percentageComplete": 3.2
  }
  const data = finalTotalResult(deckPlayer);
  expect(data).toEqual(expectedResult);
});
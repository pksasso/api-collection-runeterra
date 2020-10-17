const rewire = require('rewire');

const {separateBySet, collectionMissing} = require('../utils/totalCollectionBySet');

const totalCollectionBySet = rewire('../utils/totalCollectionBySet.js');
const totalSetsCount = totalCollectionBySet.__get__('totalSetsCount');

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
  "set": "Set4"
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
  "set": "Set5"
}]

const playerDeckMock = [{
  "code": "01IO012",
  "count": 2,
},
{
  "code": "01IO015",
  "count": 1,
}]

const fullDeckMock = [
  {
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
    "set": "Set1"
  },
]

const missingMock = [
   {
     "cardCode": "01IO012",
     "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
     "count": 2,
     "missing": 1,
     "name": "Disciplinas Gêmeas",
     "rarity": "Common",
     "set": "Set1",
  },
  {
     "cardCode": "01IO015",
     "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO015.png",
     "count": 1,
     "missing": 2,
     "name": "Yasuo",
     "rarity": "Champion",
     "set": "Set1",
   },
   {
     "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO020.png",
     "cardCode": "01IO020",
     "count": 0,
     "missing": 3,
     "name": "Guardiã das Máscaras",
     "rarity": "Common",
     "set": "Set1",
  },
]

const missingSetsMock = [
  {
    "cardCode": "01IO012",
    "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO012.png",
    "count": 2,
    "missing": 1,
    "name": "Disciplinas Gêmeas",
    "rarity": "Common",
    "set": "Set1",
 },
 {
    "cardCode": "01IO015",
    "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO015.png",
    "count": 1,
    "missing": 2,
    "name": "Yasuo",
    "rarity": "Champion",
    "set": "Set2",
  },
  {
    "asset": "http://dd.b.pvp.net/1_12_0/set1/pt_br/img/cards/01IO020.png",
    "cardCode": "01IO020",
    "count": 0,
    "missing": 3,
    "name": "Guardiã das Máscaras",
    "rarity": "Common",
    "set": "Set3",
 },
]


test('Calculate total card sets', () => {
  const expectedResult = 5;
  expect(totalSetsCount(mock)).toBe(expectedResult);
});

test('Calculate missing cards', () => {
  expect(collectionMissing(playerDeckMock, fullDeckMock)).toEqual(missingMock);
});

test('Separate cards by set', () => {
  const setsSize = separateBySet(missingSetsMock, missingSetsMock);
  expect(setsSize.length).toBe(3);
});

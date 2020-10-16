const fullSet = require('../data/fullset-pt_br.json');
const {rarityCost} = require('./rarityCost');

// let playerCardsObtained;

const collectionFullCost = (set) => {
  let totalCost = 0;
  set.map(card=> {
    totalCost += rarityCost[card.rarity] * 3;
  })
  return totalCost;
}

const collectionFullQuantity = (set) => {
  return set.length * 3;
}

const collectionPlayerQuantity = (playerCollection) => {
  let playerFullSet = Object.assign([], fullSet);
  playerCollection.map(card => {
    const index = playerFullSet.findIndex(innerCard => innerCard.cardCode === card.code )
    
    const newCard = {
      cardCode : playerFullSet[index].cardCode,
      name: playerFullSet[index].name,
      rarity: playerFullSet[index].rarity,
      asset: playerFullSet[index].asset,
      set: playerFullSet[index].set,
      count: card.count,
      missing: 3 - card.count
    }
    
    playerFullSet[index] = newCard;
  })

  playerFullSet.forEach(card => {
    if(!card.count){
      card.count = 0;
      card.missing = 3;
    }
  } )

  // playerCardsObtained = Object.assign([], playerFullSet);

  return playerFullSet;
}

const finalTotalResult = (playerSet) => {
  let commonMissing = 0;
  let rareMissing = 0;
  let epicMissing = 0;
  let championMissing = 0;

  let playerSetQuantity =  collectionPlayerQuantity(playerSet)
  let totalCost = collectionFullCost(fullSet);
  let totalQuantity = collectionFullQuantity(fullSet);

  let totalQuantityMissing = 0;
  let totalCostMissing = 0;

  let percentageComplete = 0;

  playerSetQuantity.map(card => {
    if(card.rarity === 'Common'){
      commonMissing += card.missing;
    }
    if(card.rarity === 'Rare'){
      rareMissing += card.missing;
    }
    if(card.rarity === 'Epic'){
      epicMissing += card.missing;
    }
    if(card.rarity === 'Champion'){
      championMissing += card.missing;
    }
  })

  totalQuantityMissing = commonMissing + rareMissing + epicMissing + championMissing;
  
  totalCostMissing = (rarityCost.Common * commonMissing) + (rarityCost.Rare * rareMissing) + 
  (rarityCost.Epic * epicMissing) + (rarityCost.Champion * championMissing)

  percentageComplete = parseFloat(((totalCost-totalCostMissing)/(totalCost/100)).toFixed(1));

  const result = {
    totalCost,
    totalQuantity,
    totalCostMissing,
    totalQuantityMissing,
    commonMissing,
    rareMissing,
    epicMissing,
    championMissing,
    percentageComplete,
  }

  return result;
}



module.exports ={finalTotalResult};
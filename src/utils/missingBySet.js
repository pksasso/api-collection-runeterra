const set = require('../data/fullset-pt_br.json');
const rarityCost = require('./rarityCost');

const {collectionFullQuantity,collectionFullCost} = require('./totalCollection');

const totalSetsCount = (set) => {
  let setsSize = 0;
  while (true) {
    const found = set.find(card => card.set === `Set${setsSize+1}`);
    if(found){
      setsSize += 1;
    }else{
      break
    }
  }
  return setsSize
}

const collectionMissing = (playerSet, fullSet) => {
  let playerMissing = [];

  fullSet.map(original => {
    const finded = playerSet.find(playerCard => original.cardCode === playerCard.code);
    if(!finded){
      original.count = 0;
      original.missing = 3;
    }else{
      original.count = finded.count;
      original.missing = 3 - finded.count;
    }

    if(original.missing > 0) {
      playerMissing.push(original);
    }
  });
  return playerMissing;
}

const separateBySet = (set, fullSet) => {
  let temp = [];
  let separetedSet = [];

  const maxSetNumber = totalSetsCount(fullSet);

  for(let setNumber = 0; setNumber < maxSetNumber; setNumber++){
    set.map(card => {
      if(card.set === `Set${setNumber+1}`){
        temp.push(card);
      }
    });
    
    separetedSet.push(temp);
    temp = [];
  }

  return separetedSet;
}

const removeObtained = (playerSet, fullSet ) => {

  let organizedSet = [];
  let temp = [];

  const maxSetNumber = totalSetsCount(fullSet);

  for(let i = 0 ; i < maxSetNumber; i ++ ){
    playerSet[i].map(card => {
      if(card.missing > 0){
        temp.push(card)
      }

    })
    organizedSet.push(temp);
    temp = [];
  }
  return organizedSet;
}

const sumMissingCards = (cardSet) => {
  return cardSet.reduce((a, b) => (a + b.missing) ,0);
}

const sumMissingCost = (common, rare, epic, champion, setNumber) => {
  return common[setNumber] * rarityCost.Common + rare[setNumber] * rarityCost.Rare + 
  epic[setNumber] * rarityCost.Epic + 
  champion[setNumber] * rarityCost.Champion;;
}

const sumMissingQuatity = (common, rare, epic, champion, setNumber) => {
  return common[setNumber]+
  rare[setNumber]+ epic[setNumber]+ champion[setNumber]
}

const percentageSet = (missing, total) => {
  return parseFloat(((total-missing)/(total/100)).toFixed(1));
}

const totalCountSeparatedBySet = (playerSet, fullSet) => {
  const maxSetNumber = totalSetsCount(fullSet);
  const separetedSet = separateBySet(playerSet, fullSet)
  const onlyMissingSet = removeObtained(separetedSet, fullSet);

  let totalSetQuantity = [];
  let totalSetCost = []; 

  let commonMissingQuantity = [];
  let rareMissingQuantity = [];
  let epicMissingQuantity = [];
  let championMissingQuantity = [];
 
  let setMissingQuantity = [];
  let setMissingCost = [];

  let setPercentageComplete = [];

  let result = [];

  for(let setNumber = 0; setNumber < maxSetNumber ; setNumber++){
    let commonTemp =[];
    let rareTemp =[];
    let epicTemp =[];
    let championTemp =[];

    onlyMissingSet[setNumber].map(card => {
      
      if(card.rarity === 'Common'){
        commonTemp.push(card);
      }
      if(card.rarity === 'Rare'){
        rareTemp.push(card);
      }
      if(card.rarity === 'Epic'){
        epicTemp.push(card);
      }
      if(card.rarity === 'Champion'){
        championTemp.push(card);
      }
    })
    
    commonMissingQuantity.push(sumMissingCards(commonTemp, setNumber));
    rareMissingQuantity.push(sumMissingCards(rareTemp, setNumber));
    epicMissingQuantity.push(sumMissingCards(epicTemp, setNumber));
    championMissingQuantity.push(sumMissingCards(championTemp, setNumber));
    
    setMissingCost.push(sumMissingCost(commonMissingQuantity, rareMissingQuantity, 
      epicMissingQuantity, championMissingQuantity, setNumber));
      
    setMissingQuantity.push(sumMissingQuatity(commonMissingQuantity,
      rareMissingQuantity, epicMissingQuantity, championMissingQuantity, setNumber));

    totalSetQuantity.push(collectionFullQuantity(separetedSet[setNumber]));

    totalSetCost.push(collectionFullCost(separetedSet[setNumber]));
   
    setPercentageComplete.push(percentageSet(setMissingCost[setNumber], totalSetCost[setNumber]))

    commonTemp =[];
    rareTemp =[];
    epicTemp =[];
    championTemp =[];

  }

  for(let setNumber = 0; setNumber < maxSetNumber ; setNumber++){
    let resultTemp = {
      setNumber : setNumber+1,
      totalQuantity: totalSetQuantity[setNumber],
      totalCost: totalSetCost[setNumber],
      totalQuantityMissing: setMissingQuantity[setNumber],
      totalCostMissing: setMissingCost[setNumber],
      percentageComplete: setPercentageComplete[setNumber],
      commonMissing: commonMissingQuantity[setNumber],
      rareMissing: rareMissingQuantity[setNumber],
      epicMissing: epicMissingQuantity[setNumber],
      championMissing: championMissingQuantity[setNumber],
    }
    result.push(resultTemp);
  }

  return result;
}

module.exports = { collectionMissing, separateBySet, totalCountSeparatedBySet };
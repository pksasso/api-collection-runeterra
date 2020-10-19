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

const totalCountSeparatedBySet = (playerSet, fullSet) => {
  const maxSetNumber = totalSetsCount(fullSet);
  const separetedSet = separateBySet(playerSet, fullSet)
  const onlyMissingSet = removeObtained(separetedSet, fullSet);

  let totalSetQuantity = [];
  let totalSetCost = []; 

  let commonMissing = [];
  let rareMissing = [];
  let epicMissing = [];
  let championMissing = [];

  let commonMissingQuantity = [];
  let rareMissingQuantity = [];
  let epicMissingQuantity = [];
  let championMissingQuantity = [];
 
  let setMissingQuantity = [];
  let setQuantity = [];
  let setQuantityMissing = [];
  let setCost = [];

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

    commonMissing.push(commonTemp);
    rareMissing.push(rareTemp);
    epicMissing.push(epicTemp);
    championMissing.push(championTemp);

    commonTemp =[];
    rareTemp =[];
    epicTemp =[];
    championTemp =[];

  }

  for(let setNumber = 0; setNumber < maxSetNumber ; setNumber++){
    
    commonMissingQuantity.push(commonMissing[setNumber].reduce((a, b) => (a + b.missing) ,0));
    rareMissingQuantity.push(rareMissing[setNumber].reduce((a, b) => (a + b.missing) ,0));
    epicMissingQuantity.push(epicMissing[setNumber].reduce((a, b) => (a + b.missing) ,0));
    championMissingQuantity.push(championMissing[setNumber].reduce((a, b) => (a + b.missing) ,0));
    
    setMissingQuantity.push(commonMissingQuantity[setNumber]+
      rareMissingQuantity[setNumber]+ epicMissingQuantity[setNumber]+ championMissingQuantity[setNumber]);

    setCost.push(commonMissingQuantity[setNumber] * rarityCost.Common + 
      rareMissingQuantity[setNumber] * rarityCost.Rare + 
      epicMissingQuantity[setNumber] * rarityCost.Epic + 
      championMissingQuantity[setNumber] * rarityCost.Champion)
    
    totalSetQuantity.push(collectionFullQuantity(separetedSet[setNumber]));

    totalSetCost.push(collectionFullCost(separetedSet[setNumber]));
  }

  for(let setNumber = 0; setNumber < maxSetNumber ; setNumber++){
    let resultTemp = {
      setNumber : setNumber+1,
      totalQuantity: totalSetQuantity[setNumber],
      totalCost: setCost[setNumber],
      totalQuantityMissing: setMissingQuantity[setNumber],
      totalCostMissing: setCost[setNumber],
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
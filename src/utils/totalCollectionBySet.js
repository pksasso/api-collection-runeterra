const fullSet = require('../data/fullset-pt_br.json');

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

const collectionMissing = (playerSet) => {
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

const separateBySet = (set) => {
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

module.exports = { collectionMissing, separateBySet };
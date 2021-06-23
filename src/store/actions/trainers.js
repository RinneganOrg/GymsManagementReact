export function setTrainers(trainers) {
  return { 
    type: 'SET_TRAINERS',
    trainers
  }
}

export function addTrainer(trainer) {
  return { 
    type: 'ADD_TRAINER',
    trainer
  }
}

export function editTrainer(trainer) {
  return {
    type: 'EDIT_TRAINER',
    trainer
  }
}
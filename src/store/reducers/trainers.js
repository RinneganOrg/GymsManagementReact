const initialState = {
  trainers: [
    { name: "Ben Chilwell", age: 22 },
    { name: "Reece James", age: 21 }]
}

export default function addTrainer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TRAINERS':
      return { ...state, trainers: action.trainers }
    case 'ADD_TRAINER':
      return { ...state, trainers: [...state.trainers, action.trainer] }
    default:
      return state
  }
}
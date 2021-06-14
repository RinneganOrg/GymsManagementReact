const initialState = { trainers: [] }

export default function addTrainer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TRAINERS':
      return {...state, trainers: action.trainers }
    case 'ADD_TRAINER':
      return {...state, trainers: [...state.trainers, action.trainer] }
    default:
      return state
  }
}
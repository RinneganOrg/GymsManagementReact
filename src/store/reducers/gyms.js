const initialState = {
  gyms: [
    { name: "WorldClass", address: "Street name" },
    { name: "FitClass", address: "Street name2" }]
}

export default function addGym(state = initialState, action) {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'ADD_GYM':
      return { ...state, gyms: [...state.gyms, action.gym] }
    case 'SET_GYMS':
      return { ...state, gyms: action.gyms }
    default:
      return state
  }
}
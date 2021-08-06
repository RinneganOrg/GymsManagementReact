const initialState = {
  gyms: [],
  currentGym: null
}
export default function addGym(state = initialState, action) {
  switch (action.type) {
    case 'ADD_GYM':
      return { ...state, gyms: [...state.gyms, { ...action.gym, id: state.gyms.length + 1 }] }
    case 'SET_GYMS':
      return { ...state, gyms: action.gyms }
    case 'SET_GYM':
      return { ...state, currentGym: action.gym }
    case 'EDIT_GYM':
      return { ...state, gyms: state.gyms.map((gym) => gym._id === action.gym._id ? action.gym : gym) }
    default:
      return state
  }
}
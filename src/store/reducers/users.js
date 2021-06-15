const initialState = {
  users: [
    { name: "Alice Toader", age: 22 },
    { name: "Ana Petre", age: 21 }]
}

export default function addUser(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.user] }
    default:
      return state
  }
}
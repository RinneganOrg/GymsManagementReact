const initialState = {
  products: [
    { name: "Treadmill", price: 1000 },
    { name: "Weights", price: 60 }]
}

export default function addProduct(state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product] }
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }
    default:
      return state
  }
}
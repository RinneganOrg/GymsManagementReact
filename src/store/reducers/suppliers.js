const initialState = {
  suppliers: [
    { name: "Adidas", address: "Supplier street name" },
    { name: "Puma", address: "Supplier street name2" }
  ]
}

export default function addSupplier(state = initialState, action) {
  switch (action.type) {
    case 'SET_SUPPLIERS':
      return { ...state, suppliers: action.suppliers }
    case 'ADD_SUPPLIER':
      return { ...state, suppliers: [...state.suppliers, action.supplier] }
    default:
      return state
  }
}
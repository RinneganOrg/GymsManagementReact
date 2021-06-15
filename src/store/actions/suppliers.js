export function setSuppliers(suppliers) {
  return { 
    type: 'SET_SUPPLIERS',
    suppliers
  }
}

export function addSupplier(supplier) {
  return { 
    type: 'ADD_SUPPLIER',
    supplier
  }
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addSupplier } from '../../store/actions/suppliers'

const Suppliers = () => {

  const selectSuppliers = state => state.suppliers
  const dispatch = useDispatch()
  const onAddSupplier= () => dispatch(addSupplier('Nike'))
  const suppliers = useSelector(selectSuppliers)
  const showStore = () => console.log(suppliers)

  useEffect(
    () => console.log("hi", suppliers),
    [suppliers],
  );

  return (
    <div>
      <h2>Suppliers</h2>
      <button onClick={onAddSupplier}>Add supplier</button>
      <button onClick={showStore}>Show store</button>
    </div>
  )
}
export default Suppliers;
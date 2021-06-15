import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../store/actions/products'

const Products = () => {

  const selectProducts = state => state.products
  const dispatch = useDispatch()
  const onAddProduct= () => dispatch(addProduct('Weights'))
  const products = useSelector(selectProducts)
  const showStore = () => console.log(products)

  useEffect(
    () => console.log("hi", products),
    [products],
  );

  return (
    <div>
      <h2>Products</h2>
      <button onClick={onAddProduct}>Add product</button>
      <button onClick={showStore}>Show store</button>
    </div>
  )
}
export default Products;
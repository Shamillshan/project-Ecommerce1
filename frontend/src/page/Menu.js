import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProducts from '../component/AllProducts'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
  const {filterby} = useParams()
  const dispatch = useDispatch()  
  const productData = useSelector((state) => state.product.productList)
 
  const productDisplay = productData.filter(el => el._id === filterby)[0]
  console.log(productDisplay)

  const handleAddCartProduct = (e)=>{
    dispatch(addCartItem(productDisplay))
  }

 
  return (
    <div className=' p-2 md:p-4'>
      <div className='w-full max-w-5xl  m-auto md:flex bg-white'>
          <div className=' max-w-lg bg-slate-100 overflow-hidden w-full p-4 '>
            <img src={productDisplay.image} className='hover:scale-105 transition-all h-full'/>
          </div>
          <div className='flex flex-col gap-1'>
          <h3 className="font-semibold text-slate-600  capitalize text-3xl ">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-normal text-2xl">{productDisplay.category}</p>
          <p className=" font-bold text-slate-700 md:text-xl">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className='flex gap-4'>
          <button className='bg-red-500 py-1 min-w-[100px] text-white rounded hover:bg-red-600 transition duration-300 '>
            Buy Now</button>
          <button onClick={handleAddCartProduct} className='bg-red-500 py-1 min-w-[100px] text-white rounded hover:bg-red-600 transition duration-300'>
            Add To Cart</button>
          </div>
          <div>
            <p className='text-red-500 font-medium'>Description : </p>
            <p>{productDisplay.description}</p>
          </div>
          </div>
      </div>

      <AllProducts heading={"Related Products"}/>
    </div>
  )
}

export default Menu
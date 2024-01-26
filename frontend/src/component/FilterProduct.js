import React from 'react'
import {FaHeadphonesSimple} from "react-icons/fa6"

const FilterProduct = ({category,onClick}) => {
  return (
    <div onClick={onClick}>
      <div className='text-3xl p-4 bg-red-500 rounded-full cursor-pointer'>
    <FaHeadphonesSimple />
    </div>
    <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct
import React from 'react'
import {FaHeadphonesSimple} from "react-icons/fa6"

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-4xl p-6 rounded-full cursor-pointer ${isActive ? "bg-red-700 text-white" : " bg-red-500"}`}>
    <FaHeadphonesSimple />
    </div>
    <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct
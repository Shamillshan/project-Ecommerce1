import React from 'react'

const Cardfeature = ({image,name,price,category,loading}) => {
  return ( 
<div className='w-full min-w-[100px] max-w-[200px] hover:shadow-2xl drop-shadow-lg py-5 px-4 cursor-pointer'>
    {
        image ? <>
             <div className='h-30'>
        <img src={image} className='h-full' alt={name} />
    </div>
    <h3 className="font-semibold text-slate-600 text-center capitalize mt-4">
        {name}
    </h3>
    <p className="text-center text-slate-500 font-normal">{category}</p>
    <p className="text-center font-bold text-slate-700">
        <span className="text-red-500">₹</span>
        <span>{price}</span>
    </p>
    <div className="flex justify-center items-center mt-1"> {/* Flexbox for centering */}
        <button className='bg-red-500 py-1 px-5 text-white rounded hover:bg-red-600 transition duration-300'>
            Add To Cart
        </button>
    </div>
        </>

        :
        <div className='min-h-[150px] flex justify-center  items-center'>
              <p>{loading}</p>
        </div>

    }
   
</div>

  )
}

export default Cardfeature
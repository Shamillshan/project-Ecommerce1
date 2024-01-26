import React, { useEffect, useState } from 'react'
import HomeCard from '../component/homeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../component/Cardfeature'
import FilterProduct from '../component/FilterProduct'


const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(0,5)
  const homeProductCartListGadgets = productData.filter(el => el.category === "headphones",[])
  console.log(homeProductCartListGadgets)

const loadingArray = new Array(4).fill(null)
const loadingArrayFeature = new Array(7).fill(null)

const categoryList = [...new Set(productData.map(el=>el.category))]
console.log(categoryList)


//filter data display
const [filterby,setFilterBy] = useState("")
const [dataFilter,setDataFilter] = useState([])

useEffect(()=>{
  setDataFilter(productData)
},[productData])


const handleFilterProduct = (category) => {
  const filter = productData.filter((el) => el.category.toLowerCase() === category.toLowerCase());
  setDataFilter(filter);
};



  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4'>

       <div className='md:w-1/2'>
       
         <h2 className='text-4xl md:text-7xl font-bold'>Keep the Noise out,or in  <span className='text-red-600 text-'>You Choose.</span></h2>
         <p className='py-3 text-base'>Portronics is a cutting-edge technology company specializing in the design, development, and manufacturing of premium audio gadgets. With a focus on enhancing auditory experiences,
          Portronics has established itself as a leading brand in the audio industry, particularly in the realm of headphones, earphones, earbuds, and neckbands.</p>
          <button className='font-bond bg-red-500 text-white px-4 py-1 rounded-md'>Order Now</button>
        </div>

      <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
         homeProductCartList[0] ? homeProductCartList.map(el => {
          return(
            <HomeCard
              key={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
            />
         )})
         :
         loadingArray.map((el,index)=>{
          return(
            <HomeCard
              key={index}
              loading = {"Loading..."}
              />
          )
          })
        }
      </div>
      </div>

      <div className=''>
        <h2 className='font-bold text-2xl text-slate-800 mb-3 underline '>Headphones</h2>
        <div className='flex gap-5'>
          {
           homeProductCartListGadgets[0] ? homeProductCartListGadgets.map(el =>{
              return(
                <CardFeature
                  key={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              )
            })

            : loadingArrayFeature.map((el) => (
            <CardFeature loading="Loading..."/>
            ))
          }
        </div>
    </div>
          
          <div className='my-5'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4 underline '>
            Your Product
            </h2>

            <div className=''>
            <div className='flex gap-4 justify-center '>
                 {
                  categoryList[0] && categoryList.map(el => {
                    return(
                      <FilterProduct category={el} onClick={()=>handleFilterProduct(el) }/>
                    )
                  })
                 }
            </div>

            <div className='flex flex-wrap justify-center gap-4 my-4'>
                 {
                  dataFilter.map(el => {
                    return(
                      <CardFeature
                        key={el._id}
                        image={el.image}
                        name={el.name}
                        category={el.category}
                        price={el.price}
                      />
                    )
                  })
                 }
            </div>
          </div>
    </div>
    </div>
  )
}

export default Home
import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import Cardfeature from "./CardFeature";
import { useSelector } from "react-redux";

const AllProducts = ({heading,loading}) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(filter);
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4 underline ">
        {heading}
      </h2>

    
        <div className="flex gap-4 justify-center ">
          {categoryList[0] ? (
            categoryList.map((el) => {
              return (
                <FilterProduct
                  category={el}
                  key={el}
                  isActive={el.toLowerCase() === filterby.toLowerCase()}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })
        ) : (
            <div className="min-h-[150px] flex justify-center  items-center">
            <p>Loading... </p>
          </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
            return (
              <Cardfeature
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                category={el.category}
                price={el.price}
              />
            );
          })
            :
            loadingArrayFeature.map((el,index)=> (
              <Cardfeature loading="Loading..." key={index+"allProduct"}/>
            ))}
        </div>
      </div>
  );
};

export default AllProducts;

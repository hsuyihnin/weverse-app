import React, { useEffect } from "react";

const ProductList = ({
  isSelected,
  filteredProducts,
  products,
  setRenderedProducts,
  filteredProductsByYear,

}) => {
  const productsToRender = isSelected ? filteredProducts : products.data;
  useEffect(() => {
    const renderedProducts = productsToRender;
    setRenderedProducts(renderedProducts);
  }, [productsToRender]);

  {
    // isFiltered &&
    //   filteredProductsByYear.map((product) => (
    //     <div key={product.id} className="product w-60">
    //       <img className="w-60 h-64 image m-0" src={product.image} alt="" />
    //       <h3 className="name">{product.name}</h3>

    //       <span>{product.price}</span>
    //     </div>
    //   ));
  }

  return productsToRender.map((product) => (
    <div key={product.id} className="product w-60">
      <img className="w-60 h-64 image m-0" src={product.image} alt="" />
      <h3 className="name">{product.name}</h3>

      <span>{product.price}</span>
    </div>
  ));
};

export default ProductList;

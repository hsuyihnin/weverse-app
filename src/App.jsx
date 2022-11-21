import React, { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./components/ProductList";

const categories = [
  {
    id: 1,
    name: "Album",
  },
  { id: 2, name: "DVD" },

  {
    id: 3,
    name: "BT21",
  },
];
const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

export default function App() {
  const [products, setProducts] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredProductsByYear, setFilteredProductsByYear] = useState(null);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts({
          ...products,
          isLoading: false,
          data: data,
        });
        setIsSelected(false);
      })
      .catch(() => setProducts({ ...products, hasError: true }));
  }, []);

  useEffect(() => {
    setfilteredProducts(
      products.data.filter((product) => product.category === selectedCategory)
    );
    setIsSelected(true);
  }, [selectedCategory]);

  useEffect(() => {
    setFilteredProductsByYear(
      renderedProducts.filter((product) => product.year === selectedYear)
    );

    console.log( renderedProducts );
    console.log(filteredProductsByYear)
  }, [selectedYear, renderedProducts]);
  return (
    <div className="flex">
      <div className="sidebar w-2/12">
        <div className="category">
          <h2>Product's Category</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="hover:cursor-pointer bg-slate-400 hover:bg-slate-300 py-2 text-center border-b border-gray-100"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="year">
          <h2>Filtered by :</h2>
          <ul>
            {years.map((year) => {
              return (
                <li
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                  }}
                  className="hover:cursor-pointer bg-slate-400 hover:bg-slate-300 py-2 text-center border-b border-gray-100"
                >
                  {year}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="list w-10/12 flex flex-wrap justify-center gap-10">
        {products.isLoading && <p>Loading...</p>}

        <ProductList
          isSelected={isSelected}
          filteredProducts={filteredProducts}
          products={products}
          filteredProductsByYear={filteredProductsByYear}
          setRenderedProducts={setRenderedProducts}
        />

        {products.hasError && <p>Something went wrong</p>}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useReducer, useEffect } from "react";
import axios from "axios";
import "./App.css";

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

// function productReducer(state, action) {
//   switch (action.type) {
//     case "SET_PRODUCT":
//       return {
//         ...state,
//         data: action.payload,
//         isLoading: false,
//       };
//     case "FAILURE":
//       return {
//         ...state,
//         isLoading: false,
//         hasError: true,
//       };
//     default:
//       throw new Error();
//   }
// }

export default function App() {
  // const [products, dispatch] = useReducer(productReducer, {
  //   data: [],
  //   isLoading: true,
  //   hasError: false,
  // });
  const [products, setProducts] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
        {/* <div className="filtered"></div> */}
      </div>
      <div className="list w-10/12 flex flex-wrap justify-center gap-10">
        {products.isLoading ? (
          <p>Loading...</p>
        ) : isSelected ? (
          filteredProducts.map((product) => {
            return (
              <div key={product.id} className="product w-60">
                <img
                  className="w-60 h-64 image m-0"
                  src={product.image}
                  alt=""
                />
                <h3 className="name">{product.name}</h3>

                <span>{product.price}</span>
              </div>
            );
          })
        ) : (
          products.data.map((product) => {
            return (
              <div key={product.id} className="product w-60">
                <img
                  className="w-60 h-64 image m-0"
                  src={product.image}
                  alt=""
                />
                <h3 className="name">{product.name}</h3>

                <span>{product.price}</span>
              </div>
            );
          })
        )}

        {products.hasError && <p>Something went wrong</p>}
      </div>
    </div>
  );
}

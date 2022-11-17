import React from "react";
import { useReducer, useEffect } from "react";
import axios from "axios";

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

function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCT":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case "SELECT_CATEGORY":
      return {
        ...state,
        data: state.data.filter(
          (product) => product.category === action.payload
        ),
        isLoading: false,
      };
    case "FAILURE":
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      throw new Error();
  }
}

export default function App() {
  const [products, dispatch] = useReducer(productReducer, {
    data: [],
    isLoading: true,
    hasError: false,
  });
  useEffect(() => {
    fetch(" http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "SET_PRODUCT",
          payload: data,
        })
      )
      .catch(() => dispatch({ type: "FAILURE" }));
  }, [products]);

  return (
    <div className="flex">
      <div className="sidebar w-2/12">
        <div className="category">
          <h2>Product's Category</h2>
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                onClick={() => {
                  dispatch({ type: "SELECT_CATEGORY", payload: category.id });
                }}
                className="hover:cursor-pointer bg-slate-400"
              >
                {category.name}
              </div>
            );
          })}
        </div>
        {/* <div className="filtered"></div> */}
      </div>
      <div className="list w-10/12 columns-sm">
        {products.isLoading ? (
          <p>Loading...</p>
        ) : (
          products.data.map((product) => {
            return (
              <div key={product.id} className="product w-60 mr-0">
                <img className="w-60 image m-0" src={product.image} alt="" />
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

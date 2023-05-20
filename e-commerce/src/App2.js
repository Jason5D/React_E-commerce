import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import searchIcon from "./search.svg";

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [colorScheme, setColorScheme] = useState("auto");

  useEffect(() => {
  async function fetchAPIProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  }
  fetchAPIProducts();
}, []);

useEffect(() => {
  const html = document.querySelector("html");
  html.dataset.colorScheme = colorScheme;
}, [colorScheme]);

const handleSearch = event => {
  const query = event.target.value;
  setSearchQuery(query);

  if (products.length > 0) {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredProducts(filtered);
}}

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredProducts([]);
    setShowAll(false);
  };

  // const productsToDisplay = showAll ? products : filteredProducts;
  const productsToDisplay = showAll ? products : filteredProducts;

  const handleColorSchemeChange = (event) => {
    const value = event.target.value;
    setColorScheme(value);

    if (value === "0") {
      document.documentElement.style.setProperty("--background-color", "#FFFFFF");
      document.documentElement.style.setProperty("--text-color", "#000000");
      document.documentElement.style.setProperty("--search-icon-color", "#000000");
    } else if (value === "1") {
      document.documentElement.style.setProperty("--background-color", "#222222");
      document.documentElement.style.setProperty("--text-color", "#FFFFFF");
      document.documentElement.style.setProperty("--search-icon-color", "#FFFFFF");
    } else {
      document.documentElement.style.removeProperty("--background-color");
      document.documentElement.style.removeProperty("--text-color");
      document.documentElement.style.removeProperty("--search-icon-color");
    }
  };


  return (
    <div  className={`App ${colorScheme === "1" ? "dark" : ""}`}>
      <fieldset className="lightdark">
        <label>
          <input
            type="radio"
            name="color-scheme"
            value="0"
            checked={colorScheme === "0"}
            onChange={handleColorSchemeChange}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            name="color-scheme"
            value="auto"
            checked={colorScheme === "auto"}
            onChange={handleColorSchemeChange}
          />
          Auto
        </label>
        <label>
          <input
            type="radio"
            name="color-scheme"
            value="1"
            checked={colorScheme === "1"}
            onChange={handleColorSchemeChange}
          />
          Dark
        </label>
      </fieldset>
      <div id="container" className="search-wrapper">
          <img className="search-icon" src={searchIcon} alt="Search Icon" />
          <input type="text" className="search-input" value={searchQuery} onChange={handleSearch} placeholder="Search products..." />
        </div>
      
      <button onClick={handleShowAll}>Show all products</button>
      <button onClick={handleClear}>Clear all products</button>
      {productsToDisplay.length > 0 ? (
        <Card products={productsToDisplay} />
      ) : (
        <p>Search for products or hit show all to see all products!</p>
      )}
    </div>
  );
}

export default App;
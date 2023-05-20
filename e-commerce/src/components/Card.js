import React from "react";
import "./Card.css";

function Card({ products }) {
  return (
    <div className="card">
      {products.map((product) => (
        <div key={product.id} className="card--item">
          <img
            className="card--image"
            src={product.image}
            alt={product.title}
          />
          <div className="card--content">
            <h2 className="card--title">{product.title}</h2>
            <p className="card--description">{product.description}</p>
            <div className="card--price-info">
              <p className="card--price">{`£${product.price}`}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;

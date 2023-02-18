import React, { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../contexts/product.context";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((data) => {
        return <ProductCard key={data.id} Product={data} />;
      })}
    </div>
  );
};

export default Shop;

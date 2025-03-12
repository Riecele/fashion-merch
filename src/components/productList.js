import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./productCard";

function ProductList() {
  const {productItems} = useSelector((state) => state.products);
  console.log("productItems", productItems);
  const styles = {
    productList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "10px",
      padding: "40px 20px",
      justifyItems: "center",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textAlign: "center",
      margin: "1rem 0",
    },
  };

  return (
    <React.Fragment>
      <h2 style={styles.title}>Products</h2>
      <div style={styles.productList}>
        {productItems && productItems.length > 0 ? (
          productItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default ProductList;
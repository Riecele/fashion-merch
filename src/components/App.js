import React from "react";
import Header from "./Header";
import Banner from "./banner";
import ProductList from "./productList";


const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <ProductList />
    </React.Fragment>
  );
};

export default App;

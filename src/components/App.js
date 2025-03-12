import React from "react";
import Header from "./Header";
import Banner from "./banner";
import ProductList from "./productList";
import StoreProvider from "./storeManager";
import Badges from "./badges";
import Footer from "./footer";

const App = () => {
  return (
    <StoreProvider>
      <Header />
      <Banner />
      <Badges />
      <ProductList />
      <Footer/>
    </StoreProvider>
  );
};

export default App;

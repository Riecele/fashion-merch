import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, addToCart, setSelectedProduct }) => {
  return (
    <section style={styles.products} id="products">
      <div style={styles.container}>
        <h2 style={styles.heading}>Our Products</h2>
        <div style={styles.productGrid}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              onClick={() => setSelectedProduct(product)}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {  
  featured: {
    padding: '50px 0',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    position: 'relative',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      fontSize: '1.8rem',
      marginBottom: '2rem',
    }
  },
  featuredProducts: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  productImage: {
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: '200px',
  },
  productInfo: {
    marginTop: '15px',
  },
  productName: {
    fontSize: '1.2rem',
    marginBottom: '8px',
  },
  price: {
    color: '#007bff',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '15px',
    borderRadius: '4px',
    width: '100%',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0069d9',
    }
  },
  products: {
    padding: '10px 0',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '10px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    }
  },
  category: {
    color: '#aaaaaa',
    fontSize: '0.9rem',
    marginBottom: '5px',
  },
};

export default ProductList;

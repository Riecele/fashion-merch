import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatting';

const ProductCard = ({ product, addToCart, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const styles = {
    productCard: {
      backgroundColor: '#2c2c2c',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      flex: '1',
      minWidth: '250px',
      maxWidth: '300px',
      margin: '10px',
      position: 'relative',
      overflow: 'hidden',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 15px 25px rgba(0, 0, 0, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.1)',
      '@media (maxWidth: 768px)': {
        minWidth: '200px',
      },
      '@media (maxWidth: 480px)': {
        minWidth: '100%',
      }
    },
    productImage: {
      width: '100%',
      borderRadius: '8px',
      objectFit: 'cover',
      height: '200px',
      transition: 'transform 0.5s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    },
    productInfo: {
      marginTop: '15px',
      padding: '0 10px',
    },
    productName: {
      fontSize: '1.2rem',
      marginBottom: '8px',
      fontWeight: 'bold',
      transition: 'color 0.3s ease',
      color: isHovered ? '#007bff' : '#ffffff',
    },
    price: {
      color: '#007bff',
      fontSize: '1.3rem',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    addToCartButton: {
      backgroundColor: isHovered ? '#0069d9' : '#007bff',
      color: '#ffffff',
      border: 'none',
      padding: '12px 20px',
      cursor: 'pointer',
      borderRadius: '50px',
      width: '100%',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      fontWeight: 'bold',
    },
    tag: {
      position: 'absolute',
      top: '10px',
      zIndex: '1',
      right: '10px',
      backgroundColor: '#ff6b6b',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0) scale(1)',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div 
      style={styles.productCard} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(product)}
    >
      <div style={styles.tag}>Featured</div>
      <img src={product.image} alt={product.name} style={styles.productImage} />
      <div style={styles.productInfo}>
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.price}>{formatCurrency(product.price)}</p>
        <button 
          style={styles.addToCartButton} 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = ({ products, addToCart, setSelectedProduct }) => {
  const styles = {
    featured: {
      padding: '70px 0',
      background: 'linear-gradient(180deg, #121212 0%, #1a1a1a 100%)',
    },
    container: {
      width: '90%',
      margin: '0 auto',
      maxWidth: '1200px',
      padding: '0 15px',
    },
    sectionTitle: {
      fontSize: '2.2rem',
      textAlign: 'center',
      marginBottom: '3rem',
      position: 'relative',
      fontWeight: 'bold',
      '@media (maxWidth: 768px)': {
        fontSize: '1.8rem',
        marginBottom: '2rem',
      }
    },
    titleUnderline: {
      display: 'block',
      width: '80px',
      height: '4px',
      backgroundColor: '#007bff',
      margin: '15px auto 0',
      borderRadius: '2px',
    },
    featuredProducts: {
      display: 'flex',
      gap: '25px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '@media (maxWidth: 768px)': {
        gap: '15px',
      }
    }
  };

  return (
    <section style={styles.featured}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>
          Featured Products
          <span style={styles.titleUnderline}></span>
        </h2>
        <div style={styles.featuredProducts}>
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product} 
              addToCart={addToCart}
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 1.8rem;
            margin-bottom: 2rem;
          }
          .featured-products {
            gap: 15px;
          }
        }
        @media (max-width: 480px) {
          .product-card {
            min-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;

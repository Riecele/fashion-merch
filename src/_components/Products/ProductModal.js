import React, { useEffect } from 'react';
import { formatCurrency } from '../../utils/formatting';

const ProductModal = ({ product, setSelectedProduct, addToCart }) => {
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
      padding: '10px',
    },
    modal: {
      backgroundColor: '#2c2c2c',
      padding: '25px',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '800px',
      position: 'relative',
      maxHeight: '85vh',
      overflow: 'auto',
      '@media (maxWidth: 768px)': {
        width: '90%',
        maxWidth: 'unset',
      }
    },
    closeModal: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '1.5rem',
      cursor: 'pointer',
      position: 'absolute',
      top: '15px',
      right: '15px',
      transition: 'color 0.3s ease',
    },
    modalContent: {
      display: 'flex',
      gap: '5px',
      flexWrap: 'wrap',
      '@media (maxWidth: 768px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    productImage: {
      flex: '1',
margin: '20px 0 0',

      '& img': {
        width: '100%',
        borderRadius: '5px',
      },
      '@media (maxWidth: 768px)': {
    
        marginBottom: '20px',
      }
    },
    productDetails: {
      flex: '1',

      '@media (maxWidth: 768px)': {
        width: '100%',
      }
    },
    description: {
      marginTop: '15px',
      color: '#cccccc',
      lineHeight: '1.7',
    },
    category: {
      color: '#999',
      fontSize: '0.9rem',
      marginBottom: '10px'
    },
    price: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '15px'
    },
    addToCartButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      marginTop: '20px',
      transition: 'background-color 0.3s ease',
    }
  }

  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [product]);

  return (
    <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeModal} onClick={() => setSelectedProduct(null)}>×</button>
        <div style={styles.modalContent}>
          <div style={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div style={styles.productDetails}>
            <h2>{product.name}</h2>
            <p style={styles.category}>{product.category}</p>
            <p style={styles.price}>{formatCurrency(product.price)}</p>
            <p style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button style={styles.addToCartButton} onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

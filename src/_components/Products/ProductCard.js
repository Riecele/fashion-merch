import React from 'react';
import { formatCurrency } from '../../utils/formatting';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, addQuantity } from '../../store/cartSlice';

const productCardStyle = {
  backgroundColor: '#2c2c2c',
  padding: '2px',
  borderRadius: '10px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  flex: '1',
  minWidth: '250px',
  maxWidth: '300px',
  margin: '10px',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
  '@media (max-width: 768px)': {
    minWidth: '150px',
  },
};

const ProductCard = ({ product, onClick, styles }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = Boolean(cartItem);
  
  const isOutOfStock = product.quantity === 0;
  
  return (
    <div 
      onClick={onClick}
      style={productCardStyle}
      key={product.id}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        style={styles.productImage} 
        referrerPolicy='no-referrer'
      />
      <div style={styles.productInfo}>
        <h3>{product.name}</h3>
        {product.category && <p style={styles.category}>{product.category}</p>}
        <p style={styles.price}>{formatCurrency(product.price)}</p>
        
        {isOutOfStock ? (
          <p style={{ 
            color: 'red', 
            fontWeight: 'bold', 
            backgroundColor: 'rgba(255, 0, 0, 0.1)', 
            padding: '5px',
            borderRadius: '5px',
            margin: '5px 0',
            ...(styles.outOfStock || {}) 
          }}>
            Out of Stock
          </p>
        ) : isInCart ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            margin: '10px 0' 
          }}>
            <button 
              style={{...styles.quantityButton, marginRight: '10px'}} 
              onClick={(e) => {
                e.stopPropagation();
                dispatch(decreaseQuantity(product.id));
              }}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button 
              style={{...styles.quantityButton, marginLeft: '10px'}} 
              onClick={(e) => {
                e.stopPropagation();
                if (cartItem.quantity < product.quantity) {
                  dispatch(addQuantity(product.id));
                }
              }}
              disabled={cartItem.quantity >= product.quantity}
            >
              +
            </button>
          </div>
        ) : (
          <button
            style={styles.addToCartButton}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
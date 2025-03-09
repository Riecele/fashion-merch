import React from 'react';
import { formatCurrency } from '../../utils/formatting';

const OrderStatus = ({ order, setCurrentOrderId }) => {
  if (!order) return null;
  
  // Calculate estimated delivery date (5 days from order date)
  const orderDate = new Date(order.date);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(orderDate.getDate() + 5);
  
  // Generate a mock tracking number
  const trackingNumber = `TRK${order.id}${Math.floor(Math.random() * 10000)}`;
  
  // Helper function to get status style class
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Processing':
        return { color: '#ff9800' };
      case 'Shipped':
        return { color: '#2196f3' };
      case 'Delivered':
        return { color: '#4caf50' };
      default:
        return {};
    }
  };
  
  // Format date as a readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const styles = {
    container: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1100',
      padding: '20px 10px',
    },
    content: {
      backgroundColor: '#2c2c2c',
      padding: '10px',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    title: {
      marginTop: '0',
      marginBottom: '25px',
      fontSize: '1.8rem',
      textAlign: 'center',
    },
    headerSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    orderLabel: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    orderId: {
      fontSize: '1.2rem',
    },
    statusValue: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    infoTitle: {
      marginTop: '0',
      marginBottom: '15px',
      fontSize: '1.5rem',
    },
    timelineContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      marginTop: '20px',
    },
    timelineItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    timelineIcon: (complete) => ({
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: complete ? '#4caf50' : '#ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      marginRight: '10px',
    }),
    itemList: {},
    itemCard: {
      display: 'flex',
      backgroundColor: '#333',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
    },
    itemImage: {
      width: '80px',
      height: '80px',
      borderRadius: '8px',
      marginRight: '15px',
    },
    itemName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    itemCategory: {
      marginBottom: '5px',
    },
    itemQuantity: {
      marginBottom: '5px',
    },
    itemPrice: {
      marginTop: '5px',
      fontWeight: 'bold',
      color: '#007bff',
    },
    orderTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      backgroundColor: '#333',
      borderRadius: '8px',
      marginTop: '20px',
      marginBottom: '20px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    closeFooterButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      cursor: 'pointer',
      width: '100%',
      borderRadius: '5px',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button style={styles.closeButton} onClick={() => setCurrentOrderId(null)}>×</button>
        <h2 style={styles.title}>Order Status</h2>
        <div style={styles.headerSection}>
          <div>
            <div style={styles.orderLabel}>Order ID:</div>
            <div style={styles.orderId}>#{order.id}</div>
          </div>
          <div style={{ ...getStatusStyle(order.status), ...styles.statusValue }}>
            {order.status}
          </div>
        </div>
        
        <div>
          <div>
            <h3 style={styles.infoTitle}>Order Information</h3>
            <div>
              <p><strong>Order Date:</strong> {formatDate(order.date)}</p>
              <p><strong>Estimated Delivery:</strong> {formatDate(estimatedDelivery)}</p>
              <p><strong>Tracking Number:</strong> {trackingNumber}</p>
            </div>
          </div>
          
          <div style={styles.timelineContainer}>
            <div style={styles.timelineItem}>
              <div style={styles.timelineIcon(true)}>✓</div>
              <div>Order Placed</div>
            </div>
            
            <div style={styles.timelineItem}>
              <div style={styles.timelineIcon(order.status !== 'Processing')}>
                {order.status !== 'Processing' ? '✓' : '○'}
              </div>
              <div>Processing</div>
            </div>
            
            <div style={styles.timelineItem}>
              <div style={styles.timelineIcon(order.status === 'Shipped' || order.status === 'Delivered')}>
                {order.status === 'Shipped' || order.status === 'Delivered' ? '✓' : '○'}
              </div>
              <div>Shipped</div>
            </div>
            
            <div style={styles.timelineItem}>
              <div style={styles.timelineIcon(order.status === 'Delivered')}>
                {order.status === 'Delivered' ? '✓' : '○'}
              </div>
              <div>Delivered</div>
            </div>
          </div>
          
          <h3 style={{ ...styles.infoTitle, marginTop: '30px', fontSize: '1.2rem' }}>Items in Your Order</h3>
          
          <div style={styles.itemList}>
            {order.items.map(item => (
              <div key={item.id} style={styles.itemCard}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.itemImage} 
                />
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemCategory}>{item.category}</div>
                  <div style={styles.itemQuantity}>Quantity: {item.quantity}</div>
                  <div style={styles.itemPrice}>
                    {formatCurrency(item.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.orderTotal}>
            <span>Order Total:</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
          
          <button 
            style={styles.closeFooterButton}
            onClick={() => setCurrentOrderId(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;

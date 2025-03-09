import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatting';
import { getUserOrders } from '../../services/firestoreService';
import { getAuth } from 'firebase/auth';

const theme = {
  primary: '#0A1929',
  secondary: '#1A2C42',
  accent: '#2D5F9A',
  text: '#E8EEF4',
  textMuted: '#B0B7C3',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  border: '#2D3748'
};

const Orders = ({ closeOrders, setShowOrderHistory }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (auth.currentUser) {
          const userOrders = await getUserOrders(auth.currentUser.uid);
          setOrders(userOrders);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [auth]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const styles = {
    orderHistoryContainer: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1100',
    },
    orderList: {
      background: `linear-gradient(145deg, ${theme.primary}, ${theme.secondary})`,
      padding: '30px',
      borderRadius: '16px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    orderCard: {
      background: theme.secondary,
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      borderLeft: `4px solid ${theme.accent}`,
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
      }
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      borderBottom: `1px solid ${theme.border}`,
      paddingBottom: '15px',
    },
    orderStatus: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    statusProcessing: {
      backgroundColor: theme.warning,
      color: '#212529',
    },
    statusShipped: {
      backgroundColor: theme.info,
      color: '#fff',
    },
    statusDelivered: {
      backgroundColor: theme.success,
      color: '#fff',
    },
    ordersContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '900px',
      maxHeight: '85vh',
      backgroundColor: theme.primary,
      color: theme.text,
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    },
    backButton: {
      background: 'transparent',
      color: theme.accent,
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      padding: '10px 15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateX(-3px)',
      }
    },
    orderDetail: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflowY: 'auto',
      padding: '10px',
    },
    orderDate: {
      color: theme.textMuted,
      fontSize: '14px',
      margin: '5px 0 15px',
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    orderAddress: {
      background: theme.secondary,
      padding: '20px',
      borderRadius: '12px',
      marginTop: '15px',
    },
    orderItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    orderDetailItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      background: theme.secondary,
      borderRadius: '12px',
      marginBottom: '10px',
      justifyContent: 'space-between',
    },
    orderItemImage: {
      width: '60px',
      height: '60px',
      borderRadius: '8px',
      objectFit: 'cover',
      marginRight: '15px',
    },
    orderItemInfo: {
      flex: '1',
    },
    orderItemTotal: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: theme.accent,
    },
    orderSummary: {
      marginTop: '20px',
      background: theme.secondary,
      padding: '20px',
      borderRadius: '12px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: `1px solid ${theme.border}`,
    },
    summaryTotal: {
      fontWeight: 'bold',
      fontSize: '18px',
      paddingTop: '15px',
      marginTop: '10px',
      borderTop: `2px solid ${theme.border}`,
      borderBottom: 'none',
    },
    ordersHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '20px',
      borderBottom: `1px solid ${theme.border}`,
      marginBottom: '20px',
    },
    closeBtn: {
      background: 'transparent',
      color: theme.text,
      border: 'none',
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.2s',
      '&:hover': {
        background: theme.accent,
      }
    },
    ordersList: {
      overflowY: 'auto',
      maxHeight: 'calc(85vh - 100px)',
      padding: '5px 10px',
    },
    orderCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    orderCardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderCardItems: {
      display: 'flex',
      gap: '10px',
    },
    orderItemPreview: {
      position: 'relative',
    },
    moreItems: {
      background: 'rgba(45, 95, 154, 0.7)',
      borderRadius: '8px',
      padding: '10px',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    orderCardTotal: {
      fontWeight: 'bold',
      color: theme.accent,
    },
    emptyOrders: {
      textAlign: 'center',
      padding: '40px 20px',
      color: theme.textMuted,
    },
    shopNowButton: {
      background: theme.accent,
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '30px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'all 0.2s',
      '&:hover': {
        background: '#3a77bb',
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.orderHistoryContainer}>
        <div style={styles.orderList}>
          <p style={{textAlign: 'center', padding: '20px'}}>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div style={styles.orderHistoryContainer}>
        <div style={styles.orderList}>
          <div style={styles.orderHeader}>
            <button style={styles.backButton} onClick={() => setSelectedOrder(null)}>
              ← Back to Orders
            </button>
          </div>
          
          <div style={styles.orderDetail}>
            <h2>Order #{selectedOrder.id}</h2>
            <p style={styles.orderDate}>Placed on {formatDate(selectedOrder.date)}</p>
            <div style={styles.orderStatus}>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: selectedOrder.status === 'delivered' ? theme.success :
                                selectedOrder.status === 'processing' ? theme.warning : theme.info
              }}>
                {selectedOrder.status.toUpperCase()}
              </span>
            </div>
            
            <div style={styles.orderAddress}>
              <h3>Shipping Details</h3>
              <p>{selectedOrder.shippingDetails.fullName}</p>
              <p>{selectedOrder.shippingDetails.address}</p>
              <p>{selectedOrder.shippingDetails.city}</p>
              <p>{selectedOrder.shippingDetails.phoneNumber}</p>
              <p>{selectedOrder.shippingDetails.email}</p>
              <p>Payment Method: {selectedOrder.shippingDetails.paymentMethod}</p>
            </div>
            
            <div style={styles.orderItems}>
              <h3>Items</h3>
              {selectedOrder.items.map((item) => (
                <div key={item.id} style={styles.orderDetailItem}>
                  <img src={item.image} alt={item.name} style={styles.orderItemImage} />
                  <div style={styles.orderItemInfo}>
                    <h4>{item.name}</h4>
                    <p>{formatCurrency(item.price)} × {item.quantity}</p>
                  </div>
                  <div style={styles.orderItemTotal}>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={styles.orderSummary}>
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping:</span>
                <span>{formatCurrency(selectedOrder.shippingCost)}</span>
              </div>
              <div style={{...styles.summaryRow, ...styles.summaryTotal}}>
                <span>Total:</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.orderHistoryContainer}>
      <div style={styles.orderList}>
        <div style={styles.ordersHeader}>
          <h2>Your Orders</h2>
          <button style={styles.closeBtn} onClick={() => setShowOrderHistory(false)}>×</button>
        </div>
        
        {orders.length > 0 ? (
          <div style={styles.ordersList}>
            {orders.map(order => (
              <div 
                key={order.id} 
                style={styles.orderCard}
                onClick={() => setSelectedOrder(order)}
              >
                <div style={styles.orderCardHeader}>
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p style={styles.orderDate}>{formatDate(order.date)}</p>
                  </div>
                  <div style={styles.orderStatus}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: order.status === 'delivered' ? theme.success :
                                      order.status === 'processing' ? theme.warning : theme.info
                    }}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div style={styles.orderCardContent}>
                  <div style={styles.orderCardItems}>
                    {order.items.slice(0, 2).map(item => (
                      <div key={item.id} style={styles.orderItemPreview}>
                        <img src={item.image} alt={item.name} style={styles.orderItemImage} />
                        {item.quantity > 1 && 
                          <span style={{
                            position: 'absolute',
                            bottom: '-5px',
                            right: '-5px',
                            background: theme.accent,
                            color: 'white',
                            borderRadius: '50%',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                          }}>
                            {item.quantity}
                          </span>
                        }
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div style={styles.moreItems}>+{order.items.length - 2} more</div>
                    )}
                  </div>
                  <div style={styles.orderCardTotal}>
                    <span>Total: {formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyOrders}>
            <p>You haven't placed any orders yet.</p>
            <button style={styles.shopNowButton} onClick={() => setShowOrderHistory(false)}>Shop Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

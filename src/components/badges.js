import React from 'react';
import { FaShippingFast, FaUndo, FaRegSmile } from 'react-icons/fa';

function Badges() {

  const styles = {
    section: {
      display: 'flex',
      flexDirection:'row', 
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      margin: '2rem auto',
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      border: '2px solid rgb(0, 0, 0)',
      padding: '1rem',
      gap: '0.5rem',
    },
    icon: {
      color: '#6D28D9',
      width: '1.5rem',
      height: '1.5rem',
    },
    textContainer: {

    },
    title: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
    },
    subtitle: {
      fontSize: '0.75rem',
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.badge}>
        <FaShippingFast style={styles.icon} />
        <div style={styles.textContainer}>
          <h3 style={styles.title}>Fast Delivery</h3>
          <p style={styles.subtitle}>Orders from $200</p>
        </div>
      </div>

      <div style={styles.badge}>
        <FaUndo style={styles.icon} />
        <div style={styles.textContainer}>
          <h3 style={styles.title}>Easy Returns</h3>
          <p style={styles.subtitle}>30 Days Guarantee</p>
        </div>
      </div>

      <div style={styles.badge}>
        <FaRegSmile style={styles.icon} />
        <div style={styles.textContainer}>
          <h3 style={styles.title}>Customer Service</h3>
          <p style={styles.subtitle}>24/7 Support</p>
        </div>
      </div>
    </section>
  );
}

export default Badges;
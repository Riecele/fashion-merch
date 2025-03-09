import React from 'react';

const Footer = () => {
  const styles = { footer: {
    backgroundColor: "#1f1f1f",
    padding: "40px 0 20px",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px"
  },
  footerLogo: {
    flex: "1",
    minWidth: "200px"
  },
  footerLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    flex: "2",
    justifyContent: "space-around"
  },
  linkGroup: {
    minWidth: "150px"
  },
  footerNavList: {
    listStyle: "none",
    padding: "0",
    margin: "0"
  },
  footerNavLink: {
    color: "#cccccc",
    textDecoration: "none",
    display: "block",
    marginTop: "10px",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#007bff"
    }
  },
  copyright: {
    textAlign: "center",
    marginTop: "30px",
    padding: "20px 0 0",
    borderTop: "1px solid #333",
    color: "#999"
  }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <h2>Shopee</h2>
            <p>Premium products for your lifestyle</p>
          </div>
          <div style={styles.footerLinks}>
            <div style={styles.linkGroup}>
              <h3>Shop</h3>
              <ul style={styles.footerNavList}>
                <li><a href="#products" style={styles.footerNavLink}>All Products</a></li>
                <li><a href="#featured" style={styles.footerNavLink}>Featured</a></li>
                <li><a href="#new" style={styles.footerNavLink}>New Arrivals</a></li>
              </ul>
            </div>
            <div style={styles.linkGroup}>
              <h3>Company</h3>
              <ul style={styles.footerNavList}>
                <li><a href="#about" style={styles.footerNavLink}>About Us</a></li>
              </ul>
            </div>
            <div style={styles.linkGroup}>
              <h3>Support</h3>
              <ul style={styles.footerNavList}>
                <li><a href="#faq" style={styles.footerNavLink}>FAQ</a></li>
                <li><a href="#shipping" style={styles.footerNavLink}>Shipping & Returns</a></li>
                <li><a href="#privacy" style={styles.footerNavLink}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Shopee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

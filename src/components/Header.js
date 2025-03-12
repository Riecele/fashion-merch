import React, { Component } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import Cart from "./Cart";
import Admin from "./Admin";
import CartIcon from "./CartIcon";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      isCartOpen: false,
      isAdminOpen: false,
    };
  }

  render() {
    const { menuOpen, isCartOpen, isAdminOpen } = this.state;

    const styles = {
      header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "#fff",
        color: "#333",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
      },
      headerBrand: {
        display: "flex",
        alignItems: "center",
      },
      menuIcon: {
        display: "none",
        marginLeft: "1rem",
        cursor: "pointer",
      },
      headerNav: {
        display: "flex",
        flexWrap: "wrap",
      },
      headerNavLink: {
        margin: "0 1rem",
        textDecoration: "none",
        color: "#333",
        transition: "color 0.3s",
      },
      headerActions: {
        display: "flex",
        alignItems: "center",
      },
      icon: {
        marginLeft: "1rem",
        fontSize: "1.25rem",
        cursor: "pointer",
      },
      menuOpen: menuOpen ? { display: "flex" } : { display: "none" },
    };

    return (
      <React.Fragment>
        <header style={styles.header}>
          <div style={styles.headerBrand}>
            <h1>My E-Commerce</h1>
            <FaBars
              style={styles.menuIcon}
              onClick={() => this.setState({ menuOpen: !menuOpen })}
            />
          </div>
          <nav style={{ ...styles.headerNav, ...styles.menuOpen }}>
            <a href="/about" style={styles.headerNavLink}>
              About
            </a>
            <a href="/contact" style={styles.headerNavLink}>
              Contact Us
            </a>
          </nav>
          <div style={styles.headerActions}>
            <CartIcon onClick={() => this.setState({ isCartOpen: true })} />
            <FaUser style={styles.icon} onClick={() => this.setState({ isAdminOpen: true })} />
          </div>
          {isCartOpen && <Cart onClose={() => this.setState({ isCartOpen: false })} />}
          {isAdminOpen && <Admin onClose={() => this.setState({ isAdminOpen: false })} />}
        </header>
      </React.Fragment>
    );
  }
}

export default Header;

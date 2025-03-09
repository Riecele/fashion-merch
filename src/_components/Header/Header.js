import React, { useState, useEffect } from "react";
import LoginForm from "../LoginForm";

const Header = ({
  cartItemCount,
  setShowCart,
  showCart,
  setShowOrderHistory,
  user,
  handleLogin,
  handleLogout,
  handleSignup,
  showOrderHistory,
  toggleAdminDashboard,
  showAdminDashboard,
  showLoginForm,
  setShowLoginForm,
  isAuthLoading
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [loginButtonHover, setLoginButtonHover] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Comprehensive styles object
  const defaultStyles = {
    header: {
      backgroundColor: "#1f1f1f",
      padding: "10px 0",
      position: "sticky",
      top: 0,
      zIndex: 100
    },
    container: {
      width: "90%",
      margin: "0 auto",
      maxWidth: "1200px",
      padding: "0 15px"
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap"
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: "8px 0"
    },
    logoText: {
      color: "#ffffff",
      margin: 0
    },
    nav: {
      display: "flex",
      justifyContent: "center",
      width: isMobile ? "100%" : "auto",
      transition: "all 0.3s ease",
      overflow: isMobile && !mobileMenuOpen ? "hidden" : "visible",
      maxHeight: isMobile && !mobileMenuOpen ? "0" : "500px"
    },
    navList: {
      listStyle: "none",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      margin: "0",
      padding: "10px 0",
      width: "100%",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "flex-start"
    },
    navItem: {
      margin: "5px 0"
    },
    navLink: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "1rem",
      padding: "8px 12px",
      transition: "all 0.3s ease",
      display: "inline-block"
    },
    cartIcon: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      marginLeft: "15px"
    },
    cartIconSymbol: {
      fontSize: "1.5rem",
      color: "#ffffff"
    },
    cartCount: {
      marginLeft: "5px",
      backgroundColor: "#007bff",
      borderRadius: "50%",
      padding: "2px 8px",
      color: "#ffffff"
    },
    burgerMenu: {
      display: isMobile ? "flex" : "none",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "24px",
      width: "30px",
      cursor: "pointer",
      zIndex: 200
    },
    burgerLine: {
      width: "100%",
      height: "3px",
      backgroundColor: "#fff",
      transition: "all 0.3s ease"
    },
    mobileNavContainer: {
      display: "block",
      width: "100%",
      order: 3,
      visibility: isMobile && !mobileMenuOpen ? "hidden" : "visible"
    },
    orderHistoryButton: {
      backgroundColor: "#5c6ac4",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 15px",
      cursor: "pointer",
      marginLeft: "15px",
      transition: "background-color 0.3s ease",
      fontWeight: "bold"
    },
    loginButton: {
      backgroundColor: "transparent",
      color: "#ffffff",
      border: "1px solid #5c6ac4",
      borderRadius: "4px",
      padding: "8px 15px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      fontWeight: "bold",
      marginLeft: "15px"
    },
    loginButtonHover: {
      backgroundColor: "#5c6ac4"
    },
    formOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    },
    adminButton: {
      padding: "8px 16px",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "15px",
      transition: "background-color 0.3s ease"
    }
  };

  // Merge passed styles with default styles
  const mergedStyles = { ...defaultStyles };

  // Dynamic style function
  const getLinkStyle = (index) => ({
    ...mergedStyles.navLink,
    color: hoveredLink === index ? "#5c6ac4" : "#ffffff",
    transform: hoveredLink === index ? "translateY(-2px)" : "none",
    fontWeight: hoveredLink === index ? "bold" : "normal",
    cursor: "pointer", // Add cursor pointer to make it obviously clickable
    // Add active state styling when order history is shown
    ...(index === "orders" && showOrderHistory
      ? {
          color: "#5c6ac4",
          fontWeight: "bold",
          borderBottom: "2px solid #5c6ac4"
        }
      : {})
  });


  // Inject keyframes into document head
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn {
        0% { opacity: 0; transform: translateX(30px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <header style={mergedStyles.header}>
      <div style={mergedStyles.container}>
        <div style={mergedStyles.headerContent}>
          <div style={mergedStyles.logo}>
            <h1 style={mergedStyles.logoText}>Shopee</h1>
          </div>

          <nav style={mergedStyles.nav}>
            <ul style={mergedStyles.navList}>
              <li style={mergedStyles.navItem}>
                <button
                  onClick={() => {
                    console.log("Order history button clicked");
                    setShowOrderHistory(true); // Always set to true on click, like login form
                  }}
                  style={{
                    ...getLinkStyle("orders"),
                    background: "transparent",
                    border: "none",
                    padding: "8px 12px",
                    fontSize: "1rem"
                  }}
                  onMouseEnter={() => setHoveredLink("orders")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  Orders History
                </button>
              </li>
              <li style={mergedStyles.navItem}>
                {!user ? (
                  <button
                    onClick={() => setShowLoginForm(true)}
                    style={{
                      ...mergedStyles.loginButton,
                      ...(loginButtonHover ? mergedStyles.loginButtonHover : {})
                    }}
                    onMouseEnter={() => setLoginButtonHover(true)}
                    onMouseLeave={() => setLoginButtonHover(false)}
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    style={{
                      ...mergedStyles.loginButton,
                      ...(loginButtonHover ? mergedStyles.loginButtonHover : {})
                    }}
                    onMouseEnter={() => setLoginButtonHover(true)}
                    onMouseLeave={() => setLoginButtonHover(false)}
                  >
                    Logout ({user.email})
                  </button>
                )}
              </li>
            </ul>
          </nav>

          {isMobile && (
            <div
              style={mergedStyles.burgerMenu}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div
                style={{
                  ...mergedStyles.burgerLine,
                  transform: mobileMenuOpen
                    ? "rotate(45deg) translate(5px, 5px)"
                    : "none"
                }}
              ></div>
              <div
                style={{
                  ...mergedStyles.burgerLine,
                  opacity: mobileMenuOpen ? 0 : 1
                }}
              ></div>
              <div
                style={{
                  ...mergedStyles.burgerLine,
                  transform: mobileMenuOpen
                    ? "rotate(-45deg) translate(8px, -8px)"
                    : "none"
                }}
              ></div>
            </div>
          )}

          <div
            style={mergedStyles.cartIcon}
            onClick={() => {
              setShowCart(!showCart);
              if (!showCart) setShowOrderHistory(false);
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = showCart
                ? "scale(1.05)"
                : "scale(1)")
            }
          >
            <span
              className="material-icons"
              style={mergedStyles.cartIconSymbol}
            >
              shopping_cart
            </span>
            <span style={mergedStyles.cartCount}>{cartItemCount}</span>
          </div>

          {/* Only show admin button if user exists and has role of admin */}
          {user && user.role === "admin" && (
            <button
              onClick={toggleAdminDashboard}
              style={{
                ...mergedStyles.adminButton,
                backgroundColor: showAdminDashboard ? "#4CAF50" : "#333"
              }}
            >
              {showAdminDashboard ? "Close Admin" : "Admin Dashboard"}
            </button>
          )}
        </div>
      </div>

      {showLoginForm && (
        <div
          style={mergedStyles.formOverlay}
          onClick={() => !isAuthLoading && setShowLoginForm(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LoginForm
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              isLoading={isAuthLoading}
            />
          </div>
        </div>
      )}

     
    </header>
  );
};

export default Header;

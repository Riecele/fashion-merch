import React from 'react';

const Banner = () => {
  const styles = {
    banner: {
      position: "relative",
      width: "100%",
      height: "90vh",
      background: `url("https://res.cloudinary.com/dcdivbkwd/image/upload/v1676012835/cld-sample-5.jpg") center/cover no-repeat`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "black", // Default Light Theme
    },
    overlay: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.1)", // Default Light Theme
    },
    bannerContent: {
      position: "relative",
      zIndex: 1,
      maxWidth: "600px",
      padding: "20px",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    paragraph: {
      fontSize: "1.2rem",
      marginBottom: "20px",
    },
    button: {
      background: "black", // Default Light Theme
      color: "white",
      padding: "12px 24px",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      transition: "0.3s",
    },
    buttonHover: {
      background: "#333",
      color: "white",
    },
  };

  return (
    <div style={styles.banner}>
      <div style={styles.overlay}></div>
      <div style={styles.bannerContent}>
        <h1 style={styles.heading}>New Season, New Style</h1>
        <p style={styles.paragraph}>Discover the latest trends in fashion.</p>
        <button 
          style={styles.button}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.button)}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;

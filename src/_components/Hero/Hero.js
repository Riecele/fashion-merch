import React, { useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const styles = {
    hero: {
      backgroundColor: '#1f1f1f',
      padding: '70px 0',
      textAlign: 'center',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(135deg, #1f1f1f 0%, #2c2c2c 100%)',
    },
    container: {
      width: '90%',
      margin: '0 auto',
      maxWidth: '1200px',
      padding: '0 15px',
      position: 'relative',
      zIndex: 2,
    },
    heroContent: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 15px',
    },
    heroHeading: {
      fontSize: '3rem',
      marginBottom: '1.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      animation: 'fadeInDown 0.8s ease-out',
      '@media (maxWidth: 768px)': {
        fontSize: '2.2rem',
      },
      '@media (maxWidth: 480px)': {
        fontSize: '1.8rem',
      }
    },
    heroSubheading: {
      fontSize: '1.3rem',
      marginBottom: '2rem',
      color: '#dddddd',
      lineHeight: '1.6',
      animation: 'fadeIn 1s ease-out',
      '@media (maxWidth: 768px)': {
        fontSize: '1.1rem',
      },
      '@media (maxWidth: 480px)': {
        fontSize: '1rem',
      }
    },
    heroButton: {
      backgroundColor: isHovered ? '#0069d9' : '#007bff',
      color: '#ffffff',
      border: 'none',
      padding: '15px 32px',
      cursor: 'pointer',
      marginTop: '20px',
      fontSize: '1.1rem',
      borderRadius: '50px',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.1)',
      fontWeight: 'bold',
      '@media (maxWidth: 480px)': {
        padding: '12px 25px',
        fontSize: '1rem',
      }
    },
    shine: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
      transform: 'rotate(-45deg)',
      animation: 'shine 6s infinite',
    }
  };

  return (
    <section style={styles.hero} id="home">
      <div style={styles.shine}></div>
      <div style={styles.container}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeading}>Premium Products for Your Lifestyle</h1>
          <p style={styles.heroSubheading}>Discover the best products with amazing deals and exclusive offers that enhance your everyday experience</p>
          <button 
            style={styles.heroButton} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Now
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shine {
          0% { transform: rotate(-45deg) translateX(-30%); }
          50% { transform: rotate(-45deg) translateX(30%); }
          100% { transform: rotate(-45deg) translateX(-30%); }
        }
        @media (maxWidth: 768px) {
          #home h1 {
            font-size: 2.2rem;
          }
          #home p {
            font-size: 1.1rem;
          }
        }
        @media (maxWidth: 480px) {
          #home h1 {
            font-size: 1.8rem;
          }
          #home p {
            font-size: 1rem;
          }
          #home button {
            padding: 12px 25px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

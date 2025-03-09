import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#007bff', fullScreen = false }) => {
  const getSize = () => {
    switch(size) {
      case 'small': return { width: '30px', height: '30px' };
      case 'large': return { width: '80px', height: '80px' };
      default: return { width: '50px', height: '50px' };
    }
  };
  
  const spinnerSize = getSize();
  
  const styles = {
    spinnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(fullScreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999
      } : {
        padding: '20px'
      })
    },
    spinner: {
      border: `4px solid rgba(255, 255, 255, 0.3)`,
      borderRadius: '50%',
      borderTop: `4px solid ${color}`,
      animation: 'spin 1s linear infinite',
      ...spinnerSize
    }
  };
  
  return (
    <div style={styles.spinnerContainer}>
      <div 
        style={styles.spinner}
      />
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

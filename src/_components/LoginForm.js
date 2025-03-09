import React from 'react';
import LoadingSpinner from './common/LoadingSpinner';

const LoginForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleLogin, 
  handleSignup, 
  isLogin, 
  setIsLogin, 
  username, 
  setUsername,
  isLoading 
}) => {
  const styles = {
    container: {
      background: '#1a1f2b',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
      width: '340px',
      border: '1px solid #2c3347',
    },
    header: {
      color: '#fff',
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '20px',
      textAlign: 'center',
      borderBottom: '1px solid #2c3347',
      paddingBottom: '15px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    inputGroup: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      color: '#a0aec0',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '500',
    },
    input: {
      padding: '12px 14px',
      borderRadius: '6px',
      border: '1px solid #2c3347',
      background: '#272f43',
      color: '#fff',
      fontSize: '15px',
      outline: 'none',
      transition: 'all 0.3s ease',
      '&:focus': {
        borderColor: '#4f6ef7',
        boxShadow: '0 0 0 2px rgba(79, 110, 247, 0.2)',
      },
    },
    button: {
      padding: '12px 16px',
      cursor: 'pointer',
      backgroundColor: '#4f6ef7',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      marginTop: '10px',
      '&:hover': {
        backgroundColor: '#3b5de7',
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },
    switchModeText: {
      color: '#a0aec0',
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
    },
    switchModeLink: {
      color: '#4f6ef7',
      cursor: 'pointer',
      fontWeight: '600',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    spinnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px 0'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
              required
            />
          </div>
        )}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>
        
        {isLoading ? (
          <div style={styles.spinnerContainer}>
            <LoadingSpinner size="small" color="#4f6ef7" fullScreen={false} />
          </div>
        ) : (
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ':hover': styles.button['&:hover']
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3b5de7';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#4f6ef7';
              e.target.style.transform = 'translateY(0)';
            }}
            disabled={isLoading}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        )}
      </form>
      <div style={styles.switchModeText}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span 
          style={styles.switchModeLink}
          onClick={() => setIsLogin(!isLogin)}
          onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

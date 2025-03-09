import React, { createContext, useState, useContext } from 'react';
import LoadingSpinner from '../_components/common/LoadingSpinner';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message = '') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, loadingMessage }}>
      {children}
      {isLoading && (
        <LoadingSpinner fullScreen={true} />
      )}
    </LoadingContext.Provider>
  );
};

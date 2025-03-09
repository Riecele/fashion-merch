import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatting';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/firestoreService';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: 'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
  });
  const [editProduct, setEditProduct] = useState({
    id: '',
    name: '',
    price: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch products using the service
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsList = await getProducts();
        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Basic validation
    setLoading(true);
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    try {
      // Add product using the service
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        image: newProduct.image
      };
      
      const addedProduct = await addProduct(productData);
      
      // Add to local state
      setProducts([...products, addedProduct]);
      
      // Reset form
      setNewProduct({
        name: '',
        price: '',
        category: '',
        image: 'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
      });
      setLoading(true);
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      setLoading(false);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    if (!editProduct.name || !editProduct.price || !editProduct.category) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    try {
      // Update product using the service
      const productData = {
        name: editProduct.name,
        price: parseFloat(editProduct.price),
        category: editProduct.category,
        image: editProduct.image
      };
      
      await updateProduct(editProduct.id, productData);
      
      // Update local state
      setProducts(products.map(product => 
        product.id === editProduct.id ? { ...product, ...productData } : product
      ));
      
      // Reset form
      setSelectedProduct(null);
      setEditProduct({
        id: '',
        name: '',
        price: '',
        category: '',
        image: ''
      });
      setLoading(false);
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product. Please try again.');
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (window.confirm(`Are you sure you want to delete ${editProduct.name}?`)) {
      setLoading(true);
      try {
        // Delete using the service
        await deleteProduct(editProduct.id);
        
        // Update local state
        setProducts(products.filter(product => product.id !== editProduct.id));
        
        // Reset form
        setSelectedProduct(null);
        setEditProduct({
          id: '',
          name: '',
          price: '',
          category: '',
          image: ''
        });
        setLoading(false);
        alert('Product deleted successfully!');
      } catch (err) {
        setLoading(false);
        console.error('Error deleting product:', err);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      {loading ? (
        <LoadingSpinner size="large" fullScreen={true} />
      ) : (
        <div style={styles.container}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Add New Product</h3>
            <form onSubmit={handleAddProduct} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewProductChange}
                  style={styles.input}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Price (KES):</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  style={styles.input}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Category:</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleNewProductChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleNewProductChange}
                  style={styles.input}
                />
              </div>
              
              <button type="submit" style={styles.button}>Add Product</button>
            </form>
          </div>
          
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Edit Products</h3>
            <div style={styles.productList}>
              {products.map(product => (
                <div 
                  key={product.id} 
                  style={{
                    ...styles.productItem,
                    ...(selectedProduct?.id === product.id ? styles.selectedProduct : {})
                  }}
                  onClick={() => handleSelectProduct(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={styles.productImage}
                  />
                  <div style={styles.productInfo}>
                    <h4 style={styles.productName}>{product.name}</h4>
                    <p style={styles.productPrice}>{formatCurrency(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedProduct && (
              <div style={styles.editForm}>
                <h3 style={styles.sectionTitle}>Edit Product</h3>
                <form onSubmit={handleUpdateProduct} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editProduct.name}
                      onChange={handleEditProductChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Price (KES):</label>
                    <input
                      type="number"
                      name="price"
                      value={editProduct.price}
                      onChange={handleEditProductChange}
                      style={styles.input}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category:</label>
                    <select
                      name="category"
                      value={editProduct.category}
                      onChange={handleEditProductChange}
                      style={styles.input}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home">Home</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Image URL:</label>
                    <input
                      type="text"
                      name="image"
                      value={editProduct.image}
                      onChange={handleEditProductChange}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.updateButton}>Update Product</button>
                    <button 
                      type="button" 
                      style={styles.deleteButton}
                      onClick={handleDeleteProduct}
                    >
                      Delete Product
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  dashboard: {
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    margin: '20px',
  },
  title: {
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '28px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'space-between',
  },
  section: {
    flex: '1 1 45%',
    minWidth: '300px',
    backgroundColor: '#252525',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  sectionTitle: {
    color: '#ffffff',
    marginBottom: '20px',
    fontSize: '20px',
    borderBottom: '1px solid #444',
    paddingBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    color: '#cccccc',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#ffffff',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  updateButton: {
    padding: '12px',
    backgroundColor: '#2196F3',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: '1',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    padding: '12px',
    backgroundColor: '#f44336',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: '1',
    transition: 'background-color 0.3s ease',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '10px 0',
  },
  productItem: {
    backgroundColor: '#333',
    borderRadius: '6px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  selectedProduct: {
    border: '2px solid #4CAF50',
    transform: 'scale(1.02)',
  },
  productImage: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '10px',
  },
  productName: {
    margin: '0 0 5px 0',
    color: '#ffffff',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  productPrice: {
    margin: '0',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  editForm: {
    marginTop: '20px',
    borderTop: '1px solid #444',
    paddingTop: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#cccccc'
  },
  error: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#ff4444',
    color: 'white',
    borderRadius: '5px',
    margin: '10px 0'
  }
};

export default AdminDashboard;

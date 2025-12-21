import React, { useState } from 'react';
import './App.css';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://via.placeholder.com/200x200/4A90E2/ffffff?text=Headphones',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://via.placeholder.com/200x200/50C878/ffffff?text=Smart+Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://via.placeholder.com/200x200/FF6347/ffffff?text=Laptop+Stand',
    description: 'Ergonomic aluminum laptop stand'
  },
  {
    id: 4,
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://via.placeholder.com/200x200/FFD700/ffffff?text=USB-C+Hub',
    description: 'Multi-port USB-C hub with HDMI and SD card reader'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://via.placeholder.com/200x200/9370DB/ffffff?text=Keyboard',
    description: 'RGB mechanical gaming keyboard with blue switches'
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 59.99,
    image: 'https://via.placeholder.com/200x200/20B2AA/ffffff?text=Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI'
  },
  {
    id: 7,
    name: 'Monitor 27"',
    price: 349.99,
    image: 'https://via.placeholder.com/200x200/FF69B4/ffffff?text=Monitor',
    description: '27-inch 4K UHD monitor with HDR support'
  },
  {
    id: 8,
    name: 'Webcam HD',
    price: 89.99,
    image: 'https://via.placeholder.com/200x200/FFA500/ffffff?text=Webcam',
    description: '1080p HD webcam with auto-focus and built-in microphone'
  }
];

const VALID_COUPONS = {
  'SAVE10': { discount: 0.10, description: '10% off' },
  'SAVE20': { discount: 0.20, description: '20% off' },
  'WELCOME': { discount: 0.15, description: '15% off for new customers' },
  'HOLIDAY': { discount: 0.25, description: '25% holiday special' }
};

function App() {
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const applyCoupon = (couponCode) => {
    const upperCode = couponCode.toUpperCase().trim();
    if (VALID_COUPONS[upperCode]) {
      setAppliedCoupon({ code: upperCode, ...VALID_COUPONS[upperCode] });
      return { success: true, message: `Coupon "${upperCode}" applied successfully!` };
    } else {
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 E-Commerce Store</h1>
        <div className="cart-badge">
          <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
      </header>
      
      <div className="main-container">
        <div className="products-section">
          <h2>Product Catalog</h2>
          <ProductCatalog products={SAMPLE_PRODUCTS} onAddToCart={addToCart} />
        </div>
        
        <div className="cart-section">
          <ShoppingCart 
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={removeCoupon}
            appliedCoupon={appliedCoupon}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

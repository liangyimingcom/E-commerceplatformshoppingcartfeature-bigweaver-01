import React, { useState } from 'react';
import './App.css';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';

const SAMPLE_PRODUCTS = [
  // Electronics Category
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/4A90E2/ffffff?text=Headphones',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/50C878/ffffff?text=Smart+Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/FF6347/ffffff?text=Laptop+Stand',
    description: 'Ergonomic aluminum laptop stand'
  },
  {
    id: 4,
    name: 'USB-C Hub',
    price: 39.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/FFD700/ffffff?text=USB-C+Hub',
    description: 'Multi-port USB-C hub with HDMI and SD card reader'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/9370DB/ffffff?text=Keyboard',
    description: 'RGB mechanical gaming keyboard with blue switches'
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 59.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/20B2AA/ffffff?text=Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI'
  },
  {
    id: 7,
    name: 'Monitor 27"',
    price: 349.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/FF69B4/ffffff?text=Monitor',
    description: '27-inch 4K UHD monitor with HDR support'
  },
  {
    id: 8,
    name: 'Webcam HD',
    price: 89.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/FFA500/ffffff?text=Webcam',
    description: '1080p HD webcam with auto-focus and built-in microphone'
  },
  {
    id: 9,
    name: 'Bluetooth Speaker',
    price: 69.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/1E90FF/ffffff?text=Speaker',
    description: 'Portable waterproof bluetooth speaker with 360° sound'
  },
  {
    id: 10,
    name: 'Tablet 10"',
    price: 399.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200/FF1493/ffffff?text=Tablet',
    description: '10-inch tablet with stylus pen and 128GB storage'
  },
  // Clothing Category
  {
    id: 11,
    name: 'Cotton T-Shirt',
    price: 24.99,
    category: 'Clothing',
    image: 'https://via.placeholder.com/200x200/87CEEB/ffffff?text=T-Shirt',
    description: '100% organic cotton t-shirt, available in multiple colors'
  },
  {
    id: 12,
    name: 'Denim Jeans',
    price: 59.99,
    category: 'Clothing',
    image: 'https://via.placeholder.com/200x200/4169E1/ffffff?text=Jeans',
    description: 'Classic fit denim jeans with stretch comfort'
  },
  {
    id: 13,
    name: 'Winter Jacket',
    price: 149.99,
    category: 'Clothing',
    image: 'https://via.placeholder.com/200x200/2F4F4F/ffffff?text=Jacket',
    description: 'Insulated winter jacket with water-resistant shell'
  },
  {
    id: 14,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Clothing',
    image: 'https://via.placeholder.com/200x200/FF4500/ffffff?text=Shoes',
    description: 'Lightweight running shoes with cushioned sole'
  },
  {
    id: 15,
    name: 'Baseball Cap',
    price: 19.99,
    category: 'Clothing',
    image: 'https://via.placeholder.com/200x200/228B22/ffffff?text=Cap',
    description: 'Adjustable baseball cap with embroidered logo'
  },
  // Home & Garden Category
  {
    id: 16,
    name: 'Coffee Maker',
    price: 79.99,
    category: 'Home & Garden',
    image: 'https://via.placeholder.com/200x200/8B4513/ffffff?text=Coffee+Maker',
    description: 'Programmable coffee maker with thermal carafe'
  },
  {
    id: 17,
    name: 'Blender Pro',
    price: 119.99,
    category: 'Home & Garden',
    image: 'https://via.placeholder.com/200x200/DC143C/ffffff?text=Blender',
    description: 'High-speed blender for smoothies and food prep'
  },
  {
    id: 18,
    name: 'Plant Pot Set',
    price: 34.99,
    category: 'Home & Garden',
    image: 'https://via.placeholder.com/200x200/32CD32/ffffff?text=Plant+Pots',
    description: 'Set of 3 ceramic plant pots with drainage holes'
  },
  {
    id: 19,
    name: 'LED Desk Lamp',
    price: 44.99,
    category: 'Home & Garden',
    image: 'https://via.placeholder.com/200x200/F0E68C/ffffff?text=Desk+Lamp',
    description: 'Adjustable LED desk lamp with USB charging port'
  },
  {
    id: 20,
    name: 'Vacuum Cleaner',
    price: 179.99,
    category: 'Home & Garden',
    image: 'https://via.placeholder.com/200x200/708090/ffffff?text=Vacuum',
    description: 'Cordless stick vacuum with HEPA filtration'
  },
  // Books Category
  {
    id: 21,
    name: 'The Great Novel',
    price: 14.99,
    category: 'Books',
    image: 'https://via.placeholder.com/200x200/8B0000/ffffff?text=Novel',
    description: 'Bestselling fiction novel with gripping storyline'
  },
  {
    id: 22,
    name: 'Programming Guide',
    price: 49.99,
    category: 'Books',
    image: 'https://via.placeholder.com/200x200/483D8B/ffffff?text=Programming',
    description: 'Complete guide to modern web development'
  },
  {
    id: 23,
    name: 'Cookbook Collection',
    price: 29.99,
    category: 'Books',
    image: 'https://via.placeholder.com/200x200/FF8C00/ffffff?text=Cookbook',
    description: '500+ recipes for everyday cooking and entertaining'
  },
  {
    id: 24,
    name: 'History of Innovation',
    price: 19.99,
    category: 'Books',
    image: 'https://via.placeholder.com/200x200/2E8B57/ffffff?text=History',
    description: 'Explore the greatest inventions that changed the world'
  },
  // Sports & Outdoors Category
  {
    id: 25,
    name: 'Yoga Mat',
    price: 34.99,
    category: 'Sports',
    image: 'https://via.placeholder.com/200x200/BA55D3/ffffff?text=Yoga+Mat',
    description: 'Non-slip yoga mat with carrying strap'
  },
  {
    id: 26,
    name: 'Camping Tent',
    price: 189.99,
    category: 'Sports',
    image: 'https://via.placeholder.com/200x200/556B2F/ffffff?text=Tent',
    description: '4-person waterproof camping tent with easy setup'
  },
  {
    id: 27,
    name: 'Water Bottle',
    price: 24.99,
    category: 'Sports',
    image: 'https://via.placeholder.com/200x200/00CED1/ffffff?text=Bottle',
    description: 'Insulated stainless steel water bottle, keeps cold 24hrs'
  },
  {
    id: 28,
    name: 'Fitness Tracker',
    price: 79.99,
    category: 'Sports',
    image: 'https://via.placeholder.com/200x200/FF6347/ffffff?text=Fitness+Band',
    description: 'Activity tracker with heart rate and sleep monitoring'
  },
  {
    id: 29,
    name: 'Basketball',
    price: 39.99,
    category: 'Sports',
    image: 'https://via.placeholder.com/200x200/FF8C00/ffffff?text=Basketball',
    description: 'Official size basketball with superior grip'
  },
  {
    id: 30,
    name: 'Resistance Bands Set',
    price: 29.99,
    category: 'Sports',
    image: 'https://via.placeholder.com/200x200/9932CC/ffffff?text=Bands',
    description: 'Set of 5 resistance bands for strength training'
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

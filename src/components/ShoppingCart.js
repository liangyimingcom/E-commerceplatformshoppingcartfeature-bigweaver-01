import React, { useState } from 'react';
import './ShoppingCart.css';

const TAX_RATE = 0.08; // 8% tax rate

function ShoppingCart({ cart, onRemove, onUpdateQuantity, onApplyCoupon, onRemoveCoupon, appliedCoupon }) {
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = subtotalAfterDiscount * TAX_RATE;
  const total = subtotalAfterDiscount + tax;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponMessage('Please enter a coupon code');
      setMessageType('error');
      return;
    }
    
    const result = onApplyCoupon(couponInput);
    setCouponMessage(result.message);
    setMessageType(result.success ? 'success' : 'error');
    
    if (result.success) {
      setCouponInput('');
    }
    
    setTimeout(() => {
      setCouponMessage('');
    }, 3000);
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    setCouponMessage('Coupon removed');
    setMessageType('info');
    setTimeout(() => {
      setCouponMessage('');
    }, 2000);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <span className="empty-cart-icon">🛒</span>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="coupon-section">
            <h3>Have a coupon?</h3>
            {appliedCoupon ? (
              <div className="applied-coupon">
                <span className="coupon-code">
                  {appliedCoupon.code} - {appliedCoupon.description}
                </span>
                <button className="remove-coupon-btn" onClick={handleRemoveCoupon}>
                  Remove
                </button>
              </div>
            ) : (
              <div className="coupon-input-group">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter coupon code"
                  className="coupon-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <button className="apply-coupon-btn" onClick={handleApplyCoupon}>
                  Apply
                </button>
              </div>
            )}
            {couponMessage && (
              <p className={`coupon-message ${messageType}`}>{couponMessage}</p>
            )}
            <div className="coupon-hints">
              <p className="hint-title">Try these codes:</p>
              <p className="hint-codes">SAVE10, SAVE20, WELCOME, HOLIDAY</p>
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {appliedCoupon && (
              <div className="summary-row discount">
                <span>Discount ({appliedCoupon.description}):</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="summary-row">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;

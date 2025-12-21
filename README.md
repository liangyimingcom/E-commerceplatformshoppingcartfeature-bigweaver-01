# E-Commerce Shopping Cart MVP

A complete, production-ready e-commerce shopping cart application built with React and optimized for AWS Amplify deployment.

## Features

### Product Catalog
- Browse available products with images, descriptions, and prices
- Modern grid layout with responsive design
- Hover effects for better user experience

### Shopping Cart Functionality
- **Add Products**: Add items to cart from the product catalog
- **Modify Quantity**: Increase or decrease item quantities with intuitive +/- buttons
- **Remove Items**: Remove products completely from the cart
- **Real-time Updates**: Cart badge shows total item count

### Price Calculations
- **Subtotal**: Automatic calculation based on cart contents
- **Tax Calculation**: 8% tax applied to subtotal (after discounts)
- **Total Price**: Final price including all calculations
- **Discount Application**: Real-time price updates when coupons are applied

### Coupon System
- **Apply Coupons**: Enter coupon codes to receive discounts
- **Validation**: System validates coupon codes before applying
- **Visual Feedback**: Success/error messages for coupon application
- **Discount Display**: Clear breakdown showing discount amount
- **Remove Coupons**: Easy removal of applied coupons

#### Available Coupon Codes
- `SAVE10` - 10% off
- `SAVE20` - 20% off
- `WELCOME` - 15% off for new customers
- `HOLIDAY` - 25% holiday special

### User Interface
- **Modern Design**: Clean, professional appearance with gradient themes
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, transitions, and interactive feedback
- **Color Scheme**: Purple/blue gradient theme with consistent styling
- **Accessibility**: Clear typography and intuitive controls

## Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: React Scripts 5.0.1
- **Styling**: Pure CSS with modern features (Grid, Flexbox, Gradients)
- **State Management**: React Hooks (useState)
- **Deployment**: AWS Amplify

## Project Structure

```
ecommerce-shopping-cart/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── ProductCatalog.js   # Product listing component
│   │   ├── ProductCatalog.css  # Product catalog styles
│   │   ├── ShoppingCart.js     # Shopping cart component
│   │   └── ShoppingCart.css    # Shopping cart styles
│   ├── App.js                  # Main application component
│   ├── App.css                 # Application styles
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles
├── amplify.yml                 # AWS Amplify build configuration
├── package.json                # Dependencies and scripts
└── .gitignore                  # Git ignore rules
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

The application will open at `http://localhost:3000`

3. **Build for Production**
```bash
npm run build
```

## AWS Amplify Deployment

### Method 1: Using Amplify Console (Recommended)

1. **Push Code to Git Repository**
   - Push this code to GitHub, GitLab, or Bitbucket

2. **Connect to Amplify**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your Git repository
   - Select the repository and branch

3. **Configure Build Settings**
   - Amplify will automatically detect the `amplify.yml` configuration
   - Review the build settings (pre-configured)
   - Click "Save and Deploy"

4. **Deployment**
   - Amplify will automatically build and deploy your application
   - You'll receive a URL for your deployed application
   - Every push to the connected branch will trigger automatic deployment

### Method 2: Using Amplify CLI

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
```

2. **Initialize Amplify**
```bash
amplify init
```

3. **Add Hosting**
```bash
amplify add hosting
```
- Select "Hosting with Amplify Console"
- Choose "Manual deployment"

4. **Publish**
```bash
amplify publish
```

## Configuration Files

### amplify.yml
Pre-configured for AWS Amplify deployment with:
- Automatic dependency installation (`npm ci`)
- Production build generation
- Artifact configuration for deployment
- Build caching for faster deployments

### package.json
Includes all necessary dependencies:
- React and React-DOM
- React Scripts for build tooling
- Production-ready configuration

## Features Breakdown

### Product Management
The application includes 8 sample products demonstrating various product categories:
- Wireless Headphones ($79.99)
- Smart Watch ($299.99)
- Laptop Stand ($49.99)
- USB-C Hub ($39.99)
- Mechanical Keyboard ($129.99)
- Wireless Mouse ($59.99)
- Monitor 27" ($349.99)
- Webcam HD ($89.99)

### Cart Operations
- **Add to Cart**: Clicking "Add to Cart" adds the product (increases quantity if already in cart)
- **Quantity Control**: Use +/- buttons to adjust quantities
- **Remove Item**: Click the × button to remove items
- **Empty State**: Friendly message when cart is empty

### Price Calculation Logic
```
Subtotal = Sum of (Price × Quantity) for all items
Discount = Subtotal × Coupon Discount Rate
Subtotal After Discount = Subtotal - Discount
Tax = Subtotal After Discount × Tax Rate (8%)
Total = Subtotal After Discount + Tax
```

### Coupon System Logic
- Validates coupon codes against predefined list
- Applies percentage-based discounts
- Shows visual feedback (success/error messages)
- Displays applied coupon with description
- Allows coupon removal and reapplication

## Customization

### Adding Products
Edit `SAMPLE_PRODUCTS` array in `src/App.js`:
```javascript
{
  id: 9,
  name: 'Product Name',
  price: 99.99,
  image: 'image-url',
  description: 'Product description'
}
```

### Adding Coupon Codes
Edit `VALID_COUPONS` object in `src/App.js`:
```javascript
'NEWCODE': { 
  discount: 0.30, 
  description: '30% off' 
}
```

### Changing Tax Rate
Modify `TAX_RATE` constant in `src/components/ShoppingCart.js`:
```javascript
const TAX_RATE = 0.10; // 10% tax
```

### Styling Customization
- **Colors**: Modify gradient values in CSS files
- **Layout**: Adjust grid columns and spacing in CSS
- **Fonts**: Change font-family in `src/index.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Component-level styling (no CSS-in-JS overhead)
- Efficient state management with React hooks
- Optimized build with React Scripts
- Lazy loading ready structure
- Minimal dependencies for faster loading

## Security Considerations

- No external API calls (MVP version)
- Client-side validation for coupon codes
- No sensitive data storage
- Production build removes development tools

## Future Enhancements

Potential features for future versions:
- Backend integration for product data
- User authentication and saved carts
- Payment gateway integration
- Order history and tracking
- Product search and filtering
- Product reviews and ratings
- Wishlist functionality
- Multi-currency support
- Inventory management

## Testing

### Manual Testing Checklist
- [ ] Add products to cart
- [ ] Increase/decrease quantities
- [ ] Remove items from cart
- [ ] Apply valid coupon codes
- [ ] Try invalid coupon codes
- [ ] Remove applied coupons
- [ ] Verify price calculations
- [ ] Test on mobile devices
- [ ] Test on different browsers

### Running Tests
```bash
npm test
```

## Troubleshooting

### Build Issues
- Ensure Node.js version is 14 or higher
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Deployment Issues
- Verify `amplify.yml` is in the root directory
- Check AWS credentials and permissions
- Review Amplify Console build logs

## License

This project is created as an MVP demonstration.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review AWS Amplify documentation
3. Check React documentation

## Credits

Built with:
- React - A JavaScript library for building user interfaces
- AWS Amplify - Deployment and hosting platform
- Placeholder images from placeholder.com

---

**Ready for Production Deployment** ✅

This application is production-ready and can be deployed directly to AWS Amplify without additional configuration.

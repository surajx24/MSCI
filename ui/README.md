# Admin Dashboard

A modern, responsive admin dashboard built with React and Material UI v5, featuring comprehensive analytics, charts, and data visualization.

## Features

### 🎯 Header & Navigation
- **Logo & Branding**: Clean dashboard logo with company name
- **Navigation Menu**: Home, Interface, Components, Pages, Forms, Gallery, Documentation
- **Profile Section**: User avatar, name (Jane Pearson), role (Administrator), and notification badge

### 📊 Statistics Dashboard
- **New Tickets**: 43 (+6% green)
- **Closed Today**: 17 (-3% red)
- **New Replies**: 7 (+9% green)
- **Followers**: 27.3k (+3% green)
- **Daily Earnings**: $95 (-2% red)
- **Products**: 621 (-1% red)

### 📈 Development Activity
- **Line Chart**: Purchases trend over time using Recharts
- **Commits Table**: Recent development commits with user avatars and details

### 🎨 Data Visualization
- **Green Donut Chart**: Project progress (63% completed, 37% remaining)
- **Blue Pie Chart**: Device distribution (Desktop, Mobile, Tablet, Other)

## Technology Stack

- **React 18** - Modern React with hooks
- **Material UI v5** - Latest Material Design components
- **Recharts** - Beautiful, composable charting library
- **Emotion** - CSS-in-JS styling solution
- **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── AdminDashboard.js    # Main dashboard component
├── App.js                   # App wrapper with theme provider
└── index.js                 # Entry point
```

## Customization

### Theme Colors
The dashboard uses a light theme with customizable colors. Modify the theme in `src/App.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
    secondary: {
      main: '#dc004e', // Change secondary color
    },
  },
});
```

### Data Sources
Replace the mock data in `src/components/AdminDashboard.js` with your actual API calls:

```javascript
// Replace mock data with API calls
const [purchaseData, setPurchaseData] = useState([]);

useEffect(() => {
  // Fetch data from your API
  fetchPurchaseData().then(setPurchaseData);
}, []);
```

## Features in Detail

### Responsive Grid System
- Uses Material UI's Grid component for responsive layouts
- Automatically adjusts to different screen sizes
- Mobile-first design approach

### Interactive Charts
- **Line Chart**: Shows purchase trends with smooth animations
- **Donut Chart**: Displays project completion status
- **Pie Chart**: Visualizes device distribution data

### Modern UI Components
- Material Design principles
- Consistent spacing and typography
- Smooth hover effects and transitions
- Clean, flat design aesthetic

### Performance Optimizations
- Responsive chart containers
- Efficient re-rendering with React hooks
- Optimized Material UI components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the project repository.

# Basketball Stats 📊🏀

A comprehensive React Native mobile application for managing and analyzing basketball player statistics. Built with Expo and featuring a modern, responsive design with dark/light theme support.

## 🌟 Features

### 📱 Core Functionality
- **Player Management**: Add, view, and manage basketball players with detailed statistics
- **Search & Filter**: Real-time search by player name and sort by various statistics
- **Statistics Dashboard**: Comprehensive analytics with charts and performance metrics
- **Data Persistence**: Local storage using AsyncStorage for data persistence
- **Cross-Platform**: Works on iOS, Android, and Web platforms

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with card-based layouts
- **Theme Support**: Automatic dark/light mode with system preference detection
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Smooth Animations**: Gradient overlays and smooth transitions
- **Visual Feedback**: Interactive elements with press states and haptic feedback

### 📊 Statistics & Analytics
- **Player Cards**: Detailed player information with profile images and stats
- **Top Performers**: Identify leading players in points, rebounds, and assists
- **Team Averages**: Calculate and display team-wide statistics
- **Interactive Charts**: Bar charts and line charts for data visualization
- **Performance Metrics**: Points, rebounds, assists, and player ratings

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **File-based Routing**: Expo Router for seamless navigation
- **State Management**: React Context for theme management
- **Image Handling**: Profile picture upload and management
- **Keyboard Handling**: Optimized input experience across platforms

## Demo

### IOS Demo Link

![IOS Demo GIF](https://imgur.com/a/ujqr7SU)

## 📁 Project Structure

```
basketball_stats/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── home.tsx       # Player list and search
│   │   ├── add-player.tsx # Add new player form
│   │   └── stats.tsx      # Statistics and analytics
│   ├── _layout.tsx        # Root layout configuration
│   └── types.tsx          # TypeScript type definitions
├── components/            # Reusable UI components
│   ├── PlayerCard.tsx     # Individual player display card
│   ├── TeamStatsCard.tsx  # Team statistics summary
│   ├── TopPerformerCard.tsx # Top performer display
│   ├── FilterButton.tsx   # Sorting and filtering buttons
│   ├── filter-functionality.tsx # Search and sort logic
│   ├── stats-functionality.tsx # Statistics calculations
│   └── save-image.tsx     # Image handling utilities
├── hooks/                 # Custom React hooks
│   └── AppThemeContext.tsx # Theme management context
├── constants/             # Application constants
│   └── Colors.ts          # Theme color definitions
├── assets/                # Static assets
│   ├── images/            # App icons and default images
│   └── players.json       # Sample player data
└── scripts/               # Build and utility scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd basketball_stats
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` in the terminal

## 📱 Usage Guide

### Adding Players
1. Navigate to the "Add Player" tab
2. Tap the profile image to select a photo
3. Fill in player details:
   - Name (required)
   - Location
   - Age
   - Height (in inches)
   - Statistics (points, rebounds, assists, ratings)
4. Tap "Add Player" to save

### Managing Players
- **Search**: Use the search bar to find players by name
- **Sort**: Tap filter buttons to sort by different statistics
- **View**: Player cards display all information in an organized layout

### Viewing Statistics
- **Top Performers**: See leading players in each category
- **Team Averages**: View overall team performance metrics
- **Charts**: Interactive visualizations of player comparisons
- **Trends**: Line charts showing performance patterns

## 🛠️ Available Scripts

```bash
# Start the development server
npm start
npx expo start

# Run on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Linting
npm run lint

# Reset project to fresh state
npm run reset-project
```

## 🎨 Theming System

The app features a comprehensive theming system with:

### Light Theme
- Clean white backgrounds
- Dark text for readability
- Blue accent colors
- Subtle shadows and borders

### Dark Theme
- Dark backgrounds for reduced eye strain
- Light text for contrast
- Adjusted color palette for dark environments
- Enhanced visual hierarchy

### Automatic Detection
- Follows system theme preferences
- Manual toggle available
- Persistent theme selection

## 📊 Data Structure

### Player Object
```typescript
type Player = {
  key: number | string;
  image: string | number;
  name: string;
  location: string;
  age: number;
  height: string;
  points: number;
  rebounds: number;
  assists: number;
  ratings: number;
}
```

### Statistics Categories
- **Points**: Scoring performance
- **Rebounds**: Defensive rebounds
- **Assists**: Playmaking ability
- **Ratings**: Overall player rating

## 🔧 Technical Stack

### Core Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation

### UI Libraries
- **React Native Elements**: UI component library
- **React Native Gifted Charts**: Data visualization
- **Expo Linear Gradient**: Gradient effects
- **React Native Vector Icons**: Icon library

### State Management
- **React Context**: Theme management
- **AsyncStorage**: Local data persistence
- **React Hooks**: State and lifecycle management

### Styling
- **StyleSheet**: React Native styling
- **NativeWind**: Tailwind CSS for React Native
- **Custom Theme System**: Comprehensive color management

## 📱 Platform Support

- ✅ **iOS**: Full support with native optimizations
- ✅ **Android**: Full support with Material Design
- ✅ **Web**: Responsive web application
- ✅ **Expo Go**: Development and testing

## 🔒 Data Privacy

- All data is stored locally on the device
- No external data transmission
- User privacy is maintained
- Data can be exported/imported manually

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add appropriate error handling
- Test on multiple platforms
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/) for rapid development
- Icons provided by [Expo Vector Icons](https://expo.github.io/vector-icons/)
- Charts powered by [React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)
- Sample data generated for demonstration purposes

---

**Basketball Stats** - Your comprehensive basketball team management solution! 🏀📊

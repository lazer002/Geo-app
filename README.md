# Geo App - Enhanced Location-Based Social Platform

A comprehensive React Native application built with Expo that combines location services with social networking features. The app allows users to find friends nearby, share locations, discover places, and stay connected with real-time updates.

## 🚀 Features

### Core Functionality
- **Real-time Location Sharing**: Share your location with friends and see where they are
- **Friend Management**: Add, manage, and interact with friends
- **Interactive Maps**: View friends and places on an interactive map
- **Location Discovery**: Find nearby places and points of interest
- **Social Features**: Chat, call, and stay connected with friends

### Enhanced UI/UX Components

#### 1. **Header Component** (`components/Header.tsx`)
- Dynamic headers for different screens (Home, Friends, Map, Settings)
- Integrated search functionality
- Notification indicators
- User profile access
- Responsive design with proper spacing

#### 2. **FriendCard Component** (`components/FriendCard.tsx`)
- Multiple variants: default, compact, detailed
- Status indicators (Online, Offline, Away, Busy)
- Distance information
- Favorite status
- Mutual friends count
- Interactive elements

#### 3. **MapMarker Component** (`components/MapMarker.tsx`)
- Different marker types: user, friend, place, event, custom
- Status-based color coding
- Interactive selection states
- Custom icons and colors
- Distance and description display

#### 4. **NotificationCard Component** (`components/NotificationCard.tsx`)
- Multiple notification types
- Read/unread states
- Action buttons for friend requests
- Time-based display
- Avatar support

#### 5. **LocationCard Component** (`components/LocationCard.tsx`)
- Place type categorization
- Rating display
- Open/closed status
- Navigation integration
- Multiple display variants

### Screen Enhancements

#### **Home Screen** (`app/(tabs)/home/index.tsx`)
- Enhanced greeting with time-based messages
- Improved stats cards with gradients
- Interactive location cards
- Better friend suggestions
- Enhanced chat and call displays
- Modern card-based layout

#### **Friends Screen** (`app/(tabs)/friends/index.tsx`)
- Advanced filtering (All, Online, Favorites)
- Enhanced friend cards with status indicators
- Search functionality
- Online friends section
- Empty state handling
- Improved navigation

#### **Map Screen** (`app/(tabs)/map/index.tsx`)
- Multiple marker types
- Interactive marker selection
- Map type switching (Standard/Satellite)
- Location controls
- Friend and place markers
- Detailed info cards

#### **Settings Screen** (`app/(tabs)/settings/index.tsx`)
- Enhanced notification settings
- Appearance controls
- Privacy and location settings
- Account management
- Improved logout functionality
- App information display

#### **Friend Profile Modal** (`app/(modals)/friends/profile.tsx`)
- Enhanced profile display
- Quick action buttons
- Location sharing
- Favorite functionality
- Detailed location information
- Interactive map integration

### Data Management

#### **UserDataManager** (`utils/userData.ts`)
- Comprehensive user data management
- Friend management system
- Location and place storage
- Activity tracking
- Distance calculations
- Time formatting utilities

## 🛠 Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS)
- **Maps**: React Native Maps
- **Icons**: Expo Vector Icons
- **Storage**: AsyncStorage
- **Location**: Expo Location
- **State Management**: React Hooks + Zustand

## 📱 Key Features

### Location Services
- Real-time GPS tracking
- Distance calculations
- Location sharing
- Place discovery
- Navigation integration

### Social Features
- Friend requests and management
- Real-time status updates
- Chat and calling integration
- Location-based friend discovery
- Activity tracking

### UI/UX Improvements
- Modern, clean design
- Consistent color scheme
- Responsive layouts
- Interactive elements
- Loading states
- Error handling

### Performance Optimizations
- Efficient component rendering
- Optimized image loading
- Smooth animations
- Memory management
- Background location updates

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#007AFF)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)
- **Purple**: (#8B5CF6)
- **Gray**: (#6B7280)

### Typography
- Consistent font weights and sizes
- Proper text hierarchy
- Readable contrast ratios
- Responsive text scaling

### Components
- Reusable component library
- Consistent spacing
- Standardized interactions
- Accessibility considerations

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Geo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📋 Dependencies

### Core Dependencies
- `expo`: ~53.0.20
- `react-native`: 0.79.5
- `expo-router`: ~5.1.4
- `react-native-maps`: 1.20.1
- `expo-location`: ~18.1.6

### UI Dependencies
- `nativewind`: ^4.1.23
- `@expo/vector-icons`: ^14.1.0
- `react-native-paper`: ^5.14.5

### Storage & State
- `@react-native-async-storage/async-storage`: 1.25.0
- `zustand`: ^5.0.6

## 🚀 Future Enhancements

### Planned Features
- **Real-time Chat**: In-app messaging system
- **Group Features**: Create and manage friend groups
- **Event Planning**: Location-based event creation
- **Advanced Analytics**: User activity insights
- **Push Notifications**: Real-time alerts
- **Offline Support**: Offline map and data access

### Technical Improvements
- **Performance**: Further optimization for large datasets
- **Security**: Enhanced data encryption
- **Testing**: Comprehensive test coverage
- **Documentation**: API documentation
- **Internationalization**: Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Expo team for the excellent development platform
- React Native community for continuous improvements
- Contributors and beta testers for valuable feedback

---

**Built with ❤️ using React Native and Expo**

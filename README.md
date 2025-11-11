# MyFit Journal

A comprehensive React Native fitness and nutrition tracking application built with Expo and Firebase.

## 🚀 Features

### Workout Tracking
- Log workouts with type, duration, and calories
- View workout history
- Track different workout types (Cardio, Strength, Flexibility)
- Detailed workout statistics

### Food Logging
- Track meals and snacks
- Log nutritional information (calories, protein, carbs, fats)
- Barcode scanning support (coming soon)
- Daily nutrition summaries

### Statistics & Analytics
- Weekly/Monthly/Yearly progress charts
- Workout duration tracking
- Calorie intake visualization
- Progress metrics

### User Profile
- Personal profile management
- Account information
- Activity statistics
- Settings and preferences

### Authentication
- Email/Password authentication
- Password reset functionality
- Secure user sessions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)
- A Firebase account

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd livraria
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a web app to your Firebase project
4. Copy the Firebase configuration

5. Update `src/firebase/config.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};
```

### 4. Enable Firebase Services

In your Firebase Console, enable the following:

#### Authentication
- Go to Authentication > Sign-in method
- Enable Email/Password authentication

#### Firestore Database
- Go to Firestore Database
- Create database (start in test mode for development)
- Set up the following collections:
  - `users`
  - `workouts`
  - `foods`

#### Firestore Security Rules (for development)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /workouts/{workoutId} {
      allow read, write: if request.auth != null;
    }
    match /foods/{foodId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note:** Update these rules for production to be more restrictive.

## 🏃‍♂️ Running the App

### Start the Development Server

```bash
npm start
# or
yarn start
# or
expo start
```

### Run on Specific Platforms

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## 📁 Project Structure

```
myfit-journal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── WorkoutCard.js
│   │   ├── FoodCard.js
│   │   ├── StatCard.js
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   └── LoadingSpinner.js
│   │
│   ├── constants/           # App constants
│   │   ├── colors.js
│   │   └── strings.js
│   │
│   ├── context/            # React Context providers
│   │   └── AuthContext.js
│   │
│   ├── firebase/           # Firebase configuration
│   │   ├── config.js
│   │   ├── auth.js
│   │   └── firestore.js
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js
│   │
│   ├── navigation/         # Navigation setup
│   │   ├── AuthNavigator.js
│   │   ├── MainNavigator.js
│   │   └── RootNavigator.js
│   │
│   ├── screens/            # Screen components
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── ForgotPasswordScreen.js
│   │   └── Main/
│   │       ├── HomeScreen.js
│   │       ├── WorkoutsScreen.js
│   │       ├── AddWorkoutScreen.js
│   │       ├── WorkoutDetailsScreen.js
│   │       ├── FoodScreen.js
│   │       ├── AddFoodScreen.js
│   │       ├── StatisticsScreen.js
│   │       ├── ProfileScreen.js
│   │       ├── SettingsScreen.js
│   │       └── AboutScreen.js
│   │
│   ├── services/           # Business logic layer
│   │   ├── workoutService.js
│   │   ├── foodService.js
│   │   └── userService.js
│   │
│   └── utils/              # Utility functions
│       └── helpers.js
│
├── App.js                  # App entry point
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🔧 Configuration

### Theme Customization

Edit `App.js` to customize the app theme:

```javascript
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',  // Change primary color
    accent: '#4ECDC4',   // Change accent color
    // ... other colors
  },
};
```

### Color Constants

Edit `src/constants/colors.js` to modify color scheme throughout the app.

### String Constants

Edit `src/constants/strings.js` to change text strings and add translations.

## 📱 Key Features Implementation

### Authentication Flow
- **Login**: Email/password authentication with Firebase
- **Registration**: Create new account with profile setup
- **Password Reset**: Email-based password recovery
- **Protected Routes**: Automatic redirect based on auth state

### Data Management
- **Workouts**: CRUD operations for workout entries
- **Food Logs**: Track meals with nutritional information
- **User Profile**: Manage user data and preferences

### Navigation
- **Stack Navigation**: For linear flows (Auth screens)
- **Tab Navigation**: For main app sections
- **Nested Navigation**: Stacks within tabs for deep navigation

## 🚧 Future Enhancements

- [ ] Barcode scanning for food entries
- [ ] Integration with nutrition API (USDA, Nutritionix)
- [ ] Exercise library with instructions
- [ ] Social features (friends, challenges)
- [ ] Goal setting and tracking
- [ ] Wearable device integration
- [ ] Offline mode support
- [ ] Push notifications
- [ ] Data export functionality
- [ ] Multiple language support

## 🛡️ Security Considerations

### For Production Deployment:

1. **Update Firebase Security Rules**: Implement proper authentication and authorization
2. **Environment Variables**: Use `.env` files for sensitive configuration
3. **Input Validation**: Validate all user inputs on client and server
4. **HTTPS Only**: Ensure all network requests use HTTPS
5. **Rate Limiting**: Implement rate limiting for API calls
6. **Data Encryption**: Encrypt sensitive user data

## 📦 Dependencies

### Core Dependencies
- `expo`: Expo SDK for React Native
- `react`: JavaScript library for building UI
- `react-native`: Framework for building native apps
- `firebase`: Firebase SDK for authentication and database
- `@react-navigation/native`: Navigation library
- `react-native-paper`: Material Design components

### Additional Dependencies
- `date-fns`: Date manipulation library
- `formik`: Form handling
- `yup`: Schema validation
- `react-native-chart-kit`: Charts and graphs
- `@react-native-async-storage/async-storage`: Local storage

## 🐛 Troubleshooting

### Common Issues

**Issue: Firebase initialization error**
- Ensure Firebase config is correctly set in `src/firebase/config.js`
- Verify Firebase project is active in console

**Issue: Navigation not working**
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Issue: Build errors**
- Check Node.js version (should be v14+)
- Update Expo CLI: `npm install -g expo-cli`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@myfitjournal.com or open an issue in the GitHub repository.

## 🙏 Acknowledgments

- React Native Team
- Expo Team
- Firebase Team
- React Navigation Team
- React Native Paper Team
- All contributors and users of this app

---

**Made with ❤️ for fitness enthusiasts**

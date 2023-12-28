import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from './hooks/auth';
import HeaderScreen from './screens/Header';
import FooterScreen from './screens/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Loginscreen';
import SignUpView from './screens/SignUpView';
import DetailScreen from './screens/DetailScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import CarForm from './screens/addcar';
import ProfilePage from './screens/profile';

const Stack = createStackNavigator();

const App = () => {
  const { user, loading, signOutUser } = useAuth();
  console.log(user);

  return (
    <NavigationContainer>
      {user && <HeaderScreen user={user} signOutUser={signOutUser} />}
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUpView} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Product Detail' }} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'About Us', headerShown: false }} />
        <Stack.Screen name="CarForm" component={CarForm} options={{ title: 'Add Car' }} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ title: 'Profile' }} />
      </Stack.Navigator>
      {user && <FooterScreen />}
    </NavigationContainer>
  );
};

export default App;

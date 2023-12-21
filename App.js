import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/Loginscreen';
import SignUpView from './screens/SignUpView';
import DetailScreen from './screens/DetailScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import CarForm from './screens/addcar';

const Stack = createStackNavigator();

const App = () => {
  return (

    <CarForm />

    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ title: 'Home' }}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{ title: 'Login' }}
    //     />
    //     <Stack.Screen
    //       name="SignUp"
    //       component={SignUpView}
    //       options={{ title: 'Sign Up' }}
    //     />
    //     <Stack.Screen
    //       name="Detail"
    //       component={DetailScreen}
    //       options={{ title: 'Product Detail' }}
    //     />
    //     <Stack.Screen
    //       name="AboutUs"
    //       component={AboutUsScreen}
    //       options={{ title: 'About Us', headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;

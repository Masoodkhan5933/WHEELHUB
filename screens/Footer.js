import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const FooterScreen = () => {

  const Navigation= useNavigation();
  return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => Navigation.navigate('Home')}>
          <Image source={require('../assets/home_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => Navigation.navigate('CarForm')}>
          <Image source={require('../assets/sell_icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Sell Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => Navigation.navigate('ContactUs')}>
          <Image source={require('../assets/contact_us.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => Navigation.navigate('ProfilePage')}>
          <Image source={require('../assets/more.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = {
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2, 
    borderColor: '#f0f0f0', 
    borderRadius: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 65,
    borderColor: 'gray',
  },
  
  navIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
  },
};

export default FooterScreen;

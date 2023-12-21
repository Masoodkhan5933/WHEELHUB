import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderNavBar = () => {
    return (
      <View style={styles.navBar}>
        {/* Text Logo */}
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoText}>Wheel Hub</Text>
        </View>

        {/* Add your navigation buttons here */}
        <View style={styles.navButtonsContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Destination</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Travel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBurgerMenu = () => {
    return (
      <TouchableOpacity style={styles.burgerMenu} onPress={toggleMenu}>
        <Icon name="bars" size={30} />
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('../assets/blueBackground.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {responsiveScreenWidth(100) >= 768 ? renderNavBar() : renderBurgerMenu()}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: '100%',
  },
  
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    width: '100%',
  },
  
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -65,
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginLeft: 40,
  },
  
  navButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -90,
    marginRight: 400,
  },
  
  navButton: {
    marginHorizontal: 10,
  },
  
  navButtonText: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },

  burgerMenu: {
    alignItems: 'flex-end',
    margin: 10,
  },
});

export default Navbar;

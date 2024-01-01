import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

const HeaderScreen = () => {
  
  return (
    <View style={styles.header}>
     <Text style={styles.appName}>
  <Text style={{ color: 'white' }}>Wheel</Text>
  <Text style={{ color: 'rgb(171,219,227)', fontWeight: 'bold' }}>Hub</Text>
  <Text style={{ color: 'white' }}>.COM</Text>
</Text>

      {/* <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.headerButton} onPress={() => console.log('Toyota pressed')}>
          <Text style={styles.buttonText}>Toyota</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => console.log('Manual pressed')}>
          <Text style={styles.buttonText}>Manual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => console.log('SUV')}>
          <Text style={styles.buttonText}>SUV</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => console.log('KPK pressed')}>
          <Text style={styles.buttonText}>KPK</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.searchBar}>
        <Image source={require('../assets/search_icon.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Used Cars"
          placeholderTextColor="gray"
        />
        <Image source={require('../assets/location_icon.png')} style={styles.locationIcon} />
        <Text style={styles.locationText}>All Cities</Text>
      </View>
    </View>
  );
};

const styles = {
    header: {
        alignItems: 'center',
        backgroundColor:'#154c79', // Change to the desired shade of blue
        paddingVertical: 10,
        width: '100%',
        height: '20%',
        paddingTop: 50,
        padding:10
      },
      
      
  appName: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Change from 'space-around' to 'space-between'
    marginHorizontal: 20, // Adjust marginHorizontal to control the space between buttons
    marginBottom: 10,
  },
  
  headerButton: {
    padding: 10,
    backgroundColor: 'rgb(171,219,227)',
    borderRadius: 20,
    marginHorizontal: 7, // Add marginHorizontal directly to the button style
  },
  
  buttonText: {
    fontSize: 15,
    // fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 15,
  },
};

export default HeaderScreen;

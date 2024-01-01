import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ContactUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top container with text and image */}
      <View style={styles.topContainer}>
        <Text style={styles.leftText}>
          <Text style={styles.darkBlueText}>Let's talk</Text>
          <Text style={styles.lightBlueText}> about </Text>
          <Text style={styles.darkBlueText}>everything</Text>
        </Text>

        <Image source={require('../assets/contactus.jpg')} style={styles.image} />
      </View>

      {/* Bottom container with the form */}
      <View style={styles.bottomContainer}>
        <TextInput style={styles.input} placeholder="Your Name" />
        <TextInput style={styles.input} placeholder="Your Email" />
        <TextInput style={styles.input} placeholder="Subject" />
        <TextInput style={[styles.input, styles.messageInput]} placeholder="Your Message" multiline />

        <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Submit pressed')}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: 20,
  },
  topContainer: {
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  leftText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 80, // Adjust this value as needed
  },
  darkBlueText: {
    color: 'darkblue', // Change to the desired dark blue color
    fontWeight: 'bold',
    fontSize: 35,
  },
  lightBlueText: {
    color: 'lightblue', // Change to the desired light blue color
    fontWeight: 'bold',
    fontSize: 35,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  messageInput: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#154c79',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
});

export default ContactUs;

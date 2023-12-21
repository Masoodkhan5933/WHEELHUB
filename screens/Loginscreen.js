import React, { useState } from 'react';
import {

StyleSheet,
Text,

View,
TextInput,
TouchableOpacity,
} from 'react-native';

const Loginscreen =  () => {
const onPressLogin = () => {
// Do something about login operation
};
const onPressForgotPassword = () => {
// Do something about forgot password operation
};
const onPressSignUp = () => {
// Do something about signup operation
};

const [state,setState] = useState({
email: '',
password: '',
})
return (
<View style={styles.container}>
<Text style={styles.title}> Login Screen</Text>
<View style={styles.inputView}>
<TextInput
          style={[styles.inputText, styles.emailInput]}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({ email: text })}
        />
</View>
<View style={styles.inputView}>
<TextInput
          style={[styles.inputText, styles.passwordInput]}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setState({ password: text })}
        />
</View>
<TouchableOpacity
onPress = {onPressForgotPassword}>
<Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
</TouchableOpacity>
<TouchableOpacity
onPress = {onPressLogin}
style={styles.loginBtn}>
<Text style={styles.loginText}>LOGIN </Text>
</TouchableOpacity>
<TouchableOpacity
onPress = {onPressSignUp}>
<Text style={styles.forgotAndSignUpText}>Signup</Text>
</TouchableOpacity>
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#4FD3DA',
alignItems: 'center',
justifyContent: 'center',
},
title:{
fontWeight: "bold",
fontSize:50,
color:"#fb5b5a",
marginBottom: 40,
},
inputView:{
width:"80%",
backgroundColor:"#3AB4BA",
borderRadius:25,
height:50,
marginBottom:20,
justifyContent:"center",
padding:20
},
inputText:{
height:50,
color:"white"
},
forgotAndSignUpText:{
color:"white",
fontSize:30,
},
loginBtn:{
width:"80%",
backgroundColor:"#fb5b5a",
borderRadius:25,
height:50,
alignItems:"center",
justifyContent:"center",
marginTop:40,
marginBottom:10
},

  emailInput: {
    // Add specific styles for the email input here
    fontSize: 18, // Set the desired font size
    // You can add other styles specific to the email input here
  },
  passwordInput: {
    // Add specific styles for the password input here
    fontSize: 18, // Set the desired font size
    // You can add other styles specific to the password input here
  },
});
export default Loginscreen;
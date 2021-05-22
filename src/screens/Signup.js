import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import firebase from '../../database/firebase';

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false,
      photoURL: 'http://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w',
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName,
          photoURL: this.state.photoURL,
        })
        console.log(res)
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        this.setState({ 
          isLoading: false,
          displayName: '',
          phoneNumber: '',
          email: '', 
          password: '', })
          Alert.alert('Incorrect Entry!')
      })     
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style = {{backgroundColor: '#fff'}}>
        <View style={styles.container}>  
            <View style = {styles.defaultimage} >
              <Image style={{width: 200, height: 200}} source={{uri: 'data:image/png;base64,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'}} />
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="Name"
              value={this.state.displayName}
              onChangeText={(val) => this.updateInputVal(val, 'displayName')}
              />          
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
              />
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
              />   
            <Button
              color="#b99aff"
              title="Sign up"
              onPress={() => this.registerUser()}
              />

            <Text 
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Login')}>
              Already Registered? Click here to login
            </Text>  
        </View>                         
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#b99aff',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  defaultimage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50,
    paddingTop: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
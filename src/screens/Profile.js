import UploadScreen from './Upload';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import firebase from '../../database/firebase';


export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    }
    // if (this.state.phoneNumber === null) this.state.phoneNumber = '+91';
  }
  
  updateInputVal = (val, prop) => {    
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  
  updateDatabase = () => {
    firebase.auth().currentUser.updateProfile({ displayName: this.state.displayName});
  }
  
  render() {
    
    return (
      <ScrollView style={styles.pgcolor}>
        <View style={styles.container}>
            
          <Text style = {styles.textStyle}>
            Hello, {this.state.displayName}
          </Text>
          <UploadScreen/>
          <View style = {styles.cont}>
              <View style ={styles.inputRow}>
                  <Text style = {{marginTop: 15, fontWeight:'bold'}}>Name  :     </Text>
                  <TextInput
                      style={styles.inputStyle}
                      placeholder="Update Name"
                      value={this.state.displayName}
                      onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                  />
              </View>   

              <View style ={styles.inputRow}>
                  <Text style = {{marginTop: 15, fontWeight:'bold'}}>Mobile :     </Text>
                  <TextInput
                      style={styles.inputStyle}
                      placeholder="Mobile"
                      value={this.state.phoneNumber}
                      maxLength={13}
                      onChangeText={(val) => this.updateInputVal(val, 'phoneNumber')}
                  /> 
              </View>
          </View>
          <View>
            <TouchableOpacity style = {styles.btstyle} onPress={this.updateDatabase}>
              <Text style= {{color: '#6200ee'}}>UPDATE</Text>
            </TouchableOpacity>
            <Button
              color="#b99aff"
              title="Logout"
              onPress={() => this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              })}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pgcolor: {
    backgroundColor: '#fff',
  },
  cont: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  btstyle: {
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6200ee',
    marginBottom: 15,
  },
  inputRow: {
    flex:2,
    flexDirection: 'row',
  },
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  inputStyle: {
    width: '75%',
    marginBottom: 15,
    paddingBottom: 15,
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
});
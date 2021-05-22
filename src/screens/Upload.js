import ImagePicker from 'react-native-image-crop-picker';
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Button
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firebase from '../../database/firebase';

const UploadScreen = () => {
  
  const [image, setImage] = useState(firebase.auth().currentUser.photoURL)
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height:300,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };
  
  const selectGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      setImage(image.path);
    });
  };

  const uploadImage = async () => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri = image;
    console.log(filename);
    console.log(uploadUri);
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    firebase.auth().currentUser.updateProfile({ photoURL: image});
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert('Photo uploaded!');
  };

  return (
    <View style = {styles.container}>
      <Image source={{uri: image}}
       style={{width: 200, height: 200, borderRadius: 100}} />
      <View style = {styles.buttoncontainer}>
        <TouchableOpacity style = {styles.selectButton} onPress={selectCamera}>
          <Text style = {styles.bttext}>Take a Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity  style = {styles.selectButton} onPress={selectGallery}>
          <Text style = {styles.bttext}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress = {uploadImage}  style = {styles.btstyle}>
        <Text style= {{color: '#6200ee'}}>UPLOAD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttoncontainer: {
    flexDirection: 'row',
  },
  selectButton: {
    borderRadius: 100,
    width: 150,
    height: 30,
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  bttext: {
    fontWeight: '600'
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
  }
});
export default UploadScreen;
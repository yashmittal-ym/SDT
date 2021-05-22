import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ActionBarImage = (props) => {
    return (
        <View style = {{flex:1, flexDirection: 'row'}}>
            <Image source = {require('../../assets/SDT.png')} style = {{width:50, height:50, marginTop: 40}} />
            <Text style = {styles.headerTitleStyle}>{props.title}</Text>
        </View> 
    );
};

const styles = StyleSheet.create({
    headerTitleStyle: {
        color: '#fff',
        textAlign:"center",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:20,
        padding: 50
      },
});

export default ActionBarImage;
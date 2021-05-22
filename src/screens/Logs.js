import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import firebase from '../../database/firebase';
import SingleLog from './SingleLog';


const LogScreen = () => {
    
    const [fetchedData, setFetchedData] = useState({});
    const [fetchedDataKeys, setFetchedDataKeys] = useState(Object.keys(fetchedData));
    
    const UpdateLogs = () => {
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        firebase.database().ref('users').child(uid).once('value')
            .then((data) => {
                setFetchedData(data.val());
                setFetchedDataKeys(Object.keys(fetchedData));
                
                // console.log(fetchedData);
            })
            .catch((error) => {
                console.log('Fetching Error', error)
            }); 
    }

    return (
        <ScrollView>
            <View>
                <Button title = 'Double tap to Refresh Logs' onPress = {UpdateLogs} color = '#b99aff'/>
                {fetchedDataKeys.length > 0 ? ( 
                    fetchedDataKeys.reverse(),                   
                    fetchedDataKeys.map((key, index)=> (
                    <SingleLog
                        key={key}
                        id={key}
                        index = {index + 1}
                        dataItem={fetchedData[key]}
                    />
                    ))
                ) : (
                        <Text style = {{textAlign:'center', justifyContent:'center', margin: 100, fontSize:25, fontStyle:'italic', fontWeight: 'bold'}}>Go start a drive!</Text>
                )}
                
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default LogScreen;
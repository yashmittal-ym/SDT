import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const SingleLog = (props) => {
    return (
        <View
            style={{
                borderBottomColor: '#694fad',
                borderBottomWidth: 3,
            }}
        >
            <TouchableOpacity >
                <Card >
                    <Card.Title title={`${props.index}.         ${props.dataItem.sd}     ${props.dataItem.ed}`} 
                        subtitle= {`${props.dataItem.dur}.   ${props.dataItem.st}  ${props.dataItem.et}        ${props.dataItem.score}`}/>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                </Card>
                
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default SingleLog;
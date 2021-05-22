import React, { Component } from 'react';
import moment from "moment";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import firebase from '../../database/firebase';
import { Animated, Easing, Image } from 'react-native'
import { StackActions, CommonActions } from '@react-navigation/native';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
        timer: null,
        starttime: '',
        startdate: '',
        hours_Counter: '00',
        minutes_Counter: '00',
        seconds_Counter: '00',
        startDisable: false,
        spinAnim: new Animated.Value(0),
        tmp: Number(1),
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  componentDidMount(){
    Animated.loop(Animated.timing(
        this.state.spinAnim,
        {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
        }
    )).start();
  }

  onButtonStart = () => {
    
    this.props.navigation.navigate('RealTime', {conf : 'yes'});

    this.setState({starttime: moment().format('HH:mm:ss'), startdate: moment().format('DD/MM/YYYY'), wp: 1})
    let timer = setInterval(() => {

      var sec = (Number(this.state.seconds_Counter) + 1).toString(),
          min = this.state.minutes_Counter,
          hr = this.state.hours_Counter;

      if (Number(this.state.seconds_Counter) === 59) {
        min = (Number(this.state.minutes_Counter) + 1).toString();
        sec = '00';
      }

      if (Number(this.state.seconds_Counter) === 59 && Number(this.state.minutes_Counter) === 59) {
        hr = (Number(this.state.hours_Counter) + 1).toString();
        min = '00';
        sec = '00';
      }

      this.setState({
        hours_Counter: hr.length === 1 ? '0' + hr : hr,
        minutes_Counter: min.length === 1 ? '0' + min : min,
        seconds_Counter: sec.length === 1 ? '0' + sec : sec
      });
    }, 1000);

    // getscore = async () => {
    //   try {
    //     var response = await fetch(
    //       'https://bsrtbrb.herokuapp.com/'
    //     );
    //     var json = await response.text();
    //     console.log(json);
    //     this.setState({newimage: json});
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    
    // getscore();
    
    this.setState({ timer });
    this.setState({startDisable : true})
  }
  
  onButtonStop = () => {
    
    var enddate = this.state.startdate;
    
    var carry = 0;
    const hrst = this.state.starttime[0] + this.state.starttime[1];
    const mnst = this.state.starttime[3] + this.state.starttime[4];
    const scst = this.state.starttime[6] + this.state.starttime[7];

    var scet = Number(scst) + Number(this.state.seconds_Counter);
    if (scet > 59) carry = 1, scet -= 60;
    var mnet = Number(mnst) + Number(this.state.minutes_Counter) + carry;
    carry = 0;
    if (mnet > 59) carry = 1, mnet -= 60;
    var hret = Number(hrst) + Number(this.state.hours_Counter) + carry;
    carry = 0;
    if (hret > 23) carry = 1, hret -= 24;
    hret = hret.toString();
    mnet = mnet.toString();
    scet = scet.toString();
    hret = hret.length === 1 ? '0' + hret : hret;
    mnet = mnet.length === 1 ? '0' + mnet : mnet;
    scet = scet.length === 1 ? '0' + scet : scet;

    const endtime = hret+':'+mnet+':'+scet;
    const duration = this.state.hours_Counter+":"+this.state.minutes_Counter+":"+this.state.seconds_Counter;
    if (carry === 1) enddate = moment(this.state.startdate, 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY');
    
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var yourdata = {st: this.state.starttime, et: endtime, sd: this.state.startdate, ed: enddate, dur: duration};
    firebase.database().ref('users').child(uid).push(yourdata)
    .then((data) => {
        console.log('Saved Data', data);
        Alert.alert('Saved');
    })
    .catch((error) => {
        console.log('Storing Error', error)
    });  


    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      starttime: '',
      startdate: '',
      hours_Counter: '00',
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable : false
    });

    this.props.navigation.navigate('RealTime', {conf : 'no'});
  }

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={styles.MainContainer}>
        
        <Animated.Image
          style={{height:200, width: 200,transform: [{rotate: spin}], marginBottom:100 }}
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDdIZARagf71VUGNTA056HbclEki4hofuoJA&usqp=CAU'}}
        />
        <Text style={styles.counterText}>{this.state.hours_Counter} : {this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
        <TouchableOpacity
          onPress={this.onButtonStart}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#b99aff' }]} 
          disabled={this.state.startDisable} >

          <Text style={styles.buttonText}>START</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonStop}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor:  '#b99aff'}]} >

          <Text style={styles.buttonText}>STOP</Text>

        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  },
  counterText:{

    fontSize: 28,
    color: '#000'
  }
});
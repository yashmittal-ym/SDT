import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import LogScreen from './src/screens/Logs';
import ProfileScreen from './src/screens/Profile';
import MyWeb from './src/screens/Webpage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionBarImage from './src/screens/ActionBarImage';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const Dash = () => {
  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
    activeColor="#fff"
    barStyle={{ backgroundColor: '#694fad' }}
  >
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarLabel: 'Start Drive',
        tabBarIcon: ({ color }) => (
          <Icon name="car-sport-outline" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Logs"
      component={LogScreen}
      options={{
        tabBarLabel: 'View Logs',
        tabBarIcon: ({ color }) => (
          <Icon name="document-outline" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Icon name="person-circle-outline" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="RealTime"
      component={MyWeb}
      options={{
        tabBarLabel: 'View Video',
        tabBarIcon: ({ color }) => (
          <Icon name="document-outline" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}




const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator > 
          <Stack.Screen name="Signup" component={Signup} options={{
            title: 'REGISTER',
            headerStyle: {
              backgroundColor: '#694fad',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              textAlign:"center",
              flex:1 ,
              fontSize:20,
              padding: 50
            },
            headerTitle: props => <ActionBarImage title= '      REGISTER' />,
            
          }}/>  
          <Stack.Screen name="Login" component={Login} options={{
            title: 'LOGIN',
            headerStyle: {
              backgroundColor: '#694fad',
            },
            headerLeft: null,
            headerTintColor: '#fff',
            headerTitleStyle: {
              textAlign:"center",
              flex:1 ,
              fontSize:20,
              padding: 50
            },
            headerTitle: props => <ActionBarImage title= '          LOGIN' />,


          }}/>
          <Stack.Screen name="SDT" component={Dash} options={{
            title: 'Welcome to SDT',
            headerStyle: {
              backgroundColor: '#694fad',
            },
            headerLeft: null,
            headerTintColor: '#fff',
            headerTitleStyle: {
              textAlign:"center",
              flex:1 ,
              fontSize:20,
              padding: 50,
            },
            headerTitle: props => <ActionBarImage title= '  Welcome to SDT' />,

          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDJdRuSMDx24Dhj20ncAXsu2zO1h4KjkWY",
  authDomain: "temp-fcdf5.firebaseapp.com",
  databaseURL: "https://temp-fcdf5-default-rtdb.firebaseio.com",
  projectId: "temp-fcdf5",
  storageBucket: "temp-fcdf5.appspot.com",
  messagingSenderId: "845968614069",
  appId: "1:845968614069:web:40f73e90b38158d31c94fc",
  measurementId: "G-M0GR0GGZD3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
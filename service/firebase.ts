import firebase from "firebase/app";
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyB2MjSd_-i0_Zz-k0ego1foDWP8Hd5rCGc",
    authDomain: "jhtelecomteste.firebaseapp.com",
    projectId: "jhtelecomteste",
    storageBucket: "jhtelecomteste.appspot.com",
    messagingSenderId: "934729415360",
    appId: "1:934729415360:web:12c2df9781b3b2c9030b25"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}else{
    firebase.app()
}

const database = firebase.database()

export{database, firebase}
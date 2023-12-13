import React, {useState, useEffect } from 'react';
import {View} from 'react-native';

import styles from '../styles/FriendsStyles.js'
import Friend from '../components/Friend.js';


                
const VirtualListBasics = ({user}) => {
  const[friends,setFriends]= useState([]);
  const [aphoto, setPhoto] = useState('assets/snack-icon.png');

  //Get our user information to access their friends. 
useEffect(() => {
        async function loadList(url) {
           
            const response = await fetch(url);
            const names = await response.json();
            setFriends(names.friends);
            console.log(names.friends);
            }

            const urladress = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater'+ user.username +'}';

        loadList(urladress)

}, []);


  //simple list object created with Friends js
  var alist = <View style = {styles.container} >
                <Friend friendList={friends} source={{uri: aphoto}} /> 
                </View>
  return (alist);
}

export default VirtualListBasics;

import styles from '../styles/FriendsStyles.js';
import React, {useState} from 'react';
import ImageButton from './ImageButton.js';
import {Text, View, VirtualizedList} from 'react-native';

const Friend = (props) => {
  const renderItem = ({ item }) => {
       return (
         <View  style={{
              flex: 1,
              
              flexDirection: 'column',
              margin: 5
            }}>
        <ImageButton image={item.image} label={item.username} click={seeFriendProfile}> </ImageButton>
         </View>
    );
 };
 //WIP See detailed information about friend's profile 
 function seeFriendProfile() {
   console.log("Page navigated to friend's profile");
 }
 

 var preview= <View style={styles.container} >
        <Text style={styles.header2}> Friends </Text> 
        <VirtualizedList 
            horizontal={true}
            data={props.friendList}
            renderItem={renderItem}
            getItemCount={() => props.friendList.length}
            getItem={(data, index) => data[index]}
              keyExtractor={(index) => index}
              />
        
        </View>

    return preview;
}

export default Friend;



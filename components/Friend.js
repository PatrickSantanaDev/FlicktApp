import styles from './styles.js';
import React, {useState} from 'react';
import ImageButton from './ImageButton.js';
import CustomButton from './CustomButton.js';
import { Image, Pressable,TouchableOpacity, Button, FlatList, StyleSheet, Text, View, ListItem } from 'react-native';

const Friend = (props) => {
  const renderItem = ({ item ,index}) => {
  //asource = {uri: props.friendList[index].image}
  //console.log(props.photolist[index]);
       return (
         <View  style={{
              flex: 1,
              
              flexDirection: 'column',
              margin: 5
            }}>
        <ImageButton image={item.image} label={item.label} click={seeFriendProfile}> </ImageButton>
         </View>
    );
 };

 function seeFriendProfile() {
   console.log("Page navigated to friend's profile");
 }
 
 function showOptions() {
   console.log("showing options");
 }

 var preview= <View style={styles.container} >
        <Text style={styles.header2}> Friends </Text> 
        <CustomButton buttonStyle= {styles.homebutton} textStyle = {styles.homebuttonIcon} name = "." click= {showOptions}/>
        <FlatList 
            horizontal={true}
            data={props.friendList}
            renderItem={renderItem}
              keyExtractor={(item, index) => index}
              />
        
        </View>

    return preview;
}

export default Friend;

/*export default function Friend() {



  function getFriendImage() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
    </View>
  );
  }
} */


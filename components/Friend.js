import styles from '../styles/FriendsStyles.js';
import React, {useState} from 'react';
import ImageButton from './ImageButton.js';
import {Text, View, VirtualizedList} from 'react-native';
import {useNavigation} from "@react-navigation/native";


const Friend = (props) => {
    const navigation = useNavigation();
    const url = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater}';
  const renderItem = ({ item, index}) => {
    return (
      <View  style={{
           flex: 1,
           
           flexDirection: 'column',
           margin: 5
         }}>
     <ImageButton image={item.image} label={item.username} click={()=>seeFriendProfile(item)}> </ImageButton>
      </View>
 );
};

 const renderStats = () => {
  if (showStats) {
    var allViewed = "";
    var allRated = "";
    let i;
    console.log("Viewed:");
    console.log(viewed);
    
    console.log("Rated:");
    console.log(rates);
    for(i = 0; i < viewed.length; i++) {
      allViewed += viewed[i].Title + ", ";
    }
    allViewed = allViewed.slice(0, allViewed.length - 2);

    for(i = 0; i < rates.length; i++) {
      allRated += rates[i].Title + ", ";
    }
    allRated = allRated.slice(0, allRated.length - 2);
      return (
          <View style={styles.container}>
              <Text style={styles.smallPhotoText}>User Statistics:</Text>
              <Text>Viewed: {allViewed }</Text>
              <Text>Rated: {allRated}</Text>
          </View>
      );
  }
  return null;
};
    async function seeFriendProfile(item) {
        console.log(item);
        try {
            const response = await fetch(url);
            if (response.ok) {
                const names = await response.json();
                console.log("Names fetched from the server: ", names);

                if (!Array.isArray(names)) {
                    console.log("Error: The fetched data is not an array.");
                    return;
                }

                console.log("Searching for a friend " + item.username);
                const userFound = names.find(userJSON => userJSON.username === item.username);

                if (userFound) {
                    console.log("User found: ", userFound);
                    navigation.push('Profile', { user: userFound });
                } else {
                    console.log("User couldn't be found. This person doesn't have any info.");
                    return;
                }
            } else {
                console.log("Server response not OK");
            }
        } catch (error) {
            console.error(error);
        }
    }
 
 

 var preview= <View style={styles.container} >
        <Text style={styles.header2}> Friends </Text> 
        <VirtualizedList 
            horizontal={true}
            data={props.friendList}
            renderItem={renderItem}
            getItemCount={() => props.friendList.length}
            getItem={(data, index) => data[index]}
            keyExtractor={(item, index) => index.toString()}
              />
        
        </View>

    return preview;
}

export default Friend;



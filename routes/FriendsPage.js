import React, {useState, useEffect } from 'react';
import {View} from 'react-native';

import styles from '../styles/FriendsStyles.js'
import Friend from '../components/Friend.js';
import {saveList} from "../components/SaveAndLoad";

                
const VirtualListBasics = ({user}) => {
  const[friends,setFriends]= useState([]);
  const [aphoto, setPhoto] = useState('assets/snack-icon.png');

  //Get our user information to access their friends. 

  useEffect(() => {
    async function loadList(url) {
       
         const response = await fetch(url);
        if (response.ok) {
            const names = await response.json();

            const foundUser = names.find(JSONuser => JSONuser.username === user.username);
            console.log("founduser:");
            console.log(foundUser);
            if (foundUser) {
                setFriends(foundUser.friends);
                setaUser(foundUser);
            }
            else 
              console.log("Problem");
        }
    }
      
    loadList(urladress)

}, []);


const dialogInp =  <DialogInput isDialogVisible={showme} 
      title="Enter username"
      message="Enter The your friends username to look for them"
      submitInput={ (inputText) =>{setShowme(false); searchforFriend(inputText)}}
      closeDialog={() => {setShowme(false)}}
      >
      <Text>Something</Text>
      </DialogInput>;

async function searchforFriend(inputText) {
//use the url to get all users
const response = await fetch(urladress);
        if (response.ok) {
            const names = await response.json();
            console.log("Searching for a friend " + inputText);
            //compare the given username from database
            const userFound = names.find(userJSON => userJSON.username === inputText);
            if(userFound)
            console.log("searching found: " + userFound.username);
            else {
              console.log("user couldn't found, this person DNE");
              return; //if person DNE, return
            }

            //This part checks if this person is already a friend, if that's the case, don't add the user again.
            
            var isAlreadyFriend;
            for(i = 0; i < aUser.friends.length; i++) {
              console.log("username: and length")
                console.log(aUser.friends[i].username);
                console.log(aUser.friends.length);
              if(aUser.friends[i].username === inputText) {
                
                isAlreadyFriend = 1;
                break;
              }
              else {
                isAlreadyFriend = 0;
              }
            }
            console.log("isAlready " + isAlreadyFriend);
            console.log(userFound);
            //Or a user cannot add themselves as a friend.
            if(userFound.username != "" && isAlreadyFriend === 0 && userFound.username != aUser.username) {
            console.log("this person exists, added as a friend");

            aUser.friends.push({
                    key: userFound.username,
                    selected: false,
                    username: userFound.username,
                    image: userFound.avatar
                });
                userFound.push({
                    key: aUser.username,
                    selected: false,
                    username: aUser.username,
                    image: aUser.avatar
                });
            
            setFriends(aUser.friends.concat(aUser, {key: userFound.username ,selected: false, username: userFound.username, image: userFound.avatar}));
            await saveList(save, names);
              }           
            else {
              console.log("This person is already a friend");
            }
            }

else {
  console.log("Respons is not ok or this person DNE");
}
//get user database

//look for the username, if it exists, inform the user, and add/set it to friends array.
//if it doesn't inform user about that person DNE with alert. 

}

function searchButton() {
  console.log("Search Button");
    setShowme(true);
  
  }


  //simple list object created with Friends js
  var alist = <View style = {styles.container} >
                <Friend friendList={friends} source={{uri: aphoto}} />
                {dialogInp}
                <CustomButton name = "Search for a Friend" click ={searchButton} /> 
                </View>
  return (alist);
}

export default VirtualListBasics;

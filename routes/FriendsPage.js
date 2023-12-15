import React, { useEffect, useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';

import styles from '../styles/FriendsStyles.js'
import Friend from '../components/Friend.js';
import { saveList } from "../components/SaveAndLoad";
import { useFocusEffect } from "@react-navigation/native";

const VirtualListBasics = ({ user }) => {
    const [friends, setFriends] = useState([]);
    const [aphoto, setPhoto] = useState('assets/snack-icon.png');
    const urladress = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater}';
    const save = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user={movierater}';
    const [showInput, setShowInput] = useState(false);
    const [searchText, setSearchText] = useState('');
    //Get our user information to access their friends.
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
    const [aUser, setaUser] = useState({});
    const [showme, setShowme] = useState(false);
    useEffect(() => {


        loadList(urladress)

    }, []);
    useFocusEffect(
        React.useCallback(() => {
            const urlAddress = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater}';
            loadList(urlAddress);
        }, [user.username])
    );



    async function searchforFriend() {
        try {
            const response = await fetch(urladress);
            if (!response.ok) {
                console.log('Failed to fetch data!');
                return;
            }

            const names = await response.json();
            const foundUser = names.find(JSONuser => JSONuser.username === user.username);
            if (!foundUser) {
                console.log('User not found!');
                return;
            }

            const friendName = searchText.trim();
            if (!friendName) {
                console.log('Invalid friend name!');
                return;
            }

            const foundFriend = names.find(JSONuser => JSONuser.username === friendName);
            if (!foundFriend) {
                console.log('Friend not found in the list!');
                return;
            }

            if (foundUser.friends.find(JSONuser => JSONuser.username === friendName)) {
                console.log('Friend already exists in friends!');
                return;
            }

            if (foundFriend === foundUser) {
                console.log('Cannot add yourself as a friend!');
                return;
            }

            //confirmation dialog popup
            Alert.alert(
                "Add Friend",
                `Do you want to add ${friendName} as your friend?`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Add friend cancelled."),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: async () => {
                            // add the friend
                            foundUser.friends.push({
                                key: foundFriend.username,
                                selected: false,
                                username: foundFriend.username,
                                image: foundFriend.avatar
                            });
                            foundFriend.friends.push({
                                key: foundUser.username,
                                selected: false,
                                username: foundUser.username,
                                image: foundUser.avatar
                            });
                            await saveList(save, names);
                            await loadList(urladress);
                            console.log('Friend added successfully!');
                        }
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }



    const handleSearch = () => {
        // Add your logic to perform the search using the 'searchText' state
        // For example, fetch data or perform a search operation

        // For demonstration purposes, display an alert with the search query
        Alert.alert('Search Query', `Searching for user: ${searchText}`);

        // Reset the input state and hide the input section
        setSearchText('');
        setShowInput(false);
    };

    //simple list object created with Friends js
    /*const alist = <View style={styles.container}>
        <Friend friendList={friends} source={{uri: aphoto}}/>
        <Button title="Search" onPress={handleSearch}/>
        <Button
            title="Search for a user"
            onPress={() => setShowInput(true)}
            style={{marginBottom: 20}}
        />
    </View>;
    return (alist);*/
    return (


        <View style={{ flex: 1, justifyContent: 'flex-end' }}>


            <View style={styles.container}>

                <Friend friendList={friends} source={{ uri: aphoto }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8 }}
                    placeholder="Add Friend By Username"
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                />
                <Button
                    title="Search and Add Friend"
                    onPress={searchforFriend}
                    disabled={!searchText} // Disable the button if no text is entered
                />
            </View>
        </View>
    );
}

export default VirtualListBasics;

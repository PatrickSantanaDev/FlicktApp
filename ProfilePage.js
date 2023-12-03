
/*
Right now using this going to change it to grab from class php server using usernames as
    interests(Username of user)
    fav(Username of User)
    etc.

        name: 'John Doe',
        avatar: require('./assets/favicon.png'),
        interests: ['Action', 'Comedy', 'Drama'],
        friends: ['Friend 1', 'Friend 2', 'Friend 3'],
        recMovies: ['Movie 1', 'Movie 2', 'Movie 3'],
        userStats: {
            viewed: 50,
            rated: 30,
            recommendations: 15,
        }


TODO:
 - ADD get Interest for php
 - ADD get avatar from php server
 - ADD get stats from php server
 - Fix styling

 */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, Image, FlatList, VirtualizedList} from 'react-native';
import profileStyles from './components/Profile-styles.js'
import {saveList, loadList} from "./components/SaveAndLoad";





const OMDB_API_KEY = '942c9b75';

const ProfilePage = ({ user }) => {
    const [getuser,setGetuser] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const [movies, setMovies] = useState([]);
    const[friends,setFriends]= useState([]);
    const[interests, setInterests] = useState([]);
    const[rates,setRates]=useState([])
    const[viewed,setViewed] = useState([])
    const[avatar,setAvatar] = useState('')


    // Mock user data for demonstration
    useEffect(() => {
        async function loadList(url, list, setlist) {

            const response = await fetch(url);
            const names = await response.json();
            console.log(names)
            setlist(names)
            setMovies(names.recMovies);
            setFriends(names.friends);
            setInterests(names.interests);
            setRates(names.rates);
            setAvatar(names.avatar);
            setViewed(names.viewed);
        }
        var urladress = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater'+ user.username +'}';
        //saveList(urladress, user);
        loadList(urladress,getuser,setGetuser)


        console.log(getuser);


    }, []);


    const toggleStats = () => {
        setShowStats(!showStats);
    };

    const renderStats = () => {
        if (showStats) {
            return (
                <View style={profileStyles.userInfo}>
                    <Text style={profileStyles.label}>User Statistics:</Text>
                    <Text>Viewed: {viewed.length}</Text>
                    <Text>Rated: {rates.length}</Text>
                    <Text>Recommendations: {movies.length}</Text>
                </View>
            );
        }
        return null;
    };
    const renderMovie = ({ item }) => (
        <View>
            <View >
                <Image source={{ uri: item.Poster }} style={profileStyles.poster} />
            </View>
            <Text style={profileStyles.userInfo}>{item.Title}</Text>
        </View>

    );
    const renderInterests = ({ item }) => (
        <View style={profileStyles.movieContainer}>
            <Text style={profileStyles.movieTitle}>{item.Type}</Text>
        </View>
    );
    const renderFriend = ({ item }) => (
        <View >
            <View >
                <Image source={{uri:item.image}} style={profileStyles.friendImage} />
            </View>
            <Text style={profileStyles.userInfo}>{item.username}</Text>
        </View>

    );

    return (
        <View style={profileStyles.container}>
            {/*Name of User*/}
            <Text style={profileStyles.header}>{user.name}</Text>

            <View style={profileStyles.userInfo}>
                <View style={profileStyles.avatarContainer}>
                    <Image source={{uri:user.avatar}} style={profileStyles.profileImage} />

                    <Image source={require('./assets/icon.png')} style={profileStyles.badgeImage} />
                </View>
            </View>
            <View style={profileStyles.userInfo}>
                <View style={profileStyles.iconsContainer}>
                    {/* Stats */}
                    <Button
                        title={showStats ? 'Hide Stats' : 'Show Stats'}
                        onPress={toggleStats}
                    />
                    {renderStats()}
                </View>
            </View>

            {/*Interests*/}
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Interests:</Text>
                <View style={profileStyles.iconsContainer}>
                    <VirtualizedList
                        data={interests}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderInterests}
                        getItemCount={() => interests.length}
                        getItem={(data, index) => data[index]}
                        contentContainerStyle={profileStyles.listContainer}
                    />
                </View>
            </View>

            {/*Friends*/}
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Friends:</Text>
                <View style={profileStyles.iconsContainer}>
                    <VirtualizedList
                        data={friends}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderFriend}
                        getItemCount={() => friends.length}
                        getItem={(data, index) => data[index]}
                        contentContainerStyle={profileStyles.listContainer}
                    />
                </View>
            </View>

            {/*Movies*/}
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Recommended Movies:</Text>
                <View style={profileStyles.iconsContainer}>

                    <VirtualizedList
                        data={movies}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderMovie}
                        getItemCount={() => movies.length}
                        getItem={(data, index) => data[index]}
                        contentContainerStyle={profileStyles.listContainer}
                    />

                </View>
            </View>

        </View>
    );

};


export default ProfilePage;
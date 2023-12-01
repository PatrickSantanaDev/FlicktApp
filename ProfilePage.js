
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
 - ADD get friends function
 - ADD get Interest for php
 - ADD get movie recs from php server
 - ADD get avatar from php server
 - ADD get stats from php server
 - Fix styling

 */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, Image, FlatList} from 'react-native';
import profileStyles from './components/Profile-styles.js'



const OMDB_API_KEY = '942c9b75';

const ProfilePage = ({ user }) => {
    const [showStats, setShowStats] = useState(false);
    const [movies, setMovies] = useState([]);
    // Mock user data for demonstration
    useEffect(() => {
        const searchMovies = async () => {

            try {
                const responses = await Promise.all(
                    user.recMovies.map((keyword) =>
                        fetch(
                            `http://www.omdbapi.com/?t=${encodeURIComponent(
                                keyword
                            )}&apikey=${OMDB_API_KEY}`
                        ).then((response) => response.json())
                    )
                );
                console.log('API Responses:', responses);

                setMovies(responses);
                console.log(movies)
            } catch (error) {
                console.error(error);
            }
        };
        searchMovies();
    }, []);


    const toggleStats = () => {
        setShowStats(!showStats);
    };

    const renderStats = () => {
        if (showStats) {
            return (
                <View style={profileStyles.userInfo}>
                    <Text style={profileStyles.label}>User Statistics:</Text>
                    <Text>Viewed: {user.userStats.viewed}</Text>
                    <Text>Rated: {user.userStats.rated}</Text>
                    <Text>Recommendations: {user.userStats.recommendations}</Text>
                </View>
            );
        }
        return null;
    };
    const renderMovie = ({ item }) => (
        <View style={profileStyles.itemContainer}>
            <View style={profileStyles.imageContainer}>
                <Image source={{ uri: item.Poster }} style={profileStyles.poster} />
            </View>
            <Text style={profileStyles.userInfo}>{item.Title}</Text>
        </View>

    );


    return (
        <View style={profileStyles.container}>

            {/*Name of User*/}
            <Text style={profileStyles.header}>{user.name}</Text>

            {/*Profile Picture*/}
            <View style={profileStyles.userInfo}>
                <Image source={user.avatar} style={profileStyles.profileImage} />
            </View>

            {/*Interests*/}
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Interests:</Text>
                <Text>{user.interests.join(', ')}</Text>
            </View>

            {/*Friends*/}
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Friends:</Text>
                <View style={profileStyles.iconsContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}  contentContainerStyle={{ flexGrow: 1 }}>
                        {user.friends.map((friend, index) => (
                            <View key={index} style={profileStyles.blackBox}></View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/*Movies*/}
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Recommended Movies:</Text>
                <View style={profileStyles.iconsContainer}>

                    <FlatList
                        data={movies}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderMovie}
                        contentContainerStyle={profileStyles.listContainer}
                    />

                </View>
            </View>
            {/*Stats*/}
            <Button
                title={showStats ? 'Hide Stats' : 'Show Stats'}
                onPress={toggleStats}
            />{renderStats()}
        </View>
    );

};


export default ProfilePage;

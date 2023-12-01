
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
- Add OMDB to Recommended Movies
- ADD get friends function
- ADD get Interest for php
- ADD get movie recs from php server
- ADD get avatar from php server
- ADD get stats from php server
- Fix Friends and recommended movie sections to include movie posters and friends.
- Fix styling

 */
import React, {useState} from 'react';
import { View, Text, Button, ScrollView, Image } from 'react-native';
import profileStyles from './components/Profile-styles.js'
const ProfilePage = ({ user }) => {
    // Mock user data for demonstration


    const [showStats, setShowStats] = useState(false);

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

    return (
        <View style={profileStyles.container}>
            <Text style={profileStyles.header}>{user.name}</Text>
            <View style={profileStyles.userInfo}>
                <Image source={user.avatar} style={profileStyles.profileImage} />
            </View>
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Interests:</Text>
                <Text>{user.interests.join(', ')}</Text>
            </View>
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Friends:</Text>
                <View style={profileStyles.iconsContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    {user.friends.map((friend, index) => (
                        <View key={index} style={profileStyles.blackBox}></View>
                    ))}
                    </ScrollView>
                </View>
            </View>
            <View style={profileStyles.userInfo}>
                <Text style={profileStyles.label}>Recommended Movies:</Text>
                <View style={profileStyles.iconsContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    {user.recMovies.map((movie, index) => (
                        <View key={index} style={profileStyles.blackBox}></View>
                    ))}
                </ScrollView>
                </View>
            </View>

    <Button
        title={showStats ? 'Hide Stats' : 'Show Stats'}
        onPress={toggleStats}
    />
    {renderStats()}
        </View>
    );

};


export default ProfilePage;

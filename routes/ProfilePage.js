
/*
It grabs the user from a php server
and the server stores in this way


all you need to call the profile page is


const user = {"username":(username)};

//to display the profile page
<ProfilePage user={user} />

example of what the php server gets
{
        "name": 'John Doe',
        "username":'test',
        "avatar": 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
        "interests": [{"key":1,"Type":'Action'}, {"key":2,"Type":'Comedy'}, {"key":3,"Type":'Drama'}],
        "friends": [{"key": "Onur","selected": false,"username": "Onur", "image": "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"}],
        "recMovies": [{"Title":"Deadpool","Year":"2016","Rated":"R","Released":"12 Feb 2016","Runtime":"108 min","Genre":"Action, Comedy","Director":"Tim Miller",
                        "Writer":"Rhett Reese, Paul Wernick","Actors":"Ryan Reynolds, Morena Baccarin, T.J. Miller",
                        "Plot":"A wisecracking mercenary gets experimented on and becomes immortal yet hideously scarred, and sets out to track down the man who ruined his looks.",
                        "Language":"English","Country":"United States","Awards":"29 wins & 78 nominations",
                        "Poster":"https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
                        "Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"65/100"}],
                        "Metascore":"65","imdbRating":"8.0","imdbVotes":"1,093,938","imdbID":"tt1431045","Type":"movie","DVD":"21 Apr 2016","BoxOffice":"$363,070,709",
                        "Production":"N/A","Website":"N/A","Response":"True"}],
        "rates":[{"key":1,"Title":"Deadpool","Rating":5,"Text":'Best Movie Ever'}],
        "viewed":[{"key":1,"Title":"Deadpool"}],
    }




 */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, VirtualizedList} from 'react-native';
import profileStyles from '../styles/Profile-styles.js'
import gem1Badge from '../assets/badges/gem1.png';
import gem2Badge from '../assets/badges/gem2.png';
import gem3Badge from '../assets/badges/gem3.png';
import gem4Badge from '../assets/badges/gem4.png';
import gem5Badge from '../assets/badges/gem5.png';
import emptyBadge from '../assets/badges/empty.png';


const ProfilePage = ({ user }) => {

    const [showStats, setShowStats] = useState(false);
    const [movies, setMovies] = useState([]);
    const[friends,setFriends]= useState([]);
    const[interests, setInterests] = useState([]);
    const[rates,setRates]=useState([])
    const[viewed,setViewed] = useState([])
    const[avatar,setAvatar] = useState('https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png')
    const[badge,setBadge] = useState('https://www.pngall.com/wp-content/uploads/14/Loading-PNG-Photo.png');



    // Mock user data for demonstration
    useEffect(() => {
        async function loadList(url) {

            const response = await fetch(url);
            const names = await response.json();
            console.log(names)

            setMovies(names.recMovies);
            setFriends(names.friends);
            setInterests(names.interests);
            setRates(names.rates);
            setAvatar(names.avatar);
            setViewed(names.viewed);
            const total = movies.length + rates.length;

            if(total >= 10000){
                setBadge(gem5Badge);
            } else if(total >= 5000){
                setBadge(gem4Badge);
            }else if(total >= 1000){
                setBadge(gem3Badge);
            }else if(total >= 500){
                setBadge(gem2Badge);
            }else if(total >= 100){
                setBadge(gem1Badge);
            } else{
                setBadge(emptyBadge);
            }
        }

        const urladress = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater'+ user.username +'}';

        loadList(urladress)



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
            
            {/* <Text style={profileStyles.header}>{user.name}</Text> */}

            <Text style={profileStyles.header}></Text>

            <View style={profileStyles.userInfo}>
                <View style={profileStyles.avatarContainer}>
                    <Image source={{uri: avatar}} style={profileStyles.profileImage} />
                    <Image source={badge} style={profileStyles.profileImage} />

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
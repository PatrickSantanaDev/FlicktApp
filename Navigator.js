import * as React from 'react';
import { Button, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * These are where page routes are imported for the navigation system
 */
import HomePage from './routes/HomePage.js';
import ReviewsPage from './routes/ReviewsPage.js';
import MoviesPage from './routes/Movies/MoviesPage.js';
import LikedMovies from './routes/Movies/LikedMovies.js';

import FriendsPage from './routes/FriendsPage.js';
import ProfilePage from "./routes/ProfilePage.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * This element is created and used as the root component within the stack navigator to allow a tab bar to persist
 * throughout a majority of the application.
 * @returns tab navigation component
 */
const defaultUser = {username:'Elijah'};
//const defaultUser = [{"name":"Elijah Meldrim","username":"Elijah","avatar":"https://cdn-icons-png.flaticon.com/512/147/147142.png","interests":[{"key":1,"Type":"Action"},{"key":2,"Type":"Comedy"},{"key":3,"Type":"Drama"}],"friends":[],"recMovies":[],"rates":[],"viewed":[]},{"name":"Onur Keles","username":"Onur","avatar":"https://cdn-icons-png.flaticon.com/512/147/147142.png","interests":[{"key":1,"Type":"Action"}, {"key":2,"Type":"Thriller"}, {"key":3,"Type":"Comedy"}],"friends":[],"recMovies":[],"rates":[],"viewed":[]}, {"name":"Patrick Santana","username":"Patrick","avatar":"https://cdn-icons-png.flaticon.com/512/147/147144.png","interests":[{"key":1,"Type":"Action"},{ "key":2,"Type":"Thriller"},{"key":3,"Type":"Comedy"}],"friends":[],"recMovies":[],"rates":[],"viewed":[]}, {"name":"Gunnar Vittrup","username":"Gunnar","avatar":"https://cdn-icons-png.flaticon.com/512/147/147133.png","interests":[{"key":1,"Type":"Action"}, {"key":2,"Type":"Thriller"}, {"key":3,"Type":"Comedy"}],"friends":[{"key":"test","selected":false,"username":"test","image":"https://cdn-icons-png.flaticon.com/512/147/147142.png"}],"recMovies":[],"rates":[],"viewed":[]}];

function TabNavigator() {


    const ProfileScreen = ({ navigation, route }) => {

        const  user  = route.params ? route.params : { user: defaultUser };
        console.log(user)
        return <LoadProfile navigation={navigation} route={route} user={defaultUser} />;
    };
    const LoadMoviePage = props =>(
        <MoviesPage user={defaultUser} />
     );
    const FriendsPageList = props => (
        <FriendsPage user={defaultUser} />
    );
    return (
        <Tab.Navigator
            initialRouteName="Movies"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === "Movies") {
                        iconName = focused ? 'tv' : 'tv-outline';
                    } else if (rn === "Profile") {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (rn === "Friends") {
                        iconName = focused ? 'people' : 'people-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                tabBarStyle: { padding: 10, height: 70 }
            })}
        >

            <Tab.Screen name="Friends" component={FriendsPageList} />
            {/* <Tab.Screen name="Home" component={HomePage} /> */}
            <Tab.Screen name="Movies" component={LoadMoviePage} />
            <Tab.Screen
                name="Profile"

                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        // Pass the user object when navigating to the ProfileScreen
                        e.preventDefault(); // Prevent the default action
                        navigation.navigate('Profile', { user: defaultUser });
                    },
                })}
                component={ProfileScreen}
            />

        </Tab.Navigator>
    );
}

/**
 * This is where the routes from the imported screns above are specified. The
 * name element corresponds to what is displayed at the top bar of the application.
 * Note that the top element is the default screen displayed by the component.
 * @returns Stack.Navigator component
 */
function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Flickt" component={TabNavigator} />
            <Stack.Screen name="Reviews" component={ReviewsPage} />
            <Stack.Screen name="Profile" component={LoadProfile} />
            <Stack.Screen name="Liked Movies" component={LikedMovies} />
        </Stack.Navigator>
    );
}
class LoadProfile extends React.Component {

    render() {

        console.log("in LOAD PROFILE -" );
        console.log(this.props.route.params.user);
        const  user  = this.props.route.params.user;
        console.log("User -" );
        console.log(user );
        return <ProfilePage user={user} TopUser = {defaultUser} />;
    }
}
/**
 * By exporting a default function, it allows us the ability to import it into other 
 * components throughout our application and use it as a tool.
 * @returns Navigation component
 */
export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}

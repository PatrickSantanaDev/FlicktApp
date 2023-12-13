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
function TabNavigator() {
    const user ={ "name": 'John Doe',"username":'test',};
    const LoadProfile = props => (
        <ProfilePage user={user} />
    );
    const FriendsPageList = props => (
        <FriendsPage user={user} />
    );
    return (
        <Tab.Navigator
            initialRouteName="Movies"
            /**
             * This section handles the icons being displayed, selected, and highlighted
             */
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

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            } 
            )}
            
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70 }
            }}
        >

            <Tab.Screen name="Friends" component={FriendsPageList} />
            {/* <Tab.Screen name="Home" component={HomePage} /> */}
            <Tab.Screen name="Movies" component={MoviesPage} />
            <Tab.Screen name="Profile" component={LoadProfile} />
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
            <Stack.Screen name="Liked Movies" component={LikedMovies} />
        </Stack.Navigator>
    );
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
import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

/**
 * These are where page routes are imported for the navigation system
 */
import HomePage from './routes/HomePage.js';
import ReviewsPage from './routes/ReviewsPage.js';
import MoviesPage from './routes/MoviesPage.js';
import FriendsPage from './routes/FriendsPage.js';
import Profile from './routes/ProfilePage.js';

const Stack = createStackNavigator();

/**
 * This is where the routes from the imported screns above are specified. The
 * name element corresponds to what is displayed at the top bar of the application.
 * Note that the top element is the default screen displayed by the component.
 * @returns Stack.Navigator component
 */
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Movies" component={MoviesPage} />
            <Stack.Screen name="Reviews" component={ReviewsPage} />
            <Stack.Screen name="Friends" component={FriendsPage} />
            <Stack.Screen name="Profile" component={Profile} />
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
            <MyStack />
        </NavigationContainer>
    );
}
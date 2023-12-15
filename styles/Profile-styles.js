/*
TODO:
 - ADD colors to styles
 */



import {StyleSheet, Dimensions} from 'react-native';


var color4 = "background-color:rgb(213, 213, 213);";

const profileStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: color4,
        height: Dimensions.get('window').height * 1.1,

    },
    friendContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginRight: 10,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,

    },
    userInfo: {

        marginBottom: 10,
    },
    poster: {
        width: 100, // Define the width as needed
        height: 150, // Define the height as needed
        resizeMode: 'cover', // or 'contain' or other resizeMode based on your design
    },
    listContainer:{
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.95,
        alignItems: 'center',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    movieContainer: {
        alignItems: 'center',
        marginRight:  10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blackBox: {
        width: 60,
        height: 100,
        backgroundColor: 'black',
        marginHorizontal: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // To make the image circular
        marginBottom: 10,
    },
    friendImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // To make the image circular
        marginBottom: 10,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10, // Adjust as needed
    },

    badgeContainer: {
        marginRight: 10, // Adjust as needed
    },
    badgeImage: {
        width: 50,
        height: 50,
        // Other styling properties as needed
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

});



export default profileStyles;

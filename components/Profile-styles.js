/*
TODO:
 - ADD colors to styles
 */


import {StyleSheet} from "react-native";
var color1 = "background-color:rgb(255, 80, 80);";
var color2 = "background-color:rgb(230, 58, 58);";
var color3 = "background-color:rgb(64, 64, 64);";
var outlinecolor1 = "background-color:rgb(255, 20, 200);";
var color4 = "background-color:rgb(213, 213, 213);";
const profileStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: color4,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfo: {
        marginBottom: 10,
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
        width: 150,
        height: 150,
        borderRadius: 75, // To make the image circular
        marginBottom: 20,
    },
});


export default profileStyles;

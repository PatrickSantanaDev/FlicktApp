import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
// Home Page Styling

    viewpic: {
        flex: 1,
        flexWrap:'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
    image: {
        justifyContent: 'center',
        height: 115,
        width: 115,
        margin:6,
        backgroundColor: 'red',
    }

});
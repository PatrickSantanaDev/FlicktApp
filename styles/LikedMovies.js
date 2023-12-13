import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#C0C0C0",
      padding: 5,
      margin: 5,
      borderWidth: 5,
    },
    tabs: {
      flex: 1,
    },
    tabContainer: {
      flex: 0.03,
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons: {
      flex: 1,
    },
    buttonContainer: {
      flex: 0.05,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 5,
      backgroundColor: "#FFFAFA",
    },
    input: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
    },
    entries: {
      height: 40,
      alignItems: 'center',
      margin: 15,
      borderWidth: 1,
      padding: 10,
    },
    middle: {
      flex: 0.5,
      backgroundColor: "#FFFAFA",
      borderWidth: 5,
    },
  });
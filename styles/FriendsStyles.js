import {Dimensions, StyleSheet,StatusBar} from 'react-native';

var color1 = "background-color:rgb(255, 80, 80);";
var color2 = "background-color:rgb(230, 58, 58);";
var color3 = "background-color:rgb(64, 64, 64);";
var outlinecolor1 = "background-color:rgb(255, 20, 200);";
var color4 = "background-color:rgb(213, 213, 213);";
export {color2};
export {color3};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color4,
    flex:1,
    paddingTop: 5,
    marginTop: StatusBar.currentHeight
  },
  
  item: {
    flex: 1,
    padding: 7,
    height: 44,
    paddingRight: 25,
    paddingLeft: 25,
    textAlign: "center"
  },
  
  buttonContainer: {
    flex: 1,
    color: "yellow",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    padding: 3,
    alignSelf: "left",
    backgroundColor: color1,
    border: outlinecolor1,
    borderBottomWidth: 5,
    borderBottomColor: color2,
    borderRadius: 4,
    shadowRadius: 3
  },
  buttons: {
    
    backgroundColor: color3,
    marginHorizontal:3,
    
  },
  buttonTitle: {
    fontSize: 18,
    padding: 5,
    alignSelf: "left",
    backgroundColor: color1,
    border: outlinecolor1,
    borderBottomWidth: 3,
    borderBottomColor: color2,
    borderRadius: 4,
    shadowRadius: 1,
    height: 32.5
  },
  label:{ flex: 0.2, fontSize: 22, padding: 5},

  header: {
    alignSelf: "center",
    fontSize: 20,
    backgroundColor: color1,
    padding: 1,
  },

  header2: {
    alignSelf: "center",
    fontSize: 25,
    color: color1,
    fontWeight: 'bold',
  },

  smallPhoto: {
    width: 100,
    height: 100,
    flexDirection: 'column',
    resizeMode: 'cover',
    alignItems: 'center',
    alignSelf: 'center',
  },

  smallPhotoText: {
      backgroundColor: color1,
      alignItems: "center",
      textAlign: 'center',
      borderRadius: 5,
  },
  smallPhotoButton: {
    flex: 2,
    width: "500px",
    height: "500px",
  },
  smallPhotoButtonPressed: {
      opacity: 0.5,
  },
  pressed: {
    opacity: 0.5,
  },

  notpressed: {
      opacity: 1
  },
  
  homebutton: {
    
    backgroundColor: color1,
    position: 'fixed',
    top: 15,
    left: 15,
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  homebuttonIcon: {
    fontSize: 15,
    position: 'fixed',
    top: 15,
    left: 25,
    
  }

});

export default styles;

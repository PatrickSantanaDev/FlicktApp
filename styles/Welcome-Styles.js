import {Dimensions, StyleSheet,StatusBar} from 'react-native';

var color1 = "background-color:rgb(255, 80, 80);";
var color2 = "background-color:rgb(230, 58, 58);";
var color3 = "background-color:rgb(64, 64, 64);";
var outlinecolor1 = "background-color:rgb(255, 20, 200);";
var color4 = "background-color:rgb(213, 213, 213);";
export {color2, color3 ,color4};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color4,
    flex: 2,
    paddingTop: 5,
    marginTop: StatusBar.currentHeight
  },

  homeContainer: {
    backgroundColor: color4,
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignContent: "center"
  },
  
  sideContainer: {
    backgroundColor: color3,
    flex: 1,
    paddingTop: 5,
    flexDirection: "row",
    marginTop: StatusBar.currentHeight
  },
  
  
  buttonContainer: {
    color: color4,
    flexDirection: "column",
    alignContent: 'center',
    alignSelf: 'center',
    padding: "75px",
        
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
    
    //backgroundColor: color4,
    
    marginVertical: 10,
    backgroundColor: color1,
    border: outlinecolor1,
    borderBottomWidth: 3,
    borderBottomColor: color2,
    borderRadius: 4,
    shadowRadius: 5,
    height: 32.5,
    width: 200,
    shadowOffset: { width: 0, height: 2 },
      shadowColor: '#000',
      shadowOpacity: 0.8
  },
  buttonTitle: {
    fontSize: 18,
    padding: 5,
    color: "white",
    textAlign: 'center',
    fontWeight: 'bold',
    
    
  },
  label:{ flex: 0.2, fontSize: 22, padding: 5},

  header: {
    alignSelf: "center",
    fontSize: 20,
    backgroundColor: color1,
    padding: 1,
  },
  header2: {
    
    paddingTop: 200,
    paddingBottom: 50,
    alignSelf: "center",
    fontSize: 25,
    color: color1,
    fontWeight: 'bold',
    
    
  },
  pressed: {
    alignSelf: 'center',
    width: "100%",
    opacity: 0.8,
  },

  notpressed: {
    
      opacity: 1
  },
});

export default styles;

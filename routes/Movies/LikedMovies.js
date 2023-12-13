import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';

// import styles from '../../styles/MovieStyles';
// import styles from '../../styles/LikedMovies.js';

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
    poster: {
      width: '100%',
      height: '0%',
      resizeMode: 'contain',
    },
  });

const LikedMovies = ({ route }) => {
    const movies = route.params;
    console.log("Movies in here: ", movies);

    const data = Object.keys(movies).map(function(key) {
        return { key: key, ...movies[key] };
      });
      

      const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[backgroundColor]}>
          <Text style={[styles.entries, styles.title, textColor]}>{item.key}</Text>
        </TouchableOpacity>
      );
            
    const [list, setlist] = useState(movies);
    let [text, onChangeText] = React.useState('Input text here!');
    
    function toggleList(akey){      
    
        const newList = list.map( (item) => {
    
        if (item.key == akey)
        {
            if (item.selected)
            {
            item.selected = false;
            }
            else
            {
            item.selected = true;
            }
        }
    
        return item;
        } )
    
        setlist(newList);
    }
        
    // Builds the view
    const renderItem = ({ item }) => {
        const backgroundColor = item.selected ? '#DE3163' : 'SNOW';
        const color = item.selected ? '#FFFFFF' : '#000000';
    
        return ( <Item  backgroundColor={{backgroundColor}} textColor={{color}} item={item} onPress={() => {toggleList(item.key)}}/> );
    };
    
    // Deletes an entry
    function removeLabel() {   
        const newList = list.filter(function(key){return key.selected == false});
        setlist(newList);  
    }
        

    
    var alist = (
        <View style={styles.container} >
        <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
            <Button title="DELETE" color="#DE3163" onPress={() => removeLabel()}/>
            </View>
        </View>
        <FlatList style={styles.middle} data={list} renderItem={(renderItem)} />                                                    
        </View>
    )
    
    return (alist)  
}

export default LikedMovies;
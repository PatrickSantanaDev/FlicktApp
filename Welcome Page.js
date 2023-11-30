import React, {useState, useEffect } from 'react';
import {TouchableOpacity, Text, View, VirtualizedList} from 'react-native';
import CustomButton from './components/Welcome-CustomButton.js'
import styles from './components/Styles.js'
import {color2, color4} from './components/Welcome-Styles.js'         //Colors for rendering 
import { LinearGradient } from 'expo-linear-gradient';
var currentList;
var emptyList = [];

  
const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style = {[styles.item,backgroundColor]}>
  <Text style={[styles.title,textColor]}>{item.label}
    </Text>
  </TouchableOpacity>
);

const VirtualListBasics = () => {
  currentList = emptyList;
  const [list, setList] = useState(currentList);

const getItemCount = (data) => list.length;
const getListItem = (data, index) =>(list[index]);

function goMoviePage() {
  console.log("go to the movie review page");
}

function goSettingsPage() {
  console.log("go to the Settings page");
}

//<CustomButton name= "Explode" click={explodeButton}/>
var buttons = <View style = {styles.item}> 
                <View style = {styles.buttonContainer}>
                
                <CustomButton name= "Review Movies" click={goMoviePage}/>
                <CustomButton name= "Settings" click={goSettingsPage}/>
                </View>
                </View>


var virtuallist = <VirtualizedList style={styles}
                data= {list}
                
                getItem = {getListItem}
                initialNumToRender= {4}
                getItemCount = {getItemCount}
                
                />

  var alist = <View style = {styles.homeContainer} >
                <LinearGradient
                colors={['rgba(100, 100, 100, 0)', 'rgba(100, 100, 100, 1)']}
                start={{x: 0, y: 1}} end={{x: 0, y: 0.01}}
                locations={[0.8,1]}
                >
                <Text style = {styles.header2}> Project Name </Text>
                {buttons}
                {virtuallist}
                </LinearGradient>
                </View>


  return (alist);
}

export default VirtualListBasics;

import React, {useState, useEffect } from 'react';
import {Image, FlatList,TouchableOpacity, Button,Text, View, StyleSheet, VirtualizedList, StatusBar} from 'react-native';
import {saveList, loadList} from '../components/SaveAndLoad.js';
import CustomButton from '../components/Friends-CustomButton.js'
import styles from '../components/Friends-styles.js'
import {color2, color3} from '../components/Friends-styles.js'         //Colors for rendering 
import Friend from '../components/Friend.js';


var currentList;

var emptyList = [];
var nameList = [
                {key: "Onur",selected: false,label: "Onur", image: require('../assets/SmallRGBTest2.png')},
                {key: "Samet",selected: false,label: "Samet",  image: require('../assets/SmallRGBTest2.png')},
                {key: "Efe",selected: false,label: "Efe",  image: require('../assets/SmallRGBTest2.png')},
                {key: "Bora",selected: false,label: "Bora",  image: require('../assets/SmallRGBTest2.png')},
                {key: "Onur1",selected: false,label: "Onur", image: require('../assets/SmallRGBTest2.png')},
                {key: "Samet1",selected: false,label: "Samet",  image: require('../assets/SmallRGBTest2.png')},
                {key: "Efe1",selected: false,label: "Efe",  image: require('../assets/SmallRGBTest2.png')},
                {key: "Bora1",selected: false,label: "Bora",  image: require('../assets/SmallRGBTest2.png')}
                ]
  


const VirtualListBasics = () => {
  currentList = emptyList;
  const [list, setList] = useState(nameList);
  const [autosave, setsave] = useState(false);
  const [firsttime, isfirst] = useState(true);
  const [aphoto, setPhoto] = useState('assets/snack-icon.png');
const getItemCount = (data) => list.length;
const getListItem = (data, index) =>(list[index]);

/*
const Item = ({item, onPress, backgroundColor, textColor, image}) => (
  <TouchableOpacity onPress={onPress} style = {[styles.item,backgroundColor]}>
  <Image style = {styles.logo}
          source= {image} />
  <Text style={[styles.title,textColor]}>{item.label}
    </Text>
  </TouchableOpacity>
); */

useEffect(() => {
  if(firsttime) {
  //console.log(getListItem);

  var urladress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=cutchin";
  loadList(urladress,list,setList);
  isfirst(false);
  }
  else if(autosave) {
    saveButton()
  }
}, [autosave, list])




 function plusButton() {
    let random = Math.round(Math.random()*10000);
    const temp = "NewItem" + random;
    
    var newList = [{key: temp, selected: false, label: "NewItem"+random, image: '../assets/snack-icon.png'}]
    newList = newList.concat(list);
    setList(newList);
    console.log(newList);
    
 }

 function deleteButton() {
   //console.log(list);
   //alert(list[0].selected);
   var flag = false;
   var newList = [];
   list.forEach((item) => {
      if(!item.selected){
      newList.push(item);
      flag = true;
      }
   });
    
   if(!flag)
     alert("choosen an item");
   
   setList(newList);
   
   //alert(nameList.length);
 }

  function saveButton() {
    console.log("saving...");
    var urladress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user=onurkeles2";
    saveList(urladress, list);
    
  }
  function loadButton() {
    console.log("loading...");
    var urladress = "https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user=onurkeles2";
    loadList(urladress, list, setList);
    
  }

/*
 const renderItem = ({item, index}) => {
   //const backgroundColor = item.selected? "black" : "white";
   const backgroundColor = item.selected? color2 : color3;
   const color = item.selected? "white" : "black";
   return (
     <Item
     item ={item}
     onPress={() => {toggleList(index)}}
     backgroundColor= {{backgroundColor}}
     textColor= {{color}}
     />
   );
  };
 */
  function toggleList(aindex) {

    const newList = list.map((item,index) => {
      //console.log(item);
      if(index == aindex){
        if(item.selected) {
            item.selected = false;
        }
        else
          item.selected = true;
      }
        return item;
  }
  
  )
    setList(newList);
  }
//<CustomButton name= "Explode" click={explodeButton}/>
var buttons = <View style = {styles.item}> 
                <View style = {styles.buttonContainer}>
                <CustomButton name= "+" click={plusButton}/>
                <CustomButton name= "-" click={deleteButton}/>
                </View>
                </View>


var virtuallist = <VirtualizedList style={styles}
                data= {list}
                //renderItem= {renderItem}
                getItem = {getListItem}
                initialNumToRender= {4}
                getItemCount = {getItemCount}
                
                />
 //{buttons}
  var alist = <View style = {styles.container} >

                <Friend friendList={list} source={{uri: aphoto}} /> 
                </View>


  return (alist);
}

export default VirtualListBasics;

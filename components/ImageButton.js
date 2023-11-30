import { Image, Pressable,StatusBar,TouchableOpacity, Button, FlatList, StyleSheet, Text, View, ListItem } from 'react-native';
import styles from './styles.js';

export default function imageButton(props) {
  return (
    <View>
    <Pressable 
    onPress= {props.click}
    style= {({pressed}) => {
      return pressed ? styles.pressed : styles.notpressed;
    }}>
        <Image style={styles.smallPhoto} source={props.image} />
        <Text style= {styles.smallPhotoText} > {props.label} </Text>
    </Pressable>
    <StatusBar style="auto"/>
    </View>
  )
}


/*
<Pressable style= {styles.smallPhotoButton}>
        <Image style={styles.smallPhoto} source={item.image} />
        </Pressable>
        <Text style= {styles.smallPhotoText} > {item.label} </Text>
        
     */
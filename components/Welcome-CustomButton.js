import {Pressable, TouchableOpacity,Text, View, StyleSheet} from 'react-native';
import styles from './Styles.js';

export default function customButton(props) {
  return (
    <Pressable style= {({pressed}) => {
      return pressed ? styles.pressed : styles.notpressed;
    }}
    onPress= {() => props.click()}>
      <View style = {styles.buttons}>
      <Text style = {styles.buttonTitle}>
      {props.name}
        </Text>
      </View>
    </Pressable>
  )
}

//{customButton};

import {TouchableOpacity,Text, View, StyleSheet} from 'react-native';
import styles from './styles.js';

export default function CustomButton(props) {
  return (
    <TouchableOpacity onPress= {() => props.click()}
    style = {props.buttonStyle}>
      <View >
      <Text style = {props.textStyle}>
      {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

//{customButton};

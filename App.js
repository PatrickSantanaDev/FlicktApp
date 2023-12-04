// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import Navigator from './Navigator.js'; // Adjust the path if Home.js is in a different directory

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator />
    </SafeAreaView>
  );
}

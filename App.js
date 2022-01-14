import React from 'react';
import { Image,StyleSheet, Text, View } from 'react-native';
import logo from'./assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>
 <Image source={{ uri: "https://files.lafm.com.co/assets/public/2018-06/dia_de_la_lechona.jpg" }} style={styles.logo} />

      <Text style={styles.instructions} >
      Presiona aqui para compartir la foto!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98759846',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
});
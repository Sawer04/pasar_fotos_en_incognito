import React, { useState, useEffect }from 'react';
import { Image,StyleSheet,Platform, Text,TouchableOpacity, View, Button} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';
const grito= require('../../assets/grito.mp3')

export default function Grito() {
    const [data, setData] = useState({
      x: 0,
      y: 0,
      z: 0,
    });
    const [subscription, setSubscription] = useState(null);
  
    const [sound, setSound] = React.useState();
  
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
      grito
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync(); }
  
    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    const _slow = () => {
      Accelerometer.setUpdateInterval(1000);
    };
  
    const _fast = () => {
      Accelerometer.setUpdateInterval(16);
    };
  
    const _subscribe = () => {
      setSubscription(
        Accelerometer.addListener(accelerometerData => {
          setData(accelerometerData);
        })
      );
    };
  
    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };
  
    useEffect(() => {
      _subscribe();
      return () => _unsubscribe();
    }, []);
  
    const { x, y, z } = data;
    if (y>=0.8){
      playSound()
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
            <Text style={styles.TextBottom}>{subscription ? 'Encendido' : 'Apagado'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
            <Text style={styles.TextBottom}>Lento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text style={styles.TextBottom}>Rapido</Text>
          </TouchableOpacity>
        </View>
          <Button title="Oprimime aca" onPress={playSound} />
      </View>
    );
  }

  function round(n) {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 50,
      marginTop: 30,
      marginBottom: 8,
      backgroundColor: '#fff'
    },
    text: {
      textAlign: 'center',
      color: '#000'
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#957340',
      padding: 10,
      color: '#fff'
    },
    TextBottom: {
        color: '#fff'
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#000',
    },
  });

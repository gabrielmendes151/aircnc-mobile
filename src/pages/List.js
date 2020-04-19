import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import socketio from 'socket.io-client';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then((user_id) => {
      const socket = socketio('http://...:3333', { query: { user_id } });
      socket.on('booking_response', (booking) => {
        Alert.alert(
          `Your booking on ${booking.spot.company} on ${booking.date} was ${
            booking.approved ? 'APRROVED' : 'REJECTED'
          }`,
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then((storageTechs) => {
      const techsArray = storageTechs.split(',').map((tech) => tech.trim());
      setTechs(techsArray);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});

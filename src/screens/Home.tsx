import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppNavigationProp } from 'App';
import { color } from 'styles';

const WHITE = color.WHITE;
const BLACK = color.BLACK;
const BLUE = color.BLUE;
const RED = color.RED;
const GREY = color.GREY;

const Home = ({}) => {
  const navigation = useNavigation<AppNavigationProp>();
  const [roomID, setRoomId] = useState('');
  const [bg, setBg] = useState(BLACK);
  const [err, setErr] = useState('');

  const onFocus = () => {
    setBg(BLUE);
  };

  const onBlur = () => {
    setBg(BLACK);
  };

  const handleSubmit = () => {
    if (!roomID) {
      setErr('Room ID cannot be empty!');
      setBg(RED);
      return;
    }
    navigation.navigate('Chat', { roomID });
  };

  const handleCreateSubmit = () => {
    navigation.navigate('Chat', { roomID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            margin: 8,
            fontWeight: 'bold',
          }}
        >
          P2P WEBRTC
        </Text>

        <Text style={styles.errorStyle}>{err}</Text>
        <TextInput
          placeholder="Room ID"
          selectionColor="#DDD"
          onChangeText={(text) => setRoomId(text)}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[styles.textInput, { borderColor: bg }]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button color={BLUE} onPress={handleSubmit} title="Join Room" />
      </View>
      <View style={styles.buttonContainer}>
        <Button color={BLUE} onPress={handleCreateSubmit} title="Create Room" />
        <Text style={styles.textStyle}>
          Don't have a Room ID? Create One :)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  textInput: {
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    backgroundColor: WHITE,
    borderWidth: 0.5,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
  buttonContainer: {
    padding: 15,
  },
  textStyle: {
    alignSelf: 'center',
    color: GREY,
    marginTop: 5,
  },
  errorStyle: {
    alignSelf: 'center',
    color: RED,
    marginBottom: 5,
    fontSize: 12,
  },
});

export default Home;

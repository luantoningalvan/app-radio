// Buscar status
// http://shoutcast.tvcbrasilia.tv:8000/stats?sid=1&json=1

// Reproduzir música
// http://shoutcast.tvcbrasilia.tv:8000/;?type=http&nocache=36557

import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const ICON_PLAY_BUTTON = "play-circle-outline";
const ICON_PAUSE_BUTTON = "pause-circle-outline";

const Settings = () => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    playThroughEarpieceAndroid: false,
  });
};

const soundObject = new Audio.Sound();

const URL_STREAMING =
  "http://shoutcast.tvcbrasilia.tv:8000/;?type=http&nocache=36557";

export default () => {
  useEffect(() => {
    Settings(), initSoundObject();
  }, []);
  const [playing, setPlaying] = useState(false);

  const stateAudio = {
    shouldPlay: false,
    shouldCorrectPitch: true,
    volume: 1.0,
    isMuted: false,
  };

  const initSoundObject = () => {
    soundObject.loadAsync({ uri: URL_STREAMING }, stateAudio);
  };

  const playAudio = async () => {
    try {
      if (playing) {
        await soundObject.stopAsync();
        setPlaying(false);
      } else {
        await soundObject.playAsync();
        setPlaying(true);
      }
    } catch (error) {
      console.log("Error when playMusic", error);
    }
  };

  return (
    <TouchableOpacity style={styles.iconTouchable} onPress={() => playAudio()}>
      <MaterialIcons
        name={playing ? ICON_PAUSE_BUTTON : ICON_PLAY_BUTTON}
        size={80}
        color="blue"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  iconTouchable: {
    backgroundColor: "#000",
  },
});

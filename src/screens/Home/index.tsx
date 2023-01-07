// Buscar status
// http://shoutcast.tvcbrasilia.tv:8000/stats?sid=1&json=1

// Reproduzir música
// http://shoutcast.tvcbrasilia.tv:8000/;?type=http&nocache=36557

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Linking,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import logo from "../../assets/logo.png";
import { styles } from "./styles";
import {
  Pause,
  Play,
  Screencast,
  ShareNetwork,
  SpeakerSimpleHigh,
  SpeakerSimpleLow,
  SpeakerSimpleX,
  WhatsappLogo,
} from "phosphor-react-native";
import Slider from "@react-native-community/slider";
import { BannerSlider } from "../../components/BannerSlider";
import MusicControl, { Command } from "react-native-music-control";

const URL_STREAMING =
  "http://shoutcast.tvcbrasilia.com:8000/;?type=http&nocache=36557";

export const Home = () => {
  const soundObject = useRef(new Audio.Sound());

  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentSong, setCurrentSong] = useState("");
  const [songCover, setSongCover] = useState("");

  const playAudio = useCallback(async () => {
    try {
      if (playing) {
        await soundObject.current.pauseAsync();
        setPlaying(false);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PAUSED,
        });
      } else {
        await soundObject.current.setPositionAsync(0);
        await soundObject.current.playFromPositionAsync(0);
        setPlaying(true);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [playing, soundObject]);

  const handleChangeVolume = useCallback(
    async (volume: number) => {
      try {
        await soundObject.current.setVolumeAsync(volume);
        setVolume(volume);
      } catch (error) {
        console.log(error);
      }
    },
    [playing, soundObject]
  );

  const showVolumeIcon = () => {
    if (volume === 0) {
      return <SpeakerSimpleX weight="bold" color="#fff" />;
    }

    if (volume > 0 && volume <= 0.5) {
      return <SpeakerSimpleLow weight="bold" color="#fff" />;
    }

    return <SpeakerSimpleHigh weight="bold" color="#fff" />;
  };

  const handleShare = useCallback(async () => {
    Share.share({
      title: `Estou ouvindo ${currentSong} na Positiva FM 96.5`,
      message: "Venha ouvir a Positiva FM 96.5 comigo!",
      url: "https://positivafmdf.com.br",
    });
  }, [currentSong]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(
        "http://shoutcast.tvcbrasilia.com:8000/currentsong?sid=1"
      );
      const data = await response.text();

      setCurrentSong(data.replace(/(19|20)[0-9][0-9]/g, ""));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSong) {
      fetch(`https://itunes.apple.com/search?term=${currentSong}&entity=song`)
        .then((response) => response.json())
        .then((data) => {
          let artwork = logo;

          if (data.results.length > 0) {
            setSongCover(
              String(data.results[0].artworkUrl100).replace(
                "100x100",
                "300x300"
              )
            );

            artwork = data.results[0].artworkUrl100;
          }

          MusicControl.setNowPlaying({
            title: currentSong,
            artwork: artwork,
            artist: "Radio Positiva FM 96.5",
            description: "",
            isLiveStream: true,
          });
        });
    }
  }, [currentSong]);

  useEffect(() => {
    async function prepareAudio() {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
      });

      MusicControl.enableControl("pause", true);
      MusicControl.enableControl("play", true);
      MusicControl.enableControl("stop", true);

      await soundObject.current?.loadAsync(
        { uri: URL_STREAMING },
        {
          shouldPlay: false,
          shouldCorrectPitch: true,
          volume: 1.0,
          isMuted: false,
        }
      );

      setIsReady(true);
    }

    prepareAudio();
  }, [soundObject]);

  useEffect(() => {
    MusicControl.on(Command.play, playAudio);
    MusicControl.on(Command.pause, playAudio);
    MusicControl.on(Command.togglePlayPause, playAudio);
  }, [playAudio]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <ImageBackground
        blurRadius={4}
        style={styles.currentPlayingContainer}
        source={logo}
      >
        <Image
          source={songCover ? { uri: songCover } : logo}
          style={styles.songCover}
        />
        <Text style={styles.playingNowText}>Tocando agora</Text>
        <Text style={styles.playingNowSong}>{currentSong}</Text>

        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={() =>
            Linking.openURL(
              "whatsapp://send?text=Olá, estou ouvindo a Positiva FM 96.5!&phone=+556181579696"
            )
          }
        >
          <WhatsappLogo color="#fff" weight="fill" />
          <Text style={styles.whatsappButtonText}>Enviar mensagem</Text>
        </TouchableOpacity>
      </ImageBackground>
      <BannerSlider />
      <View style={styles.player}>
        <View style={styles.playerButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleShare}
          >
            <ShareNetwork color="#fff" weight="bold" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => playAudio()}
          >
            {playing ? (
              <Pause size={32} weight="fill" />
            ) : (
              <Play size={32} weight="fill" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Screencast color="#fff" weight="bold" size={28} />
          </TouchableOpacity>
        </View>
        <View style={styles.playerButtons}>
          <TouchableOpacity onPress={() => handleChangeVolume(0)}>
            {showVolumeIcon()}
          </TouchableOpacity>
          <Slider
            style={{ width: "65%", height: 40, marginLeft: 16 }}
            minimumValue={0}
            maximumValue={1}
            onValueChange={handleChangeVolume}
            value={volume}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#717171"
            thumbTintColor="#fff"
          />
        </View>
      </View>
    </View>
  );
};

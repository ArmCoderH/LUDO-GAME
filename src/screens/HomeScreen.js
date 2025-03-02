import { Alert, Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import Logo from '../assets/images/logo.png';
import Wrapper from '../components/Wrapper';
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import GradienButton from '../components/GradienButton';
import LottieView from 'lottie-react-native';
import Witch from '../assets/animation/witch.json';
import { playSound } from '../helpers/SoundUtility';
import { useIsFocused } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';
import { navigate } from '../helpers/NavigationUtil';

const HomeScreen = () => {
  const witchAnim = useRef(new Animated.Value(-deviceWidth)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;
  const isFocused = useIsFocused()

  useEffect(() => {
    const loopAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: deviceWidth * 0.1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: deviceWidth * 2,
              duration: 8000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: -1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: -deviceWidth * 0.05,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(3000),
          Animated.parallel([
            Animated.timing(witchAnim, {
              toValue: -deviceWidth * 2,
              duration: 8000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleXAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    loopAnimation();
    return () => {
      Animated.timing(witchAnim).stop();
      Animated.timing(scaleXAnim).stop();
    };
  }, [witchAnim, scaleXAnim]);

  useEffect(() => {
    if (isFocused) {
      playSound('home');
    }
  },[isFocused])

  const renderButton = useCallback(
    (title, onPress) => <GradienButton title={title} onPress={onPress} />,
    []
  );

  const startGame = async (isNew = false) => {
    SoundPlayer.stop()
    navigate('LudoBoardScreen')
    playSound('game_start')
  };

  const handleNewGamePress = useCallback(() => {
    startGame(true);
  }, []);

  return (
    <Wrapper style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />
      </View>

      {renderButton('NEW GAME', handleNewGamePress)}
      {renderButton('VS CPU', () => Alert.alert('Coming Soon! Click New Game'))}
      {renderButton('2 VS 2', () => Alert.alert('Coming Soon! Click New Game'))}

      <Animated.View
        style={[
          styles.witchContainer,
          {
            transform: [{ translateX: witchAnim }, { scaleX: scaleXAnim }],
          },
        ]}
      >
        <Pressable
          onPress={() => {
            const random = Math.floor(Math.random() * 3) + 1
            playSound(`girl${random}`); // Ensure 'girl1.mp3' exists in android/app/src/main/res/raw
          }}
        >
          <LottieView hardwareAccelerationAndroid source={Witch} autoPlay speed={1} style={styles.witch} />
        </Pressable>
      </Animated.View>

      <Text style={styles.artist}>Made By - Arman Hingora</Text>
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
  },
  imgContainer: {
    width: deviceWidth * 0.6,
    height: deviceHeight * 0.2,
    justifyContent: 'center',
    marginVertical: 40,
    alignSelf: 'center',
    marginTop: 50,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  artist: {
    position: 'absolute',
    bottom: 50,
    color: 'white',
    fontWeight: '800',
    opacity: 0.5,
    fontStyle: 'italic',
  },
  witchContainer: {
    position: 'absolute',
    top: '70%',
    left: '24%',
  },
  witch: {
    height: 250,
    width: 250,
    transform: [{ rotate: '25deg' }],
  },
});

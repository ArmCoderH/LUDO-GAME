import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { playSound } from '../helpers/SoundUtility';

const iconSize = RFValue(22)
const GradienButton = ({ title, onPress, iconColor = '#000' }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={() => {
        onPress();
        playSound('ui')
      }}>
        <LinearGradient
          colors={['#6FA3EF', '#56CCF2', '#2F80ED']} // Brighter Gradient for Contrast
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}>
        {
          title == 'RESUME' ? 
          <MaterialIcons name='play-arrow' color={iconColor} size={iconSize}/>
          : title === 'NEW GAME'  ?
          <MaterialIcons name='play-circle' color={iconColor} size={iconSize}/>
          : title === 'VS CPU'  ?
          <MaterialIcons name='airplay' color={iconColor} size={iconSize}/>
          : title === 'HOME'  ?
          <MaterialIcons name='home' color={iconColor} size={iconSize}/>
          :
          <MaterialIcons name='person' color={iconColor} size={iconSize}/>
        }
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GradienButton;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginVertical: 10,
  },
  btnContainer: {
    borderWidth: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#d5be3e',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    borderColor: '#d5be3e',
    width: 220,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: RFValue(18),
    textAlign: 'left',
    fontWeight: 'bold',
    textShadowColor: 'black', // Black shadow for contrast
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    gap : 20, 
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

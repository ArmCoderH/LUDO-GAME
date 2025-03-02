import { ActivityIndicator, Animated, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png'
import { prepareNavigation, resetAndNavigate } from '../helpers/NavigationUtil'

const SplashScreen = () => {

    const [isStop] = useState(false)
    const scale = new Animated.Value(1)

    useEffect(() => {
        prepareNavigation()
        setTimeout(() => {
            resetAndNavigate('HomeScreen')
        },1500)
    },[])

    useEffect(() => {
        const breathingAnimaton = Animated.loop(
            Animated.sequence([
                Animated.timing(scale,{
                    toValue : 1.1,
                    duration : 2000,
                    useNativeDriver : true
                }),
                Animated.timing(scale,{
                    toValue : 1,
                    duration : 2000,
                    useNativeDriver : true
                }),
            ])
        )
        if (!isStop) {
            breathingAnimaton.start()
        }
        return () => {
            breathingAnimaton.stop()
        }
    },[isStop])
  return (
    <Wrapper>
      <Animated.View style={[styles.imgContainer, {transform : [{scale}]}]}>
        <Image source={Logo} style={styles.img}/>
      </Animated.View>
      <ActivityIndicator size="small" color="white"/>
    </Wrapper>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    imgContainer : {
        width : deviceWidth * 0.7,
        height : deviceHeight * 0.6,
        justifyContent : 'center',
        alignItems : 'center' 
    },
    img : {
        width : '100%',
        height : '100%',
        resizeMode : 'contain'
    }
})
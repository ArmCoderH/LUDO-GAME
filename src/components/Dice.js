import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPlayerChance, selectDiceNo, selectDiceRolled } from '../redux/reducers/gameSlectors'
import { BackgroundImage } from '../helpers/GetIcons'
import { resolver } from '../../metro.config'
import LinearGradient from 'react-native-linear-gradient'
import { Image } from 'react-native'
import Arrow from '../assets/images/arrow.png'
import LottieView from 'lottie-react-native'
import DiceRoll from '../assets/animation/diceroll.json'

const Dice = React.memo(({color,rotate,player,data}) => {
    const dispatch = useDispatch()
    const currentPlayerChance = useSelector(selectCurrentPlayerChance)
    const isDiceRolled = useSelector(selectDiceRolled)
    const diceNo = useSelector(selectDiceNo)
    const playerPieces = useSelector(state => state.game[`player${currentPlayerChance}`],)
    const pileIcon = BackgroundImage.GetImage(color)
    const diceIcon = BackgroundImage.GetImage(diceNo)

    const delay = ms => new Promise(resolve => setTimeout(resolve,ms))
    const arrowAnim = useRef(new Animated.Value(0)).current
    const [diceRolling, setDiceRolling] = useState(false)

    const handleDicePress = () => {

    }
    useEffect(() => {
        const animateArrow = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(arrowAnim,{
                        toValue : 10,
                        duration : 600,
                        easing : Easing.out(Easing.ease),
                        useNativeDriver : true
                    }),
                    Animated.timing(arrowAnim,{
                        toValue : -10,
                        duration : 400,
                        easing : Easing.in(Easing.ease),
                        useNativeDriver : true
                    }),
                ])
            ).start()
        }
        animateArrow()
    },[currentPlayerChance,isDiceRolled])


    return(
        <View style={[styles.flexRow, {transform:[{scaleX:rotate ? -1 : 1}]}]}>
            <View style={styles.border1}>
                    <LinearGradient 
                    style={styles.linearGradian}
                    colors={['#0052be','#5f9fcb','#97c6c9']}
                    start={{x:0,y:0.5}}
                    end={{x:1,y:0.5}}
                    >
                        <View style={styles.pileContainer}>
                            <Image source={pileIcon} style={styles.pileIcon}/>
                        </View>
                    </LinearGradient>
            </View>

            <View style={styles.border2}>
            <LinearGradient 
                    style={styles.diceGrdian}
                    colors={['#aac8ab','#aac8ab','#aac8ab']}
                    start={{x:0,y:0.5}}
                    end={{x:1,y:0.5}}
                    >
                        <View style={styles.diceContainer}>
                            {currentPlayerChance == player ? (
                                <>
                                {diceRolling ? null : (
                                    <TouchableOpacity>
                                        dispatch={isDiceRolled}
                                        activeOpacity ={0.4}
                                        onPress={handleDicePress}
                                        <Image source={diceIcon} style={styles.dice}/>
                                    </TouchableOpacity>
                                )}
                                </>
                            ): null}
                        </View>
                    </LinearGradient>
            </View>

            {currentPlayerChance === player && !isDiceRolled ? (
                <Animated.View style={{transform : [{translateX : arrowAnim}]}}>
                    <Image source={Arrow} style={{ margin :10 ,width : 30,height : 30}}/>
                </Animated.View>
            ) : null}

            {currentPlayerChance === player && diceRolling ? (
                <LottieView
                source={DiceRoll}
                style={styles.rollingDice}
                loop={false}
                autoPlay
                cacheComposition={true}
                hardwareAccelerationAndroid
                />
            ) : null}
        </View>
    )
})

export default Dice

const styles = StyleSheet.create({
    flexRow : {
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    pileIcon : {
        width : 35,
        height : 35
    },
    diceContainer : {
        backgroundColor : '#e8c0c1',
        borderWidth : 1,
        borderRadius : 5,
        width : 60,
        height : 70,
        paddingHorizontal : 8,
        paddingVertical: 8,
        justifyContent : 'center',
        alignItems : 'center',
    },
    pileContainer : {
        paddingHorizontal : 3,
        paddingVertical : 10
    },
    linearGradian : {
        padding :1,
        borderWidth : 3,
        borderRightWidth : 0,
        borderColor : '#f0ce2c',
        justifyContent : 'center',
        alignItems : 'center'
    },
    dice : {
        height: 45,
        width: 45
    },
    rollingDice : {
        height : 80,
        width : 80,
        zIndex : 99,
        top : -25,
        position : 'absolute'
    },
    diceGrdian : {
        borderWidth : 3,
        borderLeftWidth : 3,
        borderColor : '#0fce2c',
        justifyContent : 'center',
        alignItems : 'center'
    },
    border1 : {
        borderWidth : 3,
        borderColor : '#f0ce2c',
        borderRightWidth : 0
    },
    border2 : {
        borderWidth : 3,
        padding : 1,
        backgroundColor : '#aac8ab',
        borderRadius : 10,
        borderLeftWidth : 3,
        borderColor : '#aac8ab'
    }
})
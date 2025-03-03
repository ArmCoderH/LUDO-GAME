import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Model from 'react-native-modal'
import { resetGame } from '../redux/reducers/gameSlice'
import { playSound } from '../helpers/SoundUtility'
import { goBack } from '../helpers/NavigationUtil'
import LinearGradient from 'react-native-linear-gradient'
import GradienButton from './GradienButton'

const MenuModal = ({visible,onPressHide}) => {

    const dispatch = useDispatch()

    const handleNewGame = useCallback(() => {
        dispatch(resetGame())
        playSound('game_start')
        onPressHide()
    },[dispatch,onPressHide])

    const haldelHome = useCallback(() => {
        goBack()
    },[])
  return (
    <Model
    style={styles.bottomModelView}
    isVisible={visible}
    backdropColor='black'
    backdropOpacity={0.8}
    onBackdropPress={onPressHide}
    animationIn="zoomIn"
    animationOut="zoomOut"
    onBackButtonPress={onPressHide}
    >
        <View style={styles.modalContainer}>
            <LinearGradient
            colors={['#0f0c29','#302b63','#24243e']}
            style={styles.graientContainer}
            >
            <View style={styles.subView}>
                <GradienButton title="RESUME" onPress={onPressHide}/>
                <GradienButton title="NEW GAME" onPress={handleNewGame}/>
                <GradienButton title="HOME" onPress={haldelHome}/>
            </View>
            </LinearGradient>
        </View>
    </Model>
  )
}

export default MenuModal

const styles = StyleSheet.create({
    bottomModelView : {
        justifyContent : 'center',
        width : '95%',
        alignSelf : 'center',
    },
    graientContainer  :{
        borderRadius : 20,
        overflow : 'hidden',
        width :'96%',
        borderWidth : 2,
        borderColor : 'gold',
        justifyContent : 'center',
        alignItems : 'center'
    },
    subView : {
        width  :'100%',
        marginVertical : 20,
        justifyContent : 'center',
        alignSelf : 'center',
        alignItems : 'center',
    },
    modalContainer : {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    }
})
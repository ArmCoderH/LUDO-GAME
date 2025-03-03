import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'

const Pile = ({cell,pieceId,color,player,onPress}) => {
  return (
    <TouchableOpacity>
      
    </TouchableOpacity>
  )
}

export default memo(Pile)

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        alignSelf : 'center'
    },
    hellowCircle : {
        width : 15,
        height : 15,
        position  :'absolute',
        borderRadius : 25,
        borderWidth : 2,
        borderColor : 'black',
        justifyContent : 'center',
        alignItems : 'center'
    },
    dashCircleContaiber : {
        position : 'absolute',
        width : 25,
        height : 25,
        alignItems : 'center',
        justifyContent : 'center',
        top : -0
    },
    dashedCircle : {
        width  :25,
        height  :25,
        alignItems : 'center',
        justifyContent  :'center'
    }
})
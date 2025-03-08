import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
  import {BackgroundImage} from '../helpers/GetIcons';
  import {Svg, Circle} from 'react-native-svg';
  import {useSelector} from 'react-redux';
  import {
    selectCellSelection,
    selectDiceNo,
    selectPocketPileSelection,
  } from '../redux/reducers/gameSlectors';
import { Colors } from '../constants/Colors';
import PileGreen from '../assets/images/piles/green.png'
import PileRed from '../assets/images/piles/red.png'
import PileBlue from '../assets/images/piles/blue.png'
import PileYellow from '../assets/images/piles/yellow.png'
  
  
  const Pile = ({color, cell, onPress, pieceId, player}) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const currentPlayerPileSelection = useSelector(selectPocketPileSelection);
    const currentPlayerCellSelection = useSelector(selectCellSelection);
    const diceNo = useSelector(selectDiceNo);
    const playerPieces = useSelector(
      (state) => state.game[`player${player}`],
    );
    // const pileIcon = BackgroundImage.GetImage(color);
    
  
    const isPileEnabled = useMemo(
      () => player === currentPlayerPileSelection,
      [player,currentPlayerPileSelection],
    );
    const isCellEnabled = useMemo(
      () => player === currentPlayerCellSelection,
      [player,currentPlayerCellSelection],
    );
    
    const isForwardable = useCallback(() => {
      const piece = playerPieces?.find(item => item.id === pieceId);
      return piece && piece.travelCount + diceNo <= 57;
    }, [playerPieces, pieceId, diceNo]);
  
    const getPileImage = useMemo(() => {
      switch(color) {
        case Colors.green :
          return PileGreen
        case Colors.red :
          return PileRed
        case Colors.blue :
          return PileBlue
        case Colors.yellow :
          return PileYellow
          default:
            return PileGreen
      }
    })
    useEffect(() => {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      );
      rotateAnimation.start();
      return () => rotateAnimation.stop();
    }, [rotation]);
  
    const rotateInterpolate = useMemo(
      () =>
        rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      [rotation],
    );

    const player1Pieces = useSelector(state => state.game.player1);
   console.log("Player 1 Pieces:", player1Pieces); // Check Redux state
  
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        disabled={!(cell ? isCellEnabled && isForwardable() : isPileEnabled)}
        onPress={onPress}>
        <View style={styles.hollowCircle}>
          {(cell ? isCellEnabled && isForwardable() : isPileEnabled) && (
            <View style={styles.dashedCircleContainer}>
              <Animated.View
                style={[
                  styles.dashedCircle,
                  {transform: [{rotate: rotateInterpolate}]},
                ]}>
                <Svg height={18} width={18}>
                  <Circle
                    cx={9}
                    cy={9}
                    r={8}
                    stroke={'white'}
                    strokeWidth={2}
                    strokeDasharray={'4 4'}
                    strokeDashoffset={'0'}
                    fill={'transparent'}
                  />
                </Svg>
              </Animated.View>
            </View>
          )}
        </View>
        <Image source={getPileImage} style={{width : 32,height:32,position : 'absolute',top : -16}} />
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      alignSelf: 'center',
    },
    pileIcon: {
      height: 32,
      width: 32,
      position: 'absolute',
      top: -16,
    },
    hollowCircle: {
      width: 15,
      height: 15,
      position: 'absolute',
      borderRadius: 25,
      borderWidth: 2,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dashedCircleContainer: {},
    dashedCircle: {},
  });
  
  export default memo(Pile);
import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { Colors } from '../constants/Colors';
import { useDispatch } from 'react-redux';
import Pile from './Pile';
import { startingPoints } from '../helpers/PlotData';
import { unfreezeDice, updatePlayerPieceValues } from '../redux/reducers/gameSlice';

// Move Plot Component Above Pocket
const Plot = ({ pieceNo, player, color, data, handlePress }) => {
  return (
    <View style={[styles.plot, { backgroundColor: color }]}>
      {data && data[pieceNo] ?.pos === 0 && (
        <Pile
          player={player}
          color={color}
          onPress={() => handlePress(data[pieceNo])}
          style={styles.pile}
        />
      )}
    </View>
  );
};

const Pocket = ({ color, player, data }) => {
  const dispatch = useDispatch();

  const handlePress = async (value) => {
    let playerNo = value?.id[0];
    switch (playerNo) {
      case 'A':
        playerNo = 'player1';
        break;
      case 'B':
        playerNo = 'player2';
        break;
      case 'C':
        playerNo = 'player3';
        break;
      case 'D':
        playerNo = 'player4';
        break;
      default:
        break;
    }

    dispatch(
      updatePlayerPieceValues({
        playerNo : playerNo,
        pieceId: value.id,
        pos: startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
        travelCount: 1,
      }),
    );
    dispatch(unfreezeDice());
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.childFrame}>
        <View style={styles.flexRow}>
          <Plot pieceNo={0} player={player} color={color} data={data} handlePress={handlePress} />
          <Plot pieceNo={1} player={player} color={color} data={data} handlePress={handlePress} />
        </View>
        <View style={[styles.flexRow, { marginTop: 20 }]}>
          <Plot pieceNo={2} player={player} color={color} data={data} handlePress={handlePress} />
          <Plot pieceNo={3} player={player} color={color} data={data} handlePress={handlePress} />
        </View>
      </View>
    </View>
  );
};

export default memo(Pocket);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
    // padding : 10,
    borderColor: Colors.borderColor,
  },
  childFrame: {
    backgroundColor: 'white',
    borderWidth: 0.4,
    width: '70%',
    height: '70%',
    borderColor: Colors.borderColor,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    flexDirection: 'row',
  },
  plot: {
    backgroundColor: Colors.green,
    height: '70%',
    width: '30%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
    // paddingVertical : 10
  },
  pile: {
    width: 20, // Adjust width
    height: 20, // Adjust height
  },
});
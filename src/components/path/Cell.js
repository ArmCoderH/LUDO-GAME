import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { Colors } from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPositions } from '../../redux/reducers/gameSlectors';
import { ArrowSpot, SafeSpots, StarSpots } from '../../helpers/PlotData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import Pile from '../Pile';
import { handleForwardThunk } from '../../redux/reducers/gameAction';

const Cell = ({ id, color , index}) => {
  const dispatch = useDispatch();
  const plottedPieces = useSelector(selectCurrentPositions);

  const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id]);
  const isStartSpot = useMemo(() => StarSpots.includes(id), [id]);
  const isArrowSpot = useMemo(() => ArrowSpot.includes(id), [id]);

  const piecesAtPosition = useMemo(
    () => plottedPieces.filter(item => item.pos === id),
    [plottedPieces, id]
  );

  const handlePress = useCallback(
    (playerNo, pieceId) => {
      dispatch(handleForwardThunk(playerNo, pieceId, id));
    },
    [dispatch, id]
  );

  return (
    <View
      style={[styles.container, { backgroundColor: isSafeSpot ? color : 'white' }]}
    >
      {isStartSpot && <Ionicons name='star-outline' size={20} color='gray' />}
      {isArrowSpot && (
        <Ionicons
          name='arrow-forward-outline'
          style={{
            transform: [
              {
                rotate:
                  id === 38
                    ? '180deg'
                    : id === 25
                    ? '90deg'
                    : id === 51
                    ? '-90deg'
                    : '0deg',
              },
            ],
          }}
          size={RFValue(12)}
          color={color}
        />
      )}
      {piecesAtPosition?.map((piece,index) => {
        const playerNo = 
        piece.id.slice(0,1) === 'A' ? 1
        : piece.id.slice(0,1) === 'B' ? 2
        : piece.id.slice(0,1) === 'C' ? 2 : 4

        const pieceColor =
        piece.id.slice(0,1) === 'A'
        ? Colors.red
        : piece.id.slice(0,1) === 'B'
        ? Colors.green
        : piece.id.slice(0,1) === 'C'
        ? Colors.yellow
        : Colors.blue

        return <View
        
        key={piece.id}
        style={[styles.pieceContainer, {transform : [
          {scale : piecesAtPosition?.length === 1 ? 1 : 0.7},
          {
            translateX : 
            piecesAtPosition.length === 1
            ?0
            :index %2 === 0
            ?-6
            :6
          },
          {
          translateY :
          piecesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6
          },
        ],
      },
        ]}>
          <Pile
          cell={true}
          player={playerNo}
          onPress={() => handlePress(playerNo,piece.id)}
          pieceId={piece.id}
          color={pieceColor}
          />
        </View>

      })}
    </View>
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    borderColor: Colors.borderColor,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  pieceContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
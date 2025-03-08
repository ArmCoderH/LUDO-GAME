import {
  SafeSpots,
  StarSpots,
  startingPoints,
  turningPoints,
  victoryStart,
} from '../../helpers/PlotData';
import {playSound} from '../../helpers/SoundUtility';
import {selectCurrentPositions, selectDiceNo} from './gameSlectors';
import {
  announceWinner,
  unfreezeDice,
  updateFireworks,
  updatePlayerChance,
  updatePlayerPieceValue,
  disableTouch,
} from './gameSlice';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function checkWinningCriteria(pieces) {
  for (let piece of pieces) {
    if (piece.travelCount < 57) {
      return false;
    }
  }
  return true;
}

export const handleForwardThunk =
  (playerNo, id, pos) => async (dispatch, getState) => {
    const state = getState();
    const plottedPieces = selectCurrentPositions(state);
    const diceNo = selectDiceNo(state);

    const piecesAtPosition = plottedPieces.filter(item => item.pos === pos);
    let alpha =
      playerNo == 1 ? 'A' : playerNo == 2 ? 'B' : playerNo == 3 ? 'C' : 'D';

    const piece = piecesAtPosition.findIndex(
      item => item.id.slice(0, 1) === alpha,
    );

    dispatch(disableTouch());

    let finalPath = piece ? piece.pos : pos;


    console.log("Final Path:", finalPath);

    const beforePlayerPiece = state.game[`player${playerNo}`].find(
      item => item.id === id,
    );
    let travelCount = beforePlayerPiece.travelCount;

    console.log("Before Move:", beforePlayerPiece);

    if (beforePlayerPiece.pos === 0) {
        finalPath = startingPoints[playerNo - 1]; // 👈 Ensure piece moves to starting point
      }
      

    for (let i = 0; i < diceNo; i++) {
      const updatePosition = getState();
      const playerPiece = updatePosition.game[`player${playerNo}`].find(
        item => item.id == id,
      );

      let path = playerPiece.pos + 1;

      if (
        turningPoints.includes(path) &&
        turningPoints[playerNo - 1] === path
      ) {
        path = victoryStart[playerNo - 1];
      }

      if (path === 53) {
        path = 1;
      }

      finalPath = path;
      travelCount += 1;

      dispatch(
        updatePlayerPieceValue({
          playerNo: `player${playerNo}`,
          pieceId: playerPiece.id,
          pos: finalPath,
          travelCount: travelCount,
        }),
      );
      playSound('pile_move');
      await delay(200);
    }

    // ensure state is updated after movement
    const updatedState = getState();
    const updatedPlottedPieces = selectCurrentPositions(updatedState);

    const finalPlot = updatedPlottedPieces.filter(
      item => item.pos === finalPath,
    );

    const ids = finalPlot?.map(item => item.id[0]);
    const uniqueIds = new Set(ids);
    const areDifferentIds = uniqueIds.size > 1;

    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
      playSound('safe_spot');
    }

    // Check if the spot is not safe and contains pieces from different players
    if (
      areDifferentIds &&
      !SafeSpots.includes(finalPath) &&
      !StarSpots.includes(finalPath)
    ) {
      const enemyPiece = finalPlot.find(piece => piece.id[0] !== id[0]);
      const enemyId = enemyPiece.id[0];
      let no =
        enemyId === 'A' ? 1 : enemyId === 'B' ? 2 : enemyId === 'C' ? 3 : 4;

      let backwardPath = startingPoints[no - 1];
      let i = enemyPiece.pos;
      playSound('collide');

      while (i !== backwardPath) {
        dispatch(
          updatePlayerPieceValue({
            playerNo: `player${no}`,
            pieceId: enemyPiece.id,
            pos: i,
            travelCount: 0,
          }),
        );
        await delay(0.4);

        i--;

        if (i === 0) {
          i = 52;
        }
      }

      dispatch(
        updatePlayerPieceValue({
          playerNo: `player${no}`,
          pieceId: enemyPiece.id,
          pos: 0,
          travelCount: 0,
        }),
      );

      dispatch(unfreezeDice());
      return;
    }

    // Check if the dice number is 6 or the piece has reached the end
    if (diceNo === 6 || travelCount === 57) {
      dispatch(updatePlayerChance({chancePlayer: playerNo}));
      if (travelCount === 57) {
        playSound('home_win');
        const finalPlayerState = getState();
        const playerAllPieces = finalPlayerState.game[`player${playerNo}`];

        if (checkWinningCriteria(playerAllPieces)) {
          dispatch(announceWinner(playerNo));
          playSound('cheer', true);
          return;
        }
        dispatch(updateFireworks(true));
        dispatch(unfreezeDice());
        return;
      } else {
        let chancePlayer = playerNo + 1;
        if (chancePlayer > 4) {
          chancePlayer = 1;
        }
        dispatch(updatePlayerChance({chancePlayer}));
      }
    }

    console.log("After Move:", getState().game[`player${playerNo}`].find(item => item.id == id));

  };

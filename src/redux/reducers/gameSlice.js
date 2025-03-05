import {createSlice} from '@reduxjs/toolkit'
import { initialState } from './initialState'

export const gameSlice = createSlice({
    name : 'game',
    initialState : initialState,
    reducers: {
        resetGame : () => initialState,
        announceWinner : (state,action) => {
            state.winner = action.payload
        },
        updateFireworks:(state,action) => {
            state.fireworks = action.payload
        },
        updateDiceNo : (state,action) => {
            state.diceNo = action.payload.diceNo
            state.isDiceRolled = true
        },
        enablePileSelection : (state,action) => {
            state.touchDiceBlock = true;
            state.pileSelectionPlayer = action.payload.playerNo;
        },
        updatePlayerChance : (state,action) => {
            state.currentPlayerChance = action.payload.chancePlayer
            state.touchDiceBlock = false
            state.isDiceRolled = false
        },
        enableCellSelection : (state,action) => {
            state.touchDiceBlock = true
            state.callSelectionPlayer = action.payload.playerNo
        }
    }
})
export const {resetGame,announceWinner,enableCellSelection,updateFireworks,updateDiceNo,enablePileSelection, updatePlayerChance} = gameSlice.actions
export default gameSlice.reducer
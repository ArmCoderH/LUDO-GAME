import {createSlice} from '@reduxjs/toolkit'
import { initialState } from './initialState'

export const gameSlice = createSlice({
    name : 'game',
    initialState : initialState,
    reducers: {}
})
export const {} = gameSlice.actions
export default gameSlice.reducer
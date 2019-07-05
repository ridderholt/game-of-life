import { combineReducers } from 'redux';
import { gameReducer, IGameState } from './game/game.reducer';

export interface IStateTree {
    game: IGameState,
}

export default combineReducers({
    game: gameReducer
});
import { Cell } from "./types";
import { IAction } from "../types";
import { gameActions } from './game.actions';
import { calculateNextRound } from './game';
import produce from 'immer';

export interface IGameState {
    cells: Cell[];
    round: number;
}

const initialState: IGameState = {
    cells: [
        { coordinates: { x: 250, y: 250 } },
        { coordinates: { x: 250, y: 260 } },
        { coordinates: { x: 250, y: 270 } },
        { coordinates: { x: 260, y: 250 } },
        { coordinates: { x: 240, y: 260 } },
    ],
    round: 0
};

export const gameReducer = (state = initialState, action: IAction): IGameState =>
    produce(state, draft => {
        switch (action.type) {
            case gameActions.nextRound:
                draft.cells = calculateNextRound(state.cells, 500, 500);
                draft.round = draft.round + 1;
                break;
        }
    });
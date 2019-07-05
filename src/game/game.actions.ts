import { IAction } from "../types";

export const gameActions = ({
    nextRound: 'game/nextround',
});

export const nextRound = (): IAction => ({ type: gameActions.nextRound });
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInterval } from '../../common/hooks/useInterval';
import { createSelector } from 'reselect';
import { IStateTree } from '../../reducer';
import { Cell } from '../types';
import { IGameState } from '../game.reducer';
import { nextRound } from '../game.actions';

interface IBoardProps {
    cells: Cell[],
    round: number,
}

const getCells = createSelector<IStateTree, IGameState, IBoardProps>(
    state => state.game,
    game => ({ cells: game.cells, round: game.round }),
);

const Board: React.FC = () => {
    let canvas = useRef<HTMLCanvasElement>(null);
    const props = useSelector(getCells);
    const dispatch = useDispatch();

    useEffect(() => {
        if (canvas.current !== null) {
            const ctx = canvas.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, 500, 500);
                props.cells.forEach(cell => ctx.fillRect(cell.coordinates.x, cell.coordinates.y, 10, 10))
            }
        }
    });

    useInterval(() => dispatch(nextRound()), 200);

    return (
        <div>
            <div>Generation: {props.round}</div>
            <canvas width="500" height="500" style={{ border: '1px solid black', marginTop: '100px' }} ref={canvas}></canvas>
        </div>
    )
};

export default Board;
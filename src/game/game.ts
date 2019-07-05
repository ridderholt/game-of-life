import { Cell, ICoordinates } from "./types";

interface SchrodingersCell {
    cell: Cell,
    isAlive: boolean;
}

const padWithDeadCells = (aliveCells: Cell[], width: number, height: number) => {
    const allCells: SchrodingersCell[] = [];
    for (let x = 0; x < width; x++) {
        if (x % 10 === 0) {
            for (let y = 0; y < height; y++) {
                if (y % 10 === 0) {
                    const aliveCell = aliveCells.find(cell => cell.coordinates.x === x && cell.coordinates.y === y);
                    if (aliveCell) {
                        allCells.push({ cell: aliveCell, isAlive: true });
                    } else {
                        allCells.push({ cell: { coordinates: { x, y } }, isAlive: false });
                    }
                }
            }
        }
    }

    return allCells;
}

const getNeighbors = (cell: SchrodingersCell, allCells: SchrodingersCell[], width: number, height: number) => {
    const { x, y } = cell.cell.coordinates;
    const coordinates: ICoordinates[] = [
        { x: x + 10, y: y },
        { x: x - 10, y: y },
        { x: x, y: y + 10 },
        { x: x, y: y - 10 },
        { x: x + 10, y: y + 10 },
        { x: x + 10, y: y - 10 },
        { x: x - 10, y: y + 10 },
        { x: x - 10, y: y - 10 }
    ].filter(c => (c.x >= 0 && c.y >= 0) && (c.x <= width && c.y <= height));

    return allCells.filter(cell => coordinates.some(coord => coord.x === cell.cell.coordinates.x && coord.y === cell.cell.coordinates.y));
};

const shouldBeAlive = (cell: SchrodingersCell, neighbors: SchrodingersCell[]): SchrodingersCell => {
    const aliveNeighbors = neighbors.filter(cell => cell.isAlive);

    if (cell.isAlive && aliveNeighbors.length < 2) {
        return { ...cell, isAlive: false };
    }

    if (cell.isAlive && (aliveNeighbors.length === 2 || aliveNeighbors.length === 3)) {
        return { ...cell, isAlive: true };
    }

    if (cell.isAlive && aliveNeighbors.length > 3) {
        return { ...cell, isAlive: false };
    }

    if (!cell.isAlive && aliveNeighbors.length === 3) {
        return { ...cell, isAlive: true };
    }

    return cell;
};

export const calculateNextRound = (cells: Cell[], width: number, height: number): Cell[] => {
    const allCells = padWithDeadCells(cells, width, height);
    return allCells.map(cell => shouldBeAlive(cell, getNeighbors(cell, allCells, width, height)))
        .filter(cell => cell.isAlive)
        .map(cell => cell.cell);
};
import { readFileSync } from "fs";

const input = readFileSync("./05/input.txt").toString().split("\r\n");

type RowPath = ("F" | "B")[];
type ColumnPath = ("R" | "L")[];

interface BoardingPass {
    rowPath: RowPath;
    columnPath: ColumnPath;
}

type Seat = [row: number, column: number];

const toCharArray = <T extends string>(chars: T[], count: number, s: string): T[] =>
    (new RegExp(`^[${chars}]{${count}}`).exec(s)?.[0]?.split("") as T[]) || [];

export const parseBoardingPass = (s: string): BoardingPass => ({
    rowPath: toCharArray(["F", "B"], 7, s),
    columnPath: toCharArray(["L", "R"], 3, s.slice(7))
});

const resolvePath = <T extends string[]>(
    isLeft: (x: string) => boolean,
    blockSize: number,
    [p, ...path]: T,
    rowIndex: number = 0
): number => {
    if (blockSize === 1) {
        return rowIndex;
    }

    return isLeft(p)
        ? resolvePath(isLeft, blockSize / 2, path, rowIndex)
        : resolvePath(isLeft, blockSize / 2, path, rowIndex + blockSize / 2);
};

export const findSeat = (rowCount: number, columnCount: number) => (
    boardingPass: BoardingPass
): Seat => [
    resolvePath((s) => s === "F", rowCount, boardingPass.rowPath),
    resolvePath((s) => s === "L", columnCount, boardingPass.columnPath)
];

export const toSeatId = ([row, column]: Seat): number => row * 8 + column;

export const solvePart1 = () =>
    input
        .map(parseBoardingPass)
        .map(findSeat(128, 8))
        .map(toSeatId)
        .reduce((max, id) => (id > max ? id : max));

export const solvePart2 = () =>
    input
        .map(parseBoardingPass)
        .map(findSeat(128, 8))
        .map(toSeatId)
        .sort((a, b) => a - b)
        .reduce((prev, curr) => (curr === prev + 1 ? curr : prev)) + 1;

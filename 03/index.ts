import { readFileSync } from "fs";

const input = readFileSync("./03/input.txt")
    .toString()
    .split("\r\n")
    .map((line) => line.split(""));

type Grid = string[][];
type Coordinate = [x: number, y: number];
type Route = Coordinate[];
type NextCoordinate = (c: Coordinate) => Coordinate;

const part1Slope: NextCoordinate = ([x, y]) => [x + 3, y + 1];

const part2Slopes: NextCoordinate[] = [
    ([x, y]) => [x + 1, y + 1],
    ([x, y]) => [x + 3, y + 1],
    ([x, y]) => [x + 5, y + 1],
    ([x, y]) => [x + 7, y + 1],
    ([x, y]) => [x + 1, y + 2],
];

const isTree = (s: string) => s === "#";

export const getCell = (grid: Grid) => ([x, y]: Coordinate): string =>
    grid[y][x % grid[0].length];

export const plotRoute = (
    nextCoordinate: NextCoordinate,
    gridHeight: number,
    [[x, y], ...route]: Route = [[0, 0]]
): Route => {
    if (y >= gridHeight) {
        return route.reverse(); // we build the route bottom to top
    }

    return plotRoute(nextCoordinate, gridHeight, [
        nextCoordinate([x, y]),
        [x, y],
        ...route,
    ]);
};

export const runRoute = (grid: Grid, route: Route) => route.map(getCell(grid));

export const solvePart1 = () =>
    runRoute(input, plotRoute(part1Slope, input.length)).filter(isTree).length;

export const solvePart2 = () =>
    part2Slopes
        .map(
            (s) =>
                runRoute(input, plotRoute(s, input.length)).filter(isTree)
                    .length
        )
        .reduce((total, treeCount) => total * treeCount);

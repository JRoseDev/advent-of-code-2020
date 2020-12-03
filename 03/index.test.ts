import { getCell, plotRoute, runRoute, solvePart1 } from ".";

const grid = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
    ["j", "k", "l"],
    ["m", "n", "o"],
    ["p", "q", "r"],
];

describe("03", () => {
    describe("Part 1 - Count the trees", () => {
        describe("getCell", () => {
            it("gets the content of the cell at the specified coordinates", () => {
                const actual = getCell(grid)([1, 2]);

                expect(actual).toBe("h");
            });

            it("repeats the grid to the right", () => {
                const actual = getCell(grid)([7, 2]);

                expect(actual).toBe("h");
            });
        });

        describe("plotRoute", () => {
            it("gets a sequence of coords until the bottom of the grid is passed", () => {
                const actual = plotRoute(
                    ([x, y]) => [x + 1, y + 2],
                    grid.length
                );

                expect(actual).toEqual([
                    [0, 0],
                    [1, 2],
                    [2, 4],
                ]);
            });
        });

        describe("runRoute", () => {
            it("gets the content of the cells hit by a route", () => {
                const actual = runRoute(grid, [
                    [0, 0],
                    [1, 2],
                    [2, 4],
                ]);

                expect(actual).toEqual(["a", "h", "o"]);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(167);
            });
        });
    });
});

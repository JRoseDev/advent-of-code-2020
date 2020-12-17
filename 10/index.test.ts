import { solvePart1, solvePart2 } from ".";

describe("10", () => {
    describe("Part 1 - Multiply the number of differences of 1 by the number of differences of 3", () => {
        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(3034);
            });
        });
    });

    describe("Part 2 - Count the number of distinct orders possible", () => {
        describe("solvePart2", () => {
            it("solves the example input", () => {
                const actual = solvePart2([
                    28,
                    33,
                    18,
                    42,
                    31,
                    14,
                    46,
                    20,
                    48,
                    47,
                    24,
                    23,
                    49,
                    45,
                    19,
                    38,
                    39,
                    11,
                    1,
                    32,
                    25,
                    35,
                    8,
                    17,
                    7,
                    9,
                    4,
                    2,
                    34,
                    10,
                    3,
                ]);

                expect(actual).toEqual(19208);
            });

            it("solves the puzzle!", () => {
                const actual = solvePart2();

                expect(actual).toEqual(259172170858496);
            });
        });
    });
});

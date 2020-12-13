import { solvePart1 } from ".";

describe("10", () => {
    describe("Part 1 - Multiply the number of differences of 1 by the number of differences of 3", () => {
        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(3034);
            });
        });
    });
});

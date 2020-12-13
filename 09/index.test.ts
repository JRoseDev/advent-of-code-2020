import { canSumTo, solvePart1 } from ".";

describe("09", () => {
    describe("Part 1 - Find the first number not the sum of two of the previous 25", () => {
        describe("canSumTo", () => {
            it("returns true when two numbers can prouce the target", () => {
                const actual = canSumTo([4, 6, 3, 2], 7);

                expect(actual).toBe(true);
            });

            it("returns false when no two numbers can prouce the target", () => {
                const actual = canSumTo([4, 6, 3, 2], 11);

                expect(actual).toBe(false);
            });

            it("returns false when the two numbers are the same", () => {
                const actual = canSumTo([4, 6, 3, 4, 3], 8);

                expect(actual).toBe(false);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(104054607);
            });
        });
    });
});

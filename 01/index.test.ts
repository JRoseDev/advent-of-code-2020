import { findSumsTo, solvePart1, solvePart2 } from ".";

describe("01", () => {
    describe("Part 1 - Find the two numbers that add to 2020 and multiply them", () => {
        describe("findSumTo", () => {
            it("finds first two numbers that sum to 5", () => {
                const actual = findSumsTo(5, 2, [1, 2, 3, 4, 5]);

                expect(actual).toEqual([2, 3]);
            });

            it("finds first two numbers that sum to 5 when out of order", () => {
                const actual = findSumsTo(5, 2, [1, 3, 7, 3, 2, 5]);

                expect(actual).toEqual([3, 2]);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(538464);
            });
        });
    });

    describe("Part 2 - Find the three numbers that add to 2020 and multiply them", () => {
        describe("findSumTo", () => {
            it("finds first three numbers that sum to 5", () => {
                const actual = findSumsTo(5, 3, [1, 2, 3, 4, 2, 5]);

                expect(actual).toEqual([1, 2, 2]);
            });
        });
    });

    describe("solvePart2", () => {
        it("solves the puzzle!", () => {
            const actual = solvePart2();

            expect(actual).toEqual(278783190);
        });
    });
});

import { findSumsTo, solve } from ".";

import { values } from "./input";

describe("01-1 - Find the two numbers that add to 2020 and multiply them", () => {
    describe("findSumTo", () => {
        it("finds first two numbers that sum to 5", () => {
            const actual = findSumsTo(5, [1, 2, 3, 4, 5]);

            expect(actual).toEqual([2, 3]);
        });

        it("finds first two numbers that sum to 5 when out of order", () => {
            const actual = findSumsTo(5, [1, 3, 7, 3, 2, 5]);

            expect(actual).toEqual([3, 2]);
        });
    });

    describe("solve", () => {
        it("solves the puzzle!", () => {
            const actual = solve();

            expect(actual).toEqual(538464);
        });
    });
});

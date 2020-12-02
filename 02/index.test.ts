import { findValidPasswords, solvePart1 } from ".";

describe("02", () => {
    describe("Part 1 - Find the passwords that are valid", () => {
        describe("findValidPasswords", () => {
            it("excludes invalid passwords", () => {
                const actual = findValidPasswords([
                    "2-6 w: wkwwwfwwpv",
                    "14-15 v: hvhvlhvvvwxvdvscdpvg",
                ]);

                expect(actual).toEqual([
                    {
                        character: "w",
                        maxOcurrences: 6,
                        minOcurrences: 2,
                        password: "wkwwwfwwpv",
                    },
                ]);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(536);
            });
        });
    });
});

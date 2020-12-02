import {
    findValidPasswords,
    schemeA,
    schemeB,
    solvePart1,
    solvePart2,
} from ".";

describe("02", () => {
    describe("Part 1 - Find the passwords that are valid", () => {
        describe("findValidPasswords", () => {
            it("excludes invalid passwords", () => {
                const actual = findValidPasswords(schemeA, [
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
    describe("Part 2 - Find the passwords that are valid under the other scheme", () => {
        describe("findValidPasswords", () => {
            it("excludes invalid passwords", () => {
                const actual = findValidPasswords(schemeB, [
                    "2-6 w: wkwwwwfwpv",
                    "14-15 v: hvhvlhvvvwxvdxscdpxg",
                ]);

                expect(actual).toEqual([
                    {
                        character: "w",
                        firstPosition: 1,
                        password: "wkwwwwfwpv",
                        secondPosition: 5,
                    },
                ]);
            });
        });

        describe("solvePart2", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart2();

                expect(actual).toEqual(558);
            });
        });
    });
});

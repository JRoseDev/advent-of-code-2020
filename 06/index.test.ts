import { countAnswers, groupAnswers, solvePart1, solvePart2 } from ".";

describe("06", () => {
    describe("Part 1 - Count the questions answered with yes", () => {
        describe("groupAnswers", () => {
            it("groups answers from each group", () => {
                const actual = groupAnswers(
                    `qzbw\r\nqez\r\n\r\nxged\r\nfxgp\r\n\r\none`
                );

                expect(actual).toEqual([
                    { answers: "qzbwqez", memberCount: 2 },
                    { answers: "xgedfxgp", memberCount: 2 },
                    { answers: "one", memberCount: 1 },
                ]);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(6742);
            });
        });
    });

    describe("Part 2 - Count the questions everyone answered with yes", () => {
        describe("countAnswers", () => {
            it("counts the instances of each answer", () => {
                const actual = countAnswers("abcabcdefa");

                expect(actual).toEqual({
                    a: 3,
                    b: 2,
                    c: 2,
                    d: 1,
                    e: 1,
                    f: 1,
                });
            });
        });

        describe("solvePart2", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart2();

                expect(actual).toEqual(3447);
            });
        });
    });
});

import { groupAnswers, solvePart1 } from ".";

describe("06", () => {
    describe("Part 1 - Count the questions answered with yes", () => {
        describe("groupAnswers", () => {
            it("groups answers from each group", () => {
                const actual = groupAnswers(`qzbw\r\nqez\r\n\r\nxged\r\nfxgp`);

                expect(actual).toEqual(["qzbwqez", "xgedfxgp"]);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(6742);
            });
        });
    });
});

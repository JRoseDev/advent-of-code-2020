import { execAcc, execJmp, execNop, parseInstruction, solvePart1 } from ".";

describe("08", () => {
    describe("Part 1 - Get the value of the accumulator before an instruction is repeated", () => {
        describe("parseInstruction", () => {
            it("parses acc", () => {
                const actual = parseInstruction("acc -43");

                expect(actual).toEqual({
                    type: "acc",
                    value: -43,
                });
            });

            it("parses jmp", () => {
                const actual = parseInstruction("jmp +236");

                expect(actual).toEqual({
                    type: "jmp",
                    value: 236,
                });
            });

            it("parses nop", () => {
                const actual = parseInstruction("nop -52");

                expect(actual).toEqual({ type: "nop" });
            });
        });

        describe("execAcc", () => {
            it("alters the accumulator", () => {
                const actual = execAcc(
                    { type: "acc", value: -12 },
                    {
                        accumulator: 0,
                        nextInstruction: 0,
                    }
                );

                expect(actual).toEqual({ accumulator: -12, nextInstruction: 1 });
            });
        });

        describe("execJmp", () => {
            it("alters the next instruction index", () => {
                const actual = execJmp(
                    { type: "jmp", value: -12 },
                    {
                        accumulator: 0,
                        nextInstruction: 0,
                    }
                );

                expect(actual).toEqual({ accumulator: 0, nextInstruction: -12 });
            });
        });

        describe("execNop", () => {
            it("increments the next instruction index", () => {
                const actual = execNop({
                    accumulator: 0,
                    nextInstruction: 0,
                });

                expect(actual).toEqual({ accumulator: 0, nextInstruction: 1 });
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual.accumulator).toEqual(1810);
            });
        });
    });

});

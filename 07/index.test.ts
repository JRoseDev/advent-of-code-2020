import { asMap, parseBag, solvePart1, solvePart2, BagContents } from ".";

describe("07", () => {
    describe("Part 1 - How many bags ultimately contain a shiny gold bag?", () => {
        describe("parseBag", () => {
            it("parses multiple contained bags", () => {
                const actual = parseBag(
                    `clear crimson bags contain 3 pale aqua bags, 4 plaid magenta bags, 3 dotted beige bags, 1 dotted black bag.`
                );

                expect(actual).toEqual({
                    name: "clear crimson",
                    contents: new Map<string, number>(
                        Object.entries({
                            "pale aqua": 3,
                            "plaid magenta": 4,
                            "dotted beige": 3,
                            "dotted black": 1,
                        })
                    ),
                });
            });

            it("parses bags with no contents", () => {
                const actual = parseBag("shiny plum bags contain no other bags.");

                expect(actual).toEqual({ name: "shiny plum", contents: new Map() });
            });
        });

        describe("asMap", () => {
            it("stores bags in a map", () => {
                const actual = asMap([
                    {
                        name: "A",
                        contents: new Map<string, number>(Object.entries({ B: 6, C: 1 })),
                    },
                    { name: "B", contents: new Map<string, number>(Object.entries({ C: 4 })) },
                    { name: "C", contents: new Map() },
                ]);

                expect(actual).toEqual(
                    new Map<string, BagContents>(
                        Object.entries({
                            A: new Map<string, number>(Object.entries({ B: 6, C: 1 })),
                            B: new Map<string, number>(Object.entries({ C: 4 })),
                            C: new Map<string, number>(),
                        })
                    )
                );
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(128);
            });
        });
    });

    describe("Part 2 - Count the number of bags contained by the shiny gold bag", () => {
        describe("solvePart2", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart2();

                expect(actual).toEqual(20189);
            });
        });
    });
});

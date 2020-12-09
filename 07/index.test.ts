import { linkBags, parseBag, solvePart1 } from ".";

import { json } from "graphlib";

describe("07", () => {
    describe("Part 1 - How many bags ultimately contain a shiny gold bag?", () => {
        describe("parseBag", () => {
            it("parses multiple contained bags", () => {
                const actual = parseBag(
                    `clear crimson bags contain 3 pale aqua bags, 4 plaid magenta bags, 3 dotted beige bags, 1 dotted black bag.`
                );

                expect(actual).toEqual({
                    name: "clear crimson",
                    contents: {
                        "pale aqua": 3,
                        "plaid magenta": 4,
                        "dotted beige": 3,
                        "dotted black": 1,
                    },
                });
            });

            it("parses bags with no contents", () => {
                const actual = parseBag("shiny plum bags contain no other bags.");

                expect(actual).toEqual({ name: "shiny plum", contents: {} });
            });
        });

        describe("linkBags", () => {
            it("links bags into a graph", () => {
                const actual = linkBags([
                    { name: "A", contents: { B: 6, C: 1 } },
                    { name: "B", contents: { C: 4 } },
                    { name: "C", contents: {} },
                ]);

                expect(json.write(actual)).toEqual({
                    edges: [
                        { v: "B", value: 6, w: "A" },
                        { v: "C", value: 1, w: "A" },
                        { v: "C", value: 4, w: "B" },
                    ],
                    nodes: [{ v: "A" }, { v: "B" }, { v: "C" }],
                    options: { compound: false, directed: true, multigraph: false },
                });
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(128);
            });
        });
    });
});

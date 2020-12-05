import { findSeat, parseBoardingPass, solvePart1, solvePart2, toSeatId } from ".";

describe("05", () => {
    describe("Part 1 - Find the highest seat Id", () => {
        describe("parseBoardingPass", () => {
            it("splits row path from seat path", () => {
                const actual = parseBoardingPass("FBFBBBFRLR");

                expect(actual).toEqual({
                    rowPath: ["F", "B", "F", "B", "B", "B", "F"],
                    columnPath: ["R", "L", "R"]
                });
            });
        });

        describe("findSeat", () => {
            it("resolves paths to indexes", () => {
                const actual = findSeat(
                    8,
                    4
                )({
                    rowPath: ["F", "B", "F"],
                    columnPath: ["R", "R"]
                });

                expect(actual).toEqual([2, 3]);
            });
        });

        describe("toSeatId", () => {
            it("converts seat location to Id", () => {
                const actual = toSeatId([4, 12]);

                expect(actual).toEqual(44);
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(978);
            });
        });
    });

    describe("Part 2 - Find the missing seat Id", () => {
        describe("solvePart2", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart2();

                expect(actual).toEqual(727);
            });
        });
    });
});

import { isValid, parsePassports, solvePart1, solvePart2 } from ".";
import { part1ValidationRules, part2ValidationRules } from "./validationRules";

describe("04", () => {
    describe("Part 1 - Count the valid passports", () => {
        describe("parsePassports", () => {
            it("parses passports separated by spaces", () => {
                const actual = parsePassports([
                    "pid:108667812 eyr:2023 hcl:#623a2f hgt:171cm iyr:2018 ecl:amb byr:1993 cid:55"
                ]);

                expect(actual).toEqual([
                    {
                        birthYear: "1993",
                        issueYear: "2018",
                        expirationYear: "2023",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812",
                        countryId: "55"
                    }
                ]);
            });

            it("parses passports separated by newlines", () => {
                const actual = parsePassports([
                    "pid:108667812",
                    "eyr:2023",
                    "hcl:#623a2f",
                    "hgt:171cm",
                    "iyr:2018",
                    "ecl:amb",
                    "byr:1993",
                    "cid:55"
                ]);

                expect(actual).toEqual([
                    {
                        birthYear: "1993",
                        issueYear: "2018",
                        expirationYear: "2023",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812",
                        countryId: "55"
                    }
                ]);
            });

            it("parses passports separated by a mixture of newlines and spaces", () => {
                const actual = parsePassports([
                    "pid:108667812 eyr:2023",
                    "hcl:#623a2f",
                    "hgt:171cm iyr:2018",
                    "ecl:amb",
                    "byr:1993",
                    "cid:55"
                ]);

                expect(actual).toEqual([
                    {
                        birthYear: "1993",
                        issueYear: "2018",
                        expirationYear: "2023",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812",
                        countryId: "55"
                    }
                ]);
            });

            it("parses multiple passports", () => {
                const actual = parsePassports([
                    "pid:108667812 eyr:2023",
                    "hcl:#623a2f",
                    "hgt:171cm iyr:2018",
                    "ecl:amb",
                    "byr:1993",
                    "cid:55",
                    "",
                    "pid:108667813 eyr:2024",
                    "hcl:#623a2g",
                    "hgt:172cm iyr:2019",
                    "ecl:amb2",
                    "byr:1994",
                    "cid:56"
                ]);

                expect(actual).toEqual([
                    {
                        birthYear: "1993",
                        issueYear: "2018",
                        expirationYear: "2023",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812",
                        countryId: "55"
                    },
                    {
                        birthYear: "1994",
                        issueYear: "2019",
                        expirationYear: "2024",
                        height: "172cm",
                        hairColor: "#623a2g",
                        eyeColor: "amb2",
                        passportId: "108667813",
                        countryId: "56"
                    }
                ]);
            });

            describe("isValid", () => {
                it("returns true for a passport with all required fields", () => {
                    const actual = isValid(part1ValidationRules)({
                        birthYear: "1993",
                        issueYear: "2018",
                        expirationYear: "2023",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812"
                    });

                    expect(actual).toBe(true);
                });

                it("returns true for a passport with all required fields plus a country Id", () => {
                    const actual = isValid(part1ValidationRules)({
                        birthYear: "1993",
                        issueYear: "2018",
                        expirationYear: "2023",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812",
                        countryId: "55"
                    });

                    expect(actual).toBe(true);
                });

                it("returns false for a passport with a missing required field", () => {
                    const actual = isValid(part1ValidationRules)({
                        birthYear: "1993",
                        issueYear: "2018",
                        height: "171cm",
                        hairColor: "#623a2f",
                        eyeColor: "amb",
                        passportId: "108667812"
                    });

                    expect(actual).toBe(false);
                });
            });
        });

        describe("solvePart1", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart1();

                expect(actual).toEqual(192);
            });
        });
    });

    describe("Part 2 - Field validation", () => {
        describe("isValid", () => {
            const validPassport = {
                birthYear: "1993",
                issueYear: "2018",
                expirationYear: "2023",
                height: "171cm",
                hairColor: "#623a2f",
                eyeColor: "amb",
                passportId: "108667812",
                countryId: "55"
            };

            it("passes valid passports", () => {
                const actual = isValid(part2ValidationRules)(validPassport);
                expect(actual).toBe(true);
            });

            it("fails invalid birth years", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    birthYear: "1910"
                });
                expect(actual).toBe(false);
            });

            it("fails birth years in the wrong format", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    birthYear: "notANumber"
                });
                expect(actual).toBe(false);
            });

            it("fails invalid issue years", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    issueYear: "2009"
                });
                expect(actual).toBe(false);
            });

            it("fails issue years in the wrong format", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    issueYear: "notANumber"
                });
                expect(actual).toBe(false);
            });

            it("fails invalid expiration years", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    expirationYear: "2019"
                });
                expect(actual).toBe(false);
            });

            it("fails expiration years in the wrong format", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    expirationYear: "notANumber"
                });
                expect(actual).toBe(false);
            });

            it("fails height not in inches or centimeters", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    height: "173m"
                });
                expect(actual).toBe(false);
            });

            [
                { unit: "cm", value: 149, expected: false },
                { unit: "cm", value: 150, expected: true },
                { unit: "cm", value: 193, expected: true },
                { unit: "cm", value: 194, expected: false },
                { unit: "in", value: 58, expected: false },
                { unit: "in", value: 59, expected: true },
                { unit: "in", value: 76, expected: true },
                { unit: "in", value: 77, expected: false }
            ].forEach(({ unit, value, expected }) => {
                it(`${expected ? "passes" : "fails"} height of ${value}${unit}`, () => {
                    const actual = isValid(part2ValidationRules)({
                        ...validPassport,
                        height: `${value}${unit}`
                    });
                    expect(actual).toBe(expected);
                });
            });

            it("fails expiration years in the wrong format", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    height: "notANumber"
                });
                expect(actual).toBe(false);
            });

            it("fails hair colour in the wrong format", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    hairColor: "#12345"
                });
                expect(actual).toBe(false);
            });

            it("fails eye color not in the list", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    eyeColor: "notAColor"
                });
                expect(actual).toBe(false);
            });

            it("fails invalid passport Id", () => {
                const actual = isValid(part2ValidationRules)({
                    ...validPassport,
                    passportId: "12345678"
                });
                expect(actual).toBe(false);
            });
        });

        describe("solvePart2", () => {
            it("solves the puzzle!", () => {
                const actual = solvePart2();

                expect(actual).toEqual(101);
            });
        });
    });
});

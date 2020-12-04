import { isValid, parsePassports, solvePart1 } from ".";

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
                    const actual = isValid({
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
                    const actual = isValid({
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
                    const actual = isValid({
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
});

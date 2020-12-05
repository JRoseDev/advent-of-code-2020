import { ValidationRules, part1ValidationRules, part2ValidationRules } from "./validationRules";

import { Passport } from "./passport";
import { readFileSync } from "fs";

const input = readFileSync("./04/input.txt").toString().split("\r\n");

const fieldMap = {
    byr: "birthYear",
    cid: "countryId",
    ecl: "eyeColor",
    eyr: "expirationYear",
    hcl: "hairColor",
    hgt: "height",
    iyr: "issueYear",
    pid: "passportId"
} as const;

type ShortFieldNames = keyof typeof fieldMap;

const passportFromLine = (line: string) => {
    const fields = line
        .split(" ")
        .map((field) => field.split(":") as [name: ShortFieldNames, value: string]);

    return fields.reduce(
        (acc, [name, value]) => ({
            ...acc,
            [fieldMap[name]]: value
        }),
        {} as Partial<Passport>
    );
};

export const parsePassports = (lines: string[]): Partial<Passport>[] => {
    const passportLine: string[] = [];

    for (const [i, l] of lines.entries()) {
        if (l === "") {
            return [
                passportFromLine(passportLine.join(" ")),
                ...parsePassports(lines.slice(i + 1))
            ];
        }

        passportLine.push(l);
    }

    return [passportFromLine(passportLine.join(" "))];
};

export const isValid = (validationRules: ValidationRules) => (
    passport: Partial<Passport>
): boolean =>
    Object.entries(validationRules).every(([key, rule]) =>
        rule(passport[key as keyof Passport])
    );

export const solvePart1 = () => parsePassports(input).filter(isValid(part1ValidationRules)).length;

export const solvePart2 = () => parsePassports(input).filter(isValid(part2ValidationRules)).length;

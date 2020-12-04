import { readFileSync } from "fs";

const input = readFileSync("./04/input.txt").toString().split("\r\n");

interface Passport {
    birthYear: string;
    countryId: string;
    expirationYear: string;
    eyeColor: string;
    hairColor: string;
    height: string;
    issueYear: string;
    passportId: string;
}

const fieldMap = {
    byr: "birthYear" as const,
    cid: "countryId" as const,
    ecl: "eyeColor" as const,
    eyr: "expirationYear" as const,
    hcl: "hairColor" as const,
    hgt: "height" as const,
    iyr: "issueYear" as const,
    pid: "passportId" as const
};

const requiredFields = Object.values(fieldMap).filter((k) => k !== "countryId");

type ShortFieldNames = keyof typeof fieldMap;
type LongFieldNames = typeof fieldMap[ShortFieldNames];

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

export const isValid = (passport: Partial<Passport>): boolean => {
    const presentFields = Object.keys(passport);

    return requiredFields.every((f) => presentFields.includes(f));
};

export const solvePart1 = () => parsePassports(input).filter(isValid).length;

import { readFileSync } from "fs";

const input = readFileSync("./02/input.txt").toString().split("\r\n");
interface SchemeARow {
    minOcurrences: number;
    maxOcurrences: number;
    character: string;
    password: string;
}

interface SchemeBRow {
    firstPosition: number;
    secondPosition: number;
    character: string;
    password: string;
}

interface Scheme<T> {
    parse: (row: string) => T;
    validate: (parsedRow: T) => boolean;
}

const rowRegEx = /(?<firstNumber>\d+)-(?<secondNumber>\d+) (?<character>\w): (?<password>.*$)/iu;

export const schemeA: Scheme<SchemeARow> = {
    parse: (row: string): SchemeARow => {
        const {
            firstNumber: minOcurrences,
            secondNumber: maxOcurrences,
            character,
            password,
        } = rowRegEx.exec(row)?.groups || {};

        return {
            minOcurrences: Number.parseInt(minOcurrences),
            maxOcurrences: Number.parseInt(maxOcurrences),
            character,
            password,
        };
    },
    validate: (row: SchemeARow) => {
        const count =
            row.password.match(new RegExp(row.character, "g"))?.length || 0;

        return count >= row.minOcurrences && count <= row.maxOcurrences;
    },
};

export const schemeB: Scheme<SchemeBRow> = {
    parse: (row: string): SchemeBRow => {
        const {
            firstNumber: firstPosition,
            secondNumber: secondPosition,
            character,
            password,
        } = rowRegEx.exec(row)?.groups || {};

        return {
            firstPosition: Number.parseInt(firstPosition) - 1,
            secondPosition: Number.parseInt(secondPosition) - 1,
            character,
            password,
        };
    },
    validate: (row: SchemeBRow) => {
        const {
            [row.firstPosition]: firstCharacter,
            [row.secondPosition]: secondCharacter,
        } = row.password;

        const firstMatches = firstCharacter === row.character;
        const secondMatches = secondCharacter === row.character;

        return (
            (firstMatches && !secondMatches) || (secondMatches && !firstMatches)
        );
    },
};

export const findValidPasswords = <T extends SchemeARow | SchemeBRow>(
    scheme: Scheme<T>,
    rows: string[]
) => rows.map(scheme.parse).filter(scheme.validate);

export const solvePart1 = () => findValidPasswords(schemeA, input).length;

export const solvePart2 = () => findValidPasswords(schemeB, input).length;

import { readFileSync } from "fs";

const input = readFileSync("./02/input.txt").toString().split("\r\n");
interface ParsedRow {
    minOcurrences: number;
    maxOcurrences: number;
    character: string;
    password: string;
}

const rowRegEx = /(?<minOcurrences>\d+)-(?<maxOcurrences>\d+) (?<character>\w): (?<password>.*$)/iu;

const isValid = (row: ParsedRow) => {
    const count =
        row.password.match(new RegExp(row.character, "g"))?.length || 0;

    return count >= row.minOcurrences && count <= row.maxOcurrences;
};

const parseRow = (row: string): ParsedRow => {
    const { minOcurrences, maxOcurrences, character, password } =
        rowRegEx.exec(row)?.groups || {};

    return {
        minOcurrences: Number.parseInt(minOcurrences),
        maxOcurrences: Number.parseInt(maxOcurrences),
        character,
        password,
    };
};

export const findValidPasswords = (row: string[]) =>
    row.map(parseRow).filter(isValid);

export const solvePart1 = () => findValidPasswords(input).length;

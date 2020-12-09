import { readFileSync } from "fs";

const input = readFileSync("./06/input.txt").toString();

export const groupAnswers = (input: string) =>
    input.split("\r\n\r\n").map((s) => s.replace(/\r\n/g, ""));

export const solvePart1 = () =>
    groupAnswers(input)
        .map((s) => new Set(s))
        .reduce((acc, s) => acc + s.size, 0);


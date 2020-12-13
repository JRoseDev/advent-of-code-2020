import { readFileSync } from "fs";

const input = readFileSync("./09/input.txt")
    .toString()
    .split("\r\n")
    .map((n) => Number.parseInt(n));

export const canSumTo = (numbers: number[], target: number): boolean => {
    for (const [i, n1] of numbers.entries()) {
        for (const n2 of numbers.slice(i + 1)) {
            if (n1 + n2 === target && n1 !== n2) {
                return true;
            }
        }
    }

    return false;
};

export const solvePart1 = () => {
    for (const [i, n] of input.entries()) {
        const window = input.slice(i, i + 26);
        const target = input[i + 26];

        if (!canSumTo(window, target)) {
            return target;
        }
    }

    throw new Error("Couldn't find any invalid numbers");
};

export const solvePart2 = () => {};

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

const takeUntilTarget = (
    numbers: number[],
    target: number
): { found: false } | { found: true; length: number } => {
    let sum = 0;
    let i = -1;

    while (sum < target) {
        i += 1;
        sum += numbers[i];
    }

    if (sum === target) {
        return { found: true, length: i + 1 };
    }

    return { found: false };
};

const findContiguousSum = (numbers: number[], target: number, startIndex = 0): number[] => {
    const contiguousSum = takeUntilTarget(numbers.slice(startIndex), target);

    if (contiguousSum.found) {
        return numbers.slice(startIndex, startIndex + contiguousSum.length);
    }

    return findContiguousSum(numbers, target, startIndex + 1);
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

export const solvePart2 = () => {
    const contiguousSum = findContiguousSum(input, 104054607);
    const smallest = contiguousSum.reduce((acc, curr) => (curr < acc ? curr : acc));
    const largest = contiguousSum.reduce((acc, curr) => (curr > acc ? curr : acc));

    return smallest + largest;
};

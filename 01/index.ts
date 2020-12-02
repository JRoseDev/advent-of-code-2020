import { values } from "./input";

export const findSumsTo = (
    targetValue: number,
    targetCount: number,
    values: number[]
): number[] | null => {
    const seenValues = new Set();

    for (const v of values) {
        const target = targetValue - v;

        if (targetCount > 2) {
            const foundSum = findSumsTo(target, targetCount - 1, values);

            if (foundSum != null) {
                return [...foundSum, v];
            }
        } else if (seenValues.has(target)) {
            return [target, v];
        }

        seenValues.add(v);
    }

    return null;
};

export const solvePart1 = () =>
    findSumsTo(2020, 2, values)?.reduce((acc, v) => acc * v);

export const solvePart2 = () =>
    findSumsTo(2020, 3, values)?.reduce((acc, v) => acc * v);

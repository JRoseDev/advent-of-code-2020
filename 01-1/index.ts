import { values } from "./input";

export const findSumsTo = (
    targetValue: number,
    values: number[]
): [number, number] | [] => {
    const seenValues = new Set(values);

    for (const v of values) {
        const target = targetValue - v;

        if (seenValues.has(target)) {
            return [target, v];
        }

        seenValues.add(v);
    }

    return [];
};

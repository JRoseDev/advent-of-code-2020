import { readFileSync } from "fs";

const input = readFileSync("./10/input.txt")
    .toString()
    .split("\r\n")
    .map((n) => Number.parseInt(n));

export const solvePart1 = () => {
    const ascending = input.sort((a, b) => a - b);
    const diffs = ascending.reduce(
        (diffs, n) => {
            const diff = n - diffs.last;

            switch (diff) {
                case 1:
                    return { ...diffs, "1Diffs": diffs["1Diffs"] + 1, last: n };

                case 3:
                    return { ...diffs, "3Diffs": diffs["3Diffs"] + 1, last: n };
            }

            return { ...diffs, last: n };
        },
        { "1Diffs": 0, "3Diffs": 0, last: 0 }
    );

    return diffs["1Diffs"] * (diffs["3Diffs"] + 1);
};

import { readFileSync } from "fs";

const input = readFileSync("./06/input.txt").toString();

interface GroupAnswers {
    answers: string;
    memberCount: number;
}

export const groupAnswers = (input: string): GroupAnswers[] =>
    input.split("\r\n\r\n").map((s) => {
        const memberCount = (s.match(/\r\n/giu)?.length || 0) + 1;

        return { answers: s.replace(/\r\n/g, ""), memberCount };
    });

export const countAnswers = (answers: string): Record<string, number> =>
    Array.prototype.reduce.bind(answers)(
        (acc: Record<string, number>, curr: string) => (
            (acc[curr] = (acc[curr] || 0) + 1), acc
        ),
        {}
    );

export const solvePart1 = () =>
    groupAnswers(input)
        .map(({ answers }) => new Set(answers))
        .reduce((acc, s) => acc + s.size, 0);

export const solvePart2 = () =>
    groupAnswers(input)
        .map(({ answers, memberCount }) => {
            const answerCounts = countAnswers(answers);

            return Object.keys(answerCounts).filter(
                (k) => answerCounts[k] === memberCount
            );
        })
        .reduce((acc, a) => acc + a.length, 0);

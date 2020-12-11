import { readFileSync } from "fs";

const input = readFileSync("./08/input.txt").toString().split("\r\n");

interface Acc {
    type: "acc";
    value: number;
}

interface Jmp {
    type: "jmp";
    value: number;
}

interface Nop {
    type: "nop";
    value: number;
}

type Instruction = Acc | Jmp | Nop;

interface State {
    accumulator: number;
    nextInstruction: number;
}

export const parseInstruction = (instruction: string): Instruction => {
    const { type, valueString } =
        instruction.match(/^(?<type>\w+) (?<valueString>[-+]\d+)$/iu)?.groups || {};
    const value = Number.parseInt(valueString);

    switch (type) {
        case "acc":
        case "jmp":
        case "nop":
            return { type, value };

        default:
            throw new Error("Invalid type");
    }
};

export const execAcc = (a: Acc, s: State): State => ({
    accumulator: s.accumulator + a.value,
    nextInstruction: s.nextInstruction + 1,
});

export const execJmp = (j: Jmp, s: State): State => ({
    accumulator: s.accumulator,
    nextInstruction: s.nextInstruction + j.value,
});

export const execNop = (s: State): State => ({
    accumulator: s.accumulator,
    nextInstruction: s.nextInstruction + 1,
});

export const execNextInstruction = (instructions: Instruction[], state: State): State => {
    const nextInstruction = instructions[state.nextInstruction];

    switch (nextInstruction.type) {
        case "acc":
            return execAcc(nextInstruction, state);

        case "jmp":
            return execJmp(nextInstruction, state);

        case "nop":
            return execNop(state);

        default:
            throw new Error("Invalid instruction type");
    }
};

const execUntilLoop = (
    instructions: Instruction[],
    state: State,
    seenInstructions: Set<number> = new Set<number>([state.nextInstruction])
): State => {
    const newState = execNextInstruction(instructions, state);

    if (
        seenInstructions.has(newState.nextInstruction) ||
        newState.nextInstruction >= instructions.length
    ) {
        return newState;
    }

    return execUntilLoop(instructions, newState, seenInstructions.add(newState.nextInstruction));
};

export const solvePart1 = () => {
    const instructions = input.map(parseInstruction);
    const initalState = {
        accumulator: 0,
        nextInstruction: 0,
    };

    return execUntilLoop(instructions, initalState);
};

export const solvePart2 = () => {
    const instructions = input.map(parseInstruction);
    const initalState = {
        accumulator: 0,
        nextInstruction: 0,
    };

    for (const [index, { type, value }] of instructions.entries()) {
        if (type === "acc") {
            continue;
        }

        const newInstruction: Instruction =
            type === "jmp" ? { type: "nop", value } : { type: "jmp", value };

        const modifiedInstructions = [...instructions];
        modifiedInstructions.splice(index, 1, newInstruction);

        const finalState = execUntilLoop(modifiedInstructions, initalState);

        if (finalState.nextInstruction === instructions.length) {
            return finalState;
        }
    }

    throw new Error("Couldn't find a terminating program");
};

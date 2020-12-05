import * as O from "fp-ts/Option";

import { constFalse, constTrue, flow, pipe } from "fp-ts/function";

import { Passport } from "./passport";

interface Height {
    unit: string;
    value: number;
}

export type ValidationRules = { [p in keyof Passport]: (s: string | undefined) => boolean };

const isDefined = <T>(x: T | null | undefined): x is T => x != null;

const isBetween = (a: number, b: number) => (v: number) => v >= a && v <= b;
const isNumberOfLength = (l: number) => (s: string) =>
    s.length === l && Number.isFinite(Number.parseInt(s));

const parseHeight = (s: string): Height => {
    const { value: valueString, unit } = /^(?<value>\d+)(?<unit>\w+$)/iu.exec(s)?.groups || {};
    const value = Number.parseInt(valueString);

    return { value, unit };
};

const isValidHeight = ({ unit, value }: Height) => {
    if (!Number.isFinite(value) || !["cm", "in"].includes(unit)) {
        return false;
    }

    if (unit === "cm") {
        return isBetween(150, 193)(value);
    }

    return isBetween(59, 76)(value);
};

const isValidHairColor = (s: string) => /^#[0-9a-f]{6}$/iu.test(s);

const isValidEyeColor = (s: string) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(s);

const isValidPassportId = (s: string) => /^\d{9}$/iu.test(s);

export const part1ValidationRules: ValidationRules = {
    birthYear: isDefined,
    countryId: constTrue,
    expirationYear: isDefined,
    eyeColor: isDefined,
    hairColor: isDefined,
    height: isDefined,
    issueYear: isDefined,
    passportId: isDefined
};

export const part2ValidationRules: ValidationRules = {
    birthYear: (s) =>
        pipe(
            O.fromNullable(s),
            O.filter(isNumberOfLength(4)),
            O.map(Number.parseInt),
            O.filter(isBetween(1920, 2002)),
            O.map(Boolean),
            O.getOrElse(constFalse)
        ),
    issueYear: (s) =>
        pipe(
            O.fromNullable(s),
            O.filter(isNumberOfLength(4)),
            O.map(Number.parseInt),
            O.filter(isBetween(2010, 2020)),
            O.map(Boolean),
            O.getOrElse(constFalse)
        ),
    expirationYear: (s) =>
        pipe(
            O.fromNullable(s),
            O.filter(isNumberOfLength(4)),
            O.map(Number.parseInt),
            O.filter(isBetween(2020, 2030)),
            O.map(Boolean),
            O.getOrElse(constFalse)
        ),
    height: (s) =>
        pipe(O.fromNullable(s), O.map(parseHeight), O.map(isValidHeight), O.getOrElse(constFalse)),
    hairColor: (s) =>
        pipe(
            O.fromNullable(s),
            O.filter(isDefined),
            O.map(isValidHairColor),
            O.getOrElse(constFalse)
        ),
    eyeColor: (s) =>
        pipe(
            O.fromNullable(s),
            O.filter(isDefined),
            O.map(isValidEyeColor),
            O.getOrElse(constFalse)
        ),
    passportId: (s) =>
        pipe(
            O.fromNullable(s),
            O.filter(isDefined),
            O.map(isValidPassportId),
            O.getOrElse(constFalse)
        ),
    countryId: constTrue
};

import { readFileSync } from "fs";
import iterate from "iterare";

const input = readFileSync("./07/input.txt").toString().split("\r\n");

export type BagContents = Map<string, number>;

interface ParsedBag {
    name: string;
    contents: BagContents;
}

type BagMap = Map<string, BagContents>;

const parseBagContents = (contentsString: string): BagContents => {
    if (contentsString === "") {
        return new Map<string, number>();
    }

    const contents = contentsString
        .split(", ")
        .map((s) => s.replace(/ bags?\.?/, ""))
        .map((s) => {
            const { bagName, count } = s.match(/(?<count>\d+) (?<bagName>[\w\s]+)/iu)?.groups || {};

            return { bagName, count };
        })
        .reduce(
            (acc, curr) => acc.set(curr.bagName, Number.parseInt(curr.count)),
            new Map<string, number>()
        );

    return contents;
};

export const parseBag = (line: string): ParsedBag => {
    const { name, contents: contentsString } =
        line.match(/(?<name>[\w\s]+?) bags contain (?<contents>(\d+ [\w\s]+?[,.] ?)*)/iu)?.groups ||
        {};
    const contents = parseBagContents(contentsString);

    return { name, contents };
};

export const asMap = (bags: ParsedBag[]) => {
    const bagMap = new Map<string, BagContents>();

    bags.forEach((b) => bagMap.set(b.name, b.contents));

    return bagMap;
};

const hasParent = (bagMap: BagMap, bag: string, parent: string): boolean => {
    const bagContents = bagMap.get(bag);

    if (bagContents?.has(parent)) {
        return true;
    }

    if (bagContents?.size === 0) {
        return false;
    }

    return iterate(bagContents?.keys() || []).some((b) => hasParent(bagMap, b, parent));
};

const countChildBags = (bagMap: BagMap, bag: string): number => {
    const childBags = iterate(bagMap.get(bag)?.entries() || []);
    const childBagCount = childBags.reduce(
        (sum, [childBag, count]) => sum + count + countChildBags(bagMap, childBag) * count,
        0
    );

    return childBagCount;
};

export const solvePart1 = () => {
    const bagMap = asMap(input.map(parseBag));

    const withShinyGoldParent = iterate(bagMap.keys()).filter((b) =>
        hasParent(bagMap, b, "shiny gold")
    );

    return withShinyGoldParent.toArray().length;
};

export const solvePart2 = () => {
    const bagMap = asMap(input.map(parseBag));

    return countChildBags(bagMap, "shiny gold");
};

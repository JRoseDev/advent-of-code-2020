import { Graph, alg } from "graphlib";

import { readFileSync } from "fs";

const input = readFileSync("./07/input.txt").toString().split("\r\n");

interface BagContents {
    [key: string]: number;
}

interface Bag {
    name: string;
    contents: BagContents;
}

const parseBagContents = (contentsString: string) => {
    if (contentsString === "") {
        return {};
    }

    const contents = contentsString
        .split(", ")
        .map((s) => s.replace(/ bags?\.?/, ""))
        .map((s) => {
            const { bagName, count } = s.match(/(?<count>\d+) (?<bagName>[\w\s]+)/iu)?.groups || {};

            return { bagName, count };
        })
        .reduce((acc, curr) => ({ ...acc, [curr.bagName]: Number.parseInt(curr.count) }), {});

    return contents;
};

export const parseBag = (line: string): Bag => {
    const { name, contents: contentsString } =
        line.match(/(?<name>[\w\s]+?) bags contain (?<contents>(\d+ [\w\s]+?[,.] ?)*)/iu)?.groups ||
        {};
    const contents = parseBagContents(contentsString);

    return { name, contents };
};

export const linkBags = (bags: Bag[]) => {
    const graph = new Graph();

    graph.setNodes(bags.map((b) => b.name));

    for (const b of bags) {
        for (const [containedName, containedCount] of Object.entries(b.contents)) {
            graph.setEdge(containedName, b.name, containedCount);
        }
    }

    return graph;
};

export const solvePart1 = () => {
    const paths = alg.dijkstra(linkBags(input.map(parseBag)), "shiny gold");
    const reachableBags = Object.keys(paths).filter(
        (k) => paths[k].distance !== Number.POSITIVE_INFINITY && paths[k].distance !== 0
    );

    return reachableBags.length;
};

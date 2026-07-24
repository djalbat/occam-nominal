"use strict";

import { passUtilities } from "occam-languages";

import { every } from "../utilities/continuation";

const { nonTerminalNodeQuery } = passUtilities;

export default class ContinuationPass {
  run(node, ...remainingArguments) {
    const continuation = remainingArguments.pop();

    return this.visitNode(node, ...remainingArguments, continuation);
  }

  descend(childNodes, ...remainingArguments) {
    const continuation = remainingArguments.pop();

    return every(childNodes, (childNode, ...remainingArguments) => {
      const continuation = remainingArguments.pop(),
            node = childNode; ///

      return this.visitNode(node, ...remainingArguments, continuation);
    }, ...remainingArguments, continuation);
  }

  visitNode(node, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          nodeTerminalNode = node.isTerminalNode();

    if (nodeTerminalNode) {
      const terminalNode = node;  ///

      return this.visitTerminalNode(terminalNode, ...remainingArguments, continuation);
    }

    const nonTerminalNode = node;  ///

    return this.visitNonTerminalNode(nonTerminalNode, ...remainingArguments, continuation);
  }

  visitTerminalNode(terminalNode, ...remainingArguments) {
    const visited = true,
          continuation = remainingArguments.pop();

    return continuation(visited, ...remainingArguments);
  }

  visitNonTerminalNode(nonTerminalNode, ...remainingArguments) {
    const continuation = remainingArguments.pop();

    let { maps } = this.constructor;

    maps = [ ///
      ...maps,
      {
        nodeQuery: nonTerminalNodeQuery,
        run: (node, ...remainingArguments) => {
          const continuation = remainingArguments.pop(),
                childNodes = nonTerminalNode.getChildNodes();

          return this.descend(childNodes, ...remainingArguments, continuation);
        }
      }
    ];

    let node;

    const map = maps.find((map) => {
      const { nodeQuery } = map;

      node = nodeQuery(nonTerminalNode);

      if (node !== null) {
        return true;
      }
    }) || null;

    if (map === null) {
      const visited = false;

      return visited;
    }

    const { run } = map;

    return run(node, ...remainingArguments, continuation);
  }
}

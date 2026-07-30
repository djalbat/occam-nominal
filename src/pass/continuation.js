"use strict";

import { passUtilities } from "occam-languages";

import { every } from "../utilities/continuation";

const { nonTerminalNodeQuery } = passUtilities;

export default class ContinuationPass {
  run(node, ...remainingArguments) {
    let success = false;

    const continuation = remainingArguments.pop(),
          visited = this.visitNode(node, ...remainingArguments, continuation);

    if (visited) {
      success = true;
    }

    return success;
  }

  descend(childNodes, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          descended = every(childNodes, (childNode, ...remainingArguments) => {
            const continuation = remainingArguments.pop(),
                  node = childNode; ///

            return this.visitNode(node, ...remainingArguments, continuation);
          }, ...remainingArguments, continuation);

    return descended;
  }

  visitNode(node, ...remainingArguments) {
    let visited;

    const continuation = remainingArguments.pop(),
          nodeTerminalNode = node.isTerminalNode();

    if (nodeTerminalNode) {
      const terminalNode = node;  ///

      visited = this.visitTerminalNode(terminalNode, ...remainingArguments, continuation);
    } else {
      const nonTerminalNode = node;  ///

      visited = this.visitNonTerminalNode(nonTerminalNode, ...remainingArguments, continuation);
    }

    return visited;
  }

  visitTerminalNode(terminalNode, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          visited = continuation(...remainingArguments);

    return visited;
  }

  visitNonTerminalNode(nonTerminalNode, ...remainingArguments) {
    let visited = false;

    const continuation = remainingArguments.pop();

    let { maps } = this.constructor;

    maps = [ ///
      ...maps,
      {
        nodeQuery: nonTerminalNodeQuery,
        run: (nonTerminalNode, ...remainingArguments) => {
          let success = false;

          const continuation = remainingArguments.pop(),
                childNodes = nonTerminalNode.getChildNodes(),
                descended = this.descend(childNodes, ...remainingArguments, continuation);

          if (descended) {
            success = true;
          }

          return success;
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

    if (map !== null) {
      const { run } = map,
            success = run(node, ...remainingArguments, continuation);

      if (success) {
        visited = true;
      }
    }

    return visited;
  }
}

"use strict";

import { passUtilities } from "occam-languages";

import { every } from "../utilities/continuation";

const { nonTerminalNodeQuery, areChildNodesCongruent } = passUtilities;

export default class ContinuationZipPass {
  run(generalNode, specificNode, ...remainingArguments) {
    const continuation = remainingArguments.pop();

    return this.visitNode(generalNode, specificNode, ...remainingArguments, continuation);
  }

  descend(generalChildNodes, specificChildNodes, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          childNodesCongruent = areChildNodesCongruent(generalChildNodes, specificChildNodes);

    if (!childNodesCongruent) {
      const descended = false;

      return descended;
    }

    let index = -1;

    return every(generalChildNodes, (generalChildNode, ...remainingArguments) => {
      index++;

      const continuation = remainingArguments.pop(),
            specificChildNode = specificChildNodes[index],
            generalNode = generalChildNode, ///
            specificNode = specificChildNode; ///

      return this.visitNode(generalNode, specificNode, ...remainingArguments, continuation);
    }, ...remainingArguments, continuation);
  }

  visitNode(generalNode, specificNode, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          generalNodeTerminalNode = generalNode.isTerminalNode(),
          specificNodeTerminalNode = specificNode.isTerminalNode(),
          generalNodeNonTerminalNode = generalNode.isNonTerminalNode(),
          specificNodeNonTerminalNode = specificNode.isNonTerminalNode();
    
    if (generalNodeTerminalNode && specificNodeTerminalNode) {
      const generalTerminalNode = generalNode,  ///
            specificTerminalNode = specificNode;  ///

      return this.visitTerminalNode(generalTerminalNode, specificTerminalNode, ...remainingArguments, continuation);
    }

    if (generalNodeNonTerminalNode && specificNodeNonTerminalNode) {
      const generalNonTerminalNode = generalNode,  ///
            specificNonTerminalNode = specificNode; ///

      return this.visitNonTerminalNode(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments, continuation);
    }

    const visited = false;

    return visited;
  }

  visitTerminalNode(generalTerminalNode, specificTerminalNode, ...remainingArguments) { ///
    const visited = true,
          continuation = remainingArguments.pop();

    return continuation(visited, ...remainingArguments);
  }

  visitNonTerminalNode(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    const continuation = remainingArguments.pop();

    let { maps } = this.constructor;

    maps = [ ///
      ...maps,
      {
        generalNodeQuery: nonTerminalNodeQuery,
        specificNodeQuery: nonTerminalNodeQuery,
        run: (generalNode, specificNode, ...remainingArguments) => {
          const continuation = remainingArguments.pop(),
                generalNonTerminalNodeRuleName = generalNonTerminalNode.getRuleName(), ///
                specificNonTerminalNodeRuleName = specificNonTerminalNode.getRuleName(); ///

          if (generalNonTerminalNodeRuleName !== specificNonTerminalNodeRuleName) {
            const visited = false;

            return visited;
          }

          const generalNonTerminalNodeChildNodes = generalNonTerminalNode.getChildNodes(),
                specificNonTerminalNodeChildNodes = specificNonTerminalNode.getChildNodes(),
                generalChildNodes = generalNonTerminalNodeChildNodes, ///
                specificChildNodes = specificNonTerminalNodeChildNodes; ///

          return this.descend(generalChildNodes, specificChildNodes, ...remainingArguments, continuation);
        }
      }
    ];

    let generalNode,
        specificNode;

    const map = maps.find((map) => {
      const { generalNodeQuery, specificNodeQuery } = map;

      generalNode = generalNodeQuery(generalNonTerminalNode);
      specificNode = specificNodeQuery(specificNonTerminalNode);

      if ((generalNode !== null) && (specificNode !== null)) {
        return true;
      }
    }) || null;

    if (map === null) {
      const visited = false;

      return visited;
    }

    const { run } = map;

    return run(generalNode, specificNode, ...remainingArguments, continuation);
  }
}

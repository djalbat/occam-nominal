"use strict";

import { passUtilities } from "occam-languages";

const { nonTerminalNodeQuery, areChildNodesCongruent } = passUtilities;

export default class ZipPass {
  run(generalNode, specificNode, ...remainingArguments) {
    let success = false;

    const visited = this.visitNode(generalNode, specificNode, ...remainingArguments);

    if (visited) {
      success = true;
    }

    return success;
  }

  descend(generalChildNodes, specificChildNodes, ...remainingArguments) {
    let descended = false;

    const childNodesCongruent = areChildNodesCongruent(generalChildNodes, specificChildNodes);

    if (childNodesCongruent) {
      const matches = match(generalChildNodes, specificChildNodes, (generalChildNode, specificChildNode, ...remainingArguments) => {
        const generalNode = generalChildNode, ///
              specificNode = specificChildNode, ///
              visited = this.visitNode(generalNode, specificNode, ...remainingArguments);

        if (visited) {
          return true;
        }
      }, ...remainingArguments);

      if (matches) {
        descended = true;
      }
    }

    return descended;
  }

  visitNode(generalNode, specificNode, ...remainingArguments) {
    let visited = false;

    const generalNodeTerminalNode = generalNode.isTerminalNode(),
          specificNodeTerminalNode = specificNode.isTerminalNode(),
          generalNodeNonTerminalNode = generalNode.isNonTerminalNode(),
          specificNodeNonTerminalNode = specificNode.isNonTerminalNode();

    if (generalNodeTerminalNode && specificNodeTerminalNode) {
      const generalTerminalNode = generalNode,  ///
            specificTerminalNode = specificNode;  ///

      visited = this.visitTerminalNode(generalTerminalNode, specificTerminalNode, ...remainingArguments);
    }

    if (generalNodeNonTerminalNode && specificNodeNonTerminalNode) {
      const generalNonTerminalNode = generalNode,  ///
            specificNonTerminalNode = specificNode; ///

      visited = this.visitNonTerminalNode(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments);
    }

    return visited;
  }

  visitTerminalNode(generalTerminalNode, specificTerminalNode, ...remainingArguments) { ///
    const visited = true;

    return visited;
  }

  visitNonTerminalNode(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    let visited = false;

    let { maps } = this.constructor;

    maps = [ ///
      ...maps,
      {
        generalNodeQuery: nonTerminalNodeQuery,
        specificNodeQuery: nonTerminalNodeQuery,
        run: (generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) => {
          let success = false;

          const generalNonTerminalNodeRuleName = generalNonTerminalNode.getRuleName(), ///
                specificNonTerminalNodeRuleName = specificNonTerminalNode.getRuleName(); ///

          if (generalNonTerminalNodeRuleName === specificNonTerminalNodeRuleName) {
            const generalNonTerminalNodeChildNodes = generalNonTerminalNode.getChildNodes(),
                  specificNonTerminalNodeChildNodes = specificNonTerminalNode.getChildNodes(),
                  generalChildNodes = generalNonTerminalNodeChildNodes, ///
                  specificChildNodes = specificNonTerminalNodeChildNodes,
                  descended = this.descend(generalChildNodes, specificChildNodes, ...remainingArguments);

            if (descended) {
              success = true;
            }
          }

          return success;
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

    if (map !== null) {
      const { run } = map,
            success = run(generalNode, specificNode, ...remainingArguments);

      if (success) {
        visited = true;
      }
    }

    return visited;
  }
}

function match(arrayA, arrayB, callback, ...remainingArguments) {
  let matches = false;

  const arrayALength = arrayA.length,
        arrayBLength = arrayB.length;

  if (arrayALength === arrayBLength) {
    matches = arrayA.every((elementA, index) => {
      const elementB = arrayB[index],
            passed = callback(elementA, elementB, ...remainingArguments);

      if (passed) {
        return true;
      }
    });
  }

  return matches;
}


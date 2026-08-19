"use strict";

import { passUtilities } from "occam-languages";

const { nonTerminalNodeQuery, areChildNodesCongruent } = passUtilities;

export default class ContinuationZipPass {
  run(generalNode, specificNode, ...remainingArguments) {
    let success = false;

    const continuation = remainingArguments.pop(),
          visited = this.visitNode(generalNode, specificNode, ...remainingArguments, continuation);

    if (visited) {
      success = true;
    }

    return success;
  }

  descend(generalChildNodes, specificChildNodes, ...remainingArguments) {
    let descneded = false;

    const continuation = remainingArguments.pop(),
          childNodesCongruent = areChildNodesCongruent(generalChildNodes, specificChildNodes);

    if (childNodesCongruent) {
      const matches = match(generalChildNodes, specificChildNodes, (generalChildNode, specificChildNode, ...remainingArguments) => {
        const continuation = remainingArguments.pop(),
              generalNode = generalChildNode, ///
              specificNode = specificChildNode; ///

        return this.visitNode(generalNode, specificNode, ...remainingArguments, continuation);
      }, ...remainingArguments, continuation);

      if (matches) {
        descneded = true;
      }
    }

    return descneded;
  }

  visitNode(generalNode, specificNode, ...remainingArguments) {
    let visited = false;

    const continuation = remainingArguments.pop(),
          generalNodeTerminalNode = generalNode.isTerminalNode(),
          specificNodeTerminalNode = specificNode.isTerminalNode(),
          generalNodeNonTerminalNode = generalNode.isNonTerminalNode(),
          specificNodeNonTerminalNode = specificNode.isNonTerminalNode();
    
    if (generalNodeTerminalNode && specificNodeTerminalNode) {
      const generalTerminalNode = generalNode,  ///
            specificTerminalNode = specificNode;  ///

      visited = this.visitTerminalNode(generalTerminalNode, specificTerminalNode, ...remainingArguments, continuation);
    }

    if (generalNodeNonTerminalNode && specificNodeNonTerminalNode) {
      const generalNonTerminalNode = generalNode,  ///
            specificNonTerminalNode = specificNode; ///

      visited = this.visitNonTerminalNode(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments, continuation);
    }

    return visited;
  }

  visitTerminalNode(generalTerminalNode, specificTerminalNode, ...remainingArguments) { ///
    const continuation = remainingArguments.pop(),
          visited = continuation(...remainingArguments);

    return visited;
  }

  visitNonTerminalNode(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    let visited = false;

    const continuation = remainingArguments.pop();

    let { maps } = this.constructor;

    maps = [ ///
      ...maps,
      {
        generalNodeQuery: nonTerminalNodeQuery,
        specificNodeQuery: nonTerminalNodeQuery,
        run: (generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) => {
          let success = false;

          const continuation = remainingArguments.pop(),
                generalNonTerminalNodeRuleName = generalNonTerminalNode.getRuleName(), ///
                specificNonTerminalNodeRuleName = specificNonTerminalNode.getRuleName(); ///

          if (generalNonTerminalNodeRuleName === specificNonTerminalNodeRuleName) {
            const generalNonTerminalNodeChildNodes = generalNonTerminalNode.getChildNodes(),
                  specificNonTerminalNodeChildNodes = specificNonTerminalNode.getChildNodes(),
                  generalChildNodes = generalNonTerminalNodeChildNodes, ///
                  specificChildNodes = specificNonTerminalNodeChildNodes, ///
                  descended = this.descend(generalChildNodes, specificChildNodes, ...remainingArguments, continuation);

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
            success = run(generalNode, specificNode, ...remainingArguments, continuation);

      if (success) {
        visited = true;
      }
    }

    return visited;
  }
}

"use strict";

import { queryUtilities, EquivalencePass } from "occam-languages";

import { findEquivalenceByTermNodes } from "../utilities/equivalences";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term");

class EquationalPass extends EquivalencePass {
  static maps = [
    {
      leftNodeQuery: termNodeQuery,  ///
      rightNodeQuery: termNodeQuery, ///
      run: (leftTermNode, rightTermNode, context) => {
        let success = false;

        if (!success) {
          const depth = Infinity,
                leftTermNodeMatchesRightTermNode = leftTermNode.match(rightTermNode, depth);

          if (leftTermNodeMatchesRightTermNode) {
            success = true;
          }
        }

        if (!success) {
          const equivalences = context.getEquivalences(),
                termNodes = [
                  leftTermNode,
                  rightTermNode
                ],
                equivalence = findEquivalenceByTermNodes(equivalences, termNodes);

          if (equivalence !== null) {
            success = true;
          }
        }

        if (!success) {
          const depth = 1,
                leftTermNodeMatchesRightTermNode = leftTermNode.match(rightTermNode, depth);

          if (leftTermNodeMatchesRightTermNode) {
            const leftNonTerminalNode = leftTermNode, ///
                  rightNonTerminalNode = rightTermNode, ///
                  leftNonTerminalNodeChildNodes = leftNonTerminalNode.getChildNodes(),
                  rightNonTerminalNodeChildNodes = rightNonTerminalNode.getChildNodes(),
                  leftChildNodes = leftNonTerminalNodeChildNodes, ///
                  rightChildNodes = rightNonTerminalNodeChildNodes, ///
                  descended = equationalPass.descend(leftChildNodes, rightChildNodes, context);

            if (descended) {
              success = true;
            }
          }
        }

        return success;
      }
    }
  ];
}

const equationalPass = new EquationalPass();

export function equateTerms(leftTerm, rightTerm, context) {
  let termsEquate;

  const leftTermNode = leftTerm.getNode(),
        rightTermNode = rightTerm.getNode(),
        leftNode = leftTermNode, ///
        rightNode = rightTermNode, ///
        success = equationalPass.run(leftNode, rightNode, context);

  termsEquate = success; ///

  return termsEquate;
}

export function equateStatements(leftStatement, rightStatement, context) {
  let statementsEquate;

  const leftStatementNode = leftStatement.getNode(),
        rightStatementNode = rightStatement.getNode(),
        leftNode = leftStatementNode, ///
        rightNode = rightStatementNode, ///
        success = equationalPass.run(leftNode, rightNode, context);

  statementsEquate = success; ///

  return statementsEquate;
}

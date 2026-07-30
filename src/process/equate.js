"use strict";

import { queryUtilities } from "occam-query";

import ZipPass from "../pass/zip";

import { findEquivalenceByTermNodes } from "../utilities/equivalences";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term");

class EquationalPass extends ZipPass {
  static maps = [
    {
      generalNodeQuery: termNodeQuery,  ///
      specificNodeQuery: termNodeQuery, ///
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
        generalNode = leftTermNode, ///
        specificNode = rightTermNode, ///
        success = equationalPass.run(generalNode, specificNode, context);

  termsEquate = success; ///

  return termsEquate;
}

export function equateStatements(leftStatement, rightStatement, context) {
  let statementsEquate;

  const leftStatementNode = leftStatement.getNode(),
        rightStatementNode = rightStatement.getNode(),
        generalNode = leftStatementNode, ///
        specificNode = rightStatementNode, ///
        success = equationalPass.run(generalNode, specificNode, context);

  statementsEquate = success; ///

  return statementsEquate;
}

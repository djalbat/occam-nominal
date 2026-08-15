"use strict";

import { queryUtilities } from "occam-query";

import ZipPass from "../pass/zip";

import { stripBracketsFromTermNode } from "../utilities/brackets";
import { findEquivalenceByTermNode } from "../utilities/equivalences";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term");

class EquationalPass extends ZipPass {
  static maps = [
    {
      generalNodeQuery: termNodeQuery,  ///
      specificNodeQuery: termNodeQuery, ///
      run: (leftTermNode, rightTermNode, context) => {
        let success = false;

        leftTermNode = stripBracketsFromTermNode(leftTermNode); ///
        rightTermNode = stripBracketsFromTermNode(rightTermNode); ///

        if (!success) {
          const equivalences = context.getEquivalences(),
                leftEquivalence = findEquivalenceByTermNode(equivalences, leftTermNode),
                rightEquivalence = findEquivalenceByTermNode(equivalences, rightTermNode);

          if (!success) {
            if ((leftEquivalence !== null) && (rightEquivalence !== null) && (leftEquivalence === rightEquivalence)) {
              success = true;
            }
          }

          if (!success) {
            if (leftEquivalence !== null) {
              success = leftEquivalence.someOtherTerm(leftTerm, (otherTerm) => {
                const leftTerm = otherTerm, ///
                      leftTermNode = leftTerm.getNode(),
                      rightTermNode = rightTerm.getNode(),
                      descended = descend(leftTermNode, rightTermNode, context);

                if (descended) {
                  return true;
                }
              });
            }
          }

          if (!success) {
            if (rightEquivalence !== null) {
              success = rightEquivalence.someOtherTerm(rightTerm, (otherTerm) => {
                const rightTerm = otherTerm, ///
                      leftTermNode = leftTerm.getNode(),
                      rightTermNode = rightTerm.getNode(),
                      descended = descend(leftTermNode, rightTermNode, context);

                if (descended) {
                  return true;
                }
              });
            }
          }
        }

        if (!success) {
          const depth = 1,
                leftTermNodeMatchesRightTermNode = leftTermNode.match(rightTermNode, depth);

          if (leftTermNodeMatchesRightTermNode) {
            const descended = descend(leftTermNode, rightTermNode, context);

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
  let termsEquate = false;

  const leftTermString = leftTerm.getString(),
        rightTermString = rightTerm.getString();

  context.trace(`Equating the '${leftTermString}' and '${rightTermString}' terms...`);

  const leftTermNode = leftTerm.getNode(),
        rightTermNode = rightTerm.getNode(),
        generalNode = leftTermNode, ///
        specificNode = rightTermNode, ///
        success = equationalPass.run(generalNode, specificNode, context);

  if (success) {
    termsEquate = true;
  }

  if (termsEquate) {
    context.debug(`...equated the '${leftTermString}' and '${rightTermString}' terms.`);
  }

  return termsEquate;
}

export function equateStatements(leftStatement, rightStatement, context) {
  let statementsEquate = false;

  const leftStatementString = leftStatement.getString(),
        rightStatementString = rightStatement.getString();

  context.trace(`Equating the '${leftStatementString}' and '${rightStatementString}' statements...`);

  const leftStatementNode = leftStatement.getNode(),
        rightStatementNode = rightStatement.getNode(),
        generalNode = leftStatementNode, ///
        specificNode = rightStatementNode, ///
        success = equationalPass.run(generalNode, specificNode, context);

  if (success) {
    statementsEquate = true;
  }

  if (statementsEquate) {
    context.debug(`...equated the '${leftStatementString}' and '${rightStatementString}' statements.`);
  }

  return statementsEquate;
}

function descend(leftTermNode, rightTermNode, context) {
  const leftNonTerminalNode = leftTermNode, ///
        rightNonTerminalNode = rightTermNode, ///
        leftNonTerminalNodeChildNodes = leftNonTerminalNode.getChildNodes(),
        rightNonTerminalNodeChildNodes = rightNonTerminalNode.getChildNodes(),
        leftChildNodes = leftNonTerminalNodeChildNodes, ///
        rightChildNodes = rightNonTerminalNodeChildNodes, ///
        descended = equationalPass.descend(leftChildNodes, rightChildNodes, context);

  return descended;
}

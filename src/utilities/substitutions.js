"use strict";

import { arrayUtilities } from "necessary";

const { compress } = arrayUtilities;

export function termFromTermAndSubstitutions(term, context) {
  const termNode = term.getNode(),
        termSingular = term.isSingular();

  if (termSingular) {
    const variableNode = termNode.getVariableNode(),
          inferredSubstitution = context.findInferredSubstitutionByVariableNode(variableNode);

    if (inferredSubstitution !== null) {
      const replacementTerm = inferredSubstitution.getReplacementTerm();

      term = replacementTerm; ///
    }
  }

  return term;
}

export function statementFromStatementAndSubstitutions(statement, context) {
  const statementNode = statement.getNode(),
        statementSingular = statement.isSingular();

  if (statementSingular) {
    const metavariableNode = statementNode.getMetavariableNode(),
          inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
      const replacementStatement = inferredSubstitution.getReplacementStatement();

      statement = replacementStatement; ///
    }
  }

  return statement;
}

export function metavariableNodesFromInferredSubstitutions(inferredSubstitutions) {
  const metavariableNodes = [];

  inferredSubstitutions.forEach((inferredSubstitution) => {
    const metavariableNode = inferredSubstitution.getMetavariableNode();

    if (metavariableNode !== null) {
      metavariableNodes.push(metavariableNode);
    }
  });

  compress(metavariableNodes, (metavariableNodeA, metavariableNodeB) => {
    const metavariableNodeAMatchesetavariableNodeB = metavariableNodeA.match(metavariableNodeB);

    if (!metavariableNodeAMatchesetavariableNodeB) {
      return true;
    }
  });

  return metavariableNodes;
}

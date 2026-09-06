"use strict";

import { arrayUtilities } from "necessary";

const { compress } = arrayUtilities;

export function termFromTermAndSubstitutions(term, context) {
  const termNode = term.getNode(),
        termSingular = term.isSingular();

  if (termSingular) {
    const variableNode = termNode.getVariableNode(),
          derivedSubstitution = context.findDerivedSubstitutionByVariableNode(variableNode);

    if (derivedSubstitution !== null) {
      const replacementTerm = derivedSubstitution.getReplacementTerm();

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
          derivedSubstitution = context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

    if (derivedSubstitution !== null) {
      const replacementStatement = derivedSubstitution.getReplacementStatement();

      statement = replacementStatement; ///
    }
  }

  return statement;
}

export function metavariableNodesFromDerivedSubstitutions(derivedSubstitutions) {
  const metavariableNodes = [];

  derivedSubstitutions.forEach((derivedSubstitution) => {
    const metavariableNode = derivedSubstitution.getMetavariableNode();

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

"use strict";

import { arrayUtilities } from "necessary";

const { compress } = arrayUtilities;

export function termFromTermAndSubstitutions(term, context) {
  if (term !== null) {
    const termNode = term.getNode(),
          termSingular = term.isSingular();

    term = null;  ///

    if (termSingular) {
      const variableNode = termNode.getVariableNode(),
            derivedSubstitution = context.findDerivedSubstitutionByVariableNode(variableNode);

      if (derivedSubstitution !== null) {
        const replacementTerm = derivedSubstitution.getReplacementTerm();

        term = replacementTerm; ///
      }
    }
  }

  return term;
}

export function frameFromFrameAndSubstitutions(frame, context) {
  if (frame !== null) {
    const frameNode = frame.getNode(),
          frameSingular = frame.isSingular();

    frame = null;  ///

    if (frameSingular) {
      const metavariableNode = frameNode.getMetavariableNode(),
            derivedSubstitution = context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

      if (derivedSubstitution !== null) {
        const replacementFrame = derivedSubstitution.getReplacementFrame();

        frame = replacementFrame; ///
      }
    }
  }

  return frame;
}

export function statementFromStatementAndSubstitutions(statement, context) {
  if (statement !== null) {
    const statementNode = statement.getNode(),
          statementSingular = statement.isSingular();

    statement = null;  ///

    if (statementSingular) {
      const metavariableNode = statementNode.getMetavariableNode(),
            derivedSubstitution = context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

      if (derivedSubstitution !== null) {
        const replacementStatement = derivedSubstitution.getReplacementStatement();

        statement = replacementStatement; ///
      }
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

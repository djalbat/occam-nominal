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
            inferredSubstitution = context.findInferredSubstitutionByVariableNode(variableNode);

      if (inferredSubstitution !== null) {
        const replacementTerm = inferredSubstitution.getReplacementTerm();

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
            inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

      if (inferredSubstitution !== null) {
        const replacementFrame = inferredSubstitution.getReplacementFrame();

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
            inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

      if (inferredSubstitution !== null) {
        const replacementStatement = inferredSubstitution.getReplacementStatement();

        statement = replacementStatement; ///
      }
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

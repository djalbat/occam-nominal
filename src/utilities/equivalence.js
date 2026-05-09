"use strict";

import { arrayUtilities } from "necessary";

const { compress } = arrayUtilities;

export function variablesFromTerm(term, context) {
  const termNode = term.getNode(),
        variableNodes = termNode.getVariableNodes(),
        variables = variableNodes.map((variableNode) => {
          const variable = context.findVariableByVariableNode(variableNode);

          return variable;
        });

  compress(variables, (variableA, variableB) => {
    const variableAComparesToVariableB = variableA.compareVariable(variableB);

    if (!variableAComparesToVariableB) {
      return true;
    }
  });

  return variables;
}

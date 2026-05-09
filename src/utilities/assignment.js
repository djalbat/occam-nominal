"use strict";

import { variableFromVariableNode } from "../utilities/element";

export function variableAssignmentFromTermAndType(term, type, context) {
  let variableAssignment = (context) => {
    ///
  };

  const termSingular = term.isSingular();

  if (termSingular) {
    const termType = term.getType(),
          termTypeEqualToType = termType.isEqualTo(type),
          termTypeSuperTypeOfType = termType.isSuperTypeOf(type);

    if (false) {
      ///
    } else if (termTypeEqualToType) {
      const termProvisional = term.isProvisional();

      if (termProvisional) {
        const type = term.getType(),
              variableNode = term.getVariableNode(),
              variable = variableFromVariableNode(variableNode, context),
              provisional = false;

        variable.setType(type);

        variable.setProvisional(provisional);

        variableAssignment = (context) => {
          const declaredVariable = variable;  ///

          context.addDeclaredVariable(declaredVariable);
        };
      }
    } else if (termTypeSuperTypeOfType) {
      const termEstablished = term.isEstablished();

      if (termEstablished) {
        const variableNode = term.getVariableNode(),
              variable = variableFromVariableNode(variableNode, context);

        variable.setType(type);

        variableAssignment = (context) => {
          const declaredVariable = variable;  ///

          context.addDeclaredVariable(declaredVariable);
        };
      }
    }
  }

  return variableAssignment;
}

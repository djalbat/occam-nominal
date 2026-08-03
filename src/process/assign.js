"use strict";

import { variableFromVariableNode } from "../utilities/element";
import { mergeEquivalences, equivalencesFromEquality } from "../utilities/equivalences";

export function equalityAssignmentFromEquality(equality, context) {
  const equalityAssignment = (context) => {
    let equivalences;

    equivalences = equivalencesFromEquality(equality, context);

    const equivalencesA = equivalences; ///

    equivalences = context.getEquivalences();

    const equivalencesB = equivalences; ///

    equivalences = mergeEquivalences(equivalencesA, equivalencesB, context);

    context.setEquivalences(equivalences);
  };

  return equalityAssignment;
}

export function leftVariableAssignmentFromEquality(equality, context) {
  const leftTerm = equality.getLeftTerm(),
        rightTerm = equality.getRightTerm(),
        rightTermType = rightTerm.getType(),
        term = leftTerm,  ///
        type = rightTermType, ///
        leftVariableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return leftVariableAssignment;
}

export function rightVariableAssignmentFromEquality(equality, context) {
  const leftTerm = equality.getLeftTerm(),
        rightTerm = equality.getRightTerm(),
        leftTermType = leftTerm.getType(),
        term = rightTerm, ///
        type = leftTermType,  ///
        rightVariableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return rightVariableAssignment;
}

export function variableAssignmentFromTypeAssertion(typeAssertion, context) {
  const term = typeAssertion.getTerm(),
        type = typeAssertion.getType(),
        variableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return variableAssignment;
}

export function variableAssignmentFromPrepertyAssertion(propertyAssertion, context) {
  const subjectTerm = propertyAssertion.getSubjectTerm(),
        propertyType = propertyAssertion.getPropertyType(),
        term = subjectTerm, ///
        type = propertyType,  ///
        variableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return variableAssignment;
}

function variableAssignmentFromTermAndType(term, type, context) {
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

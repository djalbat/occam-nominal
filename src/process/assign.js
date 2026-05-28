"use strict";

import { variableAssignmentFromTermAndType } from "../utilities/assignment";

export function equalityAssignmentFromEquality(equality, context) {
  const equalityAssignment = (context) => {
    context.addEquality(equality);
  };

  return equalityAssignment;
}

export function leftVariableAssignmentFromEquality(equality, context) {
  const leftTerm = equality.getLeftTerm(),
        type = equality.getType(),
        term = leftTerm,  ///
        leftVariableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return leftVariableAssignment;
}

export function rightVariableAssignmentFromEquality(equality, context) {
  const rightTerm = equality.getRightTerm(),
        type = equality.getType(),
        term = rightTerm, ///
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

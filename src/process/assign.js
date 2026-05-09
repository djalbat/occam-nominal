"use strict";

import { variableAssignmentFromTermAndType } from "../utilities/assignment";

export function equalityAssignmentFromEquality(equality, context) {
  const equalityAssignment = (context) => {
    context.addEquality(equality);
  };

  return equalityAssignment;
}

export function judgementAssignmentFromJudgement(judgement, context) {
  const judgementAssignment = (context) => {
    const declaredJudgement = judgement;  ///

    context.addDeclaredJudgement(declaredJudgement);
  };

  return judgementAssignment;
}

export function leftVariableAssignmentFromEquality(equality, context) {
  const type = equality.getType(),
        leftTerm = equality.getLeftTerm(),
        leftVariableAssignment = variableAssignmentFromTermAndType(leftTerm, type, context);

  return leftVariableAssignment;
}

export function rightVariableAssignmentFromEquality(equality, context) {
  const type = equality.getType(),
        rightTerm = equality.getRightTerm(),
        rightVariableAssignment = variableAssignmentFromTermAndType(rightTerm, type, context);

  return rightVariableAssignment;
}

export function variableAssignmentFromTypeAssertion(typeAssertion, context) {
  const term = typeAssertion.getTerm(),
        type = typeAssertion.getType(),
        variableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return variableAssignment;
}

export function variableAssignmentFromPrepertyAssertion(propertyAssertion, context) {
  const term = propertyAssertion.getTerm(),
        type = propertyAssertion.getType(),
        variableAssignment = variableAssignmentFromTermAndType(term, type, context);

  return variableAssignment;
}

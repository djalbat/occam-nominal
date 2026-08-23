"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { equateTerms } from "../process/equate";
import { instantiate } from "../utilities/context";
import { instantiateEquality } from "../process/instantiate";
import { equalityFromStatementNode } from "../utilities/element";
import { isDerived, isDeclared, isTransient } from "../utilities/state";
import { equalityAssignmentFromEquality, leftVariableAssignmentFromEquality, rightVariableAssignmentFromEquality } from "../process/assign";

const { all, exists } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Equality extends Element {
  constructor(context, string, node, breakPoint, negated, leftTerm, rightTerm) {
    super(context, string, node, breakPoint);

    this.negated = negated;
    this.leftTerm = leftTerm;
    this.rightTerm = rightTerm;
  }

  isNegated() {
    return this.negated;
  }

  getLeftTerm() {
    return this.leftTerm;
  }

  getRightTerm() {
    return this.rightTerm;
  }

  getEqualityNode() {
    const node = this.getNode(),
          equalityNde = node; ///

    return equalityNde;
  }

  getLeftTermNode() {
    const leftTermNode = this.leftTerm.getNode();

    return leftTermNode;
  }

  getRightTermNode() {
    const rightTermNode = this.rightTerm.getNode();

    return rightTermNode;
  }

  getTerms() {
    const terms = [
      this.leftTerm,
      this.rightTerm
    ];

    return terms;
  }

  matchEqualityNode(equalityNode) {
    const node = equalityNode, ///
          nodeMatches = this.matchNode(node),
          equalityNodeMatches = nodeMatches; ///

    return equalityNodeMatches;
  }

  isEqualTo(equality) {
    const equalityNode = equality.getNode(),
          equalityNodeMatches = this.matchEqualityNode(equalityNode),
          equalTo = equalityNodeMatches;  ///

    return equalTo;
  }

  findEquality(context) {
    const equalityNode = this.getEqualityNode(),
          equality = context.findEqualityByEqualityNode(equalityNode);

    return equality;
  }

  validate(state, context, forward, back) {
    let equality;

    const equalityString = this.getString();  ///

    context.trace(`Validating the '${equalityString}' equality...`);

    equality = this.findEquality(context);

    if (equality !== null) {
      context.debug(`The '${equalityString}' equality is already present.`);

      return forward(equality, context, back);
    }

    const validateTerms = this.validateTerms.bind(this);

    return all([
      validateTerms
    ], state, context, (state, context, back) => {
      const validateWhenDeclared = this.validateWhenDeclared.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenDeclared,
        validateWhenDerived
      ], state, context, (state, context, back) => {
        equality = this; ///

        this.assign(state, context);

        context.addEquality(equality);

        context.debug(`...validated the '${equalityString}equality.`);

        return forward(equality, context, back);
      }, back);
    }, back);

  }

  validateTerms(state, context, forward, back) {
    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' equality's terms...`);

    return this.leftTerm.validate(state, context, (leftTerm, context, back) => {
      return this.rightTerm.validate(state, context, (rightTerm, context, back) => {
        const leftTermType = leftTerm.getType(),
              rightTermType = rightTerm.getType(),
              leftTermTypeBaseType = leftTermType.isBaseType(),
              rightTermTypeBaseType = rightTermType.isBaseType(),
              leftTermTypeJoinedToRightTermType = leftTermType.isJoinedTo(rightTermType);

        if (!leftTermTypeBaseType && !rightTermTypeBaseType && !leftTermTypeJoinedToRightTermType) {
          return back();
        }

        this.leftTerm = leftTerm;

        this.rightTerm = rightTerm;

        context.debug(`...validated the '${equalityString}' equality's terms.`);

        return forward(state, context, back);
      }, back);
    }, back);
  }

  validateWhenDeclared(state, context, forward, back) {
    const declared = isDeclared(state);

    if (!declared) {
      return back();
    }

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' declared equality...`);

    context.debug(`...validated the '${equalityString}' declared equality.`);

    return forward(state, context, back);
  }

  validateWhenDerived(state, context, forward, back) {
    const derived = isDerived(state);

    if (!derived) {
      return back();
    }

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' derived equality...`);

    const termsEquate = equateTerms(this.leftTerm, this.rightTerm, context);

    if ((this.negated && termsEquate) || (!this.negated && !termsEquate)) {
      return back();
    }

    context.debug(`...validated the '${equalityString}' derived equality.`);

    return forward(state, context, back);
  }

  assign(state, context) {
    const transient = isTransient(state);

    if (transient) {
      return;
    }

    const negated = this.isNegated();

    if (negated) {
      return;
    }

    const equality = this;  ///

    const equalityAssignment = equalityAssignmentFromEquality(equality, context);

    context.addAssignment(equalityAssignment);

    const derived = isDerived(state);

    if (derived) {
      return;
    }

    const leftVariableAssignment = leftVariableAssignmentFromEquality(equality, context),
          rightVariableAssignment = rightVariableAssignmentFromEquality(equality, context);

    context.addAssignment(leftVariableAssignment);

    context.addAssignment(rightVariableAssignment);
  }

  toJSON() {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    return json;
  }

  static name = "Equality";

  static fromJSON(json, context) {
    let equality;

    instantiate((context) => {
      const { string } = json,
            equalityNode = instantiateEquality(string, context),
            node = equalityNode,  ///
            breakPoint = breakPointFromJSON(json),
            negated = negatedFromEqualityNode(equalityNode, context),
            leftTerm = leftTermFromEqualityNode(equalityNode, context),
            rightTerm = rightTermFromEqualityNode(equalityNode, context);

      context = null;

      equality = new Equality(context, string, node, breakPoint, negated, leftTerm, rightTerm);
    }, context);

    return equality;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          equality = equalityFromStatementNode(statementNode, context);

    return equality;
  }
});

function negatedFromEqualityNode(equalityNode, context) {
  const negated = equalityNode.isNegated();

  return negated;
}

function leftTermFromEqualityNode(equalityNode, context) {
  const leftTermNode = equalityNode.getLeftTermNode(),
        leftTerm = context.findTermByTermNode(leftTermNode);

  return leftTerm;
}

function rightTermFromEqualityNode(equalityNode, context) {
  const rightTermNode = equalityNode.getLeftTermNode(),
        rightTerm = context.findTermByTermNode(rightTermNode);

  return rightTerm;
}

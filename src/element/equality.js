"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { equateTerms } from "../process/equate";
import { instantiate } from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { instantiateEquality } from "../process/instantiate";
import { equalityFromStatementNode } from "../utilities/element";
import { equalityAssignmentFromEquality, leftVariableAssignmentFromEquality, rightVariableAssignmentFromEquality } from "../process/assign";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  isReflexive() {
    let reflexive = false;

    if (!this.negated) {
      const leftTermEqualToRightTerm = this.leftTerm.isEqualTo(this.rightTerm);

      if (leftTermEqualToRightTerm) {
        reflexive = true;
      }
    }

    return reflexive;
  }

  findEquality(context) {
    const equalityNode = this.getEqualityNode(),
          equality = context.findEqualityByEqualityNode(equalityNode);

    return equality;
  }

  validate(context, continuation) {
    let validates;

    const equalityString = this.getString();  ///

    context.trace(`Validating the '${equalityString}' equality...`);

    let equality;

    equality = this.findEquality(context);

    if (equality !== null) {
      context.debug(`The '${equalityString}' equality is already present.`);

      validates = continuation(equality, context);
    } else {
      equality = this;

      const validateTerms = this.validateTerms.bind(this);

      validates = all([
        validateTerms
      ], context, (context) => {
        let validates;

        const validateWhenStated = this.validateWhenStated.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenStated,
          validateWhenDerived
        ], context, (context) => {
          this.assign(context);

          context.addEquality(equality);

          return continuation(equality, context);
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${equalityString}' equality.`);
    }

    return validates;
  }

  validateTerms(context, continuation) {
    let termsValidate = false;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' equality's terms...`);

    const leftTermValidates = this.leftTerm.validate(context, (leftTerm, context) => {
      const rightTermValidtes = this.rightTerm.validate(context, (rightTerm, context) => {
        let validates = false;

        const leftTermType = leftTerm.getType(),
              rightTermType = rightTerm.getType(),
              leftTermTypeBaseType = leftTermType.isBaseType(),
              rightTermTypeBaseType = rightTermType.isBaseType(),
              leftTermTypeJoinedToRightTermType = leftTermType.isJoinedTo(rightTermType);

        if (leftTermTypeBaseType || rightTermTypeBaseType || leftTermTypeJoinedToRightTermType) {
          this.leftTerm = leftTerm;

          this.rightTerm = rightTerm;

          validates = continuation(context);
        }

        return validates;
      });

      return rightTermValidtes;
    });

    if (leftTermValidates) {
      termsValidate = true;
    }

    if (termsValidate) {
      context.debug(`...validated the '${equalityString}' equality's terms.`);
    }

    return termsValidate;
  }

  validateWhenStated(context, continuation) {
    let validatesWhenStated = false;

    const stated = context.isStated();

    if (stated) {
      const equalityString = this.getString(); ///

      context.trace(`Validating the '${equalityString}' stated equality...`);

      validatesWhenStated = continuation(context);

      if (validatesWhenStated) {
        context.debug(`...validated the '${equalityString}' stated equality.`);
      }
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context, continuation) {
    let validatesWhenDerived = false;

    const stated = context.isStated();

    if (!stated) {
      const equalityString = this.getString(); ///

      context.trace(`Validating the '${equalityString}' derived equality...`);

      const termsEquate = equateTerms(this.leftTerm, this.rightTerm, context);

      if ((this.negated && !termsEquate) || (!this.negated && termsEquate)) {
        validatesWhenDerived = continuation(context);
      }

      if (validatesWhenDerived) {
        context.debug(`...validated the '${equalityString}' derived equality.`);
      }
    }

    return validatesWhenDerived;
  }

  assign(context) {
    const equality = this,  ///
          negated = this.isNegated(),
          reflexive = this.isReflexive();

    if (negated || reflexive) {
      return;
    }

    const equalityAssignment = equalityAssignmentFromEquality(equality, context),
          leftVariableAssignment = leftVariableAssignmentFromEquality(equality, context),
          rightVariableAssignment = rightVariableAssignmentFromEquality(equality, context);

    context.addAssignment(equalityAssignment);

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
    return instantiate((context) => {
      const { string } = json,
            equalityNode = instantiateEquality(string, context),
            node = equalityNode,  ///
            breakPoint = breakPointFromJSON(json),
            negated = negatedFromEqualityNode(equalityNode, context),
            leftTerm = leftTermFromEqualityNode(equalityNode, context),
            rightTerm = rightTermFromEqualityNode(equalityNode, context);

      context = null;

      const equality = new Equality(context, string, node, breakPoint, negated, leftTerm, rightTerm);

      return equality;
    }, context);
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

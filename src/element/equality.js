"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { exists } from "../utilities/continuation";
import { equateTerms } from "../process/equate";
import { instantiate } from "../utilities/context";
import { instantiateEquality } from "../process/instantiate";
import { equalityFromStatementNode } from "../utilities/element";
import { equalityAssignmentFromEquality, leftVariableAssignmentFromEquality, rightVariableAssignmentFromEquality } from "../process/assign";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Equality extends Element {
  constructor(context, string, node, breakPoint, leftTerm, rightTerm) {
    super(context, string, node, breakPoint);

    this.leftTerm = leftTerm;
    this.rightTerm = rightTerm;
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

  getType() {
    let type;

    const leftTermType = this.leftTerm.getType(),
          rightTermType = this.rightTerm.getType(),
          leftTermTypeEqualToOrSubTypeOfRightTermType = leftTermType.isEqualToOrSubTypeOf(rightTermType),
          rightTermTypeEqualToOrSubTypeOfLeftTermType = rightTermType.isEqualToOrSubTypeOf(leftTermType);

    if (leftTermTypeEqualToOrSubTypeOfRightTermType) {
      type = leftTermType;  ///
    }

    if (rightTermTypeEqualToOrSubTypeOfLeftTermType) {
      type = rightTermType; ///
    }

    return type;
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

  isReflexive() {
    const leftTermString = this.leftTerm.getString(),
          rightTermString = this.rightTerm.getString(),
          reflexive = (leftTermString === rightTermString);

    return reflexive;
  }

  isEqualTo(equality) {
    const equalityNode = equality.getNode(),
          equalityNodeMatches = this.matchEqualityNode(equalityNode),
          equalTo = equalityNodeMatches;  ///

    return equalTo;
  }

  isEqual(context) {
    let equal = false;

    const termsEquate = equateTerms(this.leftTerm, this.rightTerm, context);

    if (termsEquate) {
      equal = true;
    }

    return equal;
  }

  findValidEquality(context) {
    const equalityNode = this.getEqualityNode(),
          equality = context.findEqualityByEqualityNode(equalityNode),
          validEquality = equality;  ///

    return validEquality;
  }

  validate(context, continuation) {
    let equality = null;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' equality...`);

    const validEquality = this.findValidEquality(context);

    if (validEquality !== null) {
      const equality = validEquality; ///

      context.debug(`...the '${equalityString}' equality is already valid.`);

      continuation(equality);

      return;
    }

    this.validateTerms(context, (termsValidate) => {
      if (!termsValidate) {
        const equality = null;

        continuation(equality);

        return;
      }

      const validatesWhenStated = this.validateWhenStated.bind(this),
            validatesWhenDerived = this.validateWhenDerived.bind(this);

      exists([
        validatesWhenStated,
        validatesWhenDerived
      ], context, (validates) => {
        let equqlity = null;

        if (validates) {
          equality = this;  ///

          this.assign(context);

          context.addEquality(equality);
        }

        if (validates) {
          context.debug(`...validated the '${equalityString}' equality.`);
        }

        continuation(equqlity);
      });
    });
  }

  validateTerms(context, continuation) {
    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' equality's terms...`);

    this.leftTerm.validate(context, (leftTerm, context) => {
      if (leftTerm === null) {
        const termsValidate = false;

        continuation(termsValidate);

        return;
      }

      this.rightTerm.validate(context, (rightTerm, context) => {
        if (rightTerm === null) {
          const termsValidate = false;

          continuation(termsValidate);

          return;
        }

        let termsValidate = false;

        const leftTermType = leftTerm.getType(),
              rightTermType = rightTerm.getType(),
              leftTermTypeEqualToSubTypeOrSuperTypeOfRightTermType = leftTermType.isEqualToSubTypeOrSuperTypeOf(rightTermType);

        if (leftTermTypeEqualToSubTypeOrSuperTypeOfRightTermType) {
          termsValidate = true;
        }

        if (termsValidate) {
          this.leftTerm = leftTerm;

          this.rightTerm = rightTerm;
        }

        if (termsValidate) {
          context.debug(`...validated the '${equalityString}' equality's terms.`);
        }

        continuation(termsValidate);
      });
    });
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      continuation(validatesWhenStated);

      return;
    }

    let validatesWhenStated;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' stated equality...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${equalityString}' stated equality.`);
    }

    continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      continuation(validatesWhenDerived);

      return;
    }

    let validatesWhenDerived;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' derived equality...`);

    validatesWhenDerived = true;  ///

    if (validatesWhenDerived) {
      context.debug(`...validated the '${equalityString}' derived equality.`);
    }

    continuation(validatesWhenDerived);
  }

  assign(context) {
    const equality = this,  ///
          equalityAssignment = equalityAssignmentFromEquality(equality, context),
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
            leftTerm = leftTermFromEqualityNode(equalityNode, context),
            rightTerm = rightTermFromEqualityNode(equalityNode, context);

      context = null;

      const equality = new Equality(context, string, node, breakPoint, leftTerm, rightTerm);

      return equality;
    }, context);
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          equality = equalityFromStatementNode(statementNode, context);

    return equality;
  }
});

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

"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { equateTerms } from "../process/equate";
import { instantiate } from "../utilities/context";
import { instantiateEquality } from "../process/instantiate";
import { equalityFromStatementNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { equalityAssignmentFromEquality, leftVariableAssignmentFromEquality, rightVariableAssignmentFromEquality } from "../process/assign";

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

  validate(context) {
    let equality = null;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' equality...`);

    let validates = false;

    const validEquality = this.findValidEquality(context);

    if (validEquality !== null) {
      validates = true;

      equality = validEquality; ///

      context.debug(`...the '${equalityString}' equality is already valid.`);
    } else {
      const termsValidate = this.validateTerms(context);

      if (termsValidate) {
        const stated = context.isStated();

        let validatesWhenStated = false,
            validatesWhenDerived = false;

        if (stated) {
          validatesWhenStated = this.validateWhenStated(context);
        } else {
          validatesWhenDerived = this.validateWhenDerived(context);
        }

        if (validatesWhenStated || validatesWhenDerived) {
          validates = true;
        }
      }

      if (validates) {
        equality = this;  ///

        this.assign(context);

        context.addEquality(equality);
      }
    }

    if (validates) {
      context.debug(`...validated the '${equalityString}' equality.`);
    }

    return equality;
  }

  validateTerms(context) {
    let termsValidate = false;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' equality's terms...`);

    let leftTerm,
        rightTerm;

    leftTerm = this.leftTerm.validate(context, (leftTerm, context) => {
        let validatesForwards = false;

        rightTerm = this.rightTerm.validate(context, (rightTerm, context) => {
          let validatesForwards = false;

          const leftTermType = leftTerm.getType(),
                rightTermType = rightTerm.getType(),
                leftTermTypeEqualToSubTypeOrSuperTypeOfRightTermType = leftTermType.isEqualToSubTypeOrSuperTypeOf(rightTermType);

          if (leftTermTypeEqualToSubTypeOrSuperTypeOfRightTermType) {
            validatesForwards = true;
          }

          return validatesForwards;
        });

        if (rightTerm !== null) {
          validatesForwards = true;
        }

        return validatesForwards;
      });

    if (leftTerm !== null) {
      this.leftTerm = leftTerm;

      this.rightTerm = rightTerm;

      termsValidate = true;
    }

    if (termsValidate) {
      context.debug(`...validated the '${equalityString}' equality's terms.`);
    }

    return termsValidate;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' stated equality...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${equalityString}' stated equality.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const equalityString = this.getString(); ///

    context.trace(`Validating the '${equalityString}' derived equality...`);

    validatesWhenDerived = true;  ///

    if (validatesWhenDerived) {
      context.debug(`...validated the '${equalityString}' derived equality.`);
    }

    return validatesWhenDerived;
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

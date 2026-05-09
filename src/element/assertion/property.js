"use strict";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { variableAssignmentFromPrepertyAssertion } from "../../process/assign";
import { termFromPropertyAssertionNode, propertyAssertionFromStatementNode, propertyRelationFromPropertyAssertionNode } from "../../utilities/element";

export default define(class PropertyAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, propertyRelation) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.propertyRelation = propertyRelation;
  }

  getTerm() {
    return this.term;
  }

  getPropertyRelation() {
    return this.propertyRelation;
  }

  getPropertyAssertionNode() {
    const node = this.getNode(),
          propertyAssertionNode = node; ///

    return propertyAssertionNode;
  }

  getType() { return this.propertyRelation.getType(); }

  compareTermAndPropertyRelation(term, propertyRelation, context) {
    let comparesToTermAndPropertyRelation = false;

    const termString = term.getString(),
          propertyRelationString = propertyRelation.getString(),
          propertyAssertionString = this.getString(); ///

    context.trace(`Comparing the '${propertyAssertionString}' property assertion to the '${termString}' term and '${propertyRelationString}' property relation...`);

    const termA = term,
          termB = this.term, ///
          termAEqualToTermB = termA.isEqualTo(termB);

    if (termAEqualToTermB) {
      const propertyRelationEqualToPropertyRelation = this.propertyRelation.isEqualTo(propertyRelation);

      comparesToTermAndPropertyRelation = propertyRelationEqualToPropertyRelation;  ///
    }

    if (comparesToTermAndPropertyRelation) {
      context.debug(`...compared the '${propertyAssertionString}' property assertion to the '${termString}' term and '${propertyRelationString}' property relation.`);
    }

    return comparesToTermAndPropertyRelation;
  }

  validate(context) {
    let propertyAssertion = null;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion...`);

    let validates = false;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion) {
      validates = true;

      propertyAssertion = validAssertion; ///

      context.debug(`...the '${propertyAssertionString}' property assertion is already valid.`);
    } else {
      const propertyRelationVerifies = this.validatePropertyRelation(context);

      if (propertyRelationVerifies) {
        const termValidates = this.validateTerm(context);

        if (termValidates) {
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
      }

      if (validates) {
        const assertion = this; ///

        propertyAssertion = assertion;  ///

        this.assign(context);

        context.addAssertion(assertion);
      }
    }

    if (validates) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion.`);
    }

    return propertyAssertion;
  }

  validateTerm(context) {
    let termValidates = false;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion's term...`);

    const type = this.getType(),
          term = this.term.validate(context, (term, context) => {
            let validatesForwards = false;

            const termType = term.getType(),
                  termTypeEqualToSubTypeOrSuperTypeOfType = termType.isEqualToSubTypeOrSuperTypeOf(type);

            if (termTypeEqualToSubTypeOrSuperTypeOfType) {
              validatesForwards = true;
            }

            return validatesForwards;
          });

    if (term !== null) {
      this.term = term;

      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion's term...`);
    }

    return termValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' stated property assertion...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...verified the '${propertyAssertionString}' stated property assertion.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' derived property assertion...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...validated the '${propertyAssertionString}' derived property assertion.`);
    }

    return validatesWhenDerived;
  }

  validatePropertyRelation(context) {
    let propertyRelationValidates = false;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion's property relation...`);

    const propertyRelation = this.propertyRelation.validate(context);

    if (propertyRelation !== null) {
      propertyRelationValidates = true;
    }

    if (propertyRelationValidates) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion's property relation.`);
    }

    return propertyRelationValidates;
  }

  assign(context) {
    const stated = context.isStated();

    if (!stated) {
      return;
    }

    const propertyAssertion = this, ///
          variableAssigment = variableAssignmentFromPrepertyAssertion(propertyAssertion, context);

    context.addAssignment(variableAssigment);
  }

  static name = "PropertyAssertion";

  static fromJSON(json, context) {
    let propertyAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              propertyAssertionNode = instantiatePropertyAssertion(string, context),
              node = propertyAssertionNode,  ///
              breakPoint = breakPointFromJSON(json),
              term = termFromPropertyAssertionNode(propertyAssertionNode, context),
              propertyRelation = propertyRelationFromPropertyAssertionNode(propertyAssertionNode, context);

        context = null;

        propertyAssertion = new PropertyAssertion(context, string, node, breakPoint, term, propertyRelation);
      }, context);
    }

    return propertyAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          propertyAssertion = propertyAssertionFromStatementNode(statementNode, context);

    return propertyAssertion;
  }
});

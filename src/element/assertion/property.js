"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { variableAssignmentFromPrepertyAssertion } from "../../process/assign";
import { propertyAssertionFromStatementNode, subjectTermFromPropertyAssertionNode, propertyTermFromPropertyAssertionNode } from "../../utilities/element";

const { breakable } = continuationUtilities,
      { breakPointFromJSON } = breakPointUtilities;

export default define(class PropertyAssertion extends Assertion {
  constructor(context, string, node, breakPoint, subjectTerm, propertyTerm) {
    super(context, string, node, breakPoint);

    this.subjectTerm = subjectTerm;
    this.propertyTerm = propertyTerm;
  }

  getSubjectTerm() {
    return this.subjectTerm;
  }

  getPropertyTerm() {
    return this.propertyTerm;
  }

  getPropertyAssertionNode() {
    const node = this.getNode(),
          propertyAssertionNode = node; ///

    return propertyAssertionNode;
  }

  getPropertyType() {
    const propertyTermType = this.propertyTerm.getType(),
          propertyType = propertyTermType;  ///

    return propertyType;
  }

  async validate(context) {
    let propertyAssertion = null;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion...`);

    let validates = false;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion !== null) {
      validates = true;

      propertyAssertion = validAssertion; ///

      context.debug(`...the '${propertyAssertionString}' property assertion is already valid.`);
    } else {
      const termsValidate = await this.validateTerms(context);

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

  async validateTerms(context) {
    let termsValidate = false;

    const proofAssertionString = this.getString(); ///

    context.trace(`Validating the '${proofAssertionString}' proof assertion's terms...`);

    let subjectTerm,
        propertyTerm;

    propertyTerm = await this.propertyTerm.validateAsProperty(context, async (propertyTerm, context) => {
      let validatesForwards = false;

      subjectTerm = await this.subjectTerm.validate(context, async (subjectTerm, context) => {
        let validatesForwards = false;

        const subjectTermType = subjectTerm.getType(),
              propertyTermType = propertyTerm.getType(),
              subjectTermTypeEqualToSubTypeOrSuperTypeOfPropertyTermType = subjectTermType.isEqualToSubTypeOrSuperTypeOf(propertyTermType);

        if (subjectTermTypeEqualToSubTypeOrSuperTypeOfPropertyTermType) {
          validatesForwards = true;
        }

        return validatesForwards;
      });

      if (subjectTerm !== null) {
        validatesForwards = true;
      }

      return validatesForwards;
    });

    if (propertyTerm !== null) {
      this.subjectTerm = subjectTerm;

      this.propertyTerm = propertyTerm;

      termsValidate = true;
    }

    if (termsValidate) {
      context.debug(`...validated the '${proofAssertionString}' proof assertion's terms.`);
    }

    return termsValidate;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' stated property assertion...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${typeAssertionString}' stated property assertion.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' derived property assertion...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...validated the '${typeAssertionString}' derived property assertion.`);
    }

    return validatesWhenDerived;
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
              subjectTerm = subjectTermFromPropertyAssertionNode(propertyAssertionNode, context),
              propertyTerm = propertyTermFromPropertyAssertionNode(propertyAssertionNode, context);

        context = null;

        propertyAssertion = new PropertyAssertion(context, string, node, breakPoint, subjectTerm, propertyTerm);
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

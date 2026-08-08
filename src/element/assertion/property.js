"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { isDeclared, isTransient } from "../../utilities/state";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { variableAssignmentFromPrepertyAssertion } from "../../process/assign";
import { propertyAssertionFromStatementNode, subjectTermFromPropertyAssertionNode, propertyTermFromPropertyAssertionNode } from "../../utilities/element";
import {all, exists} from "../../utilities/continuation";

const { breakPointFromJSON } = breakPointUtilities;

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

  validate(state, context, continuation) {
    let validates;

    const propertyAssertionString = this.getString();  ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const propertyAssertion = assertion; ///

      context.debug(`The '${propertyAssertionString}' property assertion is already present.`);

      validates = continuation(propertyAssertion, context);
    } else {
      assertion = this;

      const validateTerms = this.validateTerms.bind(this);

      validates = all([
        validateTerms
      ], state, context, (state, context) => {
        let validates;

        const validateWhenDeclared = this.validateWhenDeclared.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenDeclared,
          validateWhenDerived
        ], state, context, (state, context) => {
          let validates;

          context.addAssertion(assertion);

          const propertyAssertion = assertion; ///

          validates = continuation(propertyAssertion, context);

          return validates;
        });

        return validates;
      });

      if (validates) {
        this.assign(state, context);
      }
    }

    if (validates) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion.`);
    }

    return validates;
  }

  validateTerms(context) {
    let termsValidate = false;

    const factString = this.getString(); ///

    context.trace(`Validating the '${factString}' fact's terms...`);

    let subjectTerm,
        propertyTerm;

    propertyTerm = this.propertyTerm.validateAsProperty(context, (propertyTerm, context) => {
      let validatesForwards = false;

      subjectTerm = this.subjectTerm.validate(state, context, (subjectTerm, context) => {
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
      context.debug(`...validated the '${factString}' fact's terms.`);
    }

    return termsValidate;
  }

  validateWhenDeclared(context) {
    let validateWhenDeclared;

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' declared property assertion...`);

    validateWhenDeclared = true;

    if (validateWhenDeclared) {
      context.debug(`...validated the '${typeAssertionString}' declared property assertion.`);
    }

    return validateWhenDeclared;
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

  assign(state, context) {
    const derived = isDerived(state),
          transient = isTransient(state);

    if (derived || transient) {
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

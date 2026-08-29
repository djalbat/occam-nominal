"use strict";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { isDerived, isTransient } from "../../utilities/state";
import { unifyTermWithProperties } from "../../process/validation";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { variableAssignmentFromPrepertyAssertion } from "../../process/assign";
import { propertyAssertionFromStatementNode, subjectTermFromPropertyAssertionNode, propertyTermFromPropertyAssertionNode } from "../../utilities/element";

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

        context.addAssertion(assertion);

        const propertyAssertion = assertion; ///

        validates = continuation(propertyAssertion, context);

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

  validateTerms(state, context, continuation) {
    let termsValidate = false;

    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion's terms...`);

    const subjectTermValidtes = this.subjectTerm.validate(state, context, (subjectTerm, context) => {
      const propertyTermValidates = this.validatePropertyTerm(state, context, (propertyTerm, context) => {
        let validates = false;

        const subjectTermType = subjectTerm.getType(),
              propertyTermType = propertyTerm.getType(),
              subjectTermTypeEqualToSubTypeOrSuperTypeOfPropertyTermType = subjectTermType.isEqualToSubTypeOrSuperTypeOf(propertyTermType);

        if (subjectTermTypeEqualToSubTypeOrSuperTypeOfPropertyTermType) {
          this.subjectTerm = subjectTerm;

          this.propertyTerm = propertyTerm;

          validates = continuation(state, context);
        }

        return validates;
      });

      return propertyTermValidates;
    });

    if (subjectTermValidtes) {
      termsValidate = true;
    }

    if (termsValidate) {
      context.debug(`...validated the '${propertyAssertionString}' property assertion's terms.`);
    }

    return termsValidate;
  }

  validatePropertyTerm(state, context, continuation) {
    let propertyTermValidates = false;

    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property assertion's property term...`);

    const propertyTermUnifiesWithProperties = unifyTermWithProperties(this.propertyTerm, state, context, continuation)

    if (propertyTermUnifiesWithProperties) {
      propertyTermValidates = true;
    }

    if (propertyTermValidates) {
      context.debug(`...validated the '${propertyString}' property assertion's property term.`);
    }

    return propertyTermValidates;
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

  toJSON() {
    const name = this.getName(),
          string = this.getString(),
          json = {
            name,
            string
          };

    return json;
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
              breakPoint = null,
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

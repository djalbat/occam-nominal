"use strict";

import { continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { isDerived, isTransient } from "../../utilities/state";
import { unifyTermWithProperties } from "../../process/validation";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { variableAssignmentFromPrepertyAssertion } from "../../process/assign";
import { propertyAssertionFromStatementNode, subjectTermFromPropertyAssertionNode, propertyTermFromPropertyAssertionNode } from "../../utilities/element";

const { all } = continuationUtilities;

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

  validate(state, context, forward, back) {
    let assertion;

    const propertyAssertionString = this.getString();  ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const propertyAssertion = assertion; ///

      context.debug(`The '${propertyAssertionString}' property assertion is already present.`);

      return forward(propertyAssertion, context, back);
    }

    assertion = this;

    const validateTerms = this.validateTerms.bind(this);

    return all([
      validateTerms
    ], state, context, (state, context, back) => {
      this.assign(state, context);

      context.addAssertion(assertion);

      const propertyAssertion = assertion; ///

      context.debug(`...validated the '${propertyAssertionString}' property assertion.`);

      return forward(propertyAssertion, context, back);
    }, back);
  }

  validateTerms(state, context, forward, back) {
    const propertyAssertionString = this.getString(); ///

    context.trace(`Validating the '${propertyAssertionString}' property assertion's terms...`);

    const validateSubjectTerm = this.validateSubjectTerm.bind(this),
          validatePropertyTerm = this.validatePropertyTerm.bind(this);

    return all([
      validateSubjectTerm,
      validatePropertyTerm
    ], state, context, (state, context, back) => {
      const subjectTermType = this.subjectTerm.getType(),
            propertyTermType = this.propertyTerm.getType(),
            subjectTermTypeEqualToSubTypeOrSuperTypeOfPropertyTermType = subjectTermType.isEqualToSubTypeOrSuperTypeOf(propertyTermType);

      if (!subjectTermTypeEqualToSubTypeOrSuperTypeOfPropertyTermType) {
        return back();
      }

      context.debug(`...validated the '${propertyAssertionString}' property assertion's terms.`);

      return forward(state, context, back);
    }, back);
  }

  validateSubjectTerm(state, context, forward, back) {
    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property assertion's subject term...`);

    return this.subjectTerm.validate(state, context, (subjectTerm, context, back) => {
      this.subjectTerm = subjectTerm;

      context.debug(`...validated the '${propertyString}' property assertion's subject term.`);

      return forward(state, context, back);
    }, back);
  }

  validatePropertyTerm(state, context, forward, back) {
    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property assertion's property term...`);

    return unifyTermWithProperties(this.propertyTerm, state, context, (propertyTerm, state, context, back) => {
      this.propertyTerm = propertyTerm;

      context.debug(`...validated the '${propertyString}' property assertion's property term.`);

      return forward(state, context, back);
    }, back)
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
    let json;

    const name = this.getName(),
          string = this.getString();

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

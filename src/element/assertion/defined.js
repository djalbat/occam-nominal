"use strict";

import { continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { isDerived, isDeclared } from "../../utilities/state";
import { instantiateDefinedAssertion } from "../../process/instantiate";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { definedAssertionFromStatementNode } from "../../utilities/element";
import { separateGroundedTermsAndDefinedVariables } from "../../utilities/equivalences";

const { all, exists } = continuationUtilities;

export default define(class DefinedAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, negated) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.negated = negated;
  }

  getTerm() {
    return this.term;
  }

  isNegated() {
    return this.negated;
  }

  getDefinedAssertionNode() {
    const node = this.getNode(),
          definedAssertionNode = node;  ///

    return definedAssertionNode;
  }

  validate(state, context, forward, back) {
    let assertion;

    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const definedAssertion = assertion; ///

      context.debug(`The '${definedAssertionString}' defined assertion is already present.`);

      return forward(definedAssertion, context, back);
    }

    assertion = this;

    const validateTerm = this.validateTerm.bind(this);

    return all([
      validateTerm
    ], state, context, (state, context, back) => {
      const validateWhenDeclared = this.validateWhenDeclared.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenDeclared,
        validateWhenDerived
      ], state, context, (state, context, back) => {
        const definedAssertion = assertion; ///

        context.addAssertion(assertion);

        context.debug(`...validated the '${definedAssertionString}' defined assertion.`);

        return forward(definedAssertion, context, back);
      }, back);
    }, back);
  }

  validateTerm(state, context, forward, back) {
    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion's term...`);

    const termSingular = this.term.isSingular();

    if (!termSingular) {
      const termString = this.term.getString() ///

      context.debug(`The '${termString}' term is not singular.`);

      return back();
    }

    return this.term.validate(state, context, (term, context, back) => {
      this.term = term;

      context.debug(`...validates the '${definedAssertionString}' defined assertion's term.`);

      return forward(state, context, back);
    }, back);
  }

  validateWhenDeclared(state, context, forward, back) {
    const declared = isDeclared(state);

    if (!declared) {
      return back();
    }

    const definedAssertionString = this.getString(); ///

    context.trace(`Validating the '${definedAssertionString}' declared defined assertion...`);

    context.debug(`...validated the '${definedAssertionString}' declared defined assertion.`);

    return forward(state, context, back);
  }

  validateWhenDerived(state, context, forward, back) {
    const derived = isDerived(state);

    if (!derived) {
      return back();
    }

    const definedAssertionString = this.getString(); ///

    context.trace(`Validating the '${definedAssertionString}' derived defined assertion...`);

    return validateWhenDerived(this.term, this.negated, context, (context, back) => {
      context.debug(`...validated the '${definedAssertionString}' derived defined assertion.`);

      return forward(state, context, back);
    }, back);
  }

  applyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext, ///
          definedAssertionString = this.getString(); ///

    context.trace(`Ap0lying the '${definedAssertionString}' defined assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context);

    return validateWhenDerived(term, this.negated, context, (context, back) => {
      context.debug(`...applied the '${definedAssertionString}' defined assertion independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
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

  static name = "DefinedAssertion";

  static fromJSON(json, context) {
    let definedAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              definedAssertionNode = instantiateDefinedAssertion(string, context),
              node = definedAssertionNode,  ///
              breakPoint = null,
              term = termFromJDefinedAssertionNode(definedAssertionNode, context),
              negated = negatedFromJDefinedAssertionNode(definedAssertionNode, context);

        context = null;

        definedAssertion = new DefinedAssertion(context, string, node, breakPoint, term, negated);
      }, context);
    }

    return definedAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          definedAssertion = definedAssertionFromStatementNode(statementNode, context);

    return definedAssertion;
  }
});

function isVariableDefined(variable, context) {
  const equivalences = context.getEquivalences(),
        groundedTerms = [],
        definedVariables = [];

  separateGroundedTermsAndDefinedVariables(equivalences, groundedTerms, definedVariables, context);

  const variableMatchesDefinedVariable = definedVariables.some((definedVariable) => {
          const definedVariableEqualToVariable = definedVariable.isEqualTo(variable);

          if (definedVariableEqualToVariable === variable) {
            return true;
          }
        }),
        variableDefined = variableMatchesDefinedVariable; ///

  return variableDefined;
}

function validateWhenDerived(term, negated, context, forward, back) {
  const variableIdentifier = term.getVariableIdentifier(),
        declaredDariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
        declaredDariableDefined = isVariableDefined(declaredDariable, context);

  let validatesWhenDerived = false;

  if (!negated && declaredDariableDefined) {
    validatesWhenDerived = true;
  }

  if (negated && !declaredDariableDefined) {
    validatesWhenDerived = true;
  }

  if (!validatesWhenDerived) {
    return back();
  }

  return forward(context, back);
}

function termFromJDefinedAssertionNode(definedAssertionNode, context) {
  const termNode = definedAssertionNode.getTermNode(),
        term = context.findTermByTermNode(termNode);

  return term;
}

function negatedFromJDefinedAssertionNode(definedAssertionNode, context) {
  const negated = definedAssertionNode.isNegated();

  return negated;
}

"use strict";

import { breakPointUtilities,continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { isDerived, isDeclared } from "../../utilities/state";
import { instantiateContainedAssertion } from "../../process/instantiate";
import { termFromTermAndSubstitutions, statementFromStatementAndSubstitutions } from "../../utilities/substitutions";
import { termFromContainedAssertionNode,
         negatedFromContainedAssertionNode,
         statementFromContainedAssertionNode,
         containedAssertionFromStatementNode } from "../../utilities/element";
import state from "easy/lib/mixins/state";

const { all, exists } = continuationUtilities,
      { breakPointFromJSON } = breakPointUtilities;

export default define(class ContainedAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, negated, statement) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.negated = negated;
    this.statement = statement;
  }

  getTerm() {
    return this.term;
  }

  isNegated() {
    return this.negated;
  }

  getStatement() {
    return this.statement;
  }

  getContainedAssertionNode() {
    const node = this.getNode(),
          containedAssertionNode = node;  ///

    return containedAssertionNode;
  }

  validate(state, context, forward, back) {
    let assertion;

    const containedAssertionString = this.getString();  ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const containedAssertion = assertion; ///

      context.debug(`The '${containedAssertionString}' contained assertion is already present.`);

      return forward(containedAssertion, context, back);
    }

    assertion = this; ///

    const validateTerm = this.validateTerm.bind(this),
          validateStatement = this.validateStatement.bind(this);

    all([
      validateTerm,
      validateStatement
    ], state, context, (state, context, back) => {
      const validateWhenDeclared = this.validateWhenDeclared.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      exists([
        validateWhenDeclared,
        validateWhenDerived
      ], state, context, (state, context, back) => {
        const containedAssertion = assertion; ///

        context.addAssertion(assertion);

        context.debug(`...validated the '${containedAssertionString}' contained assertion.`);

        return forward(containedAssertion, context, back);
      }, back);
    }, back);
  }

  validateTerm(state, context, forward, back) {
    const containedAssertionString = this.getString();  ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion's term...`);

    const termSingular = this.term.isSingular();

    if (!termSingular) {
      const termString = this.term.getString() ///

      context.debug(`The '${termString}' term is not singular.`);

      return back();
    }

    return this.term.validate(state, context, (term, context, back) => {
      this.term  = term;

      context.debug(`...validates the '${containedAssertionString}' contained assertion's term.`);

      return forward(state, context, back);
    }, back);
  }

  validateStatement(state, context, forward, back) {
    const containedAssertionString = this.getString();  ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion's statement...`);

    const statementSingular = this.statement.isSingular();

    if (!statementSingular) {
      const statementString = this.statement.getString() ///

      context.debug(`The '${statementString}' statement is not singular.`);

      return back();
    }

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.debug(`...validates the '${containedAssertionString}' contained assertion's statement.`);

      return forward(state, context, back);
    }, back);
  }

  validateWhenDeclared(state, context, forward, back) {
    const declared = isDeclared(state);

    if (!declared) {
      return back();
    }

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' declared contained assertion...`);

    context.debug(`...validated the '${containedAssertionString}' declared contained assertion.`);

    return forward(state, context, back);
  }

  validateWhenDerived(state, context, forward, back) {
    const derived = isDerived(state);

    if (!derived) {
      return back();
    }

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' derived contained assertion...`);

    return validateWhenDerived(this.term, this.statement, this.negated, context, (context, back) => {
      context.debug(`...validated the '${containedAssertionString}' derived contained assertion.`);

      return forward(state, context, back);
    }, back);
  }

  unifyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          containedAssertionString = this.getString(); ///

    context.trace(`Unifying the '${containedAssertionString}' contained assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context),
          statement = statementFromStatementAndSubstitutions(this.statement, context);

    return validateWhenDerived(term, statement, this.negated, context, (context, back) => {
      context.debug(`...unified the '${containedAssertionString}' contained assertion independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  static name = "ContainedAssertion";

  static fromJSON(json, context) {
    let containedAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              containedAssertionNode = instantiateContainedAssertion(string, context),
              node = containedAssertionNode,  ///
              breakPoint = breakPointFromJSON(json),
              term = termFromContainedAssertionNode(containedAssertionNode, context),
              negated = negatedFromContainedAssertionNode(containedAssertionNode, context),
              statement = statementFromContainedAssertionNode(containedAssertionNode, context);

        context = null;

        containedAssertion = new ContainedAssertion(context, string, node, breakPoint, term, negated, statement);
      }, context);
    }

    return containedAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          containedAssertion = containedAssertionFromStatementNode(statementNode, context);

    return containedAssertion;
  }
});

function validateWhenDerived(term, statement, negated, context, forward, back) {
  const termContained = statement.isTermContained(term, context);

  let validatesWhenDerived = false;

  if (!negated && termContained) {
    validatesWhenDerived = true;
  }

  if (negated && !termContained) {
    validatesWhenDerived = true;
  }

  if (!validatesWhenDerived) {
    return back();
  }

  return forward(context, back);
}
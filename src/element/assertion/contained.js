"use strict";

import { breakPointUtilities } from "occam-languages";

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

const { breakPointFromJSON } = breakPointUtilities;

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

  validate(state, context, continuation) {
    let validates;

    const containedAssertionString = this.getString();  ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const containedAssertion = assertion; ///

      context.debug(`The '${containedAssertionString}' contained assertion is already present.`);

      validates = continuation(containedAssertion, context);
    } else {
      assertion = this; ///

      const validateTerm = this.validateTerm.bind(this),
            validateStatement = this.validateStatement.bind(this);

      validates = all([
        validateTerm,
        validateStatement
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

          const containedAssertion = assertion; ///

          validates = continuation(containedAssertion, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${containedAssertionString}' contained assertion.`);
    }

    return validates;
  }

  validateTerm(state, context, continuation) {
    let termValidates;

    const containedAssertionString = this.getString();  ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion's term...`);

    const termSingular = this.term.isSingular();

    if (termSingular) {
      termValidates = this.term.validate(state, context, (term, context) => {
        let validates;

        this.term = term;

        validates = continuation(state, context);

        return validates;
      });
    } else {
      const termString = this.term.getString() ///

      termValidates = false

      context.debug(`The '${termString}' term is not singular.`);
    }

    if (termValidates) {
      context.debug(`...validates the '${containedAssertionString}' contained assertion's term.`);
    }

    return termValidates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const containedAssertionString = this.getString();  ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion's statement...`);

    const statementSingular = this.statement.isSingular();

    if (statementSingular) {
      statementValidates = this.statement.validate(state, context, (statement, context) => {
        let validates;

        this.statement = statement;

        validates = continuation(state, context);

        return validates;
      });
    } else {
      const statementString = this.statement.getString() ///

      statementValidates = false

      context.debug(`The '${statementString}' statement is not singular.`);
    }

    if (statementValidates) {
      context.debug(`...validates the '${containedAssertionString}' contained assertion's statement.`);
    }

    return statementValidates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const containedAssertionString = this.getString(); ///

      context.trace(`Validating the '${containedAssertionString}' declared contained assertion...`);

      validatesWhenDeclared = continuation(state, context);

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${containedAssertionString}' declared contained assertion.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const containedAssertionString = this.getString(); ///

      context.trace(`Validating the '${containedAssertionString}' derived contained assertion...`);

      validatesWhenDerived = validateWhenDerived(this.term, this.statement, this.negated, context, (context) => {
        continuation(state, context);
      });

      if (validatesWhenDerived) {
        context.debug(`...validated the '${containedAssertionString}' derived contained assertion.`);
      }
    }

    return validatesWhenDerived;
  }

  unifyIndependently(generalContext, specificContext, continuation) {
    let unifiesIndependently = false;

    const context = specificContext,  ///
          containedAssertionString = this.getString(); ///

    context.trace(`Unifying the '${containedAssertionString}' contained assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context),
          statement = statementFromStatementAndSubstitutions(this.statement, context);

    validateWhenDerived(term, statement, this.negated, context, (context) => {
      let validatesWhenDerived

      unifiesIndependently = true;

      validatesWhenDerived = true;

      return validatesWhenDerived;
    });

    if (unifiesIndependently) {
      context.debug(`...unified the '${containedAssertionString}' contained assertion independently.`);
    }

    return continuation(unifiesIndependently);
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

function validateWhenDerived(term, statement, negated, context, continuation) {
  let validatesWhenDerived = false;

  const termContained = statement.isTermContained(term, context);

  if (!negated && termContained) {
    validatesWhenDerived = true;
  }

  if (negated && !termContained) {
    validatesWhenDerived = true;
  }

  if (validatesWhenDerived) {
    validatesWhenDerived = continuation(context);
  }

  return validatesWhenDerived;
}
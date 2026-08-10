"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { all, exists } from "../../utilities/continuation";
import { isDerived, isDeclared } from "../../utilities/state";
import { instantiateDefinedAssertion } from "../../process/instantiate";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { separateGroundedTermsAndDefinedVariables } from "../../utilities/equivalences";
import { termFromJDefinedAssertionNode, negatedFromJDefinedAssertionNode, definedAssertionFromStatementNode } from "../../utilities/element";

const { breakPointFromJSON } = breakPointUtilities;

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

  validate(state, context, continuation) {
    let validates;

    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const definedAssertion = assertion; ///

      context.debug(`The '${definedAssertionString}' defined assertion is already present.`);

      validates = continuation(definedAssertion, context);
    } else {
      assertion = this;

      const validateTerm = this.validateTerm.bind(this);

      validates = all([
        validateTerm
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

          const definedAssertion = assertion; ///

          validates = continuation(definedAssertion, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${definedAssertionString}' defined assertion.`);
    }

    return validates;
  }

  validateTerm(state, context, continuation) {
    let termValidates;

    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion's term...`);

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
      context.debug(`...validates the '${definedAssertionString}' defined assertion's term.`);
    }

    return termValidates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const definedAssertionString = this.getString(); ///

      context.trace(`Validating the '${definedAssertionString}' declared defined assertion...`);

      validatesWhenDeclared = continuation(state, context);

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${definedAssertionString}' declared defined assertion.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const definedAssertionString = this.getString(); ///

      context.trace(`Validating the '${definedAssertionString}' derived defined assertion...`);

      validatesWhenDerived = validateWhenDerived(this.term, this.negated, context, (context) => {
        continuation(state, context);
      });

      if (validatesWhenDerived) {
        context.debug(`...validated the '${definedAssertionString}' derived defined assertion.`);
      }
    }

    return validatesWhenDerived;
  }

  unifyIndependently(generalContext, specificContext, continuation) {
    let unifiesIndependently = false;

    const context = specificContext, ///
          definedAssertionString = this.getString(); ///

    context.trace(`Unifying the '${definedAssertionString}' defined assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context);

    validateWhenDerived(term, this.negated, context, (context) => {
      let validatesWhenDerived;

      unifiesIndependently = true;

      validatesWhenDerived = true;

      return validatesWhenDerived;
    });

    if (unifiesIndependently) {
      context.debug(`...unified the '${definedAssertionString}' defined assertion independently.`);
    }

    return continuation(unifiesIndependently);
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
              breakPoint = breakPointFromJSON(json),
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

function validateWhenDerived(term, negated, context, continuation) {
  let validatesWhenDerived = false;

  const variableIdentifier = term.getVariableIdentifier(),
        declaredDariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
        declaredDariableDefined = isVariableDefined(declaredDariable, context);

  if (!negated && declaredDariableDefined) {
    validatesWhenDerived = true;
  }

  if (negated && !declaredDariableDefined) {
    validatesWhenDerived = true;
  }

  if (validatesWhenDerived) {
    validatesWhenDerived = continuation(context);
  }

  return validatesWhenDerived;
}

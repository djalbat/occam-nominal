"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { all, exists } from "../../utilities/continuation";
import { instantiateDefinedAssertion } from "../../process/instantiate";
import { separateGroundedTermsAndDefinedVariables } from "../../utilities/equivalences";
import { termFromTermAndSubstitutions, frameFromFrameAndSubstitutions } from "../../utilities/substitutions";
import { termFromJDefinedAssertionNode, frameFromJDefinedAssertionNode, negatedFromJDefinedAssertionNode, definedAssertionFromStatementNode } from "../../utilities/element";

const { breakPointFromJSON } = breakPointUtilities;

export default define(class DefinedAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, frame, negated) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.frame= frame;
    this.negated = negated;
  }

  getTerm() {
    return this.term;
  }

  getFrame() {
    return this.frame;
  }

  isNegated() {
    return this.negated;
  }

  getDefinedAssertionNode() {
    const node = this.getNode(),
          definedAssertionNode = node;  ///

    return definedAssertionNode;
  }

  validate(context, continuation) {
    const definedAssertionString = this.getString(); ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion...`);

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion !== null) {
      const definedAssertion = validAssertion;  ///

      context.debug(`...the '${definedAssertionString}' defined assertion is already valid.`);

      continuation(definedAssertion);

      return;
    }

    const validateTerm = this.validateTerm.bind(this),
          validateFrame = this.validateFrame.bind(this);

    all([
      validateTerm,
      validateFrame
    ], context, (validaets) => {
      if (!validaets) {
        const definedAssertion = null;

        continuation(definedAssertion);

        return;
      }

      const validatesWhenStated = this.validateWhenStated.bind(this),
            validatesWhenDerived = this.validateWhenDerived.bind(this);

      exists([
        validatesWhenStated,
        validatesWhenDerived
      ], context, (validates) => {
        let definedAssertion = null;

        if (validates) {
          const assertion = this; ///

          definedAssertion = assertion; ///

          context.addAssertion(assertion);
        }

        if (validates) {
          context.debug(`...validated the '${definedAssertionString}' defined assertion.`);
        }

        continuation(definedAssertion);
      });
    });
  }

  validateTerm(context, continuation) {
    if (this.term === null) {
      const termValidates = true; ///

      continuation(termValidates);

      return;
    }

    const termString = this.term.getString(), ///
          definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion's term...`);

    const termSingular = this.term.isSingular();

    if (!termSingular) {
      const termValidates = false;

      context.debug(`The '${termString}' term is not singular.`);

      continuation(termValidates);

      return;
    }

    this.term.validate(context, (term, context) => {
      let termValidates = false;

      if (term !== null) {
        this.term = term; ///

        termValidates = true;
      }

      if (termValidates) {
        context.debug(`...validates the'${definedAssertionString}' defined assertion's term.`);
      }

      continuation(termValidates);
    });
  }

  validateFrame(context, continuation) {
    if (this.frame === null) {
      const frameValidates = true;  ///

      continuation(frameValidates);

      return;
    }

    const frameString = this.frame.getString(), ///
          definedAssertionString = this.getString();  ///

    context.trace(`Validating the'${definedAssertionString}' defined assertion's '${frameString}' frame...`);

    const frameSingular = this.frame.isSingular();

    if (!frameSingular) {
      const frameValidates = false;

      context.debug(`The '${frameString}' frame is not singular.`);

      continuation(frameValidates);

      return;
    }

    this.frame.validate(context, (frame) => {
      let frameValidates = false;

      if (frame !== null) {
        this.frame = frame;

        frameValidates = true;
      }

      if (frameValidates) {
        context.debug(`...validates the'${definedAssertionString}' defined assertion's '${frameString}' frame.`);
      }

      continuation(frameValidates);
    });
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      continuation(validatesWhenStated);

      return;
    }

    let validatesWhenStated;

    const definedAssertionString = this.getString(); ///

    context.trace(`Validating the '${definedAssertionString}' stated defined assertion...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validates the '${definedAssertionString}' stated defined assertion.`);
    }

    continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      continuation(validatesWhenDerived);

      return;
    }

    const definedAssertionString = this.getString(); ///

    context.trace(`Validating the '${definedAssertionString}' derived defined assertion...`);

    validateWhenDerived(this.term, this.frame, this.negated, context, (validatesWhenDerived) => {
      if (validatesWhenDerived) {
        context.debug(`...validates the '${definedAssertionString}' derived defined assertion.`);
      }

      continuation(validatesWhenDerived);
    });
  }

  unifyIndependently(generalContext, specificContext, continuation) {
    let unifiesIndependently = false;

    const context = specificContext, ///
          definedAssertionString = this.getString(); ///

    context.trace(`Unifying the '${definedAssertionString}' defined assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context),
          frame = frameFromFrameAndSubstitutions(this.frame, context),
          validatesWhenDerived = validateWhenDerived(term, frame, this.negated, context);

    if (validatesWhenDerived) {
      unifiesIndependently = true;
    }

    if (unifiesIndependently) {
      context.debug(`...unified the '${definedAssertionString}' defined assertion independently.`);
    }

    return unifiesIndependently;
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
              frame = frameFromJDefinedAssertionNode(definedAssertionNode, context),
              negated = negatedFromJDefinedAssertionNode(definedAssertionNode, context);

        context = null;

        definedAssertion = new DefinedAssertion(context, string, node, breakPoint, term, frame, negated);
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
          const definedVariableComparesToVariable = definedVariable.compareVariable(variable);

          if (definedVariableComparesToVariable === variable) {
            return true;
          }
        }),
        variableDefined = variableMatchesDefinedVariable; ///

  return variableDefined;
}

function isMetavariableDefined(metavariable, context) {
  const steps = context.getSteps(),
        metavariableDefined = steps.some((step) => {
          const metavariableDefined = step.isMetavariableDefined(metavariable, context);

          if (metavariableDefined) {
            return true;
          }
        });

  return metavariableDefined;
}

function validateWhenDerived(term, frame, negated, context, continuation) {
  let validatesWhenDerived = false;

  if (term !== null) {
    const variableIdentifier = term.getVariableIdentifier(),
          declaredDariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
          declaredDariableDefined = isVariableDefined(declaredDariable, context);

    if (!negated && declaredDariableDefined) {
      validatesWhenDerived = true;
    }

    if (negated && !declaredDariableDefined) {
      validatesWhenDerived = true;
    }
  }

  if (frame!== null) {
    const metavariableName = frame.getMetavariableName(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName),
          declaredMetavariableDefined = isMetavariableDefined(declaredMetavariable, context);

    if (!negated && declaredMetavariableDefined) {
      validatesWhenDerived = true;
    }

    if (negated && !declaredMetavariableDefined) {
      validatesWhenDerived = true;
    }
  }

  continuation(validatesWhenDerived);
}


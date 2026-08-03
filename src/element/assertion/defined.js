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
    let validates;

    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion...`);

    let definedAssertion;

    const assertion = this.findAssertion(context);

    if (assertion !== null) {
      definedAssertion = assertion; ///

      context.debug(`The '${definedAssertionString}' defined assertion is already present.`);

      validates = continuation(definedAssertion, context);
    } else {
      definedAssertion = this;

      const validateTerm = this.validateTerm.bind(this),
            validateFrame = this.validateFrame.bind(this);

      validates = all([
        validateTerm,
        validateFrame
      ], context, (context) => {
        let validates;

        const validateWhenStated = this.validateWhenStated.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenStated,
          validateWhenDerived
        ], context, (context) => {
          let validates;

          const assertion = definedAssertion;  ///

          context.addAssertion(assertion);

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

  validateTerm(context, continuation) {
    let termValidates;

    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion's term...`);

    if (this.term !== null) {
      const termSingular = this.term.isSingular();

      if (termSingular) {
        termValidates = this.term.validate(context, (term, context) => {
          let validates;

          this.term = term;

          validates = continuation(context);

          return validates;
        });
      } else {
        const termString = this.term.getString() ///

        termValidates = false

        context.debug(`The '${termString}' term is not singular.`);
      }
    } else {
      termValidates = continuation(context);
    }

    if (termValidates) {
      context.debug(`...validates the'${definedAssertionString}' defined assertion's term.`);
    }

    return termValidates;
  }

  validateFrame(context, continuation) {
    let frameValidates;

    const definedAssertionString = this.getString();  ///

    context.trace(`Validating the '${definedAssertionString}' defined assertion's frame...`);

    if (this.frame !== null) {
      const frameSingular = this.frame.isSingular();

      if (frameSingular) {
        frameValidates = this.frame.validate(context, (frame, context) => {
          let validates;

          this.frame = frame;

          validates = continuation(context);

          return validates;
        });
      } else {
        const frameString = this.frame.getString() ///

        frameValidates = false

        context.debug(`The '${frameString}' frame is not singular.`);
      }
    } else {
      frameValidates = continuation(context);
    }

    if (frameValidates) {
      context.debug(`...validates the'${definedAssertionString}' defined assertion's frame.`);
    }

    return frameValidates;
  }

  validateWhenStated(context, continuation) {
    let validatesWhenStated = false;

    const stated = context.isStated();

    if (stated) {
      const definedAssertionString = this.getString(); ///

      context.trace(`Validating the '${definedAssertionString}' stated defined assertion...`);

      validatesWhenStated = continuation(context);

      if (validatesWhenStated) {
        context.debug(`...validated the '${definedAssertionString}' stated defined assertion.`);
      }
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context, continuation) {
    let validatesWhenDerived = false;

    const stated = context.isStated();

    if (!stated) {
      const definedAssertionString = this.getString(); ///

      context.trace(`Validating the '${definedAssertionString}' derived defined assertion...`);

      validatesWhenDerived = validateWhenDerived(this.term, this.frame, this.negated, context, continuation);

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

    const term = termFromTermAndSubstitutions(this.term, context),
          frame = frameFromFrameAndSubstitutions(this.frame, context);

    validateWhenDerived(term, frame, this.negated, context, (context) => {
      const validatesWhenDerived = true;

      unifiesIndependently = true;

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

  if (validatesWhenDerived) {
    validatesWhenDerived = continuation(context);
  }

  return validatesWhenDerived;
}

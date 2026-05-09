"use strict";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { instantiateContainedAssertion } from "../../process/instantiate";
import { termFromTermAndSubstitutions, frameFromFrameAndSubstitutions, statementFromStatementAndSubstitutions } from "../../utilities/substitutions";
import { termFromContainedAssertionNode,
         frameFromContainedAssertionNode,
         negatedFromContainedAssertionNode,
         statementFromContainedAssertionNode,
         containedAssertionFromStatementNode } from "../../utilities/element";

export default define(class ContainedAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, frame, negated, statement) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.frame = frame;
    this.negated = negated;
    this.statement = statement;
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

  getStatement() {
    return this.statement;
  }

  getContainedAssertionNode() {
    const node = this.getNode(),
          containedAssertionNode = node;  ///

    return containedAssertionNode;
  }

  validate(context) {
    let containedAssertion = null;

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion...`);

    let validates = false;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion !== null) {
      validates = true;

      containedAssertion = validAssertion;  ///

      context.debug(`...the '${containedAssertionString}' contained assertion is already valid.`);
    } else {
      const termValidates = this.validateTerm(context),
            frameValidates = this.validateFrame(context),
            statementValidates = this.validateStatement(context)

      if (termValidates || frameValidates || statementValidates) {
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

        containedAssertion = assertion;  ///

        context.addAssertion(assertion);
      }
    }

    if (validates) {
      context.debug(`...validated the '${containedAssertionString}' contained assertion.`);
    }

    return containedAssertion;
  }

  validateTerm(context) {
    let termValidates = false;

    if (this.term !== null) {
      const termString = this.term.getString(),
            containedAssertionString = this.getString(); ///

      context.trace(`Validating the '${containedAssertionString}' contained assertion's term...`);

      const termSingular = this.term.isSingular();

      if (termSingular) {
        const term = this.term.validate(context, (term, context) => {
          const validatesForwards = true;

          return validatesForwards;
        });

        if (term !== null) {
          this.term = term;

          termValidates = true;
        }

        if (termValidates) {
          context.debug(`...validated the '${containedAssertionString}' contained assertion's term.`);
        }
      } else {
        context.debug(`The '${termString}' term is not singular.`);
      }
    }

    return termValidates;
  }

  validateFrame(context) {
    let frameValidates = false;

    if (this.frame !== null) {
      const frameString = this.frame.getString(),
            containedAssertionString = this.getString(); ///

      context.trace(`Validating the '${containedAssertionString}' contained assertion's frame...`);

      const frameSingular = this.frame.isSingular();

      if (frameSingular) {
        const frame = this.frame.validate(context);

        if (frame !== null) {
          this.frame = frame;

          frameValidates = true;
        }
      } else {
        context.debug(`The '${frameString}' frame is not singular.`);
      }

      if (frameValidates) {
        context.debug(`...validated the '${containedAssertionString}' contained assertion's frame.`);
      }
    }

    return frameValidates;
  }

  validateStatement(context) {
    let statementValidates = false;

    if (this.statement !== null) {
      const statementString = this.statement.getString();

      context.trace(`Validating the '${statementString}' statement...`);

      const statement = this.statement.validate(context);

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${statementString}' statement.`);
      }
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' stated contained assertion...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${containedAssertionString}' stated contained assertion.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' derived contained assertion...`);

    validatesWhenDerived = validateWhenDerived(this.term, this.frame, this.statement, this.negated, context);

    if (validatesWhenDerived) {
      context.debug(`...validated the '${containedAssertionString}' derived contained assertion.`);
    }

    return validatesWhenDerived;
  }

  unifyIndependently(generalContext, specificContext) {
    let unifiesIndependently = false;

    const context = specificContext,  ///
          containedAssertionString = this.getString(); ///

    context.trace(`Unifying the '${containedAssertionString}' contained assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context),
          frame = frameFromFrameAndSubstitutions(this.frame, context),
          statement = statementFromStatementAndSubstitutions(this.statement, context),
          validatesWhenDerived = validateWhenDerived(term, frame, statement, this.negated, context);

    if (validatesWhenDerived) {
      unifiesIndependently = true;
    }

    if (unifiesIndependently) {
      context.debug(`...unified the '${containedAssertionString}' contained assertion independently.`);
    }

    return unifiesIndependently;
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
              frame = frameFromContainedAssertionNode(containedAssertionNode, context),
              negated = negatedFromContainedAssertionNode(containedAssertionNode, context),
              statement = statementFromContainedAssertionNode(containedAssertionNode, context);

        context = null;

        containedAssertion = new ContainedAssertion(context, string, node, breakPoint, term, frame, negated, statement);
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

function validateWhenDerived(term, frame, statement, negated, context) {
  let validatesWhenDerived = false;

  if (statement !== null) {
    if (term !== null) {
      const termContained = statement.isTermContained(term, context);

      if (!negated && termContained) {
        validatesWhenDerived = true;
      }

      if (negated && !termContained) {
        validatesWhenDerived = true;
      }
    }

    if (frame !== null) {
      const frameContained = statement.isFrameContained(frame, context);

      if (!negated && frameContained) {
        validatesWhenDerived = true;
      }

      if (negated && !frameContained) {
        validatesWhenDerived = true;
      }
    }
  }

  return validatesWhenDerived;
}
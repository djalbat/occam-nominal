"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { all, exists } from "../../utilities/continuation";
import { instantiateContainedAssertion } from "../../process/instantiate";
import { termFromTermAndSubstitutions, frameFromFrameAndSubstitutions, statementFromStatementAndSubstitutions } from "../../utilities/substitutions";
import { termFromContainedAssertionNode,
         frameFromContainedAssertionNode,
         negatedFromContainedAssertionNode,
         statementFromContainedAssertionNode,
         containedAssertionFromStatementNode } from "../../utilities/element";

const { breakPointFromJSON } = breakPointUtilities;

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

  validate(context, continuation) {
    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' contained assertion...`);

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion !== null) {
      const containedAssertion = validAssertion;  ///

      context.debug(`...the '${containedAssertionString}' contained assertion is already valid.`);

      return continuation(containedAssertion);
    }

    const validateTerm = this.validateTerm.bind(this),
          validateFrame = this.validateFrame.bind(this),
          validateStatement = this.validateStatement.bind(this);

    all([
      validateTerm,
      validateFrame,
      validateStatement
    ], context, (validaets) => {
      if (!validaets) {
        const containedAssertion = null;

        return continuation(containedAssertion);
      }

      const validatesWhenStated = this.validateWhenStated.bind(this),
            validatesWhenDerived = this.validateWhenDerived.bind(this);

      exists([
        validatesWhenStated,
        validatesWhenDerived
      ], context, (validates) => {
        let containedAssertion = null;

        if (validates) {
          const assertion = this; ///

          containedAssertion = assertion; ///

          context.addAssertion(assertion);
        }

        if (validates) {
          context.debug(`...validated the '${containedAssertionString}' contained assertion.`);
        }

        return continuation(containedAssertion);
      });
    });
  }

  validateTerm(context, continuation) {
    if (this.term === null) {
      const termValidates = true; ///

      return continuation(termValidates);
    }

    const termString = this.term.getString(), ///
          continaedAssertionString = this.getString();  ///

    context.trace(`Validating the '${continaedAssertionString}' continaed assertion's term...`);

    const termSingular = this.term.isSingular();

    if (!termSingular) {
      const termValidates = false;

      context.debug(`The '${termString}' term is not singular.`);

      return continuation(termValidates);
    }

    this.term.validate(context, (term, context) => {
      let termValidates = false;

      if (term !== null) {
        this.term = term; ///

        termValidates = true;
      }

      if (termValidates) {
        context.debug(`...validates the'${continaedAssertionString}' continaed assertion's term.`);
      }

      return continuation(termValidates);
    });
  }

  validateFrame(context, continuation) {
    if (this.frame === null) {
      const frameValidates = true;  ///

      return continuation(frameValidates);
    }

    const frameString = this.frame.getString(), ///
          continaedAssertionString = this.getString();  ///

    context.trace(`Validating the'${continaedAssertionString}' continaed assertion's '${frameString}' frame...`);

    const frameSingular = this.frame.isSingular();

    if (!frameSingular) {
      const frameValidates = false;

      context.debug(`The '${frameString}' frame is not singular.`);

      return continuation(frameValidates);
    }

    this.frame.validate(context, (frame) => {
      let frameValidates = false;

      if (frame !== null) {
        this.frame = frame;

        frameValidates = true;
      }

      if (frameValidates) {
        context.debug(`...validates the'${continaedAssertionString}' continaed assertion's '${frameString}' frame.`);
      }

      return continuation(frameValidates);
    });
  }

  validateStatement(context, continuation) {
    const statementString = this.statement.getString();

    context.trace(`Validating the '${statementString}' statement...`);

    this.statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${statementString}' statement.`);
      }

      return continuation(statementValidates);
    });
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      return continuation(validatesWhenStated);
    }

    let validatesWhenStated;

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' stated contained assertion...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${containedAssertionString}' stated contained assertion.`);
    }

    return continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      return continuation(validatesWhenDerived);
    }

    const containedAssertionString = this.getString(); ///

    context.trace(`Validating the '${containedAssertionString}' derived contained assertion...`);

    return validateWhenDerived(this.term, this.frame, this.statement, this.negated, context, (validatesWhenDerived) => {
      if (validatesWhenDerived) {
        context.debug(`...validated the '${containedAssertionString}' derived contained assertion.`);
      }

      return continuation(validatesWhenDerived);
    });
  }

  unifyIndependently(generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          containedAssertionString = this.getString(); ///

    context.trace(`Unifying the '${containedAssertionString}' contained assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context),
          frame = frameFromFrameAndSubstitutions(this.frame, context),
          statement = statementFromStatementAndSubstitutions(this.statement, context);

    return validateWhenDerived(term, frame, statement, this.negated, context, (validatesWhenDerived) => {
      let unifiesIndependently = false;

      if (validatesWhenDerived) {
        unifiesIndependently = true;
      }

      if (unifiesIndependently) {
        context.debug(`...unified the '${containedAssertionString}' contained assertion independently.`);
      }

      return continuation(unifiesIndependently);
    });
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

function validateWhenDerived(term, frame, statement, negated, context, continuation) {
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

  continuation(validatesWhenDerived);
}
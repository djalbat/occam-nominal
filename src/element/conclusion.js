"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateConclusion } from "../process/instantiate";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { elide, declare, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

export default define(class Conclusion extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  getConclusionNode() {
    const node = this.getNode(),
          conclusionNode = node;  ///

    return conclusionNode;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const conclusionString = this.getString();  ///

    context.trace(`Verifying the '${conclusionString}' conclusion...`);

    if (this.statement !== null) {
      declare((context) => {
        elide((context) => {
          const validates = this.validate(context);

          if (validates) {
            verifies = true;
          }
        }, context);
      }, context);
    } else {
      context.debug(`Unable to verify the '${conclusionString}' conclusion because it is nonsense.`);
    }

    if (verifies) {
      context.debug(`...verified the '${conclusionString}' conclusion.`);
    }

    return verifies;
  }

  validate(context) {
    let validates = false;

    const conclusionString = this.getString();  ///

    context.trace(`Validating the '${conclusionString}' conclusion...`);

    attempt((context) => {
      const statementValidates = this.validateStatement(context);

      if (statementValidates) {
        validates = true;
      }

      if (validates) {
        this.commit(context);
      }
    }, context);

    if (validates) {
      context.debug(`...validated the '${conclusionString}' conclusion.`);
    }

    return validates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const conclusionString = this.getString();  ///

    context.trace(`Validating the '${conclusionString}' conclusion's statement...`);

    const statement = this.statement.validate(context);

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.trace(`...validated the '${conclusionString}' conclusion's statement.`);
    }

    return statementValidates;
  }

  unifyStep(step, context) {
    let stepUnifies = false;

    const stepString = step.getString(),
          conclusionString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step with the '${conclusionString}' conclusion...`);

    const stepContext = step.getContext(),
          conclusionContext = this.getContext(),
          generalContext = conclusionContext, ///
          specificContext = stepContext;  ///

    reconcile((specificContext) => {
      const statement = step.getStatement(),
            statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

      if (statementUnifies) {
        specificContext.commit(context);

        stepUnifies = true;
      }
    }, specificContext);

    if (stepUnifies) {
      context.debug(`...unified the '${stepString}' step with the '${conclusionString}' conclusion.`);
    }

    return stepUnifies;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }

  static name = "Conclusion";

  static fromJSON(json, context) {
    let conclusion;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              conclusionNode = instantiateConclusion(string, context),
              node = conclusionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromConclusionNode(conclusionNode, context);

        conclusion = new Conclusion(context, string, node, breakPoint, statement);
      }, json, context);
    }, context);

    return conclusion;
  }
});

function statementFromConclusionNode(conclusionNode, context) {
  const statementNode = conclusionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

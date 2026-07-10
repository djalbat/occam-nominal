"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateConclusion } from "../process/instantiate";
import { elide, declare, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  isNonBreakable() {
    const nonsensical = (this.statement === null);

    return nonsensical;
  }

  verify = breakable(function (context, continuation) {
    const conclusionString = this.getString();  ///

    context.trace(`Verifying the '${conclusionString}' conclusion...`);

    const nonsensical = this.isNonBreakable();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${conclusionString}' conclusion because it is nonsense.`);

      continuation(verifies);

      return;
    }

    declare((context) => {
      elide((context) => {
        this.validate(context, (validates) => {
          let verifies = false;

          if (validates) {
            verifies = true;
          }

          if (verifies) {
            context.debug(`...verified the '${conclusionString}' conclusion.`);
          }

          continuation(verifies);
        });
      }, context);
    }, context);
  });

  validate(context, continuation) {
    const conclusionString = this.getString();  ///

    context.trace(`Validating the '${conclusionString}' conclusion...`);

    attempt((context) => {
      this.validateStatement(context, (statementValidates) => {
        let validates = false;

        if (statementValidates) {
          validates = true;
        }

        if (validates) {
          this.commit(context);
        }

        if (validates) {
          context.debug(`...validated the '${conclusionString}' conclusion.`);
        }

        continuation(validates);
      });
    }, context);
  }

  validateStatement(context, continuation) {
    const conclusionString = this.getString();  ///

    context.trace(`Validating the '${conclusionString}' conclusion's statement...`);

    this.statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.trace(`...validated the '${conclusionString}' conclusion's statement.`);
      }

      continuation(statementValidates);
    });
  }

  unifyStep(step, context, continuation) {
    const stepString = step.getString(),
          conclusionString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step with the '${conclusionString}' conclusion...`);

    const stepContext = step.getContext(),
          conclusionContext = this.getContext(),  ///
          generalContext = conclusionContext, ///
          specificContext = stepContext;  ///

    reconcile((specificContext) => {
      const statement = step.getStatement();

      this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let stepUnifies = false;

        if (statementUnifies) {
          specificContext.commit(context);

          stepUnifies = true;
        }

        if (stepUnifies) {
          context.debug(`...unified the '${stepString}' step with the '${conclusionString}' conclusion.`);
        }

        continuation(stepUnifies);
      });
    }, specificContext);
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

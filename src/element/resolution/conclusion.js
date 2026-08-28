"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { desist, declare } from "../../utilities/state";
import { instantiateConclusion } from "../../process/instantiate";
import { attempt, reconcile, unserialise, instantiate } from "../../utilities/context";

const { cut, all, isolate } = continuationUtilities,
      { breakable, breakPointFromJSON } = breakPointUtilities;

export default define(class Conclusion extends Resolution {
  getConclusionNode() {
    const node = this.getNode(),
          conclusionNode = node;  ///

    return conclusionNode;
  }

  isMalformed() {
    const conclusionNode = this.getConclusionNode(),
          malformed = conclusionNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const specificContext = context,  ///
          conclusionString = this.getString();  ///

    context.trace(`Verifying the '${conclusionString}' conclusion...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${conclusionString}' conclusion because it is malformed.`);

      return back();
    }

    declare((state) => {
      desist((state) => {
        return this.validate(state, context, (conclusion, _ , back) => {
          context = specificContext;  ///

          context.debug(`...verified the '${conclusionString}' conclusion.`);

          return forward(context, back);
        }, (exception) => {
          if (exception) {
            return back(exception);
          }

          context.trace(`Unable to verify the '${conclusionString}' conclusion.`);

          return back();
        });
      }, state);
    });
  });

  unifyStep = breakable(function (step, context, forward, back) {
    forward = cut(forward, back); ///

    const stepString = step.getString(),
          conclusionString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step with the '${conclusionString}' conclusion...`);

    const stepContext = step.getContext(),
          conclusionContext = this.getContext(),  ///
          generalContext = conclusionContext, ///
          specificContext = stepContext;  ///

    return reconcile((specificContext) => {
      const statement = step.getStatement();

      return this.statement.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
        specificContext.commit(context);

        context.debug(`...unified the '${stepString}' step with the '${conclusionString}' conclusion.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to unify the '${stepString}' step with the '${conclusionString}' conclusion.`);

        return back();
      });
    }, specificContext);
  });

  validate(state, context, forward, back) {
    const conclusionString = this.getString(); ///

    context.trace(`Validating the '${conclusionString}' conclusion...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateStatement = this.validateStatement.bind(this);

        return all([
          validateStatement
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      context.debug(`...validated the '${conclusionString}' conclusion.`);

      return forward(state, context, back);
    }, back);
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

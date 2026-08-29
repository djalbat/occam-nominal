"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { desist, declare } from "../../utilities/state";
import { instantiateDeduction } from "../../process/instantiate";
import { attempt, reconcile, unserialise, instantiate } from "../../utilities/context";

const { cut, all, isolate } = continuationUtilities,
      { breakable, breakPointFromJSON } = breakPointUtilities;

export default define(class Deduction extends Resolution {
  getDeductionNode() {
    const node = this.getNode(),
          deductionNode = node; ///

    return deductionNode;
  }

  isMalformed() {
    const deductionNode = this.getDeductionNode(),
          malformed = deductionNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const deductionString = this.getString();  ///

    context.trace(`Verifying the '${deductionString}' deduction...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${deductionString}' deduction because it is malformed.`);

      return back();
    }

    declare((state) => {
      desist((state) => {
        return this.validate(state, context, (deduction, context , back) => {
          context.debug(`...verified the '${deductionString}' deduction.`);

          return forward(context, back);
        }, (exception) => {
          if (exception) {
            return back(exception);
          }

          context.trace(`Unable to verify the '${deductionString}' deduction.`);

          return back();
        });
      }, state);
    });
  });

  apply = breakable(function (step, context, forward, back) {
    forward = cut(forward, back); ///

    const stepString = step.getString(),
          deductionString = this.getString();  ///

    context.trace(`Applying the '${deductionString}' deduction to the '${stepString}' step...`);

    const stepContext = step.getContext(),
          deductionContext = this.getContext(),  ///
          generalContext = deductionContext, ///
          specificContext = stepContext;  ///

    return reconcile((specificContext) => {
      const statement = step.getStatement();

      return this.statement.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
        specificContext.commit(context);

        context.debug(`...applied the '${deductionString}' deduction to the '${stepString}' step.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to apply the '${deductionString}' deduction to the '${stepString}' step.`);

        return back();
      });
    }, specificContext);
  });

  validate(state, context, forward, back) {
    const deductionString = this.getString(); ///

    context.trace(`Validating the '${deductionString}' deduction...`);

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
      const conclusion = this;  ///

      context.debug(`...validated the '${deductionString}' deduction.`);

      return forward(conclusion, context, back);
    }, back);
  }

  static name = "Deduction";

  static fromJSON(json, context) {
    let deduction;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              deductionNode = instantiateDeduction(string, context),
              node = deductionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromDeductionNode(deductionNode, context);

        deduction = new Deduction(context, string, node, breakPoint, statement);
      }, json, context);
    }, context);

    return deduction;
  }
});

function statementFromDeductionNode(deductionNode, context) {
  const statementNode = deductionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

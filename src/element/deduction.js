"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateDeduction } from "../process/instantiate";
import { elide, derive, attempt, serialise, unserialise, instantiate, reconcile } from "../utilities/context";

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Deduction extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  getDeductionNode() {
    const node = this.getNode(),
          deductionNode = node; ///

    return deductionNode;
  }

  isNonBreakable() {
    const nonsensical = (this.statement === null);

    return nonsensical;
  }

  verify = breakable(function (context, continuation) {
    const deductionString = this.getString();  ///

    context.trace(`Verifying the '${deductionString}' deduction...`);

    const nonsensical = this.isNonBreakable();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${deductionString}' deduction because it is nonsense.`);

      return continuation(verifies, context);
    }

    derive((context) => {
      elide((context) => {
        return this.validate(context, (validates) => {
          let verifies = false;

          if (validates) {
            verifies = true;
          }

          if (verifies) {
            context.debug(`...verified the '${deductionString}' deduction.`);
          }

          return continuation(verifies);
        });
      }, context);
    }, context);
  });

  validate(context, continuation) {
    const deductionString = this.getString();  ///

    context.trace(`Validating the '${deductionString}' deduction...`);

    attempt((context) => {
      return this.validateStatement(context, (statementValidates) => {
        let validates = false;

        if (statementValidates) {
          validates = true;
        }

        if (validates) {
          this.commit(context);
        }

        if (validates) {
          context.debug(`...validated the '${deductionString}' deduction.`);
        }

        return continuation(validates);
      });
    }, context);
  }

  validateStatement(context, continuation) {
    const deductionString = this.getString();  ///

    context.trace(`Validating the '${deductionString}' deduction's statement...`);

    return this.statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.trace(`...validated the '${deductionString}' deduction's statement.`);
      }

      return continuation(statementValidates, context);
    });
  }

  unifyStep(step, context, continuation) {
    const stepString = step.getString(),
          deductionString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step with the '${deductionString}' deduction...`);

    const stepContext = step.getContext(),
          deductionContext = this.getContext(),  ///
          generalContext = deductionContext, ///
          specificContext = stepContext;  ///

    reconcile((specificContext) => {
      const statement = step.getStatement();

      return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let stepUnifies = false;

        if (statementUnifies) {
          specificContext.commit(context);

          stepUnifies = true;
        }

        if (stepUnifies) {
          context.debug(`...unified the '${stepString}' step with the '${deductionString}' deduction.`);
        }

        return continuation(stepUnifies);
      });
    }, specificContext);
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          deductionString = this.getString(), ///
          statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${deductionString}' deduction's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${deductionString}' deduction's statement.`);
      }

      return continuation(statementUnifies);
    });
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

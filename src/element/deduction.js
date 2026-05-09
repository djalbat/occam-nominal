"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateDeduction } from "../process/instantiate";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { elide, declare, attempt, serialise, unserialise, instantiate, reconcile } from "../utilities/context";

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

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const deductionString = this.getString();  ///

    context.trace(`Verifying the '${deductionString}' deduction...`);

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
      context.debug(`Unable to verify the '${deductionString}' deduction because it is nonsense.`);
    }

    if (verifies) {
      context.debug(`...verified the '${deductionString}' deduction.`);
    }

    return verifies;
  }

  validate(context) {
    let validates = false;

    const deductionString = this.getString();  ///

    context.trace(`Validating the '${deductionString}' deduction...`);

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
      context.debug(`...validated the '${deductionString}' deduction.`);
    }

    return validates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const deductionnString = this.getString();  ///

    context.trace(`Validating the '${deductionnString}' deductionn's statement...`);

    const statement = this.statement.validate(context);

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.trace(`...validated the '${deductionnString}' deductionn's statement.`);
    }

    return statementValidates;
  }

  unifyStep(step, context) {
    let stepUnifies = false;

    const stepString = step.getString(),
          deductionString = this.getString();  ///

    context.trace(`Unifying the '${stepString}' step with the '${deductionString}' deduction...`);

    const stepContext = step.getContext(),
          deductionContext = this.getContext(),
          generalContext = deductionContext, ///
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
      context.debug(`...unified the '${stepString}' step with the '${deductionString}' deduction.`);
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

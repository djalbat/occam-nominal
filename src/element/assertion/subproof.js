"use strict";

import { arrayUtilities } from "necessary";

import Assertion from "../assertion";

import { define } from "../../elements";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { instantiateSubproofAssertion } from "../../process/instantiate";
import { subproofAssertionFromStatementNode } from "../../utilities/element";
import { join, descend, reconcile, instantiate } from "../../utilities/context";

const { last, front, backwardsEvery } = arrayUtilities;

export default define(class SubproofAssertion extends Assertion {
  constructor(context, string, node, breakPoint, statements) {
    super(context, string, node, breakPoint);

    this.statements = statements;
  }

  getStatements() {
    return this.statements;
  }

  getLastStatement() {
    const lastStatement = last(this.statements);

    return lastStatement;
  }

  getSupposedStatement(index) {
    const statement = this.statements[index],
          supposedStatement = statement;  ///

    return supposedStatement;
  }

  getSupposedStatements() {
    const frontStatements = front(this.statements),
          supposedStatements = frontStatements;  ///

    return supposedStatements;
  }

  getSubproofAssertionNode() {
    const node = this.getNode(),
          subproofAssertionNode = node; ///

    return subproofAssertionNode;
  }

  validate(context) {
    let subproofAssertion = null;

    const subproofAssertionString = this.getString();  ///

    context.trace(`Validating the '${subproofAssertionString}' subproof assertion...`);

    let validates = false;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion) {
      validates = true;

      subproofAssertion = validAssertion; ///

      context.debug(`...the '${subproofAssertionString}' subproof assertion is already valid.`);
    } else {
      const statementsValidate = this.validateStatements(context);

      if (statementsValidate) {
        validates = true;
      }

      if (validates) {
        const assertion = this; ///

        subproofAssertion = assertion;  ///

        context.addAssertion(assertion);
      }
    }

    if (validates) {
      context.debug(`...validated the '${subproofAssertionString}' subproof assertion.`);
    }

    return subproofAssertion;
  }

  validateStatements(context) {
    const statementsValidate = this.statements.every((statement) => {
      let statementValidates = false;

      descend((context) => {
        statement = statement.validate(context);  ///

        if (statement !== null) {
          statementValidates = true;
        }
      }, context);

      if (statementValidates) {
        return true;
      }
    });

    return statementsValidate;
  }

  unifySubproof(subproof, generalContext, specificContext) {
    let subproofUnifies = false;

    const context = specificContext,  ///
          subproofString = subproof.getString(),
          subproofAssertionString = this.getString(); ///

    context.trace(`Unifying the '${subproofString}' subproof with the '${subproofAssertionString}' subproof assertion...`);

    const lastStep = subproof.getLastStep(),
          lastStepUnifies = this.unifyLastStep(lastStep, generalContext, specificContext);

    if (lastStepUnifies) {
      const suppositions = subproof.getSuppositions(),
            suppositionsUnify = this.unifySuppositions(suppositions, generalContext, specificContext);

      if (suppositionsUnify) {
        subproofUnifies = true;
      }
    }

    if (subproofUnifies) {
      context.debug(`...unified the '${subproofString}' subproof with the '${subproofAssertionString}' subproof assertion.`);
    }

    return subproofUnifies;
  }

  unifyLastStep(lastStep, generalContext, specificContext) {
    let lastStepUnifies = false;

    const context = specificContext,  ///
          lastStatement = this.getLastStatement(),
          lastStepString = lastStep.getString(),
          lastStatementString = lastStatement.getString();

    context.trace(`Unifying the '${lastStepString}' last step with the '${lastStatementString}' last statement...`)

    const lastStepContext = lastStep.getContext();

    specificContext = lastStepContext;  ///

    join((specificContext) => {
      const lastStepStatement = lastStep.getStatement(),
            lastStepStatementUnifies = lastStatement.unifyStatement(lastStepStatement, generalContext, specificContext);

      if (lastStepStatementUnifies) {
        lastStepUnifies = true;
      }
    }, specificContext, context);

    if (lastStepUnifies) {
      context.debug(`...unified the '${lastStepString}' last step with the '${lastStatementString}' last statement.`)
    }

    return lastStepUnifies;
  }

  unifyDeduction(deduction, generalContext, specificContext) {
    let deductionUnifies = false;

    const context = specificContext,  ///
          lastStatement = this.getLastStatement(),
          deductionString = deduction.getString(),
          lastStatementString = lastStatement.getString();

    context.trace(`Unifying the '${deductionString}' deduction with the '${lastStatementString}' last statement...`)

    const deductionContext = deduction.getContext();

    specificContext = deductionContext;  ///

    join((specificContext) => {
      const deductionStatement = deduction.getStatement(),
            deductionStatementUnifies = lastStatement.unifyStatement(deductionStatement, generalContext, specificContext);

      if (deductionStatementUnifies) {
        deductionUnifies = true;
      }
    }, specificContext, context);

    if (deductionUnifies) {
      context.debug(`...unified the '${deductionString}' deduction with the '${lastStatementString}' last statement.`)
    }

    return deductionUnifies;
  }

  unifySupposition(supposition, index, generalContext, specificContext) {
    let suppositionUnifies = false;

    const context = specificContext,  ///
          supposedStatement = this.getSupposedStatement(index),
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${suppositionString}' supposition with the '${supposedStatementString}' supposed statement...`)

    const suppositionContext = supposition.getContext();

    specificContext = suppositionContext;  ///

    join((specificContext) => {
      const suppositionStatement = supposition.getStatement(),
            suppositionStatementUnifies = supposedStatement.unifyStatement(suppositionStatement, generalContext, specificContext);

      if (suppositionStatementUnifies) {
        suppositionUnifies = true;
      }
    }, specificContext, context);

    if (suppositionUnifies) {
      context.debug(`...unified the '${suppositionString}' supposition with the '${supposedStatementString}' supposed statement.`)
    }

    return suppositionUnifies;
  }

  unifySuppositions(suppositions, generalContxt, spsecificContext) {
    let suppositionsUnify = false;

    const supposedStatements = this.getSupposedStatements(),
          suppositionsLength = suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength === supposedStatementsLength) {
      suppositionsUnify = backwardsEvery(suppositions, (supposition, index) => {
        const suppositionUnifies = this.unifySupposition(supposition, index, generalContxt, spsecificContext);

        if (suppositionUnifies) {
          return true;
        }
      });
    }

    return suppositionsUnify;
  }

  unifyTopLevelMetaAssertion(topLevelMetaAssertion, context) {
    let topLevelMetaAssertionUnifies = false;

    const subproofAssertionString = this.getString(),  ///
          topLevelMetaAssertionString = topLevelMetaAssertion.getString();

    context.trace(`Unifying the '${topLevelMetaAssertionString}' top level meta-assertion with the '${subproofAssertionString}' subproof assertion...`);

    reconcile((context) => {
      const deduction = topLevelMetaAssertion.getDeduction(),
            generalContext = context, ///
            specificContext = context,  ///
            deductionUnifies = this.unifyDeduction(deduction, generalContext, specificContext);

      if (deductionUnifies) {
        const suppositions = topLevelMetaAssertion.getSuppositions(),
              suppositionsUnify = this.unifySuppositions(suppositions, generalContext, specificContext);

        if (suppositionsUnify) {
          specificContext.commit();

          topLevelMetaAssertionUnifies = true;
        }
      }
    }, context);

    if (topLevelMetaAssertionUnifies) {
      context.debug(`...unified the '${topLevelMetaAssertionString}' top level meta-assertion with the '${subproofAssertionString}' subproof assertion.`);
    }

    return topLevelMetaAssertionUnifies;
  }

  static name = "SubproofAssertion";

  static fromJSON(json, context) {
    let subproorAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              subproofAssertionNode = instantiateSubproofAssertion(string, context),
              node = subproofAssertionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statements = statementsFromSubproofAssertionNode(subproofAssertionNode, context);

        context = null;

        subproorAssertion = new SubproofAssertion(context, string, node, breakPoint, statements);
      }, context);
    }

    return subproorAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          subproofAssertion = subproofAssertionFromStatementNode(statementNode, context);

    return subproofAssertion;
  }
});

function statementsFromSubproofAssertionNode(subproofAssertionNode, context) {
  const statementNodes = subproofAssertionNode.getStatementNodes(),
        statements = statementNodes.map((statemetNode) => {
          const statement = context.findStatementByStatementNode(statemetNode);

          return statement;
        });

  return statements;
}

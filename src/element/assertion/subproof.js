"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiateSubproofAssertion } from "../../process/instantiate";
import { descend, reconcile, instantiate } from "../../utilities/context";
import { subproofAssertionFromStatementNode } from "../../utilities/element";

const { breakPointFromJSON } = breakPointUtilities,
      { last, front, backwardsEvery } = arrayUtilities;

export default define(class SubproofAssertion extends Assertion {
  constructor(context, string, node, breakPoint, statements) {
    super(context, string, node, breakPoint);

    this.statements = statements;
  }

  getStatements() {
    return this.statements;
  }

  getDeducedStatement() {
    const lastStatement = last(this.statements),
          deducedStatement = lastStatement; ///

    return deducedStatement;
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

    if (validAssertion !== null) {
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

  unifySchema(schema, generalContext, specificContext) {
    let schemaUnifies = false;

    const context = specificContext,  ///
          schemaString = schema.getString(),
          subproofAssertionString = this.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${subproofAssertionString}' subproof assertion...`);

    const deduction = schema.getDeduction(),
          deductionUnifies = this.unifyDeduction(deduction, generalContext, specificContext);

    if (deductionUnifies) {
      const suppositions = schema.getSuppositions(),
            suppositionsUnify = this.unifySuppositions(suppositions, generalContext, specificContext);

      if (suppositionsUnify) {
        schemaUnifies = true;
      }
    }

    if (schemaUnifies) {
      context.debug(`...unified the '${schemaString}' schema with the '${subproofAssertionString}' subproof assertion.`);
    }

    return schemaUnifies;
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
          lastStepString = lastStep.getString(),
          deducedStatement = this.getDeducedStatement(),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${lastStepString}' last step with the '${deducedStatementString}' deduced statement...`)

    const lastStepContext = lastStep.getContext();

    specificContext = lastStepContext;  ///

    reconcile((specificContext) => {
      const lastStepStatement = lastStep.getStatement(),
            lastStepStatementUnifies = deducedStatement.unifyStatement(lastStepStatement, generalContext, specificContext);

      if (lastStepStatementUnifies) {
        lastStepUnifies = true;

        specificContext.commit(context);
      }
    }, specificContext);

    if (lastStepUnifies) {
      context.debug(`...unified the '${lastStepString}' last step with the '${deducedStatementString}' deduced statement.`)
    }

    return lastStepUnifies;
  }

  unifyDeduction(deduction, generalContext, specificContext) {
    let deductionUnifies = false;

    const context = specificContext,  ///
          deductionString = deduction.getString(),
          deducedStatement = this.getDeducedStatement(),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${deductionString}' deduction with the '${deducedStatementString}' deduced statement...`)

    const deductionContext = deduction.getContext();

    specificContext = deductionContext;  ///

    reconcile((specificContext) => {
      const deductionStatement = deduction.getStatement(),
            deductionStatementUnifies = deducedStatement.unifyStatement(deductionStatement, generalContext, specificContext);

      if (deductionStatementUnifies) {
        deductionUnifies = true;

        specificContext.commit(context);
      }
    }, specificContext);

    if (deductionUnifies) {
      context.debug(`...unified the '${deductionString}' deduction with the '${deducedStatementString}' deduced statement.`)
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

    reconcile((specificContext) => {
      const suppositionStatement = supposition.getStatement(),
            suppositionStatementUnifies = supposedStatement.unifyStatement(suppositionStatement, generalContext, specificContext);

      if (suppositionStatementUnifies) {
        suppositionUnifies = true;

        specificContext.commit(context);
      }
    }, specificContext);

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

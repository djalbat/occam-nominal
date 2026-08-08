"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { all, every, exists } from "../../utilities/continuation";
import { join, reconcile, instantiate } from "../../utilities/context";
import { instantiateSubproofAssertion } from "../../process/instantiate";
import { declare, isDerived, isDeclared } from "../../utilities/state";
import { subproofAssertionFromStatementNode } from "../../utilities/element";

const { last, front } = arrayUtilities,
      { breakPointFromJSON } = breakPointUtilities,
      { asynchronousBackwardsEvery } = continuationUtilities;

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

  validate(state, context, continuation) {
    let validates;

    const subprpoofAssertionString = this.getString();  ///

    context.trace(`Validating the '${subprpoofAssertionString}' subprpoof assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const subprpoofAssertion = assertion; ///

      context.debug(`The '${subprpoofAssertionString}' subprpoof assertion is already present.`);

      validates = continuation(subprpoofAssertion, context);
    } else {
      assertion = this; ///

      const validateStatements = this.validateStatements.bind(this);

      validates = all([
        validateStatements
      ], state, context, (state, context) => {
        let validates;

        const validateWhenDeclared = this.validateWhenDeclared.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenDeclared,
          validateWhenDerived
        ], state, context, (state, context) => {
          let validates;

          context.addAssertion(assertion);

          const subprpoofAssertion = assertion; ///

          validates = continuation(subprpoofAssertion, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${subprpoofAssertionString}' subprpoof assertion.`);
    }

    return validates;
  }

  validateStatements(state, context, continuation) {
    let statementsValidate;

    const subproofAssertionString = this.getString();  ///

    context.trace(`Validating the '${subproofAssertionString}' subproof assertion's statements...`);

    statementsValidate = every(this.statements, (statement, context, continuation) => {
      let statementValidates;

      declare((state) => {
        statementValidates = statement.validate(state, context, (statement, context) => {
          let validates;

          validates = continuation(context);

          return validates;
        });
      });

      return statementValidates;
    }, context, (context) => {
      let validates;

      validates = continuation(state, context);

      return validates;
    });

    if (statementsValidate) {
      context.debug(`...validated the '${subproofAssertionString}' subproof assertion's statements.`);
    }

    return statementsValidate;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const subproofAssertionString = this.getString(); ///

      context.trace(`Validating the '${subproofAssertionString}' declared subproof assertion...`);

      validatesWhenDeclared = continuation(state, context);

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${subproofAssertionString}' declared subproof assertion.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const subproofAssertionString = this.getString(); ///

      context.trace(`Validating the '${subproofAssertionString}' derived subproof assertion...`);

      validatesWhenDerived = true;

      validatesWhenDerived = continuation(state, context);

      if (validatesWhenDerived) {
        context.debug(`...validated the '${subproofAssertionString}' derived subproof assertion.`);
      }
    }

    return validatesWhenDerived;
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

  unifySubproof(subproof, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          subproofString = subproof.getString(),
          subproofAssertionString = this.getString(); ///

    context.trace(`Unifying the '${subproofString}' subproof with the '${subproofAssertionString}' subproof assertion...`);

    const lastStep = subproof.getLastStep();

    return this.unifyLastStep(lastStep, generalContext, specificContext, (lastStepUnifies) => {
      let subproofUnifies = false;

      if (!lastStepUnifies) {
        return continuation(subproofUnifies);
      }

      const suppositions = subproof.getSuppositions();

      return this.unifySuppositions(suppositions, generalContext, specificContext, (suppositionsUnify) => {
        if (suppositionsUnify) {
          subproofUnifies = true;
        }

        if (subproofUnifies) {
          context.debug(`...unified the '${subproofString}' subproof with the '${subproofAssertionString}' subproof assertion.`);
        }

        return continuation(subproofUnifies);
      });
    });
  }

  unifyLastStep(lastStep, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          lastStepString = lastStep.getString(),
          deducedStatement = this.getDeducedStatement(),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${lastStepString}' last step with the '${deducedStatementString}' deduced statement...`)

    const lastStepContext = lastStep.getContext();

    specificContext = lastStepContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const lastStepStatement = lastStep.getStatement();

        return deducedStatement.unifyStatement(lastStepStatement, generalContext, specificContext, (lastStepStatementUnifies) => {
          let lastStepUnifies = false;

          if (lastStepStatementUnifies) {
            lastStepUnifies = true;

            specificContext.commit(context);
          }

          if (lastStepUnifies) {
            context.debug(`...unified the '${lastStepString}' last step with the '${deducedStatementString}' deduced statement.`)
          }

          return continuation(lastStepUnifies);
        });
      }, specificContext);
    }, specificContext, context);
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

    return reconcile((specificContext) => {
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

  unifySupposition(supposition, index, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          supposedStatement = this.getSupposedStatement(index),
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${suppositionString}' supposition with the '${supposedStatementString}' supposed statement...`)

    const suppositionContext = supposition.getContext();

    specificContext = suppositionContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const suppositionStatement = supposition.getStatement();

        return supposedStatement.unifyStatement(suppositionStatement, generalContext, specificContext, (suppositionStatementUnifies) => {
          let suppositionUnifies = false;

          if (suppositionStatementUnifies) {
            suppositionUnifies = true;

            specificContext.commit(context);
          }

          if (suppositionUnifies) {
            context.debug(`...unified the '${suppositionString}' supposition with the '${supposedStatementString}' supposed statement.`)
          }

          return continuation(suppositionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, generalContext, specificContext, continuation) {
    const supposedStatements = this.getSupposedStatements(),
          suppositionsLength = suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const suppositionsUnify = false;

      return continuation(suppositionsUnify);
    }

    let index = -1;

    return asynchronousBackwardsEvery(suppositions, (supposition, continuation) => {
      index++;

      return this.unifySupposition(supposition, index, generalContext, specificContext, continuation);
    }, continuation);
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

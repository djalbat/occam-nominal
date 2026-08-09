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

    const subproofAssertionString = this.getString();  ///

    context.trace(`Validating the '${subproofAssertionString}' subproof assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const subproofAssertion = assertion; ///

      context.debug(`The '${subproofAssertionString}' subproof assertion is already present.`);

      validates = continuation(subproofAssertion, context);
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

          const subproofAssertion = assertion; ///

          validates = continuation(subproofAssertion, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${subproofAssertionString}' subproof assertion.`);
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

  unifySupposition(supposition, supposedStatement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
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

    let index = suppositionsLength; ///

    return asynchronousBackwardsEvery(suppositions, (supposition, continuation) => {
      index--;

      const supposedStatement = supposedStatements[index];

      return this.unifySupposition(supposition, supposedStatement, generalContext, specificContext, continuation);
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

"use strict";

import { arrayUtilities } from "necessary";
import { continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { join, reconcile, instantiate } from "../../utilities/context";
import { instantiateSubproofAssertion } from "../../process/instantiate";
import { subproofAssertionFromStatementNode } from "../../utilities/element";

const { last, front } = arrayUtilities,
      { all, every, backwardsEvery } = continuationUtilities;

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

  getSupposedStatement(index) {
    const supposedStatements = this.getSupposedStatements(),
          supposedStatement = supposedStatements[index];

    return supposedStatement;
  }

  getSubproofAssertionNode() {
    const node = this.getNode(),
          subproofAssertionNode = node; ///

    return subproofAssertionNode;
  }

  validate(state, context, forward, back) {
    let assertion;

    const subproofAssertionString = this.getString();  ///

    context.trace(`Validating the '${subproofAssertionString}' subproof assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const subproofAssertion = assertion; ///

      context.debug(`The '${subproofAssertionString}' subproof assertion is already present.`);

      return forward (subproofAssertion, context);
    }

    assertion = this; ///

    const validateStatements = this.validateStatements.bind(this);

    return all([
      validateStatements
    ], state, context, (state, context, back) => {
      context.addAssertion(assertion);

      const subproofAssertion = assertion; ///

      context.debug(`...validated the '${subproofAssertionString}' subproof assertion.`);

      return forward(subproofAssertion, context, back);
    }, back);
  }

  validateStatements(state, context, forward, back) {
    const subproofAssertionString = this.getString();  ///

    context.trace(`Validating the '${subproofAssertionString}' subproof assertion's statements...`);

    return every(this.statements, (statement, context, forward, back) => {
      return declare((state) => {
        return statement.validate(state, context, (statement, context, back) => {
          return forward(context, back);
        }, back);
      });
    }, context, (context, back) => {
      context.debug(`...validated the '${subproofAssertionString}' subproof assertion's statements.`);

      return forward(state, context, back);
    }, back);
  }

  unifySubproof(subproof, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          subproofString = subproof.getString(),
          subproofAssertionString = this.getString(); ///

    context.trace(`Unifying the '${subproofString}' subproof with the '${subproofAssertionString}' subproof assertion...`);

    const lastStep = subproof.getLastStep();

    return this.unifyLastStep(lastStep, generalContext, specificContext, (generalContext, specificContext, back) => {
      const suppositions = subproof.getSuppositions();

      return this.unifySuppositions(suppositions, generalContext, specificContext, (generalContext, specificContext, back) => {
        context.debug(`...unified the '${subproofString}' subproof with the '${subproofAssertionString}' subproof assertion.`);

        return forward(generalContext, specificContext, back);
      }, back);
    }, back);
  }

  unifyLastStep(lastStep, generalContext, specificContext, forward, back) {
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

        return deducedStatement.unifyStatement(lastStepStatement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          specificContext = context;  ///

          context.debug(`...unified the '${lastStepString}' last step with the '${deducedStatementString}' deduced statement.`);

          return forward(generalContext, specificContext, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
 }

  unifySupposition(supposition, generalContext, specificContext, forward, back, index) {
    const context = specificContext,  ///
          suppositionString = supposition.getString(),
          supposedStatement = this.getSupposedStatement(index),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${suppositionString}' supposition with the '${supposedStatementString}' supposed statement...`)

    const suppositionContext = supposition.getContext();

    specificContext = suppositionContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const suppositionStatement = supposition.getStatement();

        return supposedStatement.unifyStatement(suppositionStatement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          specificContext = context;  ///

          context.debug(`...unified the '${suppositionString}' supposition with the '${supposedStatementString}' supposed statement.`)

          return forward(generalContext, specificContext, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, generalContext, specificContext, forward, back) {
    const supposedStatements = this.getSupposedStatements(),
          suppositionsLength = suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      return back();
    }

    return backwardsEvery(suppositions, (supposition, forward, back, index) => {
      return this.unifySupposition(supposition, generalContext, specificContext, forward, back, index);
    }, forward, back);
  }

  toJSON() {
    const name = this.getName(),
          string = this.getString(),
          json = {
            name,
            string
          };

    return json;
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
              breakPoint = null,
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

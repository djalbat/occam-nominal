"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { ablate, isolate, attempt, instantiate } from "../../utilities/context";
import { instantiateImplicitAssumption } from "../../process/instantiate";
import { implicitAssumptionStringFromStatement } from "../../utilities/string";
import { implicitAssumptionFromImplicitAssumptionNode } from "../../utilities/element";

const { cut, all } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class ImplicitAssumption extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  getImplicitAssumptionNode() {
    const node = this.getNode(),
          implicitAssumptionNode = node;  ///

    return implicitAssumptionNode;
  }

  getStatementNode() { return this.statement.getStatementNode(); }

  isEqualTo(implicitAssumption) {
    const implicitAssumptionNode = implicitAssumption.getNode(),
          implicitAssumptionNodeMatches = this.matchImplicitAssumptionNode(implicitAssumptionNode),
          equalTo = implicitAssumptionNodeMatches;  ///

    return equalTo;
  }

  matchImplicitAssumptionNode(implicitAssumptionNode) {
    const node = implicitAssumptionNode, ///
          nodeMatches = this.matchNode(node),
          implicitAssumptionNodeMatches = nodeMatches; ///

    return implicitAssumptionNodeMatches;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const implicitAssumptionString = this.getString(); ///

    context.trace(`Verifying the '${implicitAssumptionString}' implicit assumption...`);

    return declare((state) => {
      return this.validate(state, context, (implicitAssumption, context , back) => {
        context.debug(`...verified the '${implicitAssumptionString}' implicit assumption.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit assumption...`);

    return isolate((state, context, forward, back) => {
      context = this.getContext();

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
      const implicitAssumption = this;  ///

      context.debug(`...validated the '${implicitAssumptionString}' implicit assumption.`);

      return forward(implicitAssumption, context, back);
    }, back);
  }

  validateStatement(state, context, forward, back) {
    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit assumption's statement...`);

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.trace(`...validated the '${implicitAssumptionString}' implicit assumption's statement.`);

      return forward(state, context, back);
    }, back);
  }

  unifyStatement(statement, generalContext, specificContext) {
    debugger

    let statementUnifies;

    const context = specificContext, ///
          statementString = statement.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${proofAssertionString}' implicitAssumption's statement...`);

    statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${proofAssertionString}' implicitAssumption's statement.`);
    }

    return statementUnifies;
  }

  static name = "ImplicitAssumption";

  static fromStatement(statement, context) {
    let implicitAssumption;

    ablate((context) => {
      instantiate((context) => {
        const implicitAssumptionString = implicitAssumptionStringFromStatement(statement),
              string = implicitAssumptionString,  ///
              implicitAssumptionNode = instantiateImplicitAssumption(string, context);

        implicitAssumption = implicitAssumptionFromImplicitAssumptionNode(implicitAssumptionNode, context);
      }, context);
    }, context);

    return implicitAssumption;
  }
});

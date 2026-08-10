"use strict";

import { Element } from "occam-languages";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { ablate, attempt, instantiate } from "../../utilities/context";
import { instantiateImplicitAssumption } from "../../process/instantiate";
import { implicitAssumptionStringFromStatement } from "../../utilities/string";
import { implicitAssumptionFromImplicitAssumptionNode } from "../../utilities/element";

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

  validate(state, context, continuation) {
    let validates;

    const specificContext = context,  ///
          implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit assumption...`);

    let assumption;

    assumption = this;  ///

    context = this.getContext();

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this);

      validates = all([
        validateStatement
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        const implicitAssumption = assumption;  ///

        context = specificContext;  ///

        validates = continuation(implicitAssumption, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${implicitAssumptionString}' implicit assumption.`);
    }

    return validates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit assumption's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.debug(`...validated the '${implicitAssumptionString}' implicit assumption's statement.`);
    }

    return statementValidates;
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

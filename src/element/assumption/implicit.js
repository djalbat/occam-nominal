"use strict";

import { Element } from "occam-languages";

import { define } from "../../elements";
import { pare, instantiate } from "../../utilities/context";
import { instantiateImplicitAssumption } from "../../process/instantiate";
import { implicitAssumptionStringFromStatement } from "../../utilities/string";
import { implicitAssumptionFromImplicitAssumptionNode } from "../../utilities/element";
import {isDeclared} from "../../utilities/state";

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

  getReference() {
    const reference = null;

    return reference;
  }

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

  findSubproofAssertion(context) {
    let subproofAssertion = null;

    const statementNode = this.getStatementNode(),
          subproofAssertionNode = statementNode.getSubproofAssertionNode();

    if (subproofAssertionNode !== null) {
      subproofAssertion = context.findAssertionByAssertionNode(subproofAssertionNode);
    }

    return subproofAssertion;
  }

  findAssumption(context) {
    const implicitAssumptionNode = this.getImplicitAssumptionNode(),
          assumptionNode = implicitAssumptionNode,  ///
          assumption = context.findAssumptionByAssumptionNode(assumptionNode);

    return assumption;
  }

  async validate(state, context) {
    let implicitAssumption = null;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit qssumption...`);

    let validates = false;

    const assumption = this.findAssumption(context);

    if (assumption !== null) {
      validates = true;

      implicitAssumption = assumption; ///

      context.debug(`...the '${implicitAssumptionString}' implicit qssumption is already present.`);
    } else {
      const statementValidates = await this.validateStatement(context);

      if (statementValidates) {
        debugger

        let validateWhenDeclared = false,
            validatesWhenDerived = false;

        const declared = isDeclared(state);

        if (declared) {
          validateWhenDeclared = this.validateWhenStated(context);
        } else {
          validatesWhenDerived = this.validateWhenDerived(context);
        }

        if (validateWhenDeclared || validatesWhenDerived) {
          validates = true;
        }
      }

      if (validates) {
        implicitAssumption = this;  ///

        const assumption = implicitAssumption;  ///

        context.addAssumption(assumption);
      }
    }

    if (validates) {
      context.debug(`...validated the '${implicitAssumptionString}' implicitAssumption.`);
    }

    return implicitAssumption;
  }

  async validateStatement(context) {
    let statementValidates = false;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit assumption's statement...`);

    const statement = await this.statement.validate(state, context, context);

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${implicitAssumptionString}' implicit assumption's statement.`);
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validateWhenDeclared;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' declared implicitAssumption...`);

    validateWhenDeclared = true

    if (validateWhenDeclared) {
      context.debug(`...validated the '${implicitAssumptionString}' declared implicitAssumption.`);
    }

    return validateWhenDeclared;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' derived implicitAssumption...`);

    validatesWhenDerived = true

    if (validatesWhenDerived) {
      context.debug(`...validated the '${implicitAssumptionString}' derived implicitAssumption.`);
    }

    return validatesWhenDerived;
  }

  async unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies;

    const context = specificContext, ///
          statementString = statement.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${proofAssertionString}' implicitAssumption's statement...`);

    statementUnifies = await this.statement.unifyStatement(statement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${proofAssertionString}' implicitAssumption's statement.`);
    }

    return statementUnifies;
  }

  static name = "ImplicitAssumption";

  static fromStatement(statement, context) {
    const implicitAssumption = pare((context) => {
      return instantiate((context) => {
        const implicitAssumptionString = implicitAssumptionStringFromStatement(statement),
              string = implicitAssumptionString,  ///
              implicitAssumptionNode = instantiateImplicitAssumption(string, context),
              implicitAssumption = implicitAssumptionFromImplicitAssumptionNode(implicitAssumptionNode, context);

        return implicitAssumption;
      }, context);
    }, context);

    return implicitAssumption;
  }
});

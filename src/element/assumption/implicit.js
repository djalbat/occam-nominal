"use strict";

import { Element } from "occam-languages";

import { define } from "../../elements";
import { pare, instantiate } from "../../utilities/context";
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

  findValidAssumption(context) {
    const implicitAssumptionNode = this.getImplicitAssumptionNode(),
          assumptionNode = implicitAssumptionNode,  ///
          assumption = context.findAssumptionByAssumptionNode(assumptionNode),
          validAssumption = assumption;  ///

    return validAssumption;
  }

  async validate(context) {
    let implicitAssumption = null;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' implicit qssumption...`);

    let validates = false;

    const validAssumption = this.findValidAssumption(context);

    if (validAssumption !== null) {
      validates = true;

      implicitAssumption = validAssumption; ///

      context.debug(`...the '${implicitAssumptionString}' implicit qssumption is already valid.`);
    } else {
      const statementValidates = await this.validateStatement(context);

      if (statementValidates) {
        const stated = context.isStated();

        let validatesWhenStated = false,
            validatesWhenDerived = false;

        if (stated) {
          validatesWhenStated = this.validateWhenStated(context);
        } else {
          validatesWhenDerived = this.validateWhenDerived(context);
        }

        if (validatesWhenStated || validatesWhenDerived) {
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

    context.trace(`Validating the '${implicitAssumptionString}' implicitAssumption's statement...`);

    const statement = await this.statement.validate(context);

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${implicitAssumptionString}' implicitAssumption's statement.`);
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const implicitAssumptionString = this.getString();  ///

    context.trace(`Validating the '${implicitAssumptionString}' stated implicitAssumption...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${implicitAssumptionString}' stated implicitAssumption.`);
    }

    return validatesWhenStated;
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
    let implicitAssumption;

    pare((context) => {
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

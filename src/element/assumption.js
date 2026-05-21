"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import { define } from "../elements";
import { instantiateAssumption } from "../process/instantiate";
import { pare, reconcile, instantiate } from "../utilities/context";
import { assumptionFromAssumptionNode } from "../utilities/element";
import { assumptionStringFromStatement } from "../utilities/string";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

const { each, filter } = arrayUtilities;

export default define(class Assumption extends Element {
  constructor(context, string, node, breakPoint, reference, statement) {
    super(context, string, node, breakPoint);

    this.reference = reference;
    this.statement = statement;
  }

  getReference() {
    return this.reference;
  }

  getStatement() {
    return this.statement;
  }

  getAssumptionNode() {
    const node = this.getNode(),
          assumptionNode = node;  ///

    return assumptionNode;
  }

  getStatementNode() { return this.statement.getStatementNode(); }

  getMetavariable() { return this.reference.getMetavariable(); }

  isEqualTo(assumption) {
    const assumptionNode = assumption.getNode(),
          assumptionNodeMatches = this.matchAssumptionNode(assumptionNode),
          equalTo = assumptionNodeMatches;  ///

    return equalTo;
  }

  matchAssumptionNode(assumptionNode) {
    const node = assumptionNode, ///
          nodeMatches = this.matchNode(node),
          assumptionNodeMatches = nodeMatches; ///

    return assumptionNodeMatches;
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
    const assumptionNode = this.getAssumptionNode(),
          assumption = context.findAssumptionByAssumptionNode(assumptionNode),
          validAssumption = assumption;  ///

    return validAssumption;
  }

  validate(context) {
    let assumption = null;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption...`);

    let validates = false;

    const validAssumption = this.findValidAssumption(context);

    if (validAssumption) {
      validates = true;

      assumption = validAssumption; ///

      context.debug(`...the '${assumptionString}' assumption is already valid.`);
    } else {
      const statementValidates = this.validateStatement(context);

      if (statementValidates) {
        const referenceValidates = this.validateReference(context);

        if (referenceValidates) {
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
      }

      if (validates) {
        assumption = this;  ///

        context.addAssumption(assumption);
      }
    }

    if (validates) {
      context.debug(`...validated the '${assumptionString}' assumption.`);
    }

    return assumption;
  }

  validateReference(context) {
    let referenceValidates = false;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's reference...`);

    const reference = this.reference.validate(context);

    if (reference !== null) {
      this.reference = reference;

      referenceValidates = true;
    }

    if (referenceValidates) {
      context.debug(`...validated the '${assumptionString}' assumption's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's statement...`);

    const statement = this.statement.validate(context);

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${assumptionString}' assumption's statement.`);
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' stated assumption...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${assumptionString}' stated assumption.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' derived assumption...`);

    const topLevelMetaAssertions = context.getTopLevelMetaAssertions();

    filter(topLevelMetaAssertions, (topLevelMetaAssertion) => {
      let labelUnifies;

      reconcile((context) => {
        const label = topLevelMetaAssertion.getLabel();

        labelUnifies = this.reference.unifyLabel(label, context);
      }, context);

      if (labelUnifies) {
        return true;
      }
    });

    validatesWhenDerived = each(topLevelMetaAssertions, (topLevelMetaAssertion) => {
      let statementUnifies;

      reconcile((context) => {
        const label = topLevelMetaAssertion.getLabel();

        this.reference.unifyLabel(label, context);

        const statement = topLevelMetaAssertion.getStatement();
      }, context);

      if (statementUnifies) {
        return true;
      }
    })

    if (validatesWhenDerived) {
      context.debug(`...validated the '${assumptionString}' derived assumption.`);
    }

    return validatesWhenDerived;
  }

  unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies;

    const context = specificContext, ///
          statementString = statement.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${proofAssertionString}' assumption's statement...`);

    statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${proofAssertionString}' assumption's statement.`);
    }

    return statementUnifies;
  }

  static name = "Assumption";

  toJSON() {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    return json;
  }

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            assumptionNode = instantiateAssumption(string, context),
            node = assumptionNode,  ///
            breakPoint = breakPointFromJSON(json),
            reference = referenceFromAssumptionNode(assumptionNode, context),
            statement = statementFromAssumptionNode(assumptionNode, context),
            assumption = new Assumption(context, string, node, breakPoint, reference, statement);

      return assumption;
    }, context);
  }

  static fromStatement(statement, context) {
    let assumption;

    pare((context) => {
      instantiate((context) => {
        const assumptionString = assumptionStringFromStatement(statement),
              string = assumptionString,  ///
              assumptionNode = instantiateAssumption(string, context);

        assumption = assumptionFromAssumptionNode(assumptionNode, context);
      }, context);
    }, context);

    return assumption;
  }
});

function referenceFromAssumptionNode(assumptionNode, context) {
  const metavariableNode = assumptionNode.getMetavariableNode(context),
        reference = context.findReferenceByMetavariableNode(metavariableNode);

  return reference;
}

function statementFromAssumptionNode(assumptionNode, context) {
  const statementNode = assumptionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

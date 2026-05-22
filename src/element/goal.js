"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import { define } from "../elements";
import { instantiateGoal } from "../process/instantiate";
import { reconcile, instantiate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

const { each, filter } = arrayUtilities;

export default define(class Goal extends Element {
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

  getGoalNode() {
    const node = this.getNode(),
          goalNode = node;  ///

    return goalNode;
  }

  getStatementNode() { return this.statement.getStatementNode(); }

  getMetavariable() { return this.reference.getMetavariable(); }

  isEqualTo(goal) {
    const goalNode = goal.getNode(),
          goalNodeMatches = this.matchGoalNode(goalNode),
          equalTo = goalNodeMatches;  ///

    return equalTo;
  }

  matchGoalNode(goalNode) {
    const node = goalNode, ///
          nodeMatches = this.matchNode(node),
          goalNodeMatches = nodeMatches; ///

    return goalNodeMatches;
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

  findValidGoal(context) {
    const goalNode = this.getGoalNode(),
          goal = context.findGoalByGoalNode(goalNode),
          validGoal = goal;  ///

    return validGoal;
  }

  validate(context) {
    let goal = null;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal...`);

    let validates = false;

    const validGoal = this.findValidGoal(context);

    if (validGoal !== null) {
      validates = true;

      goal = validGoal; ///

      context.debug(`...the '${goalString}' goal is already valid.`);
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
        goal = this;  ///

        context.addGoal(goal);
      }
    }

    if (validates) {
      context.debug(`...validated the '${goalString}' goal.`);
    }

    return goal;
  }

  validateReference(context) {
    let referenceValidates = false;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal's reference...`);

    const reference = this.reference.validate(context);

    if (reference !== null) {
      this.reference = reference;

      referenceValidates = true;
    }

    if (referenceValidates) {
      context.debug(`...validated the '${goalString}' goal's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal's statement...`);

    const statement = this.statement.validate(context);

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${goalString}' goal's statement.`);
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' stated goal...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${goalString}' stated goal.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' derived goal...`);

    const schemas = context.getSchemas();

    debugger

    validatesWhenDerived = each(schemas, (schema) => {
      let statementUnifies;

      reconcile((context) => {
        const statement = schema.getStatement();
      }, context);

      if (statementUnifies) {
        return true;
      }
    })

    if (validatesWhenDerived) {
      context.debug(`...validated the '${goalString}' derived goal.`);
    }

    return validatesWhenDerived;
  }

  unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies;

    const context = specificContext, ///
          statementString = statement.getString(),
          proofAssertionString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${proofAssertionString}' goal's statement...`);

    statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${proofAssertionString}' goal's statement.`);
    }

    return statementUnifies;
  }

  static name = "Goal";

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
            goalNode = instantiateGoal(string, context),
            node = goalNode,  ///
            breakPoint = breakPointFromJSON(json),
            reference = referenceFromGoalNode(goalNode, context),
            statement = statementFromGoalNode(goalNode, context),
            goal = new Goal(context, string, node, breakPoint, reference, statement);

      return goal;
    }, context);
  }
});

function referenceFromGoalNode(goalNode, context) {
  const metavariableNode = goalNode.getMetavariableNode(context),
        reference = context.findReferenceByMetavariableNode(metavariableNode);

  return reference;
}

function statementFromGoalNode(goalNode, context) {
  const statementNode = goalNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

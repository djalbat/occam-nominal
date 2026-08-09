"use strict";

import { breakPointUtilities } from "occam-languages";

import Binding from "../binding";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { instantiateGoal } from "../../process/instantiate";
import { all, any, exists } from "../../utilities/continuation";
import { isDerived, isDeclared } from "../../utilities/state";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Goal extends Binding {
  getGoalNode() {
    const node = this.getNode(),
          goalNode = node;  ///

    return goalNode;
  }

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

  findGoal(context) {
    const goalNode = this.getGoalNode(),
          goal = context.findGoalByGoalNode(goalNode);

    return goal;
  }

  validate(state, context, continuation) {
    let validates;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal...`);

    let goal;

    goal = this.findGoal(context);

    if (goal !== null) {
      context.debug(`The '${goalString}' goal is already present.`);

      validates = continuation(goal, context);
    } else {
      goal = this;  ///

      const validateReference = this.validateReference.bind(this),
            validateStatement = this.validateStatement.bind(this);

      validates = all([
        validateReference,
        validateStatement
      ], state, context, (state, context) => {
        let validates;

        const validateWhenDeclared = this.validateWhenDeclared.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenDeclared,
          validateWhenDerived
        ], state, context, (state, context) => {
          let validates;

          context.addGoal(goal);

          validates = continuation(goal, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${goalString}' goal.`);
    }

    return validates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const goalString = this.getString(); ///

      context.trace(`Validating the '${goalString}' declared goal...`);

      validatesWhenDeclared = continuation(state, context);

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${goalString}' declared goal.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const goalString = this.getString(); ///

      context.trace(`Validating the '${goalString}' derived goal...`);

      const schemas = context.getSchemas();

      validatesWhenDerived = any(schemas, (schema, context) => {
        let success = false;

        this.unifySchema(schema, context, (schemaUnifies) => {
          if (schemaUnifies) {
            success = true;
          }
        });

        return success;
      }, context, (context) => true);

      if (validatesWhenDerived) {
        validatesWhenDerived = continuation(state, context);
      }

      if (validatesWhenDerived) {
        context.debug(`...validated the '${goalString}' derived goal.`);
      }
    }

    return validatesWhenDerived;
  }

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

  static name = "Goal";

  static fromJSON(json, context) {
    let goal;

    instantiate((context) => {
      const { string } = json,
            goalNode = instantiateGoal(string, context),
            node = goalNode,  ///
            breakPoint = breakPointFromJSON(json),
            reference = referenceFromGoalNode(goalNode, context),
            statement = statementFromGoalNode(goalNode, context);

      goal = new Goal(context, string, node, breakPoint, reference, statement);
    }, context);

    return goal;
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

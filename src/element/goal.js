"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import elements from "../elements";

import { define } from "../elements";
import { instantiateGoal } from "../process/instantiate";
import { join, reconcile, instantiate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

const { each, clone, filter } = arrayUtilities;

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
    let validatesWhenDerived = false;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' derived goal...`);

    let schemas;

    schemas = context.getSchemas();

    schemas = clone(schemas); ///

    filter(schemas, (schema) => {
      const label = schema.getLabel(),
            labelUnifies = this.unifyLabel(label, context);

      if (labelUnifies) {
        return true;
      }
    });

    const schemasUnifiy = each(schemas, (schema) => {
      const schemaUnifies = this.unifySchema(schema, context);

      if (schemaUnifies) {
        return true;
      }
    });

    if (schemasUnifiy) {
      validatesWhenDerived = true;
    }

    if (validatesWhenDerived) {
      context.debug(`...validated the '${goalString}' derived goal.`);
    }

    return validatesWhenDerived;
  }

  unifyLabel(label, context) {
    let labelUnifies;

    const goalString = this.getString(),  ///
          labelString = label.getString();

    context.trace(`Unifying the '${labelString}' label with the '${goalString}' goal...`);

    reconcile((context) => {
      labelUnifies = this.reference.unifyLabel(label, context);
    }, context);

    if (labelUnifies) {
      context.debug(`...unified the '${labelString}' label with the '${goalString}' goal's reference.`);
    }

    return labelUnifies;
  }

  unifySchema(schema, context) {
    let schemaUnifies = false;

    const goalString = this.getString(),
          schemaString = schema.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${goalString}' goal...`);

    const generalContext = context, ///
          specificContext = context;  ///

    reconcile((specificContext) => {
      const label = schema.getLabel(),
            context = specificContext,  ///
            labelUnifies = this.reference.unifyLabel(label, context);

      if (labelUnifies) {
        const subproofAssertion = subproofAssertionFromStatement(this.statement, context)

        if (subproofAssertion === null) {
          const deduction = schema.getDeduction(),
                deductionUnifies = this.unifyDeduction(deduction, generalContext, specificContext);

          if (deductionUnifies) {
            schemaUnifies = true;
          }
        }
      }
    }, specificContext);

    if (schemaUnifies) {
      context.debug(`...unified the '${schemaString}' schema with the '${goalString}' goal.`);
    }

    return schemaUnifies;
  }

  unifyDeduction(deduction, generalContext, specificContext) {
    let deductionUnifies;

    const context = specificContext,  ///
          goalString = this.getString(),  ///
          deductionString = deduction.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement  with the '${goalString}' goal's '${goalString}' statement...`);

    const statement = deduction.getStatement(),
          deductionContext = deduction.getContext(); ///

    specificContext = deductionContext; ///

    join((specificContext) => {
      const statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

      if (statementUnifies) {
        deductionUnifies = true;
      }
    }, specificContext, context);

    if (deductionUnifies) {
      context.debug(`...unified the '${deductionString}' deduction's statement with the '${goalString}' goal's '${goalString}' statement.`);
    }

    return deductionUnifies;
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

function subproofAssertionFromStatement(statement, context) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  return subproofAssertion;
}

"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiateGoal } from "../process/instantiate";
import { all, some, exists } from "../utilities/continuation";
import { isDerived, isDeclared } from "../utilities/state";
import { join, reconcile, instantiate } from "../utilities/context";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  validateReference(state, context, continuation) {
    let referenceValidates;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, context) => {
      let validates;

      this.reference = reference;

      validates = continuation(state, context);

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validates the '${goalString}' goal's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.debug(`...validates the '${goalString}' goal's statement.`);
    }

    return statementValidates;
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

    const dervied = isDerived(state);

    if (dervied) {
      const goalString = this.getString(); ///

      context.trace(`Validating the '${goalString}' derived goal...`);

      const schemas = context.getSchemas();

      validatesWhenDerived = some(schemas, (schema, context) => {
        let passed = false;

        this.unifySchema(schema, context, (schemaUnifies) => {
          if (schemaUnifies) {
            passed = true;
          }
        });

        return passed;
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

  unifySchema(schema, context, continuation) {
    const goalString = this.getString(),
          schemaString = schema.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${goalString}' goal...`);

    const generalContext = context;  ///

    return reconcile((context) => {
      const label = schema.getLabel();

      return this.reference.unifyLabel(label, context, (labelUnifies) => {
        if (!labelUnifies) {
          const schemaUnifies = false;

          return continuation(schemaUnifies);
        }

        const specificContext = context,  ///
              schemaConditional = schema.isConditional(),
              subproofAssertion = subproofAssertionFromStatement(this.statement, context);

        if (schemaConditional) {
          if (subproofAssertion === null) {
            const schemaUnifies = false;

            return continuation(schemaUnifies);
          }

          return subproofAssertion.unifySchema(schema, generalContext, specificContext, (schemaUnifies) => {
            if (schemaUnifies) {
              context.debug(`...unified the '${schemaString}' schema with the '${goalString}' goal.`);
            }

            return continuation(schemaUnifies);
          });
        }

        if (subproofAssertion !== null) {
          const schemaUnifies = false;

          return continuation(schemaUnifies);
        }

        const deduction = schema.getDeduction();

        this.unifyDeduction(deduction, generalContext, specificContext, (deductionUnifies) => {
          let schemaUnifies = false;

          if (deductionUnifies) {
            schemaUnifies = true;
          }

          if (schemaUnifies) {
            context.debug(`...unified the '${schemaString}' schema with the '${goalString}' goal.`);
          }

          return continuation(schemaUnifies);
        });
      });
    }, context);
  }

  unifyDeduction(deduction, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          goalString = this.getString(),  ///
          deductionString = deduction.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement  with the '${goalString}' goal's '${goalString}' statement...`);

    const statement = deduction.getStatement(),
          deductionContext = deduction.getContext(); ///

    specificContext = deductionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let deductionUnifies = false;

          if (statementUnifies) {
            specificContext.commit(context);

            deductionUnifies = true;
          }

          if (deductionUnifies) {
            context.debug(`...unified the '${deductionString}' deduction's statement with the '${goalString}' goal's '${goalString}' statement.`);
          }

          return continuation(deductionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
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

function subproofAssertionFromStatement(statement, context) {
  let subproofAssertion;

  const { SubproofAssertion } = elements;

  subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    subproofAssertion = subproofAssertion.validate(state, context, (subproofAssertion, context) => true);  ///
  }

  return subproofAssertion;
}

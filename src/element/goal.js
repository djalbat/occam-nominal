"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { all, exists } from "../utilities/continuation";
import { instantiateGoal } from "../process/instantiate";
import { reconcile, instantiate } from "../utilities/context";

const { clone } = arrayUtilities,
      { each, filter } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  validate(context, continuation) {
    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal...`);

    const validGoal = this.findValidGoal(context);

    if (validGoal !== null) {
      const goal = validGoal; ///

      context.debug(`...the '${goalString}' goal is already valid.`);

      return continuation(goal);
    }

    const validateStatement = this.validateStatement.bind(this),
          validateReference = this.validateReference.bind(this);

    return all([
      validateReference,
      validateStatement
    ], context, (validates) => {
      if (!validates) {
        const goal = null;

        return continuation(goal);
      }

      const validatesWhenStated = this.validateWhenStated.bind(this),
            validatesWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validatesWhenStated,
        validatesWhenDerived
      ], context, (validates) => {
        let goal = null;

        if (validates) {
          goal = this; ///

          context.addGoal(goal);
        }

        if (validates) {
          context.debug(`...validated the '${goalString}' goal.`);
        }

        return continuation(goal);
      });
    });
  }

  validateReference(context, continuation) {
    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal's reference...`);

    return this.reference.validate(context, (reference) => {
      let referenceValidates = false;

      if (reference !== null) {
        this.reference = reference;

        referenceValidates = true;
      }

      if (referenceValidates) {
        context.debug(`...validated the '${goalString}' goal's reference.`);
      }

      return continuation(referenceValidates);
    });
  }

  validateStatement(context, continuation) {
    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' goal's statement...`);

    return this.statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${goalString}' goal's statement.`);
      }

      return continuation(statementValidates);
    });
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      return continuation(validatesWhenStated);
    }

    let validatesWhenStated;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' stated goal...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${goalString}' stated goal.`);
    }

    return continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      return continuation(validatesWhenDerived);
    }

    let validatesWhenDerived = false;

    const goalString = this.getString();  ///

    context.trace(`Validating the '${goalString}' derived goal...`);

    let schemas;

    schemas = context.getSchemas();

    schemas = clone(schemas); ///

    return filter(schemas, (schema, continuation) => {
      const label = schema.getLabel();

      return this.unifyLabel(label, context, continuation);
    }, () => {
      return each(schemas, (schema, continuation) => {
        return this.unifySchema(schema, context, continuation);
      }, (schemasUnifiy) => {
        if (schemasUnifiy) {
          validatesWhenDerived = true;
        }

        if (validatesWhenDerived) {
          context.debug(`...validated the '${goalString}' derived goal.`);
        }

        return continuation(validatesWhenDerived);
      });
    });
  }

  unifyLabel(label, context, continuation) {
    const goalString = this.getString(),  ///
          labelString = label.getString();

    context.trace(`Unifying the '${labelString}' label with the '${goalString}' goal...`);

    reconcile((context) => {
      return this.reference.unifyLabel(label, context, (labelUnifies) => {
        if (labelUnifies) {
          context.debug(`...unified the '${labelString}' label with the '${goalString}' goal's reference.`);
        }

        return continuation(labelUnifies);
      });
    }, context);
  }

  unifySchema(schema, context, continuation) {
    const goalString = this.getString(),
          schemaString = schema.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${goalString}' goal...`);

    const generalContext = context;  ///

    reconcile((context) => {
      const label = schema.getLabel();

      return this.reference.unifyLabel(label, context, (labelUnifies) => {
        if (labelUnifies) {
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
        }
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

    reconcile((specificContext) => {
      return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let deductionUnifies = false;

        if (statementUnifies) {
          deductionUnifies = true;

          specificContext.commit(context);
        }

        if (deductionUnifies) {
          context.debug(`...unified the '${deductionString}' deduction's statement with the '${goalString}' goal's '${goalString}' statement.`);
        }

        return continuation(deductionUnifies);
      });
    }, specificContext);
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
  let subproofAssertion;

  const { SubproofAssertion } = elements;

  subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    subproofAssertion = subproofAssertion.validate(context);  ///
  }

  return subproofAssertion;
}

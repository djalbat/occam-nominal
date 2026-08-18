"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { join, reconcile } from "../utilities/context";
import { all, some, exists } from "../utilities/continuation";
import { isDerived, isDeclared } from "../utilities/state";
import { instantiateAssumption } from "../process/instantiate";

const { asynchronousBackwardsEvery } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  getMetavariable() { return this.reference.getMetavariable(); }

  getStatementNode() { return this.statement.getStatementNode(); }

  isConditional() { return this.statement.isConditional() }

  getAssumptionNode() {
    const node = this.getNode(),
          assumptionNode = node;  ///

    return assumptionNode;
  }

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

  findAssumption(context) {
    const assumptionNode = this.getAssumptionNode(),
          assumption = context.findAssumptionByAssumptionNode(assumptionNode);

    return assumption;
  }

  findDeducedStatement(context) { return this.statement.findDeducedStatement(context); }

  findSupposedStatements(context) { return this.statement.findSupposedStatements(context); }

  findSubproofAssertion(context) { return this.statement.findSubproofAssertion(context); }

  validate(state, context, continuation) {
    let validates;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption...`);

    let assumption;

    assumption = this.findAssumption(context);

    if (assumption !== null) {
      context.debug(`The '${assumptionString}' assumption is already present.`);

      validates = continuation(assumption, context);
    } else {
      assumption = this;  ///

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

          context.addAssumption(assumption);

          validates = continuation(assumption, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${assumptionString}' assumption.`);
    }

    return validates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const assumptionString = this.getString(); ///

      context.trace(`Validating the '${assumptionString}' declared assumption...`);

      validatesWhenDeclared = continuation(state, context);

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${assumptionString}' declared assumption.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const assumptionString = this.getString(); ///

      context.trace(`Validating the '${assumptionString}' derived assumption...`);

      const schemas = context.getSchemas();

      validatesWhenDerived = some(schemas, (schema, context) => {
        let success = false;

        this.unifySchema(schema, context, (schemaUnifies) => {
          if (schemaUnifies) {
            success = true;
          }
        });

        return success;
      }, context, (context) => true); ///

      if (validatesWhenDerived) {
        validatesWhenDerived = continuation(state, context);
      }

      if (validatesWhenDerived) {
        context.debug(`...validated the '${assumptionString}' derived assumption.`);
      }
    }

    return validatesWhenDerived;
  }

  validateReference(state, context, continuation) {
    let referenceValidates;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, context) => {
      let validates;

      this.reference = reference;

      validates = continuation(state, context);

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validates the '${assumptionString}' assumption's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.debug(`...validates the '${assumptionString}' assumption's statement.`);
    }

    return statementValidates;
  }

  unifySchema(schema, context, continuation) {
    const assumptionString = this.getString(),
          schemaString = schema.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${assumptionString}' assumption...`);

    const generalContext = context;  ///

    return reconcile((context) => {
      const label = schema.getLabel();

      return this.reference.unifyLabel(label, context, (labelUnifies) => {
        const specificContext = context;  ///

        if (!labelUnifies) {
          const schemaUnifies = false;

          return continuation(schemaUnifies);
        }

        const deduction = schema.getDeduction(),
              deducedStatement = this.findDeducedStatement(context);

        return this.unifyDeduction(deduction, deducedStatement, generalContext, specificContext, (deductionUnifies) => {
          let schemaUnifies = false;

          if (!deductionUnifies) {
            return continuation(schemaUnifies);
          }

          const conditional = this.isConditional(),
                schemaConditional = schema.isConditional();

          if (conditional !== schemaConditional) {
            context.trace(`Either the '${schemaString}' schema is unconditional whilst the '${assumptionString}' assumption is conditional or vice verse.`);

            return continuation(schemaUnifies);
          }

          const suppositions = schema.getSuppositions(),
                supposedStatements = this.findSupposedStatements(context);

          return this.unifySuppositions(suppositions, supposedStatements, generalContext, specificContext, (suppositionsUnify) => {
            if (suppositionsUnify) {
              schemaUnifies = true;
            }

            if (schemaUnifies) {
              context.debug(`...unified the '${schemaString}' schema with the '${assumptionString}' assumption.`);
            }

            return continuation(schemaUnifies);
          });
        });
      });
    }, context);
  }

  unifyDeduction(deduction, deducedStatement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          assumptionString = this.getString(),  ///
          deductionString = deduction.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement  with the '${assumptionString}' assumption's '${assumptionString}' statement...`);

    const statement = deduction.getStatement(),
          deductionContext = deduction.getContext();

    specificContext = deductionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return deducedStatement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let deductionUnifies = false;

          if (statementUnifies) {
            specificContext.commit(context);

            deductionUnifies = true;
          }

          if (deductionUnifies) {
            context.debug(`...unified the '${deductionString}' deduction's statement with the '${assumptionString}' assumption's '${assumptionString}' statement.`);
          }

          return continuation(deductionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySupposition(supposition, supposedStatement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${suppositionString}' supposition's statement  with the '${supposedStatementString}' supposed statement...`);

    const statement = supposition.getStatement(),
          suppositionContext = supposition.getContext();

    specificContext = suppositionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return supposedStatement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let suppositionUnifies = false;

          if (statementUnifies) {
            specificContext.commit(context);

            suppositionUnifies = true;
          }

          if (suppositionUnifies) {
            context.debug(`...unified the '${suppositionString}' supposition's statement  with the '${supposedStatementString}' supposed statement.`);
          }

          return continuation(suppositionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, supposedStatements, generalContext, specificContext, continuation) {
    const suppositionsLength = suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const suppositionsUnify = false;

      return continuation(suppositionsUnify);
    }

    let index = suppositionsLength; ///

    return asynchronousBackwardsEvery(suppositions, (supposition, continuation) => {
      index--;

      const supposedStatement = supposedStatements[index];

      return this.unifySupposition(supposition, supposedStatement, generalContext, specificContext, continuation);
    }, continuation);
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

  static name = "Assumption";

  static fromJSON(json, context) {
    let assumption;

    instantiate((context) => {
      const { string } = json,
            assumptionNode = instantiateAssumption(string, context),
            node = assumptionNode,  ///
            breakPoint = breakPointFromJSON(json),
            reference = referenceFromAssumptionNode(assumptionNode, context),
            statement = statementFromAssumptionNode(assumptionNode, context);

      assumption = new Assumption(context, string, node, breakPoint, reference, statement);
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

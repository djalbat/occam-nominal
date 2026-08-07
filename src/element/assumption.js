"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiateAssumption } from "../process/instantiate";
import { reconcile, instantiate } from "../utilities/context";
import { all, each, exists, filter } from "../utilities/continuation";

const { clone } = arrayUtilities,
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

  findAssumption(context) {
    const assumptionNode = this.getAssumptionNode(),
          assumption = context.findAssumptionByAssumptionNode(assumptionNode);

    return assumption;
  }

  validate(state, context, continuation) {
    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption...`);

    const assumption = this.findAssumption(context);

    if (assumption !== null) {
      context.debug(`...the '${assumptionString}' assumption is already presenet.`);

      return continuation(assumption);
    }

    const validateStatement = this.validateStatement.bind(this),
          validateReference = this.validateReference.bind(this);

    return all([
      validateStatement,
      validateReference
    ], state, context, (state, context) => {

      const validateWhenDeclared = this.validateWhenDeclared.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenDeclared,
        validateWhenDerived
      ], state, context, (state, context) => {
        const assumption = this;  ///

        context.addAssumption(assumption);

        context.debug(`...validated the '${assumptionString}' assumption.`);

        return continuation(assumption);
      });
    });
  }

  validateReference(state, context, continuation) {
    let referenceValidates;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, state, context) => {
      let validates;

      this.reference = reference;

      validates = continuation(state, context);

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validated the '${assumptionString}' assumption's reference.`);
    }
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, state, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.debug(`...validated the '${assumptionString}' assumption's statement.`);
    }

    return statementValidates;
  }

  validateWhenDeclared(state, context, continuation) {
    if (!state) {
      const validatesWhenDeclared = false;

      return continuation(validatesWhenDeclared);
    }

    let validatesWhenDeclared;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' state assumption...`);

    validatesWhenDeclared = true

    if (validatesWhenDeclared) {
      context.debug(`...validated the '${assumptionString}' state assumption.`);
    }

    return continuation(validatesWhenDeclared);
  }

  validateWhenDerived(state, context, continuation) {
    if (state) {
      const validatesWhenDerived = false;

      return continuation(validatesWhenDerived);
    }

    let validatesWhenDerived = false;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' derived assumption...`);

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
          context.debug(`...validated the '${assumptionString}' derived assumption.`);
        }

        return continuation(validatesWhenDerived);
      });
    });
  }

  unifyLabel(label, context, continuation) {
    const labelString = label.getString(),
          assumptionString = this.getString();  ///

    context.trace(`Unifying the '${labelString}' label with the '${assumptionString}' assumption's reference...`);

    return reconcile((context) => {
      return this.reference.unifyLabel(label, context, (labelUnifies) => {
        if (labelUnifies) {
          context.debug(`...unified the '${labelString}' label with the '${assumptionString}' assumption's reference.`);
        }

        return continuation(labelUnifies);
      });
    }, context);
  }

  unifySchema(schema, context, continuation) {
    const schemaString = schema.getString(),
          assumptionString = this.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${assumptionString}' assumption...`);

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
              subproofAssertion = subproofAssertionFromStatement(this.statement, context)

        if (schemaConditional) {
          if (subproofAssertion === null) {
            const schemaUnifies = false;

            return continuation(schemaUnifies);
          }
          return subproofAssertion.unifySchema(schema, generalContext, specificContext, (schemaUnifies) => {
            if (schemaUnifies) {
              context.debug(`...unified the '${schemaString}' schema with the '${assumptionString}' assumption.`);
            }

            return continuation(schemaUnifies);
          });
        }

        if (subproofAssertion !== null) {
          const schemaUnifies = false;

          return continuation(schemaUnifies);
        }

        const deduction = schema.getDeduction();

        return this.unifyDeduction(deduction, generalContext, specificContext, (deductionUnifies) => {
          let schemaUnifies = false;

          if (deductionUnifies) {
            schemaUnifies = true;
          }

          if (schemaUnifies) {
            context.debug(`...unified the '${schemaString}' schema with the '${assumptionString}' assumption.`);
          }

          return continuation(schemaUnifies);
        });
      });
    }, context);
  }

  unifyDeduction(deduction, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          deductionString = deduction.getString(),
          assumptionString = this.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement with the '${assumptionString}' assumption's '${assumptionString}' statement...`);

    const statement = deduction.getStatement(),
          deductionContext = deduction.getContext(); ///

    specificContext = deductionContext; ///

    return reconcile((specificContext) => {
      this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let deductionUnifies = false;

        if (statementUnifies) {
          deductionUnifies = true;

          specificContext.commit(context);
        }

        if (deductionUnifies) {
          context.debug(`...unified the '${deductionString}' deduction's statement with the '${assumptionString}' assumption's '${assumptionString}' statement.`);
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

function subproofAssertionFromStatement(statement, context) {
  let subproofAssertion;

  const { SubproofAssertion } = elements;

  subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    subproofAssertion = subproofAssertion.validate(state, context);
  }

  return subproofAssertion;

}


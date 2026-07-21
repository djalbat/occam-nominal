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

  findValidAssumption(context) {
    const assumptionNode = this.getAssumptionNode(),
          assumption = context.findAssumptionByAssumptionNode(assumptionNode),
          validAssumption = assumption;  ///

    return validAssumption;
  }

  validate(context, continuation) {
    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption...`);

    const validAssumption = this.findValidAssumption(context);

    if (validAssumption !== null) {
      const assumption = validAssumption; ///

      context.debug(`...the '${assumptionString}' assumption is already valid.`);

      return continuation(assumption);
    }

    const validateStatement = this.validateStatement.bind(this),
          validateReference = this.validateReference.bind(this);

    return all([
      validateStatement,
      validateReference
    ], context, (validates) => {
      if (!validates) {
        const assumption = null;

        return continuation(assumption);
      }

      const validateWhenStated = this.validateWhenStated.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenStated,
        validateWhenDerived
      ], context, (validates) => {
        let assumption = null;

        if (validates) {
          assumption = this;  ///

          context.addAssumption(assumption);
        }

        if (validates) {
          context.debug(`...validated the '${assumptionString}' assumption.`);
        }

        return continuation(assumption);
      });
    });
  }

  validateReference(context, continuation) {
    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's reference...`);

    this.reference.validate(context, (reference) => {
      let referenceValidates = false;

      if (reference !== null) {
        this.reference = reference;

        referenceValidates = true;
      }

      if (referenceValidates) {
        context.debug(`...validated the '${assumptionString}' assumption's reference.`);
      }

      return continuation(referenceValidates);
    });
  }

  validateStatement(context, continuation) {
    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's statement...`);

    this.statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${assumptionString}' assumption's statement.`);
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

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' stated assumption...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${assumptionString}' stated assumption.`);
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

    reconcile((context) => {
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

    reconcile((context) => {
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

    reconcile((specificContext) => {
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
    subproofAssertion = subproofAssertion.validate(context);
  }

  return subproofAssertion;

}


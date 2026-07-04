"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiateAssumption } from "../process/instantiate";
import { reconcile, instantiate } from "../utilities/context";

const { each, clone, filter } = arrayUtilities,
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

  validate(context) {
    let assumption = null;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption...`);

    let validates = false;

    const validAssumption = this.findValidAssumption(context);

    if (validAssumption !== null) {
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
    let validatesWhenDerived = false;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' derived assumption...`);

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
      context.debug(`...validated the '${assumptionString}' derived assumption.`);
    }

    return validatesWhenDerived;
  }

  unifyLabel(label, context) {
    let labelUnifies;

    const labelString = label.getString(),
          assumptionString = this.getString();  ///

    context.trace(`Unifying the '${labelString}' label with the '${assumptionString}' assumption's reference...`);

    reconcile((context) => {
      labelUnifies = this.reference.unifyLabel(label, context);
    }, context);

    if (labelUnifies) {
      context.debug(`...unified the '${labelString}' label with the '${assumptionString}' assumption's reference.`);
    }

    return labelUnifies;
  }

  unifySchema(schema, context) {
    let schemaUnifies = false;

    const schemaString = schema.getString(),
          assumptionString = this.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${assumptionString}' assumption...`);

    const generalContext = context;  ///

    reconcile((context) => {
      const label = schema.getLabel(),
            labelUnifies = this.reference.unifyLabel(label, context);

      if (labelUnifies) {
        const specificContext = context,  ///
              schemaConditional = schema.isConditional(),
              subproofAssertion = subproofAssertionFromStatement(this.statement, context)

        if (schemaConditional) {
          if (subproofAssertion !== null) {
            schemaUnifies = subproofAssertion.unifySchema(schema, generalContext, specificContext);
          }
        } else {
          if (subproofAssertion === null) {
            const deduction = schema.getDeduction(),
                  deductionUnifies = this.unifyDeduction(deduction, generalContext, specificContext);

            if (deductionUnifies) {
              schemaUnifies = true;
            }
          }
        }
      }
    }, context);

    if (schemaUnifies) {
      context.debug(`...unified the '${schemaString}' schema with the '${assumptionString}' assumption.`);
    }

    return schemaUnifies;
  }

  unifyDeduction(deduction, generalContext, specificContext) {
    let deductionUnifies;

    const context = specificContext,  ///
          deductionString = deduction.getString(),
          assumptionString = this.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement with the '${assumptionString}' assumption's '${assumptionString}' statement...`);

    const statement = deduction.getStatement(),
          deductionContext = deduction.getContext(); ///

    specificContext = deductionContext; ///

    reconcile((specificContext) => {
      const statementUnifies = this.statement.unifyStatement(statement, generalContext, specificContext);

      if (statementUnifies) {
        deductionUnifies = true;

        specificContext.commit(context);
      }
    }, specificContext);

    if (deductionUnifies) {
      context.debug(`...unified the '${deductionString}' deduction's statement with the '${assumptionString}' assumption's '${assumptionString}' statement.`);
    }

    return deductionUnifies;
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


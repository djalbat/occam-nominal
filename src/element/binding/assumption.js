"use strict";

import { breakPointUtilities } from "occam-languages";

import Binding from "../binding";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { instantiateAssumption } from "../../process/instantiate";
import { all, some, exists } from "../../utilities/continuation";
import { isDerived, isDeclared } from "../../utilities/state";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Assumption extends Binding {
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

    const dervied = isDerived(state);

    if (dervied) {
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
      }, context, (context) => true);

      if (validatesWhenDerived) {
        validatesWhenDerived = continuation(state, context);
      }

      if (validatesWhenDerived) {
        context.debug(`...validated the '${assumptionString}' derived assumption.`);
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

"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { unifyStatement } from "../process/unify";
import { instantiateConstraint } from "../process/instantiate";
import { stripBracketsFromStatement } from "../utilities/brackets";
import { constraintFromConstraintNode } from "../utilities/element";
import { constraintStringFromReferenceAndStatement } from "../utilities/string";
import { ablate, attempt, descend, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Constraint extends Element {
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

  getConstraintNode() {
    const node = this.getNode(),
          constraintNode = node;  ///

    return constraintNode;
  }

  getMetavariable() { return this.reference.getMetavariable(); }

  isEqualTo(constraint) {
    const constraintNode = constraint.getNode(),
          constraintNodeMatches = this.matchConstraintNode(constraintNode),
          equalTo = constraintNodeMatches;  ///

    return equalTo;
  }

  matchConstraintNode(constraintNode) {
    const node = constraintNode, ///
          nodeMatches = this.matchNode(node),
          constraintNodeMatches = nodeMatches; ///

    return constraintNodeMatches;
  }

  findValidConstraint(context) {
    const constraintNode = this.getConstraintNode(),
          constraint = context.findConstraintByConstraintNode(constraintNode),
          validConstraint = constraint;  ///

    return validConstraint;
  }

  async validate(context) {
    let constraint = null;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint...`);

    let validates = false;

    const validConstraint = this.findValidConstraint(context);

    if (validConstraint !== null) {
      validates = true;

      constraint = validConstraint; ///

      context.debug(`...the '${constraintString}' constraint is already valid.`);
    } else {
      const temporaryContext = context; ///

      context = this.getContext();

      attempt((context) => {
        const statementValidates = await this.validateStatement(context);

        if (statementValidates) {
          const referenceValidates = await this.validateReference(context);

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
          this.commit(context);
        }
      }, context);

      context = temporaryContext; ///

      if (validates) {
        constraint = this;  ///

        context.addConstraint(constraint);
      }
    }

    if (validates) {
      context.debug(`...validated the '${constraintString}' constraint.`);
    }

    return constraint;
  }

  validateReference(context) {
    let referenceValidates = false;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's reference...`);

    const reference = this.reference.validate(context);

    if (reference !== null) {
      const metavariable = this.reference.getMetavariable(),
            metavariableDeclared = metavariable.isDeclared();

      if (metavariableDeclared) {
        this.reference = reference;

        referenceValidates = true;
      }
    }

    if (referenceValidates) {
      context.debug(`...validated the '${constraintString}' constraint's reference.`);
    }

    return referenceValidates;
  }

  async validateStatement(context) {
    let statementValidates = false;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's statement...`);

    await descend(async (context) => {
      const statement = await this.statement.validate(context);

      if (statement !== null) {
        statementValidates = true;
      }
    }, context);

    if (statementValidates) {
      context.debug(`...validated the '${constraintString}' constraint's statement.`);
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' stated constraint...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${constraintString}' stated constraint.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' derived constraint...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...validated the '${constraintString}' derived constraint.`);
    }

    return validatesWhenDerived;
  }

  unifyReference(reference, generalContext, specificContext) {
    let referenceUnifies;

    if (reference !== null) {
      const context = specificContext,  ///
            referenceString = reference.getString(),
            constraintString = this.getString(); ///

      context.trace(`Unifying the '${referenceString}' reference with the '${constraintString}' constraint's reference...`);

      const metavariable = this.getMetavariable();

      referenceUnifies = metavariable.unifyReference(reference, generalContext, specificContext);

      if (referenceUnifies) {
        context.debug(`..unified the '${referenceString}' with the '${constraintString}' constraint's reference.`);
      }
    } else {
      referenceUnifies = true;  ///
    }

    return referenceUnifies;
  }

  async unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies;

    const context = specificContext,  ///
          statementString = statement.getString(),
          constraintString = this.getString(); ///

    context.trace(`Unifying the '${statementString}' statement with the '${constraintString}' constraint's statement...`);

    const generalStatement = this.statement,  ///
          specificStatement = stripBracketsFromStatement(statement, context);  ///

    statementUnifies = await unifyStatement(generalStatement, specificStatement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${constraintString}' constraint's statement.`);
    }

    return statementUnifies;
  }

  async unifyAssumption(assumption, context) {
    let assumptionUnifies = false;

    const assumptionString = assumption.getString(),  ///
          constraintString = this.getString();

    context.trace(`Unifying the '${assumptionString}' assumption with the '${constraintString}' constraint...`);

    const constraintContext = this.getContext(), ///
          generalContext = constraintContext; ///

    await reconcile(async (context) => {
      const reference = assumption.getReference(),
            specificContext = context,  ///
            referneceUnifies = this.unifyReference(reference, generalContext, specificContext);

      if (referneceUnifies) {
        const statement = assumption.getStatement(),
              statementUnified = await this.unifyStatement(statement, generalContext, specificContext);

        if (statementUnified) {
          context.commit();

          assumptionUnifies = true;
        }
      }
    }, context);

    if (assumptionUnifies) {
      context.debug(`...unified the '${assumptionString}' assumption with the '${constraintString}' constraint...`);
    }

    return assumptionUnifies;
  }

  unifyAssumptions(assumptions, context) {
    const assumptionsUnify = assumptions.some((assumption) => {
      const assumptionUnifies = this.unifyAssumption(assumption, context);

      if (assumptionUnifies) {
        return true;
      }
    });

    return assumptionsUnify;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }

  static name = "Constraint";

  static fromJSON(json, context) {
    let constraint;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              constraintNode = instantiateConstraint(string, context),
              node = constraintNode,  ///
              breakPoint = breakPointFromJSON(json),
              reference = referenceFromConstraintNode(constraintNode, context),
              statement = statementFromConstraintNode(constraintNode, context);

        constraint = new Constraint(context, string, node, breakPoint, reference, statement);
      }, json, context);
    }, context);

    return constraint;
  }

  static fromStep(step, context) {
    let constraint;

    let statement;

    statement = step.getStatement();

    statement = stripBracketsFromStatement(statement, context); ///

    const reference = step.getReference();

    ablate((context) => {
      instantiate((context) => {
        const constraintString = constraintStringFromReferenceAndStatement(reference, statement),
              string = constraintString,  ///
              constraintNode = instantiateConstraint(string, context);

        constraint = constraintFromConstraintNode(constraintNode, context);
      }, context);
    }, context);

    return constraint;
  }
});

function referenceFromConstraintNode(constraintNode, context) {
  const referenceNode = constraintNode.getReferenceNode(),
        refernece = context.findReferenceByReferenceNode(referenceNode);

  return refernece;
}

function statementFromConstraintNode(constraintNode, context) {
  const statementNode = constraintNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

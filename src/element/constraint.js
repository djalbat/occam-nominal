"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { all, exists } from "../utilities/continuation";
import { unifyStatement } from "../process/unify";
import { instantiateConstraint } from "../process/instantiate";
import { stripBracketsFromStatement } from "../utilities/brackets";
import { constraintFromConstraintNode } from "../utilities/element";
import { constraintStringFromReferenceAndStatement } from "../utilities/string";
import { ablate, attempt, descend, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { some } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  validate(context, continuation) {
    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint...`);

    const validConstraint = this.findValidConstraint(context);

    if (validConstraint !== null) {
      const constraint = validConstraint; ///

      context.debug(`...the '${constraintString}' constraint is already valid.`);

      return continuation(constraint);
    } else {
      context = this.getContext();

      attempt((context) => {
        const validateStatement = this.validateStatement.bind(this),
              validateReference = this.validateReference.bind(this);

        return all([
          validateStatement,
          validateReference
        ], context, (validates) => {
          if (!validates) {
            const constraint = null;

            return continuation(constraint);
          }

          const validateWhenStated = this.validateWhenStated.bind(this),
                validateWhenDerived = this.validateWhenDerived.bind(this);

          return exists([
            validateWhenStated,
            validateWhenDerived
          ], context, (validates) => {
            let constraint = null;

            if (validates) {
              constraint = this;  ///

              context.addConstraint(constraint);
            }

            if (validates) {
              this.commit(context);
            }

            if (validates) {
              context.debug(`...validated the '${constraintString}' constraint.`);
            }

            return continuation(constraint);
          });
        });
      }, context);
    }
  }

  validateReference(context, continuation) {
    let referenceValidates = false;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's reference...`);

    this.reference.validate(context, (reference) => {
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

      return continuation(referenceValidates);
    });
  }

  validateStatement(context, continuation) {
    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's statement...`);

    descend((context) => {
      this.statement.validate(context, (statement) => {
        let statementValidates = false;

        if (statement !== null) {
          statementValidates = true;
        }

        if (statementValidates) {
          context.debug(`...validated the '${constraintString}' constraint's statement.`);
        }

        return continuation(statementValidates);
      });
    }, context);
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      return continuation(validatesWhenStated);
    }

    let validatesWhenStated;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' stated constraint...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${constraintString}' stated constraint.`);
    }

    return continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      return continuation(validatesWhenDerived);
    }

    let validatesWhenDerived;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' derived constraint...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...validated the '${constraintString}' derived constraint.`);
    }

    return continuation(validatesWhenDerived);
  }

  unifyReference(reference, generalContext, specificContext, continuation) {
    if (reference === null) {
      const referenceUnifies = true;  ///

      return continuation(referenceUnifies);
    }

    const context = specificContext,  ///
          referenceString = reference.getString(),
          constraintString = this.getString(); ///

    context.trace(`Unifying the '${referenceString}' reference with the '${constraintString}' constraint's reference...`);

    const metavariable = this.getMetavariable();

    return metavariable.unifyReference(reference, generalContext, specificContext, (referenceUnifies) => {
      if (referenceUnifies) {
        context.debug(`..unified the '${referenceString}' with the '${constraintString}' constraint's reference.`);
      }

      return continuation(referenceUnifies);
    });
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          statementString = statement.getString(),
          constraintString = this.getString(); ///

    context.trace(`Unifying the '${statementString}' statement with the '${constraintString}' constraint's statement...`);

    const generalStatement = this.statement,  ///
          specificStatement = stripBracketsFromStatement(statement, context);  ///

    return unifyStatement(generalStatement, specificStatement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${constraintString}' constraint's statement.`);
      }

      return continuation(statementUnifies);
    });
  }

  unifyAssumption(assumption, context, continuation) {
    const assumptionString = assumption.getString(),  ///
          constraintString = this.getString();

    context.trace(`Unifying the '${assumptionString}' assumption with the '${constraintString}' constraint...`);

    const constraintContext = this.getContext(), ///
          generalContext = constraintContext; ///

    reconcile((context) => {
      const reference = assumption.getReference(),
            specificContext = context;  ///

      return this.unifyReference(reference, generalContext, specificContext, (referneceUnifies) => {
        if (!referneceUnifies) {
          const assumptionUnifies = false;

          return continuation(assumptionUnifies);
        }

        const statement = assumption.getStatement();

        return this.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let assumptionUnifies = false;

          if (statementUnifies) {
            context.commit();

            assumptionUnifies = true;
          }

          if (assumptionUnifies) {
            context.debug(`...unified the '${assumptionString}' assumption with the '${constraintString}' constraint...`);
          }

          return continuation(assumptionUnifies);
        });
      });
    }, context);
  }

  unifyAssumptions(assumptions, context, continuation) {
    some(assumptions, (assumption, continuation) => {
      this.unifyAssumption(assumption, context, continuation);
    }, continuation);
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

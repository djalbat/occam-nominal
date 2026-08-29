"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { unifyStatement } from "../process/unify";
import { instantiateConstraint } from "../process/instantiate";
import { stripBracketsFromStatement } from "../utilities/brackets";
import { constraintFromConstraintNode } from "../utilities/element";
import { constraintStringFromReferenceAndStatement } from "../utilities/string";
import { join, ablate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { cut, all, some, isolate } = continuationUtilities,
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

  findConstraint(context) {
    const constraintNode = this.getConstraintNode(),
          constraint = context.findConstraintByConstraintNode(constraintNode);

    return constraint;
  }

  validate(state, context, forward, back) {
    forward = cut(forward, back); ///

    let constraint;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint...`);

    constraint = this.findConstraint(context);

    if (constraint !== null) {
      context.debug(`The '${constraintString}' constraint is already present.`);

      return forward(constraint, context, back);
    }

    return isolate((state, context, forward, back) => {
      constraint = this;  ///

      context = this.getContext();

      return attempt((context) => {
        const validateStatement = this.validateStatement.bind(this),
              validateReference = this.validateReference.bind(this);

        return all([
          validateStatement,
          validateReference
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      context.addConstraint(constraint);

      context.debug(`...validated the '${constraintString}' constraint.`);

      return forward(constraint, context, back);
    }, back);
  }

  validateReference(state, context, forward, back) {
    let referenceValidates;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, context) => {
      let validates;

      this.reference = reference;

      validates = continuation(state, context);

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validated the '${constraintString}' constraint's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(state, context, forward, back) {
    let statementValidates;

    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.debug(`...validated the '${constraintString}' constraint's statement.`);
    }

    return statementValidates;
  }

  unifyReference(reference, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          referenceString = reference.getString(),
          constraintString = this.getString(); ///

    context.trace(`Unifying the '${referenceString}' reference with the '${constraintString}' constraint's metavaraiable...`);

    const metavariable = this.getMetavariable();

    return metavariable.unifyReference(reference, generalContext, specificContext, (referenceUnifies) => {
      if (referenceUnifies) {
        context.debug(`..unified the '${referenceString}' with the '${constraintString}' constraint's metavariable.`);
      }

      return continuation(referenceUnifies);
    });
  }

  unifyStatement(statement, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          statementString = statement.getString(),
          constraintString = this.getString(); ///

    context.trace(`Unifying the '${statementString}' statement with the '${constraintString}' constraint's statement...`);

    let specificStatement;

    specificStatement = statement;  ///

    specificStatement = stripBracketsFromStatement(specificStatement, context);  ///

    const generalStatement = this.statement;  ///

    return unifyStatement(generalStatement, specificStatement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${constraintString}' constraint's statement.`);
      }

      return continuation(statementUnifies);
    });
  }

  unifyAssumption(assumption, context, forward, back) {
    const constraintString = this.getString(),  ///
          assumptionString = assumption.getString()  ///

    context.trace(`Unifying the '${assumptionString}' assumption with the '${constraintString}' constraint...`);

    const constraintContext = this.getContext(), ///
          generalContext = constraintContext; ///

    return reconcile((context) => {
      const reference = assumption.getReference(),
            specificContext = context;  ///

      return this.unifyReference(reference, generalContext, specificContext, (referenceUnifies) => {
        if (!referenceUnifies) {
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

  unifyAssumptions(assumptions, context, forward, back) {
    const constraintString = this.getString();

    context.trace(`Unifying the assumptions with the '${constraintString}' constraint...`);

    some(assumptions, (assumption, forward, back) => {
      this.unifyAssumption(assumption, context, forward, back);
    }, (assumptionsUnify) => {
      if (assumptionsUnify) {
        context.trace(`...unified the assumptions with the '${constraintString}' constraint.`);
      }

      return continuation(assumptionsUnify);
    });
  }

  unifyImplicitAssumption(implicitAssumption, context, forward, back) {
    const constraintString = this.getString(),  ///
          implicitAssumptionString = implicitAssumption.getString();  ///

    context.trace(`Unifying the '${implicitAssumptionString}' implicit assumption with the '${constraintString}' constraint...`);

    const constraintContext = this.getContext(), ///
          implicitAssumptionContext = implicitAssumption.getContext(),
          generalContext = constraintContext, ///
          specificContext = implicitAssumptionContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const statement = implicitAssumption.getStatement();

        return this.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let implicitAssumptionUnifies = false;

          if (statementUnifies) {
            specificContext.commit(context);

            implicitAssumptionUnifies = true;
          }

          if (implicitAssumptionUnifies) {
            context.debug(`...unified the '${implicitAssumptionString}' impllicit assumption with the '${constraintString}' constraint...`);
          }

          return continuation(implicitAssumptionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifyImplicitAssumptions(implicitAssumptions, context, forward, back) {
    const constraintString = this.getString();

    context.trace(`Unifying the implicit assumptions with the '${constraintString}' constraint...`);

    some(implicitAssumptions, (implicitAssumption, forward, back) => {
      this.unifyImplicitAssumption(implicitAssumption, context, forward, back);
    }, (implicitAssumptionsUnify) => {
      if (implicitAssumptionsUnify) {
        context.trace(`...unified the implicit assumptions with the '${constraintString}' constraint.`);
      }

      return continuation(implicitAssumptionsUnify);
    });
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

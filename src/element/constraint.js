"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { unifyStatement } from "../process/unify";
import { instantiateConstraint } from "../process/instantiate";
import { stripBracketsFromStatement } from "../utilities/brackets";
import { constraintFromConstraintNode } from "../utilities/element";
import { pare, join, ablate, attempt, reconcile, unserialise, instantiate } from "../utilities/context";
import { assumptionsStringFromAssumptions, constraintStringFromReferenceAndStatement, implicitAssumptionsStringFromImplicitAssumptions } from "../utilities/string";

const { unbreakable } = breakPointUtilities,
      { cut, all, some, isolate } = continuationUtilities;

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

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const constraintString = this.getString(); ///

    context.trace(`Verifying the '${constraintString}' constraint...`);

    return isolate((context, forward, back) => {
      return pare((context) => {
        return declare((state) => {
          return this.validate(state, context, (constraint, context, back) => {
            return forward(back);
          }, back);
        });
      }, context);
    }, context, (context, back) => {
      context.debug(`...verified the '${constraintString}' constraint.`);

      return forward(context, back);
    }, back);
  });

  validate(state, context, forward, back) {
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
    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's reference...`);

    return this.reference.validate(state, context, (reference, context, back) => {
      this.reference = reference;

      context.trace(`...validated the '${constraintString}' constraint's reference.`);

      return forward(state, context, back);
    }, back);
  }

  validateStatement(state, context, forward, back) {
    const constraintString = this.getString();  ///

    context.trace(`Validating the '${constraintString}' constraint's statement...`);

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.trace(`...validated the '${constraintString}' constraint's statement.`);

      return forward(state, context, back);
    }, back);
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

    return unifyStatement(generalStatement, specificStatement, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${statementString}' statement with the '${constraintString}' constraint's statement.`);

      return forward(generalContext, specificContext, back);
    }, back);
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

      return this.unifyReference(reference, generalContext, specificContext, (generalContext, specificContext, back) => {
        const statement = assumption.getStatement();

        return this.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          context.commit();

          context.debug(`...unified the '${assumptionString}' assumption with the '${constraintString}' constraint...`);

          return forward(context, back);
        }, back);
      }, back);
    }, context);
  }

  unifyAssumptions(assumptions, context, forward, back) {
    const constraintString = this.getString(),
          assumptionsString = assumptionsStringFromAssumptions(assumptions);

    context.trace(`Unifying the ${assumptionsString} assumptions with the '${constraintString}' constraint...`);

    return some(assumptions, (assumption, context, forward, back) => {
      return this.unifyAssumption(assumption, context, forward, back);
    }, context, (context, back) => {
      context.debug(`...unified the ${assumptionsString} assumptions with the '${constraintString}' constraint.`);

      return forward(context, back);
    }, back);
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

        return this.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${implicitAssumptionString}' impllicit assumption with the '${constraintString}' constraint...`);

          return forward(context, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifyImplicitAssumptions(implicitAssumptions, context, forward, back) {
    const constraintString = this.getString(),
          implicitAssertionsString = implicitAssumptionsStringFromImplicitAssumptions(implicitAssumptions);

    context.trace(`Unifying the ${implicitAssertionsString} implicit assumptions with the '${constraintString}' constraint...`);

    return some(implicitAssumptions, (implicitAssumption, context, forward, back) => {
      this.unifyImplicitAssumption(implicitAssumption, context, forward, back);
    }, context, (context, back) => {
      context.debug(`...unified the ${implicitAssertionsString} implicit assumptions with the '${constraintString}' constraint.`);

      return forward(context, back);
    }, back);
  }

  static name = "Constraint";

  static fromJSON(json, context) {
    let constraint;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              constraintNode = instantiateConstraint(string, context),
              node = constraintNode,  ///
              breakPoint = null,
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

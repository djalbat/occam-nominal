"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { unifyStatement } from "../process/unify";
import { instantiateConstraint } from "../process/instantiate";
import { stripBracketsFromStatement } from "../utilities/brackets";
import { constraintStringFromReferenceAndStatement } from "../utilities/string";
import { constraintFromConstraintNode, referenceFromConstraintNode } from "../utilities/element";
import { pare, join, ablate, isolate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { unbreakable } = breakPointUtilities,
      { cut, all, some, exists } = continuationUtilities;

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

  apply = unbreakable(function (implicitAssumptions, assumptions, context, forward, back) {
    forward = cut(forward, back); ///

    const constraingString = this.getString();  ///

    context.trace(`Applying the '${constraingString}' constraint...`);

    const unifyAssumptions = this.unifyAssumptions.bind(this),
          unifyImplicitAssumptions = this.unifyImplicitAssumptions.bind(this);

    return exists([
      unifyAssumptions,
      unifyImplicitAssumptions
    ], implicitAssumptions, assumptions, context, (implicitAssumptions, assumptions, context, back) => {
      context.debug(`...applied the '${constraingString}' constraint.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${constraingString}' constraint.`);

      return back();
    });
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

  unifyLink(link, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          linkString = link.getString(),
          constraintString = this.getString(); ///

    context.trace(`Unifying the '${linkString}' link with the '${constraintString}' constraint's reference...`);

    return this.reference.unifyLink(link, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${linkString}' link with the '${constraintString}' constraint's reference.`);

      return forward(generalContext, specificContext, back);
    }, back);
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
          assumptionString = assumption.getString();

    context.trace(`Unifying the '${assumptionString}' implicit assumption with the '${constraintString}' constraint...`);

    return isolate((assumption, context, forward, back) => {
      return reconcile((context) => {
        const link = assumption.getLink(),
              statement = assumption.getStatement(),
              generalContext = this.getContext(), ///
              specificContext = context;  ///

        return this.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          return this.unifyLink(link, generalContext, specificContext, (generalContext, specificContext, back) => {
            context = specificContext;  ///

            context.commit();

            return forward(back);
          }, back);
        }, back);
      }, context);
    }, assumption, context, (assumption, context, back) => {
      context.debug(`...unified the '${assumptionString}' implicit assumption with the '${constraintString}' constraint...`);

      return forward(context, back);
    }, back);
  }

  unifyAssumptions(implicitAssumptions, assumptions, context, forward, back) {
    return some(assumptions, (assumption, context, forward, back) => {
      return this.unifyAssumption(assumption, context, (context, back) => {
        return forward(implicitAssumptions, assumptions, context, back);
      }, back);
    }, context, forward, back);
  }

  unifyImplicitAssumption(implicitAssumption, context, forward, back) {
    const constraintString = this.getString(),  ///
          implicitAssumptionString = implicitAssumption.getString();

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

          context.debug(`...unified the '${implicitAssumptionString}' implicit assumption with the '${constraintString}' constraint...`);

          return forward(context, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifyImplicitAssumptions(implicitAssumptions, assumptions, context, forward, back) {
    return some(implicitAssumptions, (implicitAssumption, context, forward, back) => {
      this.unifyImplicitAssumption(implicitAssumption, context, forward, back);
    }, context, (context, back) => {
      return forward(implicitAssumptions, assumptions, context, back);
    }, back);
  }

  static name = "Constraint";

  toJSON() {
    let json;

    const context = this.getContext();

    serialise((context) => {
      const string = this.getString();

      json = {
        context,
        string
      };
    }, context);

    return json;
  }

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

function statementFromConstraintNode(constraintNode, context) {
  const statementNode = constraintNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { isolate, reconcile, encapsulate } from "../utilities/context";
import { schemaStringFromLabelSuppositionsAndDeduction, implicitAssumptionsStringFromImplicitAssumptions } from "../utilities/string";
import { labelFromJSON,
         labelToLabelJSON,
         deductionFromJSON,
         constraintsFromJSON,
         suppositionsFromJSON,
         deductionToDeductionJSON,
         constraintsToConstraintsJSON,
         suppositionsToSuppositionsJSON } from "../utilities/json";

const { cut, all, filter, forwardsEvery, backwardsEvery } = continuationUtilities,
      { breakable, unbreakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Schema extends Element {
  constructor(context, string, node, breakPoint, label, suppositions, deduction, proof, constraints) {
    super(context, string, node, breakPoint);

    this.label = label;
    this.suppositions = suppositions;
    this.deduction = deduction;
    this.proof = proof;
    this.constraints = constraints;
  }

  getLabel() {
    return this.label;
  }

  getSuppositions() {
    return this.suppositions;
  }

  getDeduction() {
    return this.deduction;
  }

  getProof() {
    return this.proof;
  }

  getMConstraint() {
    return this.constraints;
  }

  isConditional() {
    const suppositionsLength = this.suppositions.length,
          conditional = (suppositionsLength > 0);

    return conditional;
  }

  compareReference(reference) {
    const label = this.getLabel(),
          labelComparesToRefference = label.compareReference(reference),
          comparesToReference = labelComparesToRefference;  ///

    return comparesToReference;
  }

  matchMetavariableNode(metavariableNode) { return this.label.matchMetavariableNode(metavariableNode); }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const schemaString = this.getString();

    context.trace(`Verifying the '${schemaString}' schema...`);

    return isolate((context, forward, back) => {
      return encapsulate((context) => {
        const verifyProof = this.verifyProof.bind(this),
              verifyLabel = this.verifyLabel.bind(this),
              verifyDeduction = this.verifyDeduction.bind(this),
              verifySuppositions = this.verifySuppositions.bind(this);

        return all([
          verifyLabel,
          verifySuppositions,
          verifyDeduction,
          verifyProof
        ], context, (context, back) => {
          return forward(back);
        }, back);
      }, this.constraints, context);
    }, context, (context, back) => {
      const schema = this; ///

      context.addSchema(schema);

      context.debug(`...verified the '${schemaString}' schema.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${schemaString}' schema.`);

      return back();
    });
  });

  apply = unbreakable(function (statement, schemaAssertion, context, forward, back) {
    forward = cut(forward, back); ///

    const schemaString = this.getString(),  ///
          statementString = statement.getString(),  ///
          schemaAssertionString = schemaAssertion.getString();

    context.trace(`Applying the '${schemaString}' schema to the '${statementString}' statement via the  ${schemaAssertionString}' schema assertion...`);

    return isolate((statement, schemaAssertion, context, forward, back) => {
      return reconcile((context) => {
        const constraints = [
                ...this.constraints
              ],
              unifyDeducedStatement = this.unifyDeducedStatement.bind(this),
              unifySupposedStatements = this.unifySupposedStatements.bind(this),
              unifyImplicitAssumptions = this.unifyImplicitAssumptions.bind(this),
              unifySchemaAssertionLink = this.unifySchemaAssertionLink.bind(this),
              unifySchemaAssertionAssumptions = this.unifySchemaAssertionAssumptions.bind(this);

        return all([
          unifySchemaAssertionLink,
          unifySchemaAssertionAssumptions,
          unifyImplicitAssumptions,
          unifyDeducedStatement,
          unifySupposedStatements
        ], constraints, statement, schemaAssertion, context, (constraints, statement, schemaAssertion, context, back) => {
          return forward(back);
        }, back);
      }, context);
    }, statement, schemaAssertion, context, (statement, schemaAssertion, context, back) => {
      context.debug(`...applied the '${schemaString}' schema to the '${statementString}' statement via the  ${schemaAssertionString}' schema assertion...`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${schemaString}' schema to the '${statementString}' statement via the  ${schemaAssertionString}' schema assertion.`);

      return back();
    });
  });

  verifyLabel(context, forward, back) {
    const labelString = this.label.getString(),
          schemaString = this.getString(); ///

    context.trace(`Verifying the '${schemaString}' schema's '${labelString}' label...`);

    return this.label.verify(context, (context, back) => {
      context.debug(`...verified the '${schemaString}' schema's '${labelString}' label.`);

      return forward(context, back);
    }, back);
  }

  verifyProof(context, forward, back) {
    const schemaString = this.getString();  ///

    context.trace(`Verifying the '${schemaString}' schema's proof...`);

    const statement = this.deduction.getStatement();

    return this.proof.verify(statement, context, (context, back) => {
      context.debug(`...verified the '${schemaString}' schema's proof.`);

      return forward(context, back);
    }, back);
  }

  verifyDeduction(context, forward, back) {
    const schemaString = this.getString(), ///
          deductionString = this.deduction.getString();

    context.trace(`Verifying the '${schemaString}' schema's '${deductionString}' deduction...`);

    return this.deduction.verify(context, (context, back) => {
      context.debug(`...verified the '${schemaString}' schema's '${deductionString}' deduction.`);

      return forward(context, back);
    }, back);
  }

  verifySupposition(supposition, context, forward, back) {
    const schemaString = this.getString(), ///
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${schemaString}' schema's '${suppositionString}' supposition...`);

    return supposition.verify(context, (context, back) => {
      context.debug(`...verified the '${schemaString}' schema's '${suppositionString}' supposition.`);

      return forward(context, back);
    }, back);
  }

  verifySuppositions(context, forward, back) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      return forward(context, back);
    }

    const schemaString = this.getString();  ///

    context.trace(`Verifying the '${schemaString}' schema's suppositions...`);

    return forwardsEvery(this.suppositions, (supposition, context, forward, back) => {
      return this.verifySupposition(supposition, context, (context, back) => {
        const factOrSubproof = supposition; ///

        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, (context, back) => {
      context.debug(`...verified the '${schemaString}' schema's suppositions.`);

      return forward(context, back);
    }, back);
  }

  unifyDeducedStatement(constraints, statement, schemaAssertion, context, forward, back) {
    const conditional = this.isConditional(),
          statementConditional = statement.isConditional();

    if (conditional !== statementConditional) {
      const schemaString = this.getString(),  ///
            statementString = statement.getString();

      context.trace(`Either the '${statementString}' statement is unconditional whilst the '${schemaString}' schema is conditional or vice verse.`);

      return back();
    }

    const deductionString = this.deduction.getString(),
          deducedStatement = statement.findDeducedStatement(context),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${deducedStatementString}' deduced statement with the '${deductionString}' deductino...`);

    return isolate((constraints, statement, schemaAssertion, context, forward, back) => {
      const deductionContext = this.deduction.getContext(), ///
            generalContext = deductionContext; ///

      return reconcile((context) => {
        const statement = deducedStatement, ///
              specificContext = context;  ///

        return this.deduction.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          context = specificContext;  ///

          context.commit();

          return forward(back);
        }, back);
      }, context);
    }, constraints, statement, schemaAssertion, context, (constraints, statement, schemaAssertion, context, back) => {
      context.debug(`...unified the '${deducedStatementString}' deduced statement with the '${deductionString}' deduction.`);

      return forward(constraints, statement, schemaAssertion, context, back);
    }, back);
  }

  unifySupposedStatement(supposedStatement, context, forward, back, index) {
    const supposition = this.suppositions[index],
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${supposedStatementString}' supposed statement with the '${suppositionString}' deductino...`);

    return isolate((supposedStatement, context, forward, back) => {
      const suppositionContext = supposition.getContext(), ///
            generalContext = suppositionContext; ///

      return reconcile((context) => {
        const statement = supposedStatement, ///
              specificContext = context;  ///

        return supposition.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          context = specificContext;  ///

          context.commit();

          return forward(back);
        }, back);
      }, context);
    }, supposedStatement, context, context, (supposedStatement, context, back) => {
      context.debug(`...unified the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition.`);

      return forward(context, back);
    }, back);
  }

  unifySupposedStatements(constraints, statement, schemaAssertion, context, forward, back) {
    const suppositionsLength = this.suppositions.length,
          supposedStatements = statement.findSupposedStatements(context),
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      return back();
    }

    return backwardsEvery(supposedStatements, (supposedStatement, forward, back, index) => {
      return this.unifySupposedStatement(supposedStatement, context, forward, back, index);
    }, (context, back) => {
      return forward(constraints, statement, schemaAssertion, context, back);
    }, back);
  }

  unifyImplicitAssumptions(constraints, statement, schemaAssertion, context, forward, back) {
    return schemaAssertion.getImplicitAssumptions(context, (implicitAssumptions, context, back) => {
      const implicitAssumptionsLength = implicitAssumptions.length;

      if (implicitAssumptionsLength === 0) {
        const constraintsLength = constraints.length;

        if (constraintsLength > 0) {
          context.trace(`Not all of the constraints could be applied.`);

          return back();
        }
      }

      const schemaString = this.getString(),  ///
            implicitAssertionsString = implicitAssumptionsStringFromImplicitAssumptions(implicitAssumptions);

      context.trace(`Unifying the '${implicitAssertionsString}' implicit assumptions with the '${schemaString}' schema...`);

      return filter(constraints, (constraint, forward, back) => {
        return constraint.unifyImplicitAssumptions(implicitAssumptions, context, forward, back);
      }, (constraints, remainingConstraints, context, back) => {
        const remainingConstraintsLength = remainingConstraints.length;

        if (remainingConstraintsLength > 0) {
          context.trace(`Not all of the constraints could be applied.`);

          return back();
        }

        context.debug(`...unified the '${implicitAssertionsString}' implicit assumptions with the '${schemaString}' schema.`);

        return forward(constraints, statement, schemaAssertion, context, back);
      }, back);
    }, back);
  }

  unifySchemaAssertionLink(constraints, statement, schemaAssertion, context, forward, back) {
    const schemaString = this.getString(),  ///
          schemaAssertionString = schemaAssertion.getString();

    context.trace(`Unifying the '${schemaAssertionString}' schema assertion's link with the '${schemaString}' schema...`);

    return this.label.unifySchemaAssertionLink(schemaAssertion, context, (context, back) => {
      context.debug(`...unified the '${schemaAssertionString}' schema assertion's link with the '${schemaString}' schema.`);

      return forward(constraints, statement, schemaAssertion, context, back);
    }, back);
  }

  unifySchemaAssertionAssumptions(constraints, statement, schemaAssertion, context, forward, back) {
    const schemaAssertionSingular = schemaAssertion.isSingular();

    if (schemaAssertionSingular) {
      return forward(constraints, statement, schemaAssertion, context, back);
    }

    const schemaString = this.getString(),  ///
          schemaAssertionString = schemaAssertion.getString();

    context.trace(`Unifying the '${schemaAssertionString}' schema assertion's assumptions with the '${schemaString}' schema...`);

    return filter(constraints, (constraint, forward, back) => {
      return constraint.unifySchemaAssertionAssumptions(schemaAssertion, context, forward, back);
    }, (constraints, remainingConstraints, context, back) => {
      constraints = remainingConstraints; ///

      context.debug(`...unified the '${schemaAssertionString}' schema assertion's assumptions with the '${schemaString}' schema.`);

      return forward(constraints, statement, schemaAssertion, context, back);
    }, back);
  }

  toJSON() {
    let json;

    const labelJSON = labelToLabelJSON(this.label),
          deductionJSON = deductionToDeductionJSON(this.deduction),
          suppositionsJSON = suppositionsToSuppositionsJSON(this.suppositions),
          constraintsJSON = constraintsToConstraintsJSON(this.constraints),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const label = labelJSON,  ///
          deduction = deductionJSON,  ///
          suppositions = suppositionsJSON,  ///
          constraints = constraintsJSON;  ///

    json = {
      string,
      breakPoint,
      label,
      deduction,
      suppositions,
      constraints
    };

    return json;
  }

  static name = "Schema";

  static fromJSON(json, context) {
    const label = labelFromJSON(json, context),
          deduction = deductionFromJSON(json, context),
          suppositions = suppositionsFromJSON(json, context),
          constraints = constraintsFromJSON(json, context),
          string = schemaStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction),
          node = null,
          breakPoint = breakPointFromJSON(json),
          proof = null,
          schema = new Schema(context, string, node, breakPoint, label, suppositions, deduction, proof, constraints);

    return schema;
  }
});

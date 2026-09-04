"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { isolate, reconcile, encapsulate } from "../utilities/context";
import { constraintsStringFrooConstraints, schemaStringFromLabelSuppositionsAndDeduction } from "../utilities/string";
import { labelFromJSON,
         labelToLabelJSON,
         deductionFromJSON,
         constraintsFromJSON,
         suppositionsFromJSON,
         deductionToDeductionJSON,
         constraintsToConstraintsJSON,
         suppositionsToSuppositionsJSON } from "../utilities/json";

const { cut, all, every, forwardsEvery, backwardsEvery } = continuationUtilities,
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
        const unifyLink = this.unifyLink.bind(this),
              applyConstraints = this.applyConstraints.bind(this),
              unifyDeducedStatement = this.unifyDeducedStatement.bind(this),
              unifySupposedStatements = this.unifySupposedStatements.bind(this);

        return all([
          unifyLink,
          applyConstraints,
          unifyDeducedStatement,
          unifySupposedStatements
        ], statement, schemaAssertion, context, (statement, schemaAssertion, context, back) => {
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

  applyConstraints(statement, schemaAssertion, context, forward, back) {
    return schemaAssertion.getImplicitAssumptions(context, (implicitAssumptions, context, back) => {
      const assumptions = schemaAssertion.getAssumptions(),
            constraintsString = constraintsStringFrooConstraints(this.constraints);

      context.trace(`Applying the schema's '${constraintsString}' constraints...`);

      return every(this.constraints, (constraint, context, forward, back) => {
        return constraint.apply(implicitAssumptions, assumptions, context, forward, back);
      }, context, (context, back) => {
        context.debug(`...applied the schema's '${constraintsString}' constraints.`);

        return forward(statement, schemaAssertion, context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to apply the schema's '${constraintsString}' constraints.`);

        return back();
      });
    }, back);
  }

  unifyLink(statement, schemaAssertion, context, forward, back) {
    const link = schemaAssertion.getLink(),
          schemaString = this.getString(),  ///
          schemaAssertionString = schemaAssertion.getString();

    context.trace(`Unifying the '${schemaAssertionString}' schema assertion's link with the '${schemaString}' schema...`);

    return this.label.unifyLink(link, context, (context, back) => {
      context.debug(`...unified the '${schemaAssertionString}' schema assertion's link with the '${schemaString}' schema.`);

      return forward(statement, schemaAssertion, context, back);
    }, back);
  }

  unifyDeducedStatement(statement, schemaAssertion, context, forward, back) {
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

    return isolate((statement, schemaAssertion, context, forward, back) => {
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
    }, statement, schemaAssertion, context, (statement, schemaAssertion, context, back) => {
      context.debug(`...unified the '${deducedStatementString}' deduced statement with the '${deductionString}' deduction.`);

      return forward(statement, schemaAssertion, context, back);
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
    }, supposedStatement, context, (supposedStatement, context, back) => {
      context.debug(`...unified the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition.`);

      return forward(context, back);
    }, back);
  }

  unifySupposedStatements(statement, schemaAssertion, context, forward, back) {
    const suppositionsLength = this.suppositions.length,
          supposedStatements = statement.findSupposedStatements(context),
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      return back();
    }

    return backwardsEvery(supposedStatements, (supposedStatement, forward, back, index) => {
      return this.unifySupposedStatement(supposedStatement, context, forward, back, index);
    }, (context, back) => {
      return forward(statement, schemaAssertion, context, back);
    }, back);
  }

  toJSON() {
    let json;

    const labelJSON = labelToLabelJSON(this.label),
          deductionJSON = deductionToDeductionJSON(this.deduction),
          constraintsJSON = constraintsToConstraintsJSON(this.constraints),
          suppositionsJSON = suppositionsToSuppositionsJSON(this.suppositions),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const label = labelJSON,  ///
          deduction = deductionJSON,  ///
          constraints = constraintsJSON,  ///
          suppositions = suppositionsJSON;  ///

    json = {
      string,
      breakPoint,
      label,
      deduction,
      constraints,
      suppositions
    };

    return json;
  }

  static name = "Schema";

  static fromJSON(json, context) {
    const label = labelFromJSON(json, context),
          deduction = deductionFromJSON(json, context),
          constraints = constraintsFromJSON(json, context),
          suppositions = suppositionsFromJSON(json, context),
          string = schemaStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction),
          node = null,
          breakPoint = breakPointFromJSON(json),
          proof = null,
          schema = new Schema(context, string, node, breakPoint, label, suppositions, deduction, proof, constraints);

    return schema;
  }
});

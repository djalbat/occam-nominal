"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { reconcile, encapsulate } from "../utilities/context";
import { schemaStringFromLabelSuppositionsAndDeduction } from "../utilities/string";
import { labelFromJSON,
         labelToLabelJSON,
         deductionFromJSON,
         constraintsFromJSON,
         suppositionsFromJSON,
         deductionToDeductionJSON,
         constraintsToConstraintsJSON,
         suppositionsToSuppositionsJSON } from "../utilities/json";

const { cut, all, filter, isolate, forwardsEvery, backwardsEvery } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  unifyReference(reference, context, forward, back) {
    const schemaString = this.getString(),  ///
          referenceString = reference.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${schemaString}' schema...`);

    return this.label.unifyReference(reference, context, (referenceUnifies) => {
      if (referenceUnifies) {
        context.debug(`...unified the '${referenceString}' reference with the '${schemaString}' schema.`);
      }

      return continuation(referenceUnifies);
    });
  }

  unifyAssumptions(assumptions, constraints, context, forward, back) {
    filter(constraints, (constraint, forward, back) => {
      constraint.unifyAssumptions(assumptions, context, (assumptionsUnify) => {
        let passed = false;

        if (!assumptionsUnify) {
          passed = true;
        }

        return continuation(passed);
      });
    }, forward, back);
  }

  unifyDeducedStatement(deducedStatement, context, forward, back) {
    const deductionString = this.deduction.getString(),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${deducedStatementString}' deduced statement with the '${deductionString}' deductino...`);

    const deductionContext = this.deduction.getContext(), ///
          generalContext = deductionContext; ///

    return reconcile((context) => {
      const statement = deducedStatement, ///
            specificContext = context;  ///

      return this.deduction.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let deducedStatementUnifies = false;

        if (statementUnifies) {
          context.commit();

          deducedStatementUnifies = true;
        }

        if (deducedStatementUnifies) {
          context.debug(`...unified the '${deducedStatementString}' deduced statement with the '${deductionString}' deduction.`);
        }

        return continuation(deducedStatementUnifies);
      });
    }, context);
  }

  unifySupposedStatement(supposedStatement, supposition, context, forward, back) {
    const suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${supposedStatementString}' supposed statement with the '${suppositionString}' deductino...`);

    const suppositionContext = supposition.getContext(), ///
          generalContext = suppositionContext; ///

    return reconcile((context) => {
      const statement = supposedStatement, ///
            specificContext = context;  ///

      return supposition.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let supposedStatementUnifies = false;

        if (statementUnifies) {
          context.commit();

          supposedStatementUnifies = true;
        }

        if (supposedStatementUnifies) {
          context.debug(`...unified the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition.`);
        }

        return continuation(supposedStatementUnifies);
      });
    }, context);
  }

  unifySupposedStatements(supposedStatements, context, forward, back) {
    const suppositionsLength = this.suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const supposedStatementsUnify = false;

      return continuation(supposedStatementsUnify);
    }

    let index = supposedStatementsLength;

    backwardsEvery(supposedStatements, (supposedStatement, forward, back) => {
      index--;

      const supposition = this.suppositions[index];

      return this.unifySupposedStatement(supposedStatement, supposition, context, forward, back);
    }, forward, back);
  }

  unifyImplicitAssumptions(implicitAssumptions, constraints, context, forward, back) {
    filter(constraints, (constraint, forward, back) => {
      constraint.unifyImplicitAssumptions(implicitAssumptions, context, (implicitAssumptionsUnify) => {
        let passed = false;

        if (!implicitAssumptionsUnify) {
          passed = true;
        }

        return continuation(passed);
      });
    }, forward, back);
  }

  unifyStatementAndSchemaAssertion(statement, schemaAssertion, context, forward, back) {
    let schemaAssertionUnifies = false;

    const schemaString = this.getString(),  ///
          statementString = statement.getString(),  ///
          schemaAssertionString = schemaAssertion.getString();

    context.trace(`Unifying the '${statementString}' statement and ${schemaAssertionString}' schema assertion with the '${schemaString}' schema...`);

    return reconcile((context) => {
      const reference = schemaAssertion.getReference();

      return this.unifyReference(reference, context, (referenceUnifies) => {
        if (!referenceUnifies) {
          return continuation(schemaAssertionUnifies);
        }

        const assumptions = schemaAssertion.getAssumptions(context),
              constraints = [
                ...this.constraints
              ];

        return this.unifyAssumptions(assumptions, constraints, context, () => {
          const implicitAssumptions = schemaAssertion.getImplicitAssumptions(context);

          return this.unifyImplicitAssumptions(implicitAssumptions, constraints, context, () => {
            const constraintsLength = constraints.length;

            if (constraintsLength > 0) {
              return continuation(schemaAssertionUnifies);
            }

            const conditional = this.isConditional(),
                  statementConditional = statement.isConditional();

            if (conditional !== statementConditional) {
              context.trace(`Either the '${statementString}' statement is unconditional whilst the '${schemaString}' schema is conditional or vice verse.`);

              return continuation(schemaAssertionUnifies);
            }

            const deducedStatement = statement.findDeducedStatement(context);

            return this.unifyDeducedStatement(deducedStatement, context, (deducedStatementUnifies) => {
              if (!deducedStatementUnifies) {
                return continuation(schemaAssertionUnifies);
              }

              const supposedStatements = statement.findSupposedStatements(context);

              return this.unifySupposedStatements(supposedStatements, context, (supposedStatementsUnify) => {
                if (supposedStatementsUnify) {
                  schemaAssertionUnifies = true;
                }

                if (schemaAssertionUnifies) {
                  context.debug(`...unified the '${statementString}' statement and ${schemaAssertionString}' schema assertion with the '${schemaString}' schema.`);
                }

                return continuation(schemaAssertionUnifies);
              });
            });
          });
        });
      });
    }, context);
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

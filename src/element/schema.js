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

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities,
      { asynchronousAll, asynchronousFilter, asynchronousForwardsEvery, asynchronousBackwardsEvery } = continuationUtilities;

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

  verify = breakable(function (context, continuation) {
    const schemaString = this.getString(); ///

    context.trace(`Verifying the '${schemaString}' schema...`);

    return encapsulate((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabel = this.verifyLabel.bind(this),
            verifyDeduction = this.verifyDeduction.bind(this),
            verifySuppositions = this.verifySuppositions.bind(this);

      return asynchronousAll([
        verifyLabel,
        verifySuppositions,
        verifyDeduction,
        verifyProof
      ], context, (verifies) => {
        if (verifies) {
          const schema = this; ///

          context.addSchema(schema);

          context.debug(`...verified the '${schemaString}' schema.`);
        }

        return continuation(verifies, context);
      });
    }, this.constraints, context);
  });

  verifyLabel(context, continuation) {
    const labelString = this.label.getString(),
          schemaString = this.getString(); ///

    context.trace(`Verifying the '${schemaString}' schema's '${labelString}' label...`);

    return this.label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${schemaString}' schema's '${labelString}' label.`);
      }

      return continuation(labelVerifies, context);
    });
  }

  verifyProof(context, continuation) {
    if (this.proof === null) {
      const proofVerifies = true; ///

      return continuation(proofVerifies, context);
    }

    const schemaString = this.getString();  ///

    context.trace(`Verifying the '${schemaString}' schema's proof...`);

    const statement = this.deduction.getStatement();

    return this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${schemaString}' schema's proof.`);
      }

      return continuation(proofVerifies, context);
    });
  }

  verifyDeduction(context, continuation) {
    const schemaString = this.getString(), ///
          deductionString = this.deduction.getString();

    context.trace(`Verifying the '${schemaString}' schema's '${deductionString}' deduction...`);

    return this.deduction.verify(context, (deductionVerifies) => {
      if (deductionVerifies) {
        context.debug(`...verified the '${schemaString}' schema's '${deductionString}' deduction.`);
      }

      return continuation(deductionVerifies, context);
    });
  }

  verifySuppositions(context, continuation) {
    const suppositionsLength = this.suppositions.length;

    if (suppositionsLength === 0) {
      const suppositionsVerify = true;  ///

      return continuation(suppositionsVerify, context);
    }

    const schemaString = this.getString();  ///

    context.trace(`Verifying the '${schemaString}' schema's suppositions...`);

    const verifySupposition = this.verifySupposition.bind(this);

    return asynchronousForwardsEvery(this.suppositions, verifySupposition, context, (suppositionsVerify) => {
      if (suppositionsVerify) {
        context.debug(`...verified the '${schemaString}' schema's suppositions.`);
      }

      return continuation(suppositionsVerify, context);
    });
  }

  verifySupposition(supposition, context, continuation) {
    const schemaString = this.getString(), ///
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${schemaString}' schema's '${suppositionString}' supposition...`);

    return supposition.verify(context, (suppositionVerifies) => {
      if (suppositionVerifies) {
        const factOrSubproof = supposition;  ////

        context.assignAssignments();

        context.addFactOrSubproof(factOrSubproof);
      }

      if (suppositionVerifies) {
        context.debug(`...verified the '${schemaString}' schema's '${suppositionString}' supposition.`);
      }

      return continuation(suppositionVerifies, context);
    });
  }

  unifyJudgement(judgement, context, continuation) {
    let judgementUnifies = false;

    const schemaString = this.getString(),  ///
          judgementString = judgement.getString();

    context.trace(`Unifying the '${judgementString}' judgement with the '${schemaString}' schema...`);

    return reconcile((context) => {
      const reference = judgement.getReference();

      return this.unifyReference(reference, context, (referenceUnifies) => {
        if (!referenceUnifies) {
          return continuation(judgementUnifies);
        }

        const assumptions = judgement.getAssumptions(context),
              constraints = [
                ...this.constraints
              ];

        return this.unifyAssumptions(assumptions, constraints, context, () => {
          const implicitAssumptions = judgement.getImplicitAssumptions(context);

          return this.unifyImplicitAssumptions(implicitAssumptions, constraints, context, () => {
            const constraintsLength = constraints.length;

            if (constraintsLength > 0) {
              return continuation(judgementUnifies);
            }

            const conditional = this.isConditional(),
                  judgementConditional = judgement.isConditional();

            if (conditional !== judgementConditional) {
              context.trace(`Either the '${judgementString}' judgement is unconditional but the '${schemaString}' schema is conditional or vice verse.`);

              return continuation(judgementUnifies);
            }

            const deducedStatement = judgement.findDeducedStatement(context);

            return this.unifyDeducedStatement(deducedStatement, context, (deducedStatementUnifies) => {
              if (!deducedStatementUnifies) {
                return continuation(judgementUnifies);
              }

              const supposedStatements = judgement.findSupposedStatements(context);

              return this.unifySupposedStatements(supposedStatements, context, (supposedStatementsUnify) => {
                if (supposedStatementsUnify) {
                  judgementUnifies = true;
                }

                if (judgementUnifies) {
                  context.trace(`...unified the '${judgementString}' judgement with the '${schemaString}' schema.`);
                }

                return continuation(judgementUnifies);
              });
            });
          });
        });
      });
    }, context);
  }

  unifyReference(reference, context, continuation) {
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

  unifyAssumptions(assumptions, constraints, context, continuation) {
    asynchronousFilter(constraints, (constraint, continuation) => {
      constraint.unifyAssumptions(assumptions, context, (assumptionsUnify) => {
        let passed = false;

        if (!assumptionsUnify) {
          passed = true;
        }

        return continuation(passed);
      });
    }, continuation);
  }

  unifyDeducedStatement(deducedStatement, context, continuation) {
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

  unifySupposedStatement(supposedStatement, supposition, context, continuation) {
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

  unifySupposedStatements(supposedStatements, context, continuation) {
    const suppositionsLength = this.suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const supposedStatementsUnify = false;

      return continuation(supposedStatementsUnify);
    }

    let index = supposedStatementsLength;

    asynchronousBackwardsEvery(supposedStatements, (supposedStatement, continuation) => {
      index--;

      const supposition = this.suppositions[index];

      return this.unifySupposedStatement(supposedStatement, supposition, context, continuation);
    }, continuation);
  }

  unifyImplicitAssumptions(implicitAssumptions, constraints, context, continuation) {
    asynchronousFilter(constraints, (constraint, continuation) => {
      constraint.unifyImplicitAssumptions(implicitAssumptions, context, (implicitAssumptionsUnify) => {
        let passed = false;

        if (!implicitAssumptionsUnify) {
          passed = true;
        }

        return continuation(passed);
      });
    }, continuation);
  }

  toJSON() {
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
          constraints = constraintsJSON,  ///
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

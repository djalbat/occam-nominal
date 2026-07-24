"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../elements";

import { all } from "../utilities/continuation";
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

const { every, forwardsEvery } = continuationUtilities,
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

  getSupposition(index) {
    const supposition = this.suppositions[index] || null;

    return supposition;
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
      const verifyLabel = this.verifyLabel.bind(this),
            verifyProof = this.verifyProof.bind(this),
            verifyDeduction = this.verifyDeduction.bind(this),
            verifySuppositions = this.verifySuppositions.bind(this);

      return all([
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

        return continuation(verifies);
      });
    }, this.constraints, context);
  });

  verifyLabel(context, continuation) {
    const schemaString = this.getString(),  ///
          labelString = this.label.getString();

    context.trace(`Verifying the '${schemaString}' schema's '${labelString}' label...`);

    return this.label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${schemaString}' schema's '${labelString}' label.`);
      }

      return continuation(labelVerifies);
    });
  }

  verifyProof(context, continuation) {
    const schemaString = this.getString();  ///

    context.trace(`Verifying the '${schemaString}' schema's proof...`);

    const statement = this.deduction.getStatement();

    return this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${schemaString}' schema's proof.`);
      }

      return continuation(proofVerifies);
    });
  }

  verifyDeduction(context, continuation) {
    const schemaString = this.getString(),  //
          deductionString = this.deduction.getString();

    context.trace(`Verifying the '${schemaString}' top level meta assertion's '${deductionString}' deduction...`);

    return this.deduction.verify(context, (deductionVerifies) => {
      if (deductionVerifies) {
        context.debug(`...verified the '${schemaString}' top level meta assertion's '${deductionString}' deduction.`);
      }

      return continuation(deductionVerifies);
    });
  }

  verifySuppositions(context, continuation) {
    const schemaString = this.getString();  ///

    context.trace(`Verifying the '${schemaString}' schema's suppositions...`);

    return forwardsEvery(this.suppositions, (supposition, continuation) => {
      return this.verifySupposition(supposition, context, continuation);
    }, (suppositionsVerify) => {
      if (suppositionsVerify) {
        context.debug(`...verified the '${schemaString}' schema's suppositions.`);
      }

      return continuation(suppositionsVerify);
    });
  }

  verifySupposition(supposition, context, continuation) {
    const schemaString = this.getString(),  ///
          suppositionString = supposition.getString();

    context.trace(`Verifying the '${schemaString}' schema's '${suppositionString}' supposition...`);

    return supposition.verify(context, (suppositionVerifies) => {
      if (suppositionVerifies) {
        const subproofOrProofAssertion = supposition;  ////

        context.assignAssignments();

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);
      }

      if (suppositionVerifies) {
        context.debug(`...verified the '${schemaString}' schema's '${suppositionString}' supposition.`);
      }

      return continuation(suppositionVerifies);
    });
  }

  unifyJudgement(judgement, context, continuation) {
    const schemaString = this.getString(),  ///
          judgementString = judgement.getString();

    context.trace(`Unifying the '${judgementString}' judgement with the '${schemaString}' schema...`);

    return reconcile((context) => {
      const reference = judgement.getReference();

      return this.unifyReference(reference, context, (referenceUnifies) => {
        if (!referenceUnifies) {
          const judgementUnifies = false;

          return continuation(judgementUnifies);
        }

        const assumptions = judgement.getAssumptions(context);

        return this.unifyAssumptions(assumptions, context, (assumptionsUnify) => {
          if (!assumptionsUnify) {
            const judgementUnifies = false;

            return continuation(judgementUnifies);
          }

          const statement = judgement.getStatement(),
                conditional = this.isConditional(),
                subproofAssertion = subproofAssertionFromStatement(statement, context);

          if (conditional) {
            if (subproofAssertion === null) {
              const judgementUnifies = false;

              return continuation(judgementUnifies);
            }

            return this.unifySubproofAssertion(subproofAssertion, context, (subproofassertionUnifies) => {
              let judgementUnifies = false;

              if (subproofassertionUnifies) {
                judgementUnifies = true;
              }

              if (judgementUnifies) {
                context.debug(`...unified the '${judgementString}' judgement with the '${schemaString}' schema.`);
              }

              return continuation(judgementUnifies);
            });
          }

          if (subproofAssertion !== null) {
            const judgementUnifies = false;

            return continuation(judgementUnifies);
          }

          const deducedStatment = statement;  ///

          return this.unifyDeducedStatement(deducedStatment, context, (deducedStatmentUnfifies) => {
            let judgementUnifies = false;

            if (deducedStatmentUnfifies) {
              judgementUnifies = true;
            }

            if (judgementUnifies) {
              context.debug(`...unified the '${judgementString}' judgement with the '${schemaString}' schema.`);
            }

            return continuation(judgementUnifies);
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

  unifyAssumptions(assumptions, context, continuation) {
    every(this.constraints, (constraint, continuation) => {
      constraint.unifyAssumptions(assumptions, context, continuation);
    }, continuation);
  }

  unifyDeducedStatement(deducedStatement, context, continuation) {
    const deductionString = this.deduction.getString(),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${deducedStatementString}' deduced statement with the '${deductionString}' deductino...`);

    const deductionContext = this.deduction.getContext(), ///
          statement = deducedStatement, ///
          generalContext = deductionContext, ///
          specificContext = context;  ///

    return this.deduction.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      let deducedStatementUnifies = false;

      if (statementUnifies) {
        deducedStatementUnifies = true;
      }

      if (deducedStatementUnifies) {
        context.debug(`...unified the '${deducedStatementString}' deduced statement with the '${deductionString}' deduction`);
      }

      return continuation(deducedStatementUnifies);
    });
  }

  unifySubproofAssertion(subproofAssertion, context, continuation) {
    const schemaString = this.getString(),  ///
          subproofAssertionString = subproofAssertion.getString();

    context.trace(`Unifying the '${subproofAssertionString}' subproof assertion with the '${schemaString}' schema...`);

    const deducedStatement = subproofAssertion.getDeducedStatement();

    return this.unifyDeducedStatement(deducedStatement, context, (deducedStatementUnifies) => {
      if (!deducedStatementUnifies) {
        const subproofAssertionUnifies = false;

        return continuation(subproofAssertionUnifies);
      }

      const supposedStatements = subproofAssertion.getSupposedStatements();

      return this.unifySupposedStatements(supposedStatements, context, (supposedStatementsUnify) => {
        let subproofAssertionUnifies = false;

        if (supposedStatementsUnify) {
          subproofAssertionUnifies = true;
        }

        if (subproofAssertionUnifies) {
          context.debug(`...unified the '${subproofAssertionString}' subproof assertion with the '${schemaString}' schema.`);
        }

        return continuation(subproofAssertionUnifies);
      });
    });
  }

  unifySupposedStatement(supposedStatement, index, context, continuation) {
    const supposition = this.getSupposition(index),
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition...`);

    const suppositionContext = supposition.getContext(), ///
          statement = supposedStatement, ///
          generalContext = suppositionContext, ///
          specificContext = context;  ///

    return supposition.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      let supposedStatementUnifies = false;

      if (statementUnifies) {
        supposedStatementUnifies = true;
      }

      if (supposedStatementUnifies) {
        context.debug(`...unified the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition`);
      }

      return continuation(supposedStatementUnifies);
    });
  }

  unifySupposedStatements(supposedStatements, context, continuation) {
    const suppositionsLength = this.suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const supposedStatementsUnify = false;

      return continuation(supposedStatementsUnify);
    }

    let index = -1;

    every(supposedStatements, (supposedStatement, continuation) => {
      index++;

      return this.unifySupposedStatement(supposedStatement, index, context, continuation);
    });
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

function subproofAssertionFromStatement(statement, context) {
  let subproofAssertion;

  const { SubproofAssertion } = elements;

  subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    subproofAssertion = subproofAssertion.validate(context);
  }

  return subproofAssertion;

}

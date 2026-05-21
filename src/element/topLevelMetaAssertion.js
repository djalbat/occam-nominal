"use strict";

import { Element, asynchronousUtilities } from "occam-languages";

import elements from "../elements";

import { reconcile, encapsulate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction } from "../utilities/string";
import { labelFromJSON,
         labelToLabelJSON,
         deductionFromJSON,
         constraintsFromJSON,
         suppositionsFromJSON,
         deductionToDeductionJSON,
         constraintsToMConstraintJSON,
         suppositionsToSuppositionsJSON } from "../utilities/json";
import supposition from "./proofAssertion/supposition";

const { asyncForwardsEvery } = asynchronousUtilities;

export default class TopLevelMetaAssertion extends Element {
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

  getStatement() {
    let statement;

    const deducedStatment = this.getDeducedStatement();

    statement = deducedStatment;  ///

    const conditional = this.isConditional();

    if (conditional) {
      const context = this.getContext(),
            statements = this.getStatements(),
            subproofAssertion = subproofAssertionFromStatements(statements, context);
    }

    return statement;
  }

  getStatements() {
    const suppositinoStatements = this.getSuppositionStatements(),
          deducedStatement = this.getDeducedStatement(),
          statements = [
            ...suppositinoStatements,
            deducedStatement
          ];

    return statements;
  }

  getDeducedStatement() {
    const statement = this.deduction.getStatement(),
          deducedStatement = statement; ///

    return deducedStatement;
  }

  getSuppositionStatements() {
    const suppositionStatements = this.suppositions.map((supposition) => {
      const suppositionStatement = supposition.getStatement();

      return suppositionStatement;
    });

    return suppositionStatements;
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

  async verify(context) {
    let verifies = false;

    const topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelMetaAssertionString}' top level meta assertion...`);

    await encapsulate(async (context) => {
      const labelVerifies = this.verifyLabel(context);

      if (labelVerifies) {
        const suppositionsVerify = await this.verifySuppositions(context);

        if (suppositionsVerify) {
          const deductionVerifies = await this.verifyDeduction(context);

          if (deductionVerifies) {
            const proofVerifies = await this.verifyProof(context);

            if (proofVerifies) {
              verifies = true;
            }
          }
        }
      }
    }, this.constraints, context);

    if (verifies) {
      context.debug(`...verified the '${topLevelMetaAssertionString}' top level meta assertion.`);
    }

    return verifies;
  }

  verifyLabel(context) {
    let labelVerifies;

    const topLevelMetaAssertionString = this.getString(),  ///
          labelString = this.label.getString();

    context.trace(`Verifying the '${topLevelMetaAssertionString}' top level meta-assertion's '${labelString}' label...`);

    labelVerifies = this.label.verify();

    if (labelVerifies) {
      context.debug(`...verified the '${topLevelMetaAssertionString}' top level meta-assertion's '${labelString}' label.`);
    }

    return labelVerifies;
  }

  async verifyProof(context) {
    let proofVerifies;

    const topLevelMetaAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelMetaAssertionString}' top level meta-assertion's proof...`);

    const statement = this.deduction.getStatement();

    proofVerifies = await this.proof.verify(statement, context);

    if (proofVerifies) {
      context.debug(`...verified the '${topLevelMetaAssertionString}' top level meta-assertion's proof.`);
    }

    return proofVerifies;
  }

  async verifyDeduction(context) {
    let deductionVerifies;

    const deductionString = this.deduction.getString(),
          topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Verifying the '${topLevelMetaAssertionString}' top level meta assertion's '${deductionString}' deduction...`);

    deductionVerifies = await this.deduction.verify(context);

    if (deductionVerifies) {
      context.debug(`...verified the '${topLevelMetaAssertionString}' top level meta assertion's '${deductionString}' deduction.`);
    }

    return deductionVerifies;
  }

  async verifySupposition(supposition, context) {
    let suppositionVerifies;

    const suppositionString = supposition.getString(),
          topLevelMetaAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelMetaAssertionString}' top level meta-assertion's '${suppositionString}' supposition...`);

    suppositionVerifies = await supposition.verify(context)

    if (suppositionVerifies) {
      const subproofOrProofAssertion = supposition;  ////

      context.assignAssignments();

      context.addSubproofOrProofAssertion(subproofOrProofAssertion);
    }

    if (suppositionVerifies) {
      context.debug(`...verified the '${topLevelMetaAssertionString}' top level meta-assertion's '${suppositionString}' supposition.`);
    }

    return suppositionVerifies;
  }

  async verifySuppositions(context) {
    let suppositionsVerify;

    const topLevelMetaAssertionString = this.getString();  ///

    context.trace(`Verifying the '${topLevelMetaAssertionString}' top level meta-assertion's suppositions...`);

    suppositionsVerify = await asyncForwardsEvery(this.suppositions, async (supposition) => {
      const suppositionVerifies = await this.verifySupposition(supposition, context);

      if (suppositionVerifies) {
        return true;
      }
    });

    if (suppositionsVerify) {
      context.debug(`...verified the '${topLevelMetaAssertionString}' top level meta-assertion's suppositions.`);
    }

    return suppositionsVerify;
  }

  unifyJudgement(judgement, context) {
    let judgementUnifies = false;

    const judgementString = judgement.getString(),
          topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Unifying the '${judgementString}' judgement with the '${topLevelMetaAssertionString}' top level meta-assertion...`);

    reconcile((context) => {
      const reference = judgement.getReference(),
            referenceUnifies = this.unifyReference(reference, context);

      if (referenceUnifies) {
        let statementUnifies = false;

        const statement = judgement.getStatement(),
              conditional = this.isConditional(),
              subproofAssertion = subproofAssertionFromStatement(statement, context)

        if (conditional) {
          if (subproofAssertion !== null) {
            const subproofassertionUnifies = this.unifySubproofAssertion(subproofAssertion, context);

            if (subproofassertionUnifies) {
              statementUnifies = true;
            }
          }
        } else {
          if (subproofAssertion === null) {
            const deducedStatment = statement,  ///
                  deducedStatmentUnfifies = this.unifyDeducedStatement(deducedStatment, context);

            if (deducedStatmentUnfifies) {
              statementUnifies = true;
            }
          }
        }

        if (statementUnifies) {
          const assumptions = judgement.getAssumptions(context),
                assumptionsUnify = this.unifyAssumptions(assumptions, context);

          if (assumptionsUnify) {
            judgementUnifies = true;
          }
        }
      }
    }, context);

    if (judgementUnifies) {
      context.debug(`...unified the '${judgementString}' judgement with the '${topLevelMetaAssertionString}' top level meta-assertion.`);
    }

    return judgementUnifies;
  }

  unifyReference(reference, context) {
    let referenceUnifies;

    const referenceString = reference.getString(),
          topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Unifying the '${referenceString}' reference with the '${topLevelMetaAssertionString}' top level meta-assertion...`);

    referenceUnifies = this.label.unifyReference(reference, context);

    if (referenceUnifies) {
      context.debug(`...unified the '${referenceString}' reference with the '${topLevelMetaAssertionString}' top level meta-assertion.`);
    }

    return referenceUnifies;
  }

  unifyStatement(statement, context) {
    let statementUnifies;

    const statementString = statement.getString(),
          topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Unifying the '${statementString}' statement with the '${topLevelMetaAssertionString}' top level meta-assertion...`);

    debugger

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${topLevelMetaAssertionString}' top level meta-assertion.`);
    }

    return statementUnifies;
  }

  unifyAssumptions(assumptions, context) {
    const assumptionsUnify = this.constraints.every((constraint) => {
      const assumptionsUnify = constraint.unifyAssumptions(assumptions, context);

      if (assumptionsUnify) {
        return true;
      }
    });

    return assumptionsUnify;
  }

  unifyDeducedStatement(deducedStatement, context) {
    let deducedStatementUnifies = false;

    const deductionString = this.deduction.getString(),
          deducedStatementString = deducedStatement.getString();

    context.trace(`Unifying the '${deducedStatementString}' deduced statement with the '${deductionString}' deductino...`);

    const deductionContext = this.deduction.getContext(), ///
          statement = deducedStatement, ///
          generalContext = deductionContext, ///
          specificContext = context,  ///
          statementUnifies = this.deduction.unifyStatement(statement, generalContext, specificContext);

    if (statementUnifies) {
      deducedStatementUnifies = true;
    }

    if (deducedStatementUnifies) {
      context.debug(`...unified the '${deducedStatementString}' deduced statement with the '${deductionString}' deduction`);
    }

    return deducedStatementUnifies;
  }

  unifySubproofAssertion(subproofAssertion, context) {
    let subproofAssertionUnifies = false;

    const subproofAssertionString = subproofAssertion.getString(),
          topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Unifying the '${subproofAssertionString}' subproof assertion with the '${topLevelMetaAssertionString}' top level meta-assertion...`);

    const deducedStatement = subproofAssertion.getDeducedStatement(),
          deducedStatementUnifies = this.unifyDeducedStatement(deducedStatement, context);

    if (deducedStatementUnifies) {
      const supposedStatements = subproofAssertion.getSupposedStatements(),
            supposedStatementsUnify = this.unifySupposedStatements(supposedStatements, context);

      if (supposedStatementsUnify) {
        subproofAssertionUnifies = true;
      }
    }

    if (subproofAssertionUnifies) {
      context.debug(`...unified the '${subproofAssertionString}' subproof assertion with the '${topLevelMetaAssertionString}' top level meta-assertion.`);
    }

    return subproofAssertionUnifies;
  }

  unifySupposedStatement(supposedStatement, index, context) {
    let supposedStatementUnifies = false;

    const supposition = this.getSupposition(index),
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition...`);

    const suppositionContext = supposition.getContext(), ///
          statement = supposedStatement, ///
          generalContext = suppositionContext, ///
          specificContext = context,  ///
          statementUnifies = supposition.unifyStatement(statement, generalContext, specificContext);

    if (statementUnifies) {
      supposedStatementUnifies = true;
    }

    if (supposedStatementUnifies) {
      context.debug(`...unified the '${supposedStatementString}' supposed statement with the '${suppositionString}' supposition`);
    }

    return supposedStatementUnifies;
  }

  unifySupposedStatements(supposedStatements, context) {
    let supposedStatementsUnify = false;

    const suppositionsLength = this.suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength === supposedStatementsLength) {
      supposedStatementsUnify = supposedStatements.every((supposedStatement, index) => {
        const supposedStatementUnifies = this.unifySupposedStatement(supposedStatement, index, context);

        if (supposedStatementUnifies) {
          return true;
        }
      });
    }

    return supposedStatementsUnify;
  }

  toJSON() {
    const labelJSON = labelToLabelJSON(this.label),
          deductionJSON = deductionToDeductionJSON(this.deduction),
          suppositionsJSON = suppositionsToSuppositionsJSON(this.suppositions),
          constraintsJSON = constraintsToMConstraintJSON(this.constraints),
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

  static fromJSON(Class, json, context) {
    const label = labelFromJSON(json, context),
          deduction = deductionFromJSON(json, context),
          suppositions = suppositionsFromJSON(json, context),
          constraints = constraintsFromJSON(json, context),
          string = topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction),
          node = null,
          breakPoint = breakPointFromJSON(json),
          proof = null,
          topLevelMetaAssertion = new Class(context, string, node, breakPoint, label, suppositions, deduction, proof, constraints);

    return topLevelMetaAssertion;
  }
}

function subproofAssertionFromStatement(statement, context) {
  let subproofAssertion;

  const { SubproofAssertion } = elements;

  subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    subproofAssertion = subproofAssertion.validate(context);
  }

  return subproofAssertion;

}

function subproofAssertionFromStatements(statements, context) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatements(statements, context);

  return subproofAssertion;
}

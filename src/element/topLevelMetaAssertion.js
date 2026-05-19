"use strict";

import { Element, asynchronousUtilities } from "occam-languages";

import elements from "../elements";

import { reconcile, encapsulate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction } from "../utilities/string";
import { labelFromJSON,
         labelToLabelJSON,
         deductionFromJSON,
         suppositionsFromJSON,
         deductionToDeductionJSON,
         metaLevelAssumptionsFromJSON,
         suppositionsToSuppositionsJSON,
         metaLevelAssumptionsToMetaLevelAssumptionsJSON } from "../utilities/json";

const { asyncForwardsEvery } = asynchronousUtilities;

export default class TopLevelMetaAssertion extends Element {
  constructor(context, string, node, breakPoint, label, suppositions, deduction, proof, metaLevelAssumptions) {
    super(context, string, node, breakPoint);

    this.label = label;
    this.suppositions = suppositions;
    this.deduction = deduction;
    this.proof = proof;
    this.metaLevelAssumptions = metaLevelAssumptions;
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

  getMetaLevelAssumptions() {
    return this.metaLevelAssumptions;
  }

  isUnconditional() {
    const suppositionsLength = this.suppositions.length,
          unconditional = (suppositionsLength === 0);

    return unconditional;
  }

  isConditional() {
    const unconditional = this.isUnconditional(),
          conditional = !unconditional;

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
    }, this.metaLevelAssumptions, context);

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
        let statementUnifies;

        const statement = judgement.getStatement();

        let subproofAssertion;

        const { SubproofAssertion } = elements;

        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

        if (subproofAssertion !== null) {
          statementUnifies = false;

          subproofAssertion = subproofAssertion.validate(context);

          const subproofassertionUnifies = this.unifySubproofAssertion(subproofAssertion, context);

          if (subproofassertionUnifies) {
            statementUnifies = true;
          }
        } else {
          statementUnifies = this.unifyStatement(statement, context);
        }

        if (statementUnifies) {
          debugger
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

  unifyDeducedStatement(deducedStatement, context) {
    let deducedStatementUnifies = false;

    const deducedStatementString = deducedStatement.getString(),
          topLevelMetaAssertionString = this.getString(); ///

    context.trace(`Unifying the '${deducedStatementString}' deduced statement with the '${topLevelMetaAssertionString}' top level meta-assertion...`);

    const conditional = this.isConditional();

    if (conditional) {
      debugger
    }

    if (deducedStatementUnifies) {
      context.debug(`...unified the '${deducedStatementString}' deduced statement with the '${topLevelMetaAssertionString}' top level meta-assertion.`);
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

  toJSON() {
    const labelJSON = labelToLabelJSON(this.label),
          deductionJSON = deductionToDeductionJSON(this.deduction),
          suppositionsJSON = suppositionsToSuppositionsJSON(this.suppositions),
          metaLevelAssumptionsJSON = metaLevelAssumptionsToMetaLevelAssumptionsJSON(this.metaLevelAssumptions),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const label = labelJSON,  ///
          deduction = deductionJSON,  ///
          suppositions = suppositionsJSON,  ///
          metaLevelAssumptions = metaLevelAssumptionsJSON,  ///
          json = {
            string,
            breakPoint,
            label,
            deduction,
            suppositions,
            metaLevelAssumptions
          };

    return json;
  }

  static fromJSON(Class, json, context) {
    const label = labelFromJSON(json, context),
          deduction = deductionFromJSON(json, context),
          suppositions = suppositionsFromJSON(json, context),
          metaLevelAssumptions = metaLevelAssumptionsFromJSON(json, context),
          string = topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction),
          node = null,
          breakPoint = breakPointFromJSON(json),
          proof = null,
          topLevelMetaAssertion = new Class(context, string, node, breakPoint, label, suppositions, deduction, proof, metaLevelAssumptions);

    return topLevelMetaAssertion;
  }
}

// unifyTopLevelMetaAssertion(topLevelMetaAssertion, context) {
//   let topLevelMetaAssertionUnifies = false;
//
//   const subproofAssertionString = this.getString(),  ///
//     topLevelMetaAssertionString = topLevelMetaAssertion.getString();
//
//   context.trace(`Unifying the '${topLevelMetaAssertionString}' top level meta-assertion with the '${subproofAssertionString}' subproof assertion...`);
//
//   const deduction = topLevelMetaAssertion.getDeduction(),
//     generalContext = context, ///
//     specificContext = context;  ///
//
//   join((specificContext) => {
//     const deductionUnifies = this.unifyDeduction(deduction, generalContext, specificContext);
//
//     if (deductionUnifies) {
//       const suppositions = topLevelMetaAssertion.getSuppositions(),
//         suppositionsUnify = this.unifySuppositions(suppositions, generalContext, specificContext);
//
//       if (suppositionsUnify) {
//         topLevelMetaAssertionUnifies = true;
//       }
//     }
//   }, specificContext, context);
//
//   if (topLevelMetaAssertionUnifies) {
//     context.debug(`...unified the '${topLevelMetaAssertionString}' top level meta-assertion with the '${subproofAssertionString}' subproof assertion.`);
//   }
//
//   return topLevelMetaAssertionUnifies;
// }
//
// unifyTopLevelMetaAssertion(topLevelMetaAssertion, context) {
//   let topLevelMetaAssertionUnifies = false;
//
//   const assumptionString = this.getString(),  ///
//     topLevelMetaAssertionString = topLevelMetaAssertion.getString();
//
//   context.trace(`Unifying the '${topLevelMetaAssertionString}' top level meta-assertion with the '${assumptionString}' assumption...`);
//
//   reconcile((context) => {
//     topLevelMetaAssertionUnifies = this.reference.unifyTopLevelMetaAssertion(topLevelMetaAssertion, context);
//
//     if (topLevelMetaAssertionUnifies) {
//       const subproofAssertion = this.findSubproofAssertion(context);
//
//       if (subproofAssertion !== null) {
//         topLevelMetaAssertionUnifies = subproofAssertion.unifyTopLevelMetaAssertion(topLevelMetaAssertion, context);
//       } else {
//         const unconditional = topLevelMetaAssertion.isUnconditional();
//
//         if (unconditional) {
//           const deduction = topLevelMetaAssertion.getDeduction(),
//             deductionUnifies = this.unifyDeduction(deduction, context);
//
//           if (deductionUnifies) {
//             topLevelMetaAssertionUnifies = true;
//           }
//         }
//       }
//     }
//   }, context);
//
//   if (topLevelMetaAssertionUnifies) {
//     context.trace(`...unified the '${topLevelMetaAssertionString}' top level meta-assertion with the '${assumptionString}' assumption...`);
//   }
//
//   return topLevelMetaAssertionUnifies;
// }
//
// unifyTopLevelMetaAssertions(reference, context) {
//   let topLevelMetaAssertionsUnify;
//
//   const topLevelMetaAssertions = context.findTopLevelMetaAssertionsByReference(reference);
//
//   topLevelMetaAssertionsUnify = topLevelMetaAssertions.some((topLevelMetaAssertion) => {
//     const topLevelMetaAssertionUnifies = this.unifyTopLevelMetaAssertion(topLevelMetaAssertion, context);
//
//     if (topLevelMetaAssertionUnifies) {
//       return true;
//     }
//   });
//
//   return topLevelMetaAssertionsUnify;
// }
// unifyDeduction(deduction, context) {
//   let deductionUnifies = false;
//
//   const deductionString = deduction.getString(),
//         assumptionString = this.getString();  ///
//
//   context.trace(`Unifying the '${deductionString}' deduction with the '${assumptionString}' assumption's statement...`);
//
//   const deductionContext = deduction.getContext(),
//     generalContext = context, ///
//     specificContext = deductionContext; ///
//
//   join((specificContext) => {
//     const statement = deduction.getStatement(),
//       statementUnifies = this.unifyStatement(statement, generalContext, specificContext);
//
//     if (statementUnifies) {
//       deductionUnifies = true;
//     }
//   }, specificContext, context);
//
//   if (deductionUnifies) {
//     context.debug(`...unified the '${deductionString}' deduction with the '${assumptionString}' assumption's statement.`);
//   }
//
//   return deductionUnifies;
// }

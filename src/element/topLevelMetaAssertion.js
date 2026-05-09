"use strict";

import { Element, asynchronousUtilities } from "occam-languages";

import { encapsulate } from "../utilities/context";
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

  getStatement() {
    let statement = null;

    const unconditional = this.isUnconditional();

    if (unconditional) {
      statement = this.deduction.getStatement();
    }

    return statement;
  }

  getStatements() {
    let statements = null;

    const unconditional = this.isUnconditional();

    if (!unconditional) {
      const suppositionStatements = this.suppositions.map((supposition) => {
              const suppositionStatement = supposition.getStatement();

              return suppositionStatement;
            }),
            deductionStatement = this.deduction.getStatement();

      statements = [
        ...suppositionStatements,
        deductionStatement
      ];
    }

    return statements;
  }

  isUnconditional() {
    const suppositionsLength = this.suppositions.length,
          unconditional = (suppositionsLength === 0);

    return unconditional;
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

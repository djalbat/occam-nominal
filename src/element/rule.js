"use strict";

import { arrayUtilities } from "necessary";
import { Element, asynchronousUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { labelsFromJSON, premisesFromJSON, conclusionFromJSON, labelsToLabelsJSON, premisesToPremisesJSON, conclusionToConclusionJSON } from "../utilities/json";

const { reverse } = arrayUtilities,
      { asyncExtract, asyncForwardsEvery, asyncBackwardsEvery } = asynchronousUtilities;

export default define(class Rule extends Element {
  constructor(context, string, node, breakPoint, proof, labels, premises, conclusion) {
    super(context, string, node, breakPoint);

    this.proof = proof;
    this.labels = labels;
    this.premises = premises;
    this.conclusion = conclusion;
  }

  getLabels() {
    return this.labels;
  }

  getPremises() {
    return this.premises;
  }

  getProof() {
    return this.proof;
  }

  getConclusion() {
    return this.conclusion;
  }

  getRuleNode() {
    const node = this.getNode(),
          ruleNode = node;  ///

    return ruleNode;
  }

  matchMetavariableNode(metavariableNode) {
    const metavariableNodeMatches = this.labels.some((label) => {
      const metavariableNodeMatches = label.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        return true;
      }
    });

    return metavariableNodeMatches;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const ruleString = this.getString(); ///

    context.trace(`Verifying the '${ruleString}' rule...`);

    await enclose(async (context) => {
      const labelsVerify = this.verifyLabels(context);

      if (labelsVerify) {
        const premisesVerify = await this.verifyPremises(context);

        if (premisesVerify) {
          const conclusionVerifies = await this.verifyConclusion(context);

          if (conclusionVerifies) {
            const proofVerifies = await this.verifyProof(context);

            if (proofVerifies) {
              verifies = true;
            }
          }
        }
      }
    }, context);

    if (verifies) {
      const rule = this;  ///

      context.addRule(rule);

      context.debug(`...verified the '${ruleString}' rule.`);
    }

    return verifies;
  }

  verifyLabel(label, context) {
    let labelVerifies;

    const ruleString = this.getString(),  ///
          labelString = label.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${labelString}' label...`);

    labelVerifies = label.verify();

    if (labelVerifies) {
      context.debug(`...verified the '${ruleString}' rule's '${labelString}' label.`);
    }

    return labelVerifies;
  }

  verifyLabels(context) {
    let labelsVerify;

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's labels...`);

    labelsVerify = this.labels.every((label) => {
      const labelVerifies = this.verifyLabel(label, context);

      if (labelVerifies) {
        return true;
      }
    });

    if (labelsVerify) {
      context.debug(`...verified the '${ruleString}' rule's labels.`);
    }

    return labelsVerify;
  }

  async verifyProof(context) {
    let proofVerifies;

    if (this.proof === null) {
      proofVerifies = true;
    } else {
      const ruleString = this.getString();  ///

      context.trace(`Verifying the '${ruleString}' rule's proof...`);

      const statement = this.conclusion.getStatement();

      proofVerifies = await this.proof.verify(statement, context);

      if (proofVerifies) {
        context.debug(`...verified the '${ruleString}' rule's proof.`);
      }
    }

    return proofVerifies;
  }

  async verifyPremise(premise, context) {
    let premiseVerifies;

    const ruleString = this.getString(),  ///
          premiseString = premise.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${premiseString}' premise...`);

    premiseVerifies = await premise.verify(context)

    if (premiseVerifies) {
      const subproofOrProofAssertion = premise;  ////

      context.assignAssignments();

      context.addSubproofOrProofAssertion(subproofOrProofAssertion);
    }

    if (premiseVerifies) {
      context.debug(`...verified the '${ruleString}' rule's '${premiseString}' premise.`);
    }

    return premiseVerifies;
  }

  async verifyPremises(context) {
    let premisesVerify;

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's premises...`);

    premisesVerify = await asyncForwardsEvery(this.premises, async (premise) => {
      const premiseVerifies = await this.verifyPremise(premise, context);

      if (premiseVerifies) {
        return true;
      }
    });

    if (premisesVerify) {
      context.debug(`...verified the '${ruleString}' rule's premises.`);
    }

    return premisesVerify;
  }

  async verifyConclusion(context) {
    let conclusionVerifies;

    const ruleString = this.getString(),  ///
          conclusionString = this.conclusion.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    conclusionVerifies = await this.conclusion.verify(context);

    if (conclusionVerifies) {
      context.debug(`...verified the '${ruleString}' rule's '${conclusionString}' conclusion.`);
    }

    return conclusionVerifies;
  }

  async unifyStepWithConclusion(step, context) {
    let stepUnifiesWithConclusion = false;

    await this.break(context);

    const ruleString = this.getString(),
          stepString = step.getString(),
          conclusionString = this.conclusion.getString();

    context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    const stepUnifies = this.conclusion.unifyStep(step, context);

    if (stepUnifies) {
      stepUnifiesWithConclusion = true;
    }

    if (stepUnifiesWithConclusion) {
      context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion.`);
    }

    return stepUnifiesWithConclusion;
  }

  async unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context) {
    let stepAndSubproofOrProofAssertionsUnify = false;

    const statementUnifiesWithConclusion = await this.unifyStepWithConclusion(step, context);

    if (statementUnifiesWithConclusion) {
      const subproofOrProofAssertionsUnifiesWithPremises = await this.unifySubproofOrProofAssertionsWithPremises(subproofOrProofAssertions, context);

      if (subproofOrProofAssertionsUnifiesWithPremises) {
        const derivedSubstitutionsResolved = context.areDerivedSubstitutionsResolved();

        if (derivedSubstitutionsResolved) {
          stepAndSubproofOrProofAssertionsUnify = true;
        }
      }
    }

    return stepAndSubproofOrProofAssertionsUnify;
  }

  async unifySubproofOrProofAssertionsWithPremise(subproofOrProofAssertions, premise, context) {
    let subproofOrProofAssertionsUnifiesWithPremise = false;

    await this.break(context);

    if (!subproofOrProofAssertionsUnifiesWithPremise) {
      const subproofOrProofAssertion = await asyncExtract(subproofOrProofAssertions, async (subproofOrProofAssertion) => {
        const subproofOrProofAssertionUnifies = await premise.unifySubproofOrProofAssertion(subproofOrProofAssertion, context);

        if (subproofOrProofAssertionUnifies) {
          context.resolveDerivedSubstitutions();

          return true;
        }
      }) || null;

      if (subproofOrProofAssertion !== null) {
        subproofOrProofAssertionsUnifiesWithPremise = true;
      }
    }

    if (!subproofOrProofAssertionsUnifiesWithPremise) {
      const premiseUnifiesIndependently = await premise.unifyIndependently(context);

      if (premiseUnifiesIndependently) {
        subproofOrProofAssertionsUnifiesWithPremise = true;
      }
    }

    return subproofOrProofAssertionsUnifiesWithPremise;
  }

  async unifySubproofOrProofAssertionsWithPremises(subproofOrProofAssertions, context) {
    let subproofOrProofAssertionsUnifiesWithPremises;

    subproofOrProofAssertions = reverse(subproofOrProofAssertions); ///

    subproofOrProofAssertionsUnifiesWithPremises = await asyncBackwardsEvery(this.premises, async (premise) => {
      const stepUnifiesWithPremise = await this.unifySubproofOrProofAssertionsWithPremise(subproofOrProofAssertions, premise, context);

      if (stepUnifiesWithPremise) {
        return true;
      }
    });

    return subproofOrProofAssertionsUnifiesWithPremises;
  }

  toJSON() {
    const labelsJSON = labelsToLabelsJSON(this.labels),
          premisesJSON = premisesToPremisesJSON(this.premises),
          conclusionJSON = conclusionToConclusionJSON(this.conclusion),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const labels = labelsJSON,  ///
          premises = premisesJSON,  ///
          conclusion = conclusionJSON,  ///
          json = {
            string,
            breakPoint,
            labels,
            premises,
            conclusion
          };

    return json;
  }

  static name = "Rule";

  static fromJSON(json, context) {
    const { string } = json,
          node = null,
          breakPoint = breakPointFromJSON(json),
          labels = labelsFromJSON(json, context),
          premises = premisesFromJSON(json, context),
          conclusion = conclusionFromJSON(json, context),
          proof = null,
          rule = new Rule(context, string, node, breakPoint, proof, labels, premises, conclusion);

    return rule;
  }
});

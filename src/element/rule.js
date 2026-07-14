"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { enclose } from "../utilities/context";
import { labelsFromJSON, premisesFromJSON, conclusionFromJSON, labelsToLabelsJSON, premisesToPremisesJSON, conclusionToConclusionJSON } from "../utilities/json";

const { reverse } = arrayUtilities,
      { every, extract, forwardsEvery, backwardsEvery } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  verify = breakable(function (context, continuation) {
    const ruleString = this.getString(); ///

    context.trace(`Verifying the '${ruleString}' rule...`);

    enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyPremises = this.verifyPremises.bind(this),
            verifyConclusion = this.verifyConclusion.bind(this);

      all([
        verifyLabels,
        verifyPremises,
        verifyConclusion,
        verifyProof
      ], context, (verifies) => {
        if (verifies) {
          const rule = this;  ///

          context.addRule(rule);

          context.debug(`...verified the '${ruleString}' rule.`);
        }

        return continuation(verifies);
      });
    }, context);
  });

  verifyLabel(label, context, continuation) {
    const ruleString = this.getString(),  ///
          labelString = label.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${labelString}' label...`);

    label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${ruleString}' rule's '${labelString}' label.`);
      }

      return continuation(labelVerifies);
    });
  }

  verifyProof(context, continuation) {
    if (this.proof === null) {
      const proofVerifies = true;

      return continuation(proofVerifies);
    }

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's proof...`);

    const statement = this.conclusion.getStatement();

    this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${ruleString}' rule's proof.`);
      }

      return continuation(proofVerifies);
    });
  }

  verifyLabels(context, conntinuation) {
    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's labels...`);

    return every(this.labels, (label, continuation) => {
      return this.verifyLabel(label, context, continuation);
    }, (labelsVerify) => {
      if (labelsVerify) {
        context.debug(`...verified the '${ruleString}' rule's labels.`);
      }

      return conntinuation(labelsVerify);
    });
  }

  verifyPremise(premise, context, continuation) {
    const ruleString = this.getString(),  ///
          premiseString = premise.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${premiseString}' premise...`);

    premise.verify(context, (premiseVerifies) => {
      if (premiseVerifies) {
        const subproofOrProofAssertion = premise;  ////

        context.assignAssignments();

        context.addSubproofOrProofAssertion(subproofOrProofAssertion);
      }

      if (premiseVerifies) {
        context.debug(`...verified the '${ruleString}' rule's '${premiseString}' premise.`);
      }

      return continuation(premiseVerifies);
    });
  }

  verifyPremises(context, continuation) {
    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's premises...`);

    return forwardsEvery(this.premises, (premise, continuation) => {
      return this.verifyPremise(premise, context, continuation);
    }, (premisesVerify) => {
      if (premisesVerify) {
        context.debug(`...verified the '${ruleString}' rule's premises.`);
      }

      return continuation(premisesVerify);
    });
  }

  verifyConclusion(context, continuation) {
    const ruleString = this.getString(),  ///
          conclusionString = this.conclusion.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    this.conclusion.verify(context, (conclusionVerifies) => {
      if (conclusionVerifies) {
        context.debug(`...verified the '${ruleString}' rule's '${conclusionString}' conclusion.`);
      }

      return continuation(conclusionVerifies);
    });
  }

  unifyStepWithConclusion(step, context, continuation) {
    const ruleString = this.getString(),
          stepString = step.getString(),
          conclusionString = this.conclusion.getString();

    context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    this.conclusion.unifyStep(step, context, (stepUnifies) => {
      let stepUnifiesWithConclusion = false;

      if (stepUnifies) {
        stepUnifiesWithConclusion = true;
      }

      if (stepUnifiesWithConclusion) {
        context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion.`);
      }

      return continuation(stepUnifiesWithConclusion);
    });
  }

  unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context, continuation) {
    this.unifyStepWithConclusion(step, context, (statementUnifiesWithConclusion) => {
      if (!statementUnifiesWithConclusion) {
        const stepAndSubproofOrProofAssertionsUnify = false;

        return continuation(stepAndSubproofOrProofAssertionsUnify);
      }

      this.unifySubproofOrProofAssertionsWithPremises(subproofOrProofAssertions, context, (subproofOrProofAssertionsUnifiesWithPremises) => {
        let stepAndSubproofOrProofAssertionsUnify = false;

        if (subproofOrProofAssertionsUnifiesWithPremises) {
          const derivedSubstitutionsResolved = context.areDerivedSubstitutionsResolved();

          if (derivedSubstitutionsResolved) {
            stepAndSubproofOrProofAssertionsUnify = true;
          }
        }

        return continuation(stepAndSubproofOrProofAssertionsUnify);
      });
    });
  }

  unifySubproofOrProofAssertionsWithPremise(subproofOrProofAssertions, premise, context, continuation) {
    return extract(subproofOrProofAssertions, (subproofOrProofAssertion, continuation) => {
      return premise.unifySubproofOrProofAssertion(subproofOrProofAssertion, context, continuation);
    }, (subproofOrProofAssertion = null) => {
      if (subproofOrProofAssertion !== null) {
        const subproofOrProofAssertionsUnifiesWithPremise = true;

        return context.resolveDerivedSubstitutions(() => {
          return continuation(subproofOrProofAssertionsUnifiesWithPremise);
        });
      }

      return premise.unifyIndependently(context, continuation);
    });
  }

  unifySubproofOrProofAssertionsWithPremises(subproofOrProofAssertions, context, continuation) {
    subproofOrProofAssertions = reverse(subproofOrProofAssertions); ///

    return backwardsEvery(this.premises, (premise, continuation) => {
      return this.unifySubproofOrProofAssertionsWithPremise(subproofOrProofAssertions, premise, context, continuation);
    }, continuation);
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

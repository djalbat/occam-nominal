"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose } from "../utilities/context";
import { labelsFromJSON, premisesFromJSON, conclusionFromJSON, labelsToLabelsJSON, premisesToPremisesJSON, conclusionToConclusionJSON } from "../utilities/json";

const { reverse } = arrayUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities,
      { asynchronousAll, asynchronousEvery, asynchronousExtract, asynchronousForwardsEvery, asynchronousBackwardsEvery } = continuationUtilities;

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

    return enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyPremises = this.verifyPremises.bind(this),
            verifyConclusion = this.verifyConclusion.bind(this);

      return asynchronousAll([
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

        return continuation(verifies, context);
      });
    }, context);
  });

  verifyLabels(context, continuation) {
    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's labels...`);

    const verifyLabel = this.verifyLabel.bind(this);

    return asynchronousEvery(this.labels, verifyLabel, context, (labelsVerify) => {
      if (labelsVerify) {
        context.debug(`...verified the '${ruleString}' rule's labels.`);
      }

      return continuation(labelsVerify, context);
    });
  }

  verifyLabel(label, context, continuation) {
    const labelString = label.getString(),
          ruleString = this.getString(); ///

    context.trace(`Verifying the '${ruleString}' rule's '${labelString}' label...`);

    return label.verify((labelVerifies) => {
      if (labelVerifies) {
        context.debug(`...verified the '${ruleString}' rule's '${labelString}' label.`);
      }

      return continuation(labelVerifies, context);
    });
  }

  verifyProof(context, continuation) {
    if (this.proof === null) {
      const proofVerifies = true; ///

      return continuation(proofVerifies, context);
    }

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's proof...`);

    const statement = this.conclusion.getStatement();

    return this.proof.verify(statement, context, (proofVerifies) => {
      if (proofVerifies) {
        context.debug(`...verified the '${ruleString}' rule's proof.`);
      }

      return continuation(proofVerifies, context);
    });
  }

  verifyConclusion(context, continuation) {
    const ruleString = this.getString(), ///
          conclusionString = this.conclusion.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    return this.conclusion.verify(context, (conclusionVerifies) => {
      if (conclusionVerifies) {
        context.debug(`...verified the '${ruleString}' rule's '${conclusionString}' conclusion.`);
      }

      return continuation(conclusionVerifies, context);
    });
  }

  verifyPremise(premise, context, continuation) {
    const ruleString = this.getString(), ///
          premiseString = premise.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${premiseString}' premise...`);

    return premise.verify(context, (premiseVerifies) => {
      if (premiseVerifies) {
        const factOrSubproof = premise;  ////

        context.assignAssignments();

        context.addFactOrSubproof(factOrSubproof);
      }

      if (premiseVerifies) {
        context.debug(`...verified the '${ruleString}' rule's '${premiseString}' premise.`);
      }

      return continuation(premiseVerifies, context);
    });
  }

  verifyPremises(context, continuation) {
    const premisesLength = this.premises.length;

    if (premisesLength === 0) {
      const premisesVerify = true;  ///

      return continuation(premisesVerify, context);
    }

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's premises...`);

    const verifyPremise = this.verifyPremise.bind(this);

    return asynchronousForwardsEvery(this.premises, verifyPremise, context, (premisesVerify) => {
      if (premisesVerify) {
        context.debug(`...verified the '${ruleString}' rule's premises.`);
      }

      return continuation(premisesVerify, context);
    });
  }

  unifyStepWithConclusion(step, context, continuation) {
    const ruleString = this.getString(),
          stepString = step.getString(),
          conclusionString = this.conclusion.getString();

    context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    return this.conclusion.unifyStep(step, context, (stepUnifies) => {
      let stepUnifiesWithConclusion = false;

      if (stepUnifies) {
        stepUnifiesWithConclusion = true;
      }

      if (stepUnifiesWithConclusion) {
        context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion.`);
      }

      return continuation(stepUnifiesWithConclusion, context);
    });
  }

  unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, continuation) {
    return this.unifyStepWithConclusion(step, context, (statementUnifiesWithConclusion) => {
      if (!statementUnifiesWithConclusion) {
        const stepAndFactOrSubproofsUnify = false;

        return continuation(stepAndFactOrSubproofsUnify);
      }

      return this.unifyFactOrSubproofsWithPremises(factOrSubproofs, context, (factOrSubproofsUnifiesWithPremises) => {
        let stepAndFactOrSubproofsUnify = false;

        if (factOrSubproofsUnifiesWithPremises) {
          const inferredSubstitutionsSolved = context.areInferredSubstitutionsSolved();

          if (inferredSubstitutionsSolved) {
            stepAndFactOrSubproofsUnify = true;
          }
        }

        return continuation(stepAndFactOrSubproofsUnify);
      });
    });
  }

  unifyFactOrSubproofsWithPremise(factOrSubproofs, premise, context, continuation) {
    return asynchronousExtract(factOrSubproofs, (factOrSubproof, continuation) => {
      return premise.unifyFactOrSubproof(factOrSubproof, context, continuation);
    }, (factOrSubproof = null) => {
      if (factOrSubproof !== null) {
        const factOrSubproofsUnifiesWithPremise = true;

        return context.solveInferredSubstitutions(() => {
          return continuation(factOrSubproofsUnifiesWithPremise);
        });
      }

      return premise.unifyIndependently(context, continuation);
    });
  }

  unifyFactOrSubproofsWithPremises(factOrSubproofs, context, continuation) {
    factOrSubproofs = reverse(factOrSubproofs); ///

    return asynchronousBackwardsEvery(this.premises, (premise, continuation) => {
      return this.unifyFactOrSubproofsWithPremise(factOrSubproofs, premise, context, continuation);
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

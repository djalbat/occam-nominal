"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { enclose, reconcile } from "../utilities/context";
import { labelsFromJSON, premisesFromJSON, conclusionFromJSON, labelsToLabelsJSON, premisesToPremisesJSON, conclusionToConclusionJSON } from "../utilities/json";

const { reverse } = arrayUtilities,
      { cut, all, every, extract, forwardsEvery, backwardsEvery } = continuationUtilities,
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

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const ruleString = this.getString(), ///
          speicifcContext = context; ///

    context.trace(`Verifying the '${ruleString}' rule...`);

    return enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyPremises = this.verifyPremises.bind(this),
            verifyConclusion = this.verifyConclusion.bind(this);

      return all([
        verifyLabels,
        verifyPremises,
        verifyConclusion,
        verifyProof
      ], context, ( _ , back) => {
        const rule = this; ///

        context = speicifcContext;  ///

        context.addRule(rule);

        context.debug(`...verified the '${ruleString}' rule.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${ruleString}' rule.`);

        return back();
      });
    }, context);
  });

  unifyStepAndFactOrSubproofs = breakable(function (step, factOrSubproofs, context, forward, back) {
    const specificContext = context;  ///

    return reconcile((context) => {
      return this.unifyStepWithConclusion(step, context, (context, back) => {
        return this.unifyFactOrSubproofsWithPremises(factOrSubproofs, context, (context, back) => {
          const complexSubstitutionsUnsolved = context.areComplexSubstitutionsUnsolved();

          if (complexSubstitutionsUnsolved) {
            context.debug(`Unable to unify the step and fact or subproofs because thre are unsolved complex substitutions.`);

            return back();
          }

          context = specificContext;  ///

          return forward(context, back);
        }, back);
      }, back);
    }, context)
  });

  verifyLabels(context, forward, back) {
    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's labels...`);

    const verifyLabel = this.verifyLabel.bind(this);

    return every(this.labels, verifyLabel, context, (context, back) => {
      context.debug(`...verified the '${ruleString}' rule's labels.`);

      return forward(context, back);
    }, back);
  }

  verifyLabel(label, context, forward, back) {
    const labelString = label.getString(),
          ruleString = this.getString(); ///

    context.trace(`Verifying the '${ruleString}' rule's '${labelString}' label...`);

    return label.verify((back) => {
      context.debug(`...verified the '${ruleString}' rule's '${labelString}' label.`);

      return forward(context, back);
    }, back);
  }

  verifyProof(context, forward, back) {
    if (this.proof === null) {
      return forward(context, back);
    }

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's proof...`);

    const statement = this.conclusion.getStatement();

    return this.proof.verify(statement, context, (context, back) => {
      context.debug(`...verified the '${ruleString}' rule's proof.`);

      return forward(context, back);
    }, back);
  }

  verifyPremise(premise, context, forward, back) {
    const ruleString = this.getString(), ///
          premiseString = premise.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${premiseString}' premise...`);

    return premise.verify(context, (context, back) => {
      context.debug(`...verified the '${ruleString}' rule's '${premiseString}' premise.`);

      return forward(context, back);
    }, back);
  }

  verifyPremises(context, forward, back) {
    const premisesLength = this.premises.length;

    if (premisesLength === 0) {
      return forward(context, back);
    }

    const ruleString = this.getString();  ///

    context.trace(`Verifying the '${ruleString}' rule's premises...`);

    return forwardsEvery(this.premises, (premise, context, forward, back) => {
      return this.verifyPremise(premise, context, ( _ , back) => {
        const factOrSubproof = premise; ///

        context.addFactOrSubproof(factOrSubproof);

        context.assignAssignments();

        return forward(context, back);
      }, back);
    }, context, (context, back) => {
      context.debug(`...verified the '${ruleString}' rule's premises.`);

      return forward(context, back);
    }, back);
  }

  verifyConclusion(context, forward, back) {
    const ruleString = this.getString(), ///
          conclusionString = this.conclusion.getString();

    context.trace(`Verifying the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    return this.conclusion.verify(context, (context, back) => {
      context.debug(`...verified the '${ruleString}' rule's '${conclusionString}' conclusion.`);

      return forward(context, back);
    }, back);
  }

  unifyStepWithConclusion(step, context, forward, back) {
    const ruleString = this.getString(),
          stepString = step.getString(),
          conclusionString = this.conclusion.getString();

    context.trace(`Unifying the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion...`);

    return this.conclusion.unifyStep(step, context, (context, back) => {
      context.debug(`...unified the '${stepString}' step with the '${ruleString}' rule's '${conclusionString}' conclusion.`);

      return forward(context, back);
    }, back);
  }

  unifyFactOrSubproofsWithPremise(factOrSubproofs, premise, context, forward, back) {
    return extract(factOrSubproofs,
      (factOrSubproof, forward, back) => {
        return premise.unifyFactOrSubproof(factOrSubproof, context, forward, back);
      }, (factOrSubproofs, factOrSubproof, context, back) => {
        return context.solveInferredSubstitutions((back) => {
          return forward(factOrSubproofs, context, back);
        }, back);
      }, (exception) => {
        if(exception) {
          return back(exception);
        }

        return premise.unifyIndependently(context, (context, back) => {
          return forward(factOrSubproofs, context, back);
        }, back);
      }
    );
  }

  unifyFactOrSubproofsWithPremises(factOrSubproofs, context, forward, back) {
    factOrSubproofs = reverse(factOrSubproofs); ///

    return backwardsEvery(this.premises, (premise, factOrSubproofs, context, forward, back) => {
      return this.unifyFactOrSubproofsWithPremise(factOrSubproofs, premise, context, forward, back);
    }, factOrSubproofs, context, (factOrSubproofs, context, back) => {
      return forward(context, back);
    }, back);
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

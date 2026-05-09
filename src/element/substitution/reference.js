"use strict";

import Substitution from "../substitution";

import { define } from "../../elements";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { instantiateReferenceSubstitution } from "../../process/instantiate";
import { referenceSubstitutionFromReferenceSubstitutionNode } from "../../utilities/element";
import { referenceSubstitutionStringFromReferenceAndMetavariable } from "../../utilities/string";
import { elide, ablates, manifest, attempts, instantiate, unserialises } from "../../utilities/context";

export default define(class ReferenceSubstitution extends Substitution {
  constructor(context, string, node, breakPoint, targetReference, replacementReference) {
    super(context, string, node, breakPoint);

    this.targetReference = targetReference;
    this.replacementReference = replacementReference;
  }

  getTargetReference() {
    return this.targetReference;
  }

  getReplacementReference() {
    return this.replacementReference;
  }

  getReferenceSubstitutionNode() {
    const node = this.getNode(),
          referenceSubstitution = node; ///

    return referenceSubstitution;
  }

  getTargetNode() {
    const targetReferenceNode = this.targetReference.getNode(),
          tergetNode = targetReferenceNode; ///

    return tergetNode;
  }

  getReplacementNode() {
    const replacementReferenceNode = this.replacementReference.getNode(),
          replacementNode = replacementReferenceNode; ///

    return replacementNode;
  }

  getMetavariableNode() { return this.targetReference.getMetavariableNode(); }

  isTrivial() {
    const targetReferenceEqualToReplacementReference = this.targetReference.isEqualTo(this.replacementReference),
          trivial = targetReferenceEqualToReplacementReference; ///

    return trivial;
  }

  matchMetavariableNode(metavariableNode) { return this.targetReference.matchMetavariableNode(metavariableNode); }

  compareReference(reference, context) {
    const referenceEqualToReplacementReference = this.replacementReference.isEqualTo(reference),
          comparedToReference = referenceEqualToReplacementReference; ///

    return comparedToReference;
  }

  compareParameter(parameter) {
    const targetReferenceComparesToParameter = this.targetReference.compareParameter(parameter),
          comparesToParameter = targetReferenceComparesToParameter;  ///

    return comparesToParameter;
  }

  compareSubstitution(substitution) {
    let substitutionCompares = false;

    const substitutionReferenceSubstitution = (substitution instanceof ReferenceSubstitution);

    if (substitutionReferenceSubstitution) {
      const substitutionNode = substitution.getNode(),
            substitutionNodeMatches = this.matchNode(substitutionNode);

      if (substitutionNodeMatches) {
        substitutionCompares = true;
      }
    }

    return substitutionCompares;
  }

  validate(context) {
    let referenceSubstitution = null;

    const referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution...`);

    let validates = false;

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution) {
      validates = true;

      referenceSubstitution = validSubstitution;  ///

      context.debug(`...the '${referenceSubstitutionString}' reference substitution is already valid.`);
    } else {
      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const targetReferenceValidates = this.validateTargetReference(generalContext, specificContext);

        if (targetReferenceValidates) {
          const replacementReferenceValidates = this.validateReplacementReference(generalContext, specificContext);

          if (replacementReferenceValidates) {
            validates = true;
          }
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }
      }, generalContext, specificContext);

      if (validates) {
        const substitution = this;  ///

        referenceSubstitution = substitution;  ///

        context.addSubstitution(substitution);
      }
    }

    if (validates) {
      context.debug(`...validated the '${referenceSubstitutionString}' reference substitution.`);
    }

    return referenceSubstitution;
  }

  validateTargetReference(generalContext, specificContext) {
    let targetReferenceValidates = false;

    const context = generalContext, ///
          referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution's target reference...`);

    manifest((context) => {
      elide((context) => {
        const targetReference = this.targetReference.validate(context);

        if (targetReference !== null) {
          targetReferenceValidates = true;
        }
      }, context);
    }, specificContext, context);

    if (targetReferenceValidates) {
      context.debug(`...validated the '${referenceSubstitutionString}' reference substitution's target reference...`);
    }

    return targetReferenceValidates;
  }

  validateReplacementReference(generalContext, specificContext) {
    let replacementReferenceValidates = false;

    const context = specificContext,  ///
          referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution's replacement reference...`);

    elide((context) => {
      const replacementReference = this.replacementReference.validate(context);

      if (replacementReference !== null) {
        replacementReferenceValidates = true;
      }
    }, context);

    if (replacementReferenceValidates) {
      context.debug(`...validated the '${referenceSubstitutionString}' reference substitution's replacement reference.`);
    }

    return replacementReferenceValidates;
  }

  static name = "ReferenceSubstitution";

  static fromJSON(json, context) {
    let referenceSubstitutionn = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                referenceSubstitutionNode = instantiateReferenceSubstitution(string, context),
                node = referenceSubstitutionNode, ///
                breakPoint = breakPointFromJSON(json),
                targetReference = targetReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext),
                replacementReference = replacementReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, specificContext),
                contexts = [
                  generalContext,
                  specificContext
                ];

          referenceSubstitutionn = new ReferenceSubstitution(contexts, string, node, breakPoint, targetReference, replacementReference);
        }, json, context);
      }, context);
    }

    return referenceSubstitutionn;
  }

  static fromReferenceAndMetavariable(reference, metavariable, generalContext, specificContext) {
    let referenceSubstitution;

    ablates((generalContext, specificContext) => {
      const context = specificContext;  ///

      instantiate((context) => {
        const specificContext = context,  ///
              referenceSubstitutionString = referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable),
              string = referenceSubstitutionString,  ///
              referenceSubstitutionNode = instantiateReferenceSubstitution(string, context);

        referenceSubstitution = referenceSubstitutionFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext, specificContext);
      }, context);
    }, generalContext, specificContext);

    return referenceSubstitution;
  }

  static fromAssumptionAndMetaLevelAssumption(assumption, metaLevelAssumption, generalContext, specificContext) {
    let referenceSubstitution;

    ablates((generalContext, specificContext) => {
      const context = specificContext;  ///

      instantiate((context) => {
        const specificContext = context,  ///
              metavariable = assumption.getMetavariable(),
              reference = metaLevelAssumption.getReference(),
              referenceSubstitutionString = referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable),
              string = referenceSubstitutionString,  ///
              referenceSubstitutionNode = instantiateReferenceSubstitution(string, context);

        referenceSubstitution = referenceSubstitutionFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext, specificContext);
      }, context);
    }, generalContext, specificContext);

    return referenceSubstitution;
  }
});

function targetReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext) {
  const targetReferenceNode = referenceSubstitutionNode.getTargetReferenceNode(),
        targetReference = generalContext.findReferenceByReferenceNode(targetReferenceNode);

  return targetReference;
}

function replacementReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, specificContext) {
  const replacementReferenceNode = referenceSubstitutionNode.getReplacementReferenceNode(),
        replacementReference = specificContext.findReferenceByReferenceNode(replacementReferenceNode);

  return replacementReference;
}

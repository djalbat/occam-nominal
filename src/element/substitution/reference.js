"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { instantiateReferenceSubstitution } from "../../process/instantiate";
import { referenceSubstitutionFromReferenceSubstitutionNode } from "../../utilities/element";
import { ablates, manifest, attempts, instantiate, unserialises } from "../../utilities/context";
import { referenceSubstitutionStringFromReferenceAndMetavariable } from "../../utilities/string";

const { breakPointFromJSON } = breakPointUtilities;

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

    const substitutionReferenceSubstitution = ReferenceSubstitution.prototype.isPrototypeOf(substitution);

    if (substitutionReferenceSubstitution) {
      const substitutionNode = substitution.getNode(),
            substitutionNodeMatches = this.matchNode(substitutionNode);

      if (substitutionNodeMatches) {
        substitutionCompares = true;
      }
    }

    return substitutionCompares;
  }

  validate(state, context, continuation) {
    let validates;

    const referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution...`);

    let substitution;

    substitution = this.findSubstitution(context);

    if (substitution !== null) {
      const referenceSubstitution = substitution;  ///

      context.debug(`...the '${referenceSubstitutionString}' reference substitution is already presenet.`);

      validates = continuation(referenceSubstitution, context);
    } else {
      substitution = this;  ///

      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const validateTargetReference = this.validateTargetReference.bind(this),
              validateReplacementReference = this.validateReplacementReference.bind(this);

        validates = all([
          validateTargetReference,
          validateReplacementReference
        ], state, generalContext, specificContext, () => {
          let validates;

          validates = continuation(substitution, context);

          return validates;
        });

        if (validates) {
          this.commit(generalContext, specificContext);

          context.addSubstitution(substitution);
        }
      }, generalContext, specificContext);
    }

    if (validates) {
      context.debug(`...validated the '${referenceSubstitutionString}' reference substitution.`);
    }

    return validates;
  }

  validateTargetReference(state, generalContext, specificContext, continuation) {
    let targetReferenceValidates;

    const context = generalContext,  ///
          referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution's target reference...`);

    const targetReferenceSingular = this.targetReference.isSingular();

    if (targetReferenceSingular) {
      targetReferenceValidates = this.targetReference.validate(state, context, (targetReference, context) => {
        let validates;

        const generalContext = context; ///

        validates = continuation(state, generalContext, specificContext);

        return validates;
      });
    } else {
      const targetReferenceString = this.targetReference.getString();

      targetReferenceValidates = false;

      context.debug(`The '${targetReferenceString}' target reference is not singular.`);
    }

    if (targetReferenceValidates) {
      context.trace(`...validated the '${referenceSubstitutionString}' reference substitution's target reference.`);
    }

    return targetReferenceValidates;
  }

  validateReplacementReference(state, generalContext, specificContext, continuation) {
    let replacementReferenceValidates;

    const context = specificContext,  ///
          referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution's replacement reference...`);

    replacementReferenceValidates = this.replacementReference.validate(state, context, (replacementReference, context) => {
      let validates;

      const specificContext = context;  ///

      validates = continuation(state, generalContext, specificContext);

      return validates;
    });

    if (replacementReferenceValidates) {
      context.debug(`...validated the '${referenceSubstitutionString}' reference substitution's replacement reference.`);
    }

    return replacementReferenceValidates;
  }

  static name = "ReferenceSubstitution";

  static fromJSON(json, context) {
    let referenceSubstitutionn;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                referenceSubstitutionNode = instantiateReferenceSubstitution(string, context),
                node = referenceSubstitutionNode, ///
                contexts = [
                  generalContext,
                  specificContext
                ],
                breakPoint = breakPointFromJSON(json),
                targetReference = targetReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext),
                replacementReference = replacementReferenceFromReferenceSubstitutionNode(referenceSubstitutionNode, specificContext);

          referenceSubstitutionn = new ReferenceSubstitution(contexts, string, node, breakPoint, targetReference, replacementReference);
        }, json, context);
      }, context);
    }

    return referenceSubstitutionn;
  }

  static fromAssumptionAndConstraint(assumption, constraint, generalContext, specificContext) {
    let referenceSubstitution;

    const reference = constraint.getReference(),
          metavariable = assumption.getMetavariable(),
          referenceSubstitutionString = referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable);

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const string = referenceSubstitutionString,  ///
                context = specificContext,  ///
                referenceSubstitutionNode = instantiateReferenceSubstitution(string, context);

          referenceSubstitution = referenceSubstitutionFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return referenceSubstitution;
  }

  static fromReferenceAndMetavariable(reference, metavariable, generalContext, specificContext) {
    let referenceSubstitution;

    const referenceSubstitutionString = referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable);

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const string = referenceSubstitutionString,  ///
                context = specificContext,  ///
                referenceSubstitutionNode = instantiateReferenceSubstitution(string, context);

          referenceSubstitution = referenceSubstitutionFromReferenceSubstitutionNode(referenceSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
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

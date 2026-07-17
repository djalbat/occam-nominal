"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { instantiateReferenceSubstitution } from "../../process/instantiate";
import { referenceSubstitutionFromReferenceSubstitutionNode } from "../../utilities/element";
import { referenceSubstitutionStringFromReferenceAndMetavariable } from "../../utilities/string";
import { pass, waive, elide, ablates, manifest, attempts, instantiate, unserialises } from "../../utilities/context";

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

  validate(strict, context, continuation) {
    if (continuation === undefined) {
      continuation = context; ///

      context = strict; ///

      strict = false;
    }

    const referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution...`);

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution !== null) {
      const referenceSubstitution = validSubstitution;  ///

      context.debug(`...the '${referenceSubstitutionString}' reference substitution is already valid.`);

      continuation(referenceSubstitution);

      return;
    }

    const generalContext = this.getGeneralContext(),
          specificContext = this.getSpecificContext();

    (strict ? pass : waive)((context) => {
      attempts((generalContext, specificContext) => {
        const validateTargetReference = this.validateTargetReference.bind(this),
              validateReplacementReference = this.validateReplacementReference.bind(this);

        return all([
          validateTargetReference,
          validateReplacementReference
        ], generalContext, specificContext, (validates) => {
          let referenceSubstitution = null;

          if (validates) {
            const substitution = this;  ///

            referenceSubstitution = substitution; ///

            context.addSubstitution(substitution);
          }

          if (validates) {
            this.commit(generalContext, specificContext);
          }

          if (validates) {
            context.debug(`...validated the '${referenceSubstitutionString}' reference substitution.`);
          }

          return continuation(referenceSubstitution);
        });
      }, generalContext, specificContext);
    }, context);
  }

  validateTargetReference(generalContext, specificContext, continuation) {
    const context = generalContext,  ///
          referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution's target reference...`);

    elide((context) => {
      return this.targetReference.validate(context, (targetReference) => {
        let targetReferenceValidates = false;

        if (targetReference !== null) {
          targetReferenceValidates = true;
        }

        if (targetReferenceValidates) {
          context.debug(`...validated the '${referenceSubstitutionString}' reference substitution's target reference...`);
        }

        return continuation(targetReferenceValidates);
      });
    }, context);
  }

  validateReplacementReference(generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          referenceSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${referenceSubstitutionString}' reference substitution's replacement reference...`);

    elide((context) => {
      return this.replacementReference.validate(context, (replacementReference) => {
        let replacementReferenceValidates = false;

        if (replacementReference !== null) {
          replacementReferenceValidates = true;
        }

        if (replacementReferenceValidates) {
          context.debug(`...validated the '${referenceSubstitutionString}' reference substitution's replacement reference.`);
        }

        return continuation(replacementReferenceValidates);
      });
    }, context);
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

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const metavariable = assumption.getMetavariable(),
                reference = constraint.getReference(),
                referenceSubstitutionString = referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable),
                string = referenceSubstitutionString,  ///
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

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const referenceSubstitutionString = referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable),
                string = referenceSubstitutionString,  ///
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

"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { instantiateFrameSubstitution } from "../../process/instantiate";
import { frameSubstitutionFromFrameSubstitutionNode } from "../../utilities/element";
import { frameSubstitutionStringFromFrameAndMetavariable } from "../../utilities/string";
import { elide, ablate, ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";

const { breakPointFromJSON } = breakPointUtilities;

export default define(class FrameSubstitution extends Substitution {
  constructor(contexts, string, node, breakPoint, targetFrame, replacementFrame) {
    super(contexts, string, node, breakPoint);

    this.targetFrame = targetFrame;
    this.replacementFrame = replacementFrame;
  }

  getTargetFrame() {
    return this.targetFrame;
  }

  getReplacementFrame() {
    return this.replacementFrame;
  }

  getFrameSubstitutionNode() {
    const node = this.getNode(),
          frameSubstitutionNode = node; ///

    return frameSubstitutionNode;
  }

  getMetavariableNode() { return this.targetFrame.getMetavariableNode(); }

  getTargetNode() {
    const targetFrameNode = this.targetFrame.getNode(),
          tergetNode = targetFrameNode; ///

    return tergetNode;
  }

  getReplacementNode() {
    const replacementFrameNode = this.replacementFrame.getNode(),
          replacementNode = replacementFrameNode; ///

    return replacementNode;
  }

  isTrivial() {
    const targetFrameEqualToReplacementFrame = this.targetFrame.isEqualTo(this.replacementFrame),
          trivial = targetFrameEqualToReplacementFrame; ///

    return trivial;
  }

  matchMetavariableNode(metavariableNode) { return this.targetFrame.matchMetavariableNode(metavariableNode); }

  compareParameter(parameter) {
    const targetFrameComparesToParameter = this.targetFrame.compareParameter(parameter),
          comparesToParameter = targetFrameComparesToParameter;  ///

    return comparesToParameter;
  }

  compareFrame(frame, context) {
    const frameEqualToReplacementFrame = this.replacementFrame.isEqualTo(frame),
        comparedToFrame = frameEqualToReplacementFrame; ///

    return comparedToFrame;
  }

  validate(context, continuatino) {
    const frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution...`);

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution !== null) {
      const frameSubstitution = validSubstitution;  ///

      context.debug(`...the '${frameSubstitutionString}' frame substitution is already valid.`);

      continuatino(frameSubstitution);

      return;
    }

    const generalContext = this.getGeneralContext(),
          specificContext = this.getSpecificContext();

    attempts((generalContext, specificContext) => {
      const validateTargetFrame = this.validateTargetFrame.bind(this),
            validateReplacementFrame = this.validateReplacementFrame.bind(this);

      all([
        validateTargetFrame,
        validateReplacementFrame
      ], generalContext, specificContext, (validates) => {
        let frameSubstitution = null;

        if (validates) {
          const substitution = this;  ///

          frameSubstitution = substitution; ///

          context.addSubstitution(substitution);
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }

        if (validates) {
          context.debug(`...validated the '${frameSubstitutionString}' frame substitution.`);
        }

        continuatino(frameSubstitution);
      });
    }, generalContext, specificContext);
  }

  validateTargetFrame(generalContext, specificContext, continuatino) {
    const context = generalContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's target frame...`);

    const targetFrameSingular = this.targetFrame.isSingular();

    if (!targetFrameSingular) {
      const targetFrameString = this.targetFrame.getString(),
            targetFrameValidates = false;

      context.debug(`The '${targetFrameString}' target frame is not singular.`);

      continuatino(targetFrameValidates);

      return;
    }

    manifest((context) => {
      elide((context) => {
        this.targetFrame.validate(context, (targetFrame) => {
          let targetFrameValidates = false;

          if (targetFrame !== null) {
            targetFrameValidates = true;
          }

          if (targetFrameValidates) {
            context.debug(`...validated the '${frameSubstitutionString}' frame substitution's target frame...`);
          }

          continuatino(targetFrameValidates);
        });
      }, context);
    }, specificContext, context);
  }

  validateReplacementFrame(generalContext, specificContext, continuatino) {
    const context = specificContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's replacement frame...`);

    elide((context) => {
      this.replacementFrame.validate(context, (replacementFrame) => {
        let replacementFrameValidates = false;

        if (replacementFrame !== null) {
          replacementFrameValidates = true;
        }

        if (replacementFrameValidates) {
          context.debug(`...validated the '${frameSubstitutionString}' frame substitution's replacement frame.`);
        }

        continuatino(replacementFrameValidates);
      });
    }, context);
  }

  unifySubstitution(substitution, context) {
    let substitutionUnifies = false;

    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution...`);

    reconcile((context) => {
      const replacementFrameUnifies = this.unifyReplacementFrame(substitution, context);

      if (replacementFrameUnifies) {
        const targetFrameUnifies = this.unifyTargetFrame(substitution, context);

        if (targetFrameUnifies) {
          context.commit();

          substitutionUnifies = true;
        }
      }
    }, context);

    if (substitutionUnifies) {
      context.debug(`...unified the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution.`);
    }

    return substitutionUnifies;
  }

  unifyTargetFrame(substitution, context) {
    let targetFrameUnifies = false;

    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution's target frame with the '${generalSubstitutionString}' substitution's target frame...`);

    const generalSubstitutionGeneralContext = generalSubstitution.getGeneralContext(),
          specificSubstitutionGeneralContext = specificSubstitution.getGeneralContext(),
          generalSubstitutionTargetFrame = generalSubstitution.getTargetFrame(),
          specificSubstitutionTargetFrame = specificSubstitution.getTargetFrame(),
          generalContext = generalSubstitutionGeneralContext,  ///
          specificContext = specificSubstitutionGeneralContext,  ///
          generalFrame = generalSubstitutionTargetFrame, ///
          specificFrame = specificSubstitutionTargetFrame; ///

    reconcile((specificContext) => {
      const frameNode = generalFrame.getFrameNode(),
            metavariable = metavariableFromFrameNode(frameNode, generalContext);

      if (metavariable !== null) {
        const frame = specificFrame,  ///
              frameUnifies = metavariable.unifyFrame(frame, generalContext, specificContext);

        if (frameUnifies) {
          specificContext.commit(context);

          targetFrameUnifies = true;
        }
      }
    }, specificContext);

    if (targetFrameUnifies) {
      context.trace(`...unified the '${specificSubstitutionString}' substitution's target frame with the '${generalSubstitutionString}' substitution's target frame.`);
    }

    return targetFrameUnifies;
  }

  unifyReplacementFrame(substitution, context) {
    let replacementFrameUnifies = false;

    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution's replacement frame with the '${generalSubstitutionString}' substitution's replacement frame...`);

    const generalSubstitutionSpecificContext = generalSubstitution.getSpecificContext(),
          specificSubstitutionSpecificContext = specificSubstitution.getSpecificContext(),
          generalSubstitutionReplacementFrame = generalSubstitution.getReplacementFrame(),
          specificSubstitutionReplacementFrame = specificSubstitution.getReplacementFrame(),
          generalContext = generalSubstitutionSpecificContext,  ///
          specificContext = specificSubstitutionSpecificContext,  ///
          generalFrame = generalSubstitutionReplacementFrame, ///
          specificFrame = specificSubstitutionReplacementFrame; ///

    reconcile((specificContext) => {
      const frameNode = generalFrame.getNode(),
            metavariable = metavariableFromFrameNode(frameNode, generalContext);

      if (metavariable !== null) {
        const frame = specificFrame,  ///
              frameUnifies = metavariable.unifyFrame(frame, generalContext, specificContext);

        if (frameUnifies) {
          specificContext.commit(context);

          replacementFrameUnifies = true;
        }
      }
    }, specificContext);

    if (replacementFrameUnifies) {
      context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement frame with the '${generalSubstitutionString}' substitution's replacement frame.`);
    }

    return replacementFrameUnifies;
  }

  static name = "FrameSubstitution";

  static fromJSON(json, context) {
    let frameSubstitutionn = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                frameSubstitutionNode = instantiateFrameSubstitution(string, context),
                node = frameSubstitutionNode, ///
                breakPoint = breakPointFromJSON(json),
                targetFrame = targetFrameFromFrameSubstitutionNode(frameSubstitutionNode, generalContext),
                replacementFrame = replacementFrameFromFrameSubstitutionNode(frameSubstitutionNode, specificContext),
                contexts = [
                  generalContext,
                  specificContext
                ];

          frameSubstitutionn = new FrameSubstitution(contexts, string, node, breakPoint, targetFrame, replacementFrame);
        }, json, context);
      }, context);
    }

    return frameSubstitutionn;
  }

  static fromStatement(statement, context) {
    let frameSubstitution = null;

    const frameSubstitutionNode = statement.getFrameSubstitutionNode();

    if (frameSubstitutionNode !== null) {
      ablate((context) => {
        const generalContext = context, ///
              specificContext = context;  ///

        frameSubstitution = frameSubstitutionFromFrameSubstitutionNode(frameSubstitutionNode, generalContext, specificContext);
      }, context);
    }

    return frameSubstitution;
  }

  static fromFrameAndMetavariable(frame, metavariable, generalContext, specificContext) {
    let frameSubstitution

    ablates((generalContext, specificContext) => {
      const context = specificContext;  ///

      instantiate((context) => {
        const specificContext = context,  ///
              frameSubstitutionString = frameSubstitutionStringFromFrameAndMetavariable(frame, metavariable),
              string = frameSubstitutionString,  ///
              frameSubstitutionNode = instantiateFrameSubstitution(string, context);

        frameSubstitution = frameSubstitutionFromFrameSubstitutionNode(frameSubstitutionNode, generalContext, specificContext);
      }, context);
    }, generalContext, specificContext);

    return frameSubstitution;
  }
});

function metavariableFromFrameNode(frameNode, generalContext) {
  let metavariable = null;

  const metavariableNode = frameNode.getMetavariableNode();

  if (metavariableNode !== null) {
    metavariable = generalContext.findMetavariableByMetavariableNode(metavariableNode);
  }

  return metavariable;
}

function targetFrameFromFrameSubstitutionNode(frameSubstitutionNode, generalContext) {
  const targetFrameNode = frameSubstitutionNode.getTargetFrameNode(),
        targetFrame = generalContext.findFrameByFrameNode(targetFrameNode);

  return targetFrame;
}

function replacementFrameFromFrameSubstitutionNode(frameSubstitutionNode, specificContext) {
  const replacementFrameNode = frameSubstitutionNode.getReplacementFrameNode(),
        replacementFrame = specificContext.findFrameByFrameNode(replacementFrameNode);

  return replacementFrame;
}

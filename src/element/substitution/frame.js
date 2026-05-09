"use strict";

import Substitution from "../substitution";

import { define } from "../../elements";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { instantiateFrameSubstitution } from "../../process/instantiate";
import { frameSubstitutionFromFrameSubstitutionNode } from "../../utilities/element";
import { frameSubstitutionStringFromFrameAndMetavariable } from "../../utilities/string";
import { elide, ablate, ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";

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

  compareFrame(frame, context) {
    const frameEqualToReplacementFrame = this.replacementFrame.isEqualTo(frame),
          comparedToFrame = frameEqualToReplacementFrame; ///

    return comparedToFrame;
  }

  compareParameter(parameter) {
    const targetFrameComparesToParameter = this.targetFrame.compareParameter(parameter),
          comparesToParameter = targetFrameComparesToParameter;  ///

    return comparesToParameter;
  }

  validate(context) {
    let frameSubstitution = null;

    const frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution...`);

    let validates = false;

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution) {
      validates = true;

      frameSubstitution = validSubstitution;  ///

      context.debug(`...the '${frameSubstitutionString}' frame substitution is already valid.`);
    } else {
      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const targetFrameValidates = this.validateTargetFrame(generalContext, specificContext);

        if (targetFrameValidates) {
          const replacementFrameValidates = this.validateReplacementFrame(generalContext, specificContext);

          if (replacementFrameValidates) {
            validates = true;
          }
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }
      }, generalContext, specificContext);

      if (validates) {
        const substitution = this;  ///

        frameSubstitution = substitution; ///

        context.addSubstitution(substitution);
      }
    }

    if (validates) {
      context.debug(`...validated the '${frameSubstitutionString}' frame substitution.`);
    }

    return frameSubstitution;
  }

  validateTargetFrame(generalContext, specificContext) {
    let targetFrameValidates = false;

    const context = generalContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's target frame...`);

    const targetFrameSingular = this.targetFrame.isSingular();

    if (targetFrameSingular) {
      manifest((context) => {
        elide((context) => {
          const tragetFrame = this.targetFrame.validate(context);

          if (tragetFrame !== null) {
            this.targetFrame = tragetFrame;

            targetFrameValidates = true;
          }
        }, context);
      }, specificContext, context);
    } else {
      const targetFrameString = this.targetFrame.getString();

      context.debug(`The '${targetFrameString}' target frame is not singular.`);
    }

    if (targetFrameValidates) {
      context.debug(`...validated the frame substitution's target frame...`);
    }

    return targetFrameValidates;
  }

  validateReplacementFrame(generalContext, specificContext) {
    let replacementFrameValidates = false;

    const context = specificContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's replacement frame...`);

    elide((context) => {
      const replacementFrame = this.replacementFrame.validate(context);

      if (replacementFrame !== null) {
        this.replacementFrame = replacementFrame;

        replacementFrameValidates = true;
      }
    }, context);

    if (replacementFrameValidates) {
      context.debug(`...validated the '${frameSubstitutionString}' frame substitution's replacement frame.`);
    }

    return replacementFrameValidates;
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

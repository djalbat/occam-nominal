"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { instantiateFrameSubstitution } from "../../process/instantiate";
import { frameSubstitutionFromFrameSubstitutionNode } from "../../utilities/element";
import { frameSubstitutionStringFromFrameAndMetavariable } from "../../utilities/string";
import { elide, ablates, descend, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";

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

      return continuatino(frameSubstitution);
    }

    const generalContext = this.getGeneralContext(),
          specificContext = this.getSpecificContext();

    attempts((generalContext, specificContext) => {
      const validateTargetFrame = this.validateTargetFrame.bind(this),
            validateReplacementFrame = this.validateReplacementFrame.bind(this);

      return all([
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

        return continuatino(frameSubstitution);
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

      return continuatino(targetFrameValidates);
    }

    manifest((context) => {
      elide((context) => {
        return this.targetFrame.validate(context, (targetFrame) => {
          let targetFrameValidates = false;

          if (targetFrame !== null) {
            targetFrameValidates = true;
          }

          if (targetFrameValidates) {
            context.debug(`...validated the '${frameSubstitutionString}' frame substitution's target frame...`);
          }

          return continuatino(targetFrameValidates);
        });
      }, context);
    }, specificContext, context);
  }

  validateReplacementFrame(generalContext, specificContext, continuatino) {
    const context = specificContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's replacement frame...`);

    elide((context) => {
      return this.replacementFrame.validate(context, (replacementFrame) => {
        let replacementFrameValidates = false;

        if (replacementFrame !== null) {
          replacementFrameValidates = true;
        }

        if (replacementFrameValidates) {
          context.debug(`...validated the '${frameSubstitutionString}' frame substitution's replacement frame.`);
        }

        return continuatino(replacementFrameValidates);
      });
    }, context);
  }

  unifySubstitution(substitution, context, continuation) {
    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution...`);

    reconcile((context) => {
      const unifyTargetFrame = this.unifyTargetFrame.bind(this),
            unifyReplacementFrame = this.unifyReplacementFrame.bind(this);

      return all([
        unifyReplacementFrame,
        unifyTargetFrame
      ], substitution, context, (substitutionUnifies) => {
        if (substitutionUnifies) {
          context.commit();
        }

        if (substitutionUnifies) {
          context.debug(`...unified the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution.`);
        }

        return continuation(substitutionUnifies);
      });
    }, context);
  }

  unifyTargetFrame(substitution, context, continuation) {
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

      if (metavariable === null) {
        const targetFrameUnifies = false;

        return continuation(targetFrameUnifies);
      }

      const frame = specificFrame;  ///

      return metavariable.unifyFrame(frame, generalContext, specificContext, (frameUnifies) => {
        let targetFrameUnifies = false;

        if (frameUnifies) {
          specificContext.commit(context);

          targetFrameUnifies = true;
        }

        if (targetFrameUnifies) {
          context.trace(`...unified the '${specificSubstitutionString}' substitution's target frame with the '${generalSubstitutionString}' substitution's target frame.`);
        }

        return continuation(targetFrameUnifies);
      });
    }, specificContext);
  }

  unifyReplacementFrame(substitution, context, continuation) {
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

      if (metavariable === null) {
        const replacementFrameUnifies = false;

        return continuation(replacementFrameUnifies);
      }

      const frame = specificFrame;  ///

      return metavariable.unifyFrame(frame, generalContext, specificContext, (frameUnifies) => {
        let replacementFrameUnifies = false;

        if (frameUnifies) {
          specificContext.commit(context);

          replacementFrameUnifies = true;
        }

        if (replacementFrameUnifies) {
          context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement frame with the '${generalSubstitutionString}' substitution's replacement frame.`);
        }

        return continuation(replacementFrameUnifies);
      });
    }, specificContext);
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

  static fromStatementNode(statementNode, context) {
    let frameSubstitution = null;

    const frameSubstitutionNode = statementNode.getFrameSubstitutionNode();

    if (frameSubstitutionNode !== null) {
      descend((context) => {
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

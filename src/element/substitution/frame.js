"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Substitution from "../substitution";

import { define } from "../../elements";
import { instantiateFrameSubstitution } from "../../process/instantiate";
import { frameSubstitutionFromFrameSubstitutionNode } from "../../utilities/element";
import { frameSubstitutionStringFromFrameAndMetavariable } from "../../utilities/string";
import { ablates, manifest, attempts, participate, instantiate, unserialises } from "../../utilities/context";

const { all } = continuationUtilities,
      { breakPointFromJSON } = breakPointUtilities;

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

  validate(state, context, continuation) {
    let validates;

    const frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution...`);

    let substitution;

    substitution = this.findSubstitution(context);

    if (substitution !== null) {
      const frameSubstitution = substitution;  ///

      context.debug(`...the '${frameSubstitutionString}' frame substitution is already presenet.`);

      validates = continuation(frameSubstitution, context);
    } else {
      substitution = this;  ///

      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const validateTargetFrame = this.validateTargetFrame.bind(this),
              validateReplacementFrame = this.validateReplacementFrame.bind(this);

        validates = all([
          validateTargetFrame,
          validateReplacementFrame
        ], state, context, generalContext, specificContext, (state, context, generalContext, specificContext) => {
          let validates;

          this.commit(generalContext, specificContext);

          const frameSubstitution = substitution; ///

          validates = continuation(frameSubstitution, context);

          return validates;
        });

        if (validates) {
          context.addSubstitution(substitution);
        }
      }, generalContext, specificContext);
    }

    if (validates) {
      context.debug(`...validated the '${frameSubstitutionString}' frame substitution.`);
    }

    return validates;
  }

  validateTargetFrame(state, context, generalContext, specificContext, continuation) {
    let targetFrameValidates;

    const frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's target frame...`);

    const targetFrameSingular = this.targetFrame.isSingular();

    if (targetFrameSingular) {
      targetFrameValidates = this.targetFrame.validate(state, generalContext, (targetFrame, generalContext) => {
        let validates;

        validates = continuation(state, context, generalContext, specificContext);

        return validates;
      });
    } else {
      const targetFrameString = this.targetFrame.getString();

      targetFrameValidates = false;

      context.debug(`The '${targetFrameString}' target frame is not singular.`);
    }

    if (targetFrameValidates) {
      context.trace(`...validated the '${frameSubstitutionString}' frame substitution's target frame.`);
    }

    return targetFrameValidates;
  }

  validateReplacementFrame(state, context, generalContext, specificContext, continuation) {
    let replacementFrameValidates;

    const frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's replacement frame...`);

    participate((specificContext) => {
      replacementFrameValidates = this.replacementFrame.validate(state, specificContext, (replacementFrame, specificContext) => {
        let validates;

        validates = continuation(state, context, generalContext, specificContext);

        return validates;
      });
    }, specificContext, context);

    if (replacementFrameValidates) {
      context.debug(`...validated the '${frameSubstitutionString}' frame substitution's replacement frame.`);
    }

    return replacementFrameValidates;
  }

  static name = "FrameSubstitution";

  static fromJSON(json, context) {
    let frameSubstitutionn;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                frameSubstitutionNode = instantiateFrameSubstitution(string, context),
                node = frameSubstitutionNode, ///
                contexts = [
                  generalContext,
                  specificContext
                ],
                breakPoint = breakPointFromJSON(json),
                targetFrame = targetFrameFromFrameSubstitutionNode(frameSubstitutionNode, generalContext),
                replacementFrame = replacementFrameFromFrameSubstitutionNode(frameSubstitutionNode, specificContext);

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
      const generalContext = context, ///
            specificContext = context,  ///
            frameSubstitutionString = context.nodeAsString(frameSubstitutionNode);

      ablates((generalContext, specificContext) => {
        instantiate((specificContext) => {
          manifest((generalContext) => {
            const string = frameSubstitutionString,  ///
              context = specificContext,  ///
              frameSubstitutionNode = instantiateFrameSubstitution(string, context);

            frameSubstitution = frameSubstitutionFromFrameSubstitutionNode(frameSubstitutionNode, generalContext, specificContext);
          }, generalContext, specificContext);
        }, specificContext);
      }, generalContext, specificContext);
    }

    return frameSubstitution;
  }

  static fromFrameAndMetavariable(frame, metavariable, generalContext, specificContext) {
    let frameSubstitution;

    const frameSubstitutionString = frameSubstitutionStringFromFrameAndMetavariable(frame, metavariable);

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const string = frameSubstitutionString,  ///
                context = specificContext,  ///
                frameSubstitutionNode = instantiateFrameSubstitution(string, context);

          frameSubstitution = frameSubstitutionFromFrameSubstitutionNode(frameSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return frameSubstitution;
  }
});

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

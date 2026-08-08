"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { instantiateFrameSubstitution } from "../../process/instantiate";
import { frameSubstitutionFromFrameSubstitutionNode } from "../../utilities/element";
import { frameSubstitutionStringFromFrameAndMetavariable } from "../../utilities/string";
import { join, ablate, ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";

const { asynchronousAll } = continuationUtilities,
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
        ], state, generalContext, specificContext, () => {
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

  validateTargetFrame(state, generalContext, specificContext, continuation) {
    let targetFrameValidates;

    const context = generalContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's target frame...`);

    const targetFrameSingular = this.targetFrame.isSingular();

    if (targetFrameSingular) {
      targetFrameValidates = this.targetFrame.validate(state, context, (targetFrame, context) => {
        let validates;

        const generalContext = context; ///

        validates = continuation(state, generalContext, specificContext);

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

  validateReplacementFrame(state, generalContext, specificContext, continuation) {
    let replacementFrameValidates;

    const context = specificContext,  ///
          frameSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${frameSubstitutionString}' frame substitution's replacement frame...`);

    replacementFrameValidates = this.replacementFrame.validate(state, context, (replacementFrame, context) => {
      let validates;

      const specificContext = context;  ///

      validates = continuation(state, generalContext, specificContext);

      return validates;
    });

    if (replacementFrameValidates) {
      context.debug(`...validated the '${frameSubstitutionString}' frame substitution's replacement frame.`);
    }

    return replacementFrameValidates;
  }

  unifySimpleSubstitution(simpleSuubstitution, context, continuation) {
    const substitutionString = this.getString(),  ///
          simpleSubstitutionString = simpleSuubstitution.getString();

    context.trace(`Unifying the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution...`);

    return reconcile((context) => {
      const substitution = simpleSuubstitution, ///
            unifyTargetFrame = this.unifyTargetFrame.bind(this),
            unifyReplacementFrame = this.unifyReplacementFrame.bind(this);

      return asynchronousAll([
        unifyReplacementFrame,
        unifyTargetFrame
      ], substitution, context, (simpleSubstitutionUnifies) => {
        const solInferredSubstitution = context.getSoleInferredSubstitution(),
              substitution = solInferredSubstitution; ///

        if (simpleSubstitutionUnifies) {
          context.debug(`...unified the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution.`);
        }

        return continuation(simpleSubstitutionUnifies, substitution);
      });
    }, context);
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

    const frameNode = generalFrame.getFrameNode(),
          metavariable = metavariableFromFrameNode(frameNode, generalContext);

    if (metavariable === null) {
      const replacementFrameUnifies = false;

      return continuation(replacementFrameUnifies);
    }

    const frame = specificFrame;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return metavariable.unifyFrame(frame, generalContext, specificContext, (frameUnifies) => {
          let replacementFrameUnifies = false;

          if (frameUnifies) {
            specificContext.commit(context);

            replacementFrameUnifies = true;
          }

          if (replacementFrameUnifies) {
            context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement frame with the '${generalSubstitutionString}' substitution's replacement frame.`);
          }

          return continuation(replacementFrameUnifies, substitution, context);
        });
      }, specificContext);
    }, specificContext, context);
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

    const frameNode = generalFrame.getFrameNode(),
          metavariable = metavariableFromFrameNode(frameNode, generalContext);

    if (metavariable === null) {
      const targetFrameUnifies = false;

      return continuation(targetFrameUnifies);
    }

    const frame = specificFrame;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return metavariable.unifyFrame(frame, generalContext, specificContext, (frameUnifies) => {
          let targetFrameUnifies = false;

          if (frameUnifies) {
            specificContext.commit(context);

            targetFrameUnifies = true;
          }

          if (targetFrameUnifies) {
            context.trace(`...unified the '${specificSubstitutionString}' substitution's target frame with the '${generalSubstitutionString}' substitution's target frame.`);
          }

          return continuation(targetFrameUnifies, substitution, context);
        });
      }, specificContext);
    }, specificContext, context);
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

"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateFrame } from "../process/instantiate";
import { FRAME_META_TYPE_NAME } from "../metaTypeNames";
import { metavariableFromFrameNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class Frame extends Element {
  constructor(context, string, node, breakPoint, assumptions, metavariable) {
    super(context, string, node, breakPoint);

    this.assumptions = assumptions;
    this.metavariable = metavariable;
  }

  getAssumptions() {
    return this.assumptions;
  }

  getMetavariable() {
    return this.metavariable;
  }

  getFrameNode() {
    const node = this.getNode(),
          frameNode = node; ///

    return frameNode;
  }

  getMetavariableNode() {
    const frameNode = this.getFrameNode(),
          metavariableNode = frameNode.getMetavariableNode();

    return metavariableNode;
  }

  getMetavariableName() {
    let metavariableName = null;

    const singular = this.isSingular();

    if (singular) {
      metavariableName = this.metavariable.getName();
    }

    return metavariableName;
  }

  isEqualTo(frame) {
    const frameNode = frame.getNode(),
          frameNodeMatches = this.matchFrameNode(frameNode),
          equalTo = frameNodeMatches;  ///

    return equalTo;
  }

  isSingular() {
    const frameNode = this.getFrameNode(),
          singular = frameNode.isSingular();

    return singular;
  }

  matchFrameNode(frameNode) {
    const node = frameNode, ///
          nodeMatches = this.matchNode(node),
          frameNodeMatches = nodeMatches; ///

    return frameNodeMatches;
  }

  matchMetavariableNode(metavariableNode) {
    let metavariableNodeMatches = false;

    const singular = this.isSingular();

    if (singular) {
      metavariableNodeMatches = this.metavariable.matchMetavariableNode(metavariableNode);
    }

    return metavariableNodeMatches;
  }

  compareParameter(parameter) {
    let comparesToParamter = false;

    const singular = this.isSingular();

    if (singular) {
      const parameterName = parameter.getName();

      if (parameterName !== null) {
        const metavariableName = this.getMetavariableName();

        if (parameterName === metavariableName) {
          comparesToParamter = true;
        }
      }
    }

    return comparesToParamter;
  }

  findValidFrame(context) {
    const frameNode = this.getFrameNode(),
          frame = context.findFrameByFrameNode(frameNode),
          validFrame = frame; ///

    return validFrame;
  }

  validate(context) {
    let frame = null;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame...`);

    let validates = false;

    const validFrame = this.findValidFrame(context);

    if (validFrame !== null) {
      validates = true;

      frame = validFrame; ///

      context.debug(`...the '${frameString}' frame is already valid.`);
    } else {
      const metavariableValidates = this.validatMetavariable(context);

      if (metavariableValidates) {
        const assumptionsValidate = this.validateAssumptions(context);

        if (assumptionsValidate) {
          const stated = context.isStated();

          let validatesWhenStated = false,
              validatesWhenDerived = false;

          if (stated) {
            validatesWhenStated = this.validateWhenStated(context);
          } else {
            validatesWhenDerived = this.validateWhenDerived(context);
          }

          if (validatesWhenStated || validatesWhenDerived) {
            validates = true;
          }
        }
      }

      if (validates) {
        frame = this; ///

        context.addFrame(frame);
      }
    }

    if (validates) {
      context.debug(`...validated the '${frameString}' frame.`);
    }

    return frame;
  }

  validateAssumption(assumption, assumptions, context) {
    let assumptionValidates = false;

    const frameString = this.getString(), ///
          assumptionString = assumption.getString();

    context.trace(`Validating the '${frameString}' frame's '${assumptionString}' assumption.`);

    assumption = assumption.validate(context);  ///

    if (assumption !== null) {
      assumptions.push(assumption);

      assumptionValidates = true;
    }

    if (assumptionValidates) {
      context.debug(`...validated the '${frameString}' frame's '${assumptionString}' assumption.`);
    }

    return assumptionValidates;
  }

  validateAssumptions(context) {
    let assumptionsValidate;

    const frameString = this.getString();

    context.trace(`Validating the '${frameString}' frame's assumptions...`);

    const assumptions = [];

    assumptionsValidate = this.assumptions.every((assumption) => {
      const assumptionValidates = this.validateAssumption(assumption, assumptions, context);

      if (assumptionValidates) {
        return true;
      }
    });

    if (assumptionsValidate) {
      this.assumptions = assumptions;

      context.debug(`...validated the '${frameString}' frame's assumptions.`);
    }

    return assumptionsValidate;
  }

  validatMetavariable(context) {
    let metavariableValidates = true; ///

    if (this.metavariable !== null) {
      metavariableValidates = false;

      const frameString = this.getString(); ///

      context.trace(`Validating the '${frameString}' frame's metavariable...`);

      const metavariable = this.metavariable.validate(context),
            metaTypeName = FRAME_META_TYPE_NAME,
            frameMetaType = context.findMetaTypeByMetaTypeName(metaTypeName),
            metavariableMetaTypeEqualToFrameMetaType = metavariable.isMetaTypeEqualTo(frameMetaType);

      if (metavariableMetaTypeEqualToFrameMetaType) {
        this.metavariable = metavariable; ///

        metavariableValidates = true;
      }

      if (metavariableValidates) {
        context.debug(`...validated the '${frameString}' frame's metavariable.`);
      }
    }

    return metavariableValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated = false;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' stated frame...`);

    const singular = this.isSingular();

    if (singular) {
      validatesWhenStated = true;
    } else {
      context.debug(`The '${frameString}' stated frame must be singular.`);
    }

    if (validatesWhenStated) {
      context.debug(`...validated the '${frameString}' stated frame.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived = false;

    const frameString = this.getString();  ///

    context.trace(`Verifying the '${frameString}' derived frame...`);

    if (this.metavariable !== null) {
      const metavariableNode = this.getMetavariableNode(),
            declaredJudgements = context.findDeclaredJudgementsByMetavariableNode(metavariableNode),
            declaredJudgementsLength = declaredJudgements.length;

      if (declaredJudgementsLength > 0) {
        declaredJudgements.forEach((declaredJudgement) => {
          const assumption = declaredJudgement.getAssumption();

          this.assumptions.push(assumption);
        });

        validatesWhenDerived = true;
      } else {
        const metavariableString = this.metavariable.getString();

        context.trace(`The '${frameString}' frame's '${metavariableString}' metavariable does not match any declared judgements...`);
      }
    } else {
      validatesWhenDerived = true;
    }

    if (validatesWhenDerived) {
      context.debug(`...verified the '${frameString}' derived frame.`);
    }

    return validatesWhenDerived;
  }

  toJSON() {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    return json;
  }

  static name = "Frame";

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            frameNode = instantiateFrame(string, context),
            node = frameNode, ///
            breakPoint = breakPointFromJSON(json),
            assumptions = assumptionsFromFrameNode(frameNode, context),
            metavariable = metavariableFromFrameNode(frameNode, context);

      context = null;

      const frame = new Frame(context, string, node, breakPoint, assumptions, metavariable);

      return frame;
    }, context);
  }
});

function assumptionsFromFrameNode(frameNode, context) {
  const assumptionNodes = frameNode.getAssumptionNodes(),
        assumptions = assumptionNodes.map((assumptionNode) => {
          const assumption = context.findAssumptionByAssumptionNode(assumptionNode);

          return assumption;
        });

  return assumptions;
}

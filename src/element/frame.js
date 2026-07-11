"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { instantiateFrame } from "../process/instantiate";
import { FRAME_META_TYPE_NAME } from "../metaTypeNames";
import { metavariableFromFrameNode } from "../utilities/element";

const { every } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  isImplicit() {
    const implicit = (this.metavariable !== null);

    return implicit;
  }

  isSingular() {
    const frameNode = this.getFrameNode(),
          singular = frameNode.isSingular();

    return singular;
  }

  isMetavariableDefined(metavariable) {
    let metavariableDefined = false;

    if (this.metavariable !== null) {
      const metavariableA = metavariable,  ///
            metavariableB = this.metavariable,
            metavariableAEqualToMetavariableB = metavariableA.isEqualTo(metavariableB);

      if (metavariableAEqualToMetavariableB) {
        metavariableDefined = true;
      }
    }

    return metavariableDefined;
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

  validate(context, continuation) {
    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame...`);

    const validFrame = this.findValidFrame(context);

    if (validFrame !== null) {
      const frame = validFrame; ///

      context.debug(`...the '${frameString}' frame is already valid.`);

      continuation(frame);

      return;
    }

    const validatMetavariable = this.validatMetavariable.bind(this),
          validateAssumptions = this.validateAssumptions.bind(this);

    all([
      validatMetavariable,
      validateAssumptions
    ], context, (validates) => {
      if (!validates) {
        const frame = null;

        continuation(frame);

        return;
      }

      const validatesWhenStated = this.validateWhenStated.bind(this),
            validatesWhenDerived = this.validateWhenDerived.bind(this);

      exists([
        validatesWhenStated,
        validatesWhenDerived
      ], context, (validates) => {
        let frame = null;

        if (validates) {
          frame = this; ///

          context.addFrame(frame);
        }

        if (validates) {
          context.debug(`...validated the '${frameString}' frame.`);
        }

        continuation(frame);
      });
    });
  }

  validateAssumption(assumption, assumptions, context, continuation) {
    const frameString = this.getString(), ///
          assumptionString = assumption.getString();

    context.trace(`Validating the '${frameString}' frame's '${assumptionString}' assumption.`);

    assumption.validate(context, (assumption) => {
      let assumptionValidates = false;

      if (assumption !== null) {
        assumptions.push(assumption);

        assumptionValidates = true;
      }

      if (assumptionValidates) {
        context.debug(`...validated the '${frameString}' frame's '${assumptionString}' assumption.`);
      }

      continuation(assumptionValidates);
    });
  }

  validateAssumptions(context, continuation) {
    const frameString = this.getString();

    context.trace(`Validating the '${frameString}' frame's assumptions...`);

    const assumptions = [];

    every(this.assumptions, (assumption) => {
      this.validateAssumption(assumption, assumptions, context, continuation);
    }, (assumptionsValidate) => {
      if (assumptionsValidate) {
        this.assumptions = assumptions;

        context.debug(`...validated the '${frameString}' frame's assumptions.`);
      }

      continuation(assumptionsValidate);
    });
  }

  validatMetavariable(context, continuation) {
    if (this.metavariable !== null) {
      const metavariableValidates = true;

      continuation(metavariableValidates);

      return;
    }

    const frameString = this.getString(); ///

    context.trace(`Validating the '${frameString}' frame's metavariable...`);

    this.metavariable.validate(context, (metavariable) => {
      let metavariableValidates = false;

      if (metavariable !== null) {
        const metaTypeName = FRAME_META_TYPE_NAME,
              frameMetaType = context.findMetaTypeByMetaTypeName(metaTypeName),
              metavariableMetaTypeEqualToFrameMetaType = metavariable.isMetaTypeEqualTo(frameMetaType);

        if (metavariableMetaTypeEqualToFrameMetaType) {
          this.metavariable = metavariable; ///

          metavariableValidates = true;
        }
      }

      if (metavariableValidates) {
        context.debug(`...validated the '${frameString}' frame's metavariable.`);
      }

      continuation(metavariableValidates);
    });
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      continuation(validatesWhenStated);

      return;
    }

    let validatesWhenStated;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' stated frame...`);

    const singular = this.isSingular();

    if (!singular) {
      const validatesWhenStated = false;

      context.debug(`The '${frameString}' stated frame must be singular.`);

      continuation(validatesWhenStated);

      return;
    }

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${frameString}' stated frame.`);
    }

    continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      continuation(validatesWhenDerived);

      return;
    }

    let validatesWhenDerived;

    const frameString = this.getString();  ///

    context.trace(`Verifying the '${frameString}' derived frame...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...verified the '${frameString}' derived frame.`);
    }

    continuation(validatesWhenDerived);
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

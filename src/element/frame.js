"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateFrame } from "../process/instantiate";
import { FRAME_META_TYPE_NAME } from "../metaTypeNames";
import { metavariableFromFrameNode } from "../utilities/element";

const { all, every } = continuationUtilities,
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

  findFrame(context) {
    const frameNode = this.getFrameNode(),
          frame = context.findFrameByFrameNode(frameNode);

    return frame;
  }

  validate(state, context, forward, back) {
    let frame;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame...`);

    frame = this.findFrame(context);

    if (frame !== null) {
      context.debug(`The '${frameString}' frame is already present.`);

      return forward(frame, context, back);
    }

    frame = this; ///

    const validateAssumptions = this.validateAssumptions.bind(this),
          validateMetavariable = this.validateMetavariable.bind(this);

    return all([
      validateAssumptions,
      validateMetavariable
    ], state, context, (state, context, back) => {
      context.addFrame(frame);

      context.debug(`...validated the '${frameString}' frame.`);

      return forward(frame, context, back);
    }, back);
  }

  validateMetavariable(state, context, forward, back) {
    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's metavariable...`);

    return this.metavariable.validate(state, context, (metavariable, context, back) => {
      const metaType = metavariable.getMetaType(),
            metavariableString = metavariable.getString();

      if (metaType === null) {
        context.debug(`The '${frameString}' frame's '${metavariableString}' metavariable does not have a type.`);

        return back();
      }

      const frameMetaTypeName = FRAME_META_TYPE_NAME,
            frameMetaType = context.findMetaTypeByMetaTypeName(frameMetaTypeName),
            metavariableMetaTypeEqualToFrameMetaType = metavariable.isMetaTypeEqualTo(frameMetaType);

      if (!metavariableMetaTypeEqualToFrameMetaType) {
        const metaTypeString = metaType.getString(),
              frameMetaTypeString = frameMetaType.getString();

        context.debug(`The '${frameString}' frame's '${metavariableString}' metavariable's '${metaTypeString}' meta-type should be the '${frameMetaTypeString}' meta-type.`);

        return back();
      }

      this.metavariable = metavariable;

      context.debug(`...validated the '${frameString}' frame's metavariable.'`);

      return forward(state, context, back);
    }, back);
  }

  validateAssumption(assumption, assumptions, state, context, forward, back) {
    const frameString = this.getString(),  ///
          assumptionString = assumption.getString();

    context.trace(`Validating the '${frameString}' frame's '${assumptionString}' assumption...`);

    return assumption.validate(state, context, (assumption, context) => {
      assumptions.push(assumption);

      context.debug(`...validated the '${frameString}' frame's '${assumptionString}' assumption.`);

      return forward(assumptions, state, context, back);
    }, back);
  }

  validateAssumptions(state, context, forward, back) {
    const assumptionsLength = this.assumptions.length;

    if (assumptionsLength === 0) {
      return forward(state, context, back);
    }

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's assumptions...`);

    const assumptions = [];

    return every(this.assumptions, (assumption, assumptions, state, context, forward, back) => {
      return this.validateAssumption(assumption, assumptions, state, context, forward, back);
    }, assumptions, state, context, (assumptions, state, context, back) => {
      this.assumptions = assumptions;

      context.debug(`...validates the '${frameString}' frame's assumptions.`);

      return forward(state, context, back);
    }, back);
  }

  toJSON() {
    let json;

    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    json = {
      string,
      breakPoint
    };

    return json;
  }

  static name = "Frame";

  static fromJSON(json, context) {
    let frame;

    instantiate((context) => {
      const { string } = json,
            frameNode = instantiateFrame(string, context),
            node = frameNode, ///
            breakPoint = breakPointFromJSON(json),
            assumptions = assumptionsFromFrameNode(frameNode, context),
            metavariable = metavariableFromFrameNode(frameNode, context);

      context = null;

      frame = new Frame(context, string, node, breakPoint, assumptions, metavariable);
    }, context);

    return frame;
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

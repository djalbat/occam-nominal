"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateFrame } from "../process/instantiate";
import { linkFromFrameNode } from "../utilities/element";
import { FRAME_META_TYPE_NAME } from "../metaTypeNames";

const { all, every } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Frame extends Element {
  constructor(context, string, node, breakPoint, link, assumptions) {
    super(context, string, node, breakPoint);

    this.link = link;
    this.assumptions = assumptions;
  }

  getLink() {
    return this.link;
  }

  getAssumptions() {
    return this.assumptions;
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

  isImplicit() {
    const implicit = (this.metavariable !== null);

    return implicit;
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

    const validateLink = this.validateLink.bind(this),
          validateAssumptions = this.validateAssumptions.bind(this);

    return all([
      validateLink,
      validateAssumptions
    ], state, context, (state, context, back) => {
      context.addFrame(frame);

      context.debug(`...validated the '${frameString}' frame.`);

      return forward(frame, context, back);
    }, back);
  }

  validateLink(state, context, forward, back) {
    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's link...`);

    return this.link.validate(state, context, (link, context, back) => {
      const metaType = link.getMetaType(),
            linkString = link.getString();

      if (metaType === null) {
        context.debug(`The '${frameString}' frame's '${linkString}' link does not have a type.`);

        return back();
      }

      const frameMetaTypeName = FRAME_META_TYPE_NAME,
            frameMetaType = context.findMetaTypeByMetaTypeName(frameMetaTypeName),
            linkMetaTypeEqualToFrameMetaType = link.isMetaTypeEqualTo(frameMetaType);

      if (!linkMetaTypeEqualToFrameMetaType) {
        const metaTypeString = metaType.getString(),
              frameMetaTypeString = frameMetaType.getString();

        context.debug(`The '${frameString}' frame's '${linkString}' link's '${metaTypeString}' meta-type should be the '${frameMetaTypeString}' meta-type.`);

        return back();
      }

      this.link = link;

      context.debug(`...validated the '${frameString}' frame's link.'`);

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
            link = linkFromFrameNode(frameNode, context),
            assumptions = assumptionsFromFrameNode(frameNode, context);

      context = null;

      frame = new Frame(context, string, node, breakPoint, link, assumptions);
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

"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateFrame } from "../process/instantiate";
import { FRAME_META_TYPE_NAME } from "../metaTypeNames";
import { metavariableFromFrameNode } from "../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  findFrame(context) {
    const frameNode = this.getFrameNode(),
          frame = context.findFrameByFrameNode(frameNode);

    return frame;
  }

  validate(state, context, continuation) {
    let validates;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame...`);

    let frame;

    frame = this.findFrame(context);

    if (frame !== null) {
      context.debug(`The '${frameString}' frame is already present.`);

      validates = continuation(frame, context);
    } else {
      frame = this; ///

      const validateAssumptions = this.validateAssumptions.bind(this),
            validateMetavariable = this.validateMetavariable.bind(this);

      validates = all([
        validateMetavariable,
        validateAssumptions
      ], state, context, (state, context) => {
        let validates;

        context.addFrame(frame);

        validates = continuation(frame, context);

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${frameString}' frame.`);
    }

    return validates;
  }

  validateAssumption(assumption, assumptions, state, context, continuation) {
    let assumptionValidates;

    const frameString = this.getString(),  ///
          assumptionString = assumption.getString();

    context.trace(`Validating the '${frameString}' frame's '${assumptionString}' assumption...`);

    assumptionValidates = assumption.validate(state, context, (assumption, context) => {
      let validates;

      assumptions.push(assumption);

      validates = continuation(assumptions, state, context);

      return validates;
    });

    if (assumptionValidates) {
      context.debug(`...validated the '${frameString}' frame's '${assumptionString}' assumption.`);
    }

    return assumptionValidates;
  }

  validateAssumptions(state, context, continuation) {
    let assumptionsValidate;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's assumptions...`);

    const assumptions = [],
          validateAssumption = this.validateAssumption.bind(this);

    assumptionsValidate = every(this.assumptions, validateAssumption, assumptions, state, context, (assumptions, state, context) => {
      let assumptionsValidate;

      this.assumptions = assumptions;

      assumptionsValidate = continuation(state, context);

      return assumptionsValidate;
    });

    if (assumptionsValidate) {
      context.debug(`...validates the '${frameString}' frame's assumptions.`);
    }

    return assumptionsValidate;
  }

  validateMetavariable(state, context, continuation) {
    let metavariableValidates;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's metavariable...`);

    metavariableValidates = this.metavariable.validate(state, context, (metavariable, context) => {
      let validates = false;

      const metaType = metavariable.getMetaType();

      if (metaType !== null) {
        const frameMetaTypeName = FRAME_META_TYPE_NAME,
              frameMetaType = context.findMetaTypeByMetaTypeName(frameMetaTypeName),
              metavariableMetaTypeEqualToFrameMetaType = metavariable.isMetaTypeEqualTo(frameMetaType);

        if (metavariableMetaTypeEqualToFrameMetaType) {
          validates = true;
        } else {
          const metaTypeString = metaType.getString(),
                metavariableString = metavariable.getString(),
                frameMetaTypeString = frameMetaType.getString();

          context.debug(`The '${frameString}' frame's '${metavariableString}' metavariable's '${metaTypeString}' meta-type should be the '${frameMetaTypeString}' meta-type.`);
        }
      }

      if (validates) {
        this.metavariable = metavariable;

        validates = continuation(state, context);
      }

      return validates;
    });

    if (metavariableValidates) {
      context.debug(`...validates the '${frameString}' frame's metavariable.`);
    }

    return metavariableValidates;
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

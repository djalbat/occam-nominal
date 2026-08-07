"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { every } from "../utilities/continuation";
import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { instantiateFrame } from "../process/instantiate";
import { isDerived, isDeclared } from "../utilities/state";
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

        const validateWhenDeclared = this.validateWhenDeclared.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenDeclared,
          validateWhenDerived
        ], state, context, (state, context) => {
          let validates;

          context.addFrame(frame);

          validates = continuation(frame, context);

          return validates;
        });

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

      validates = continuation(state, context);

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

    assumptionsValidate = every(this.assumptions, validateAssumption, assumptions, context, (assumptions, context) => {
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
      let validates;

      this.metavariable = metavariable;

      validates = continuation(state, context);

      return validates;
    });

    if (metavariableValidates) {
      context.debug(`...validates the '${frameString}' frame's metavariable.`);
    }

    return metavariableValidates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const frameString = this.getString(); ///

      context.trace(`Validating the '${frameString}' declared frame...`);

      const singular = this.isSingular();

      if (singular) {
        validatesWhenDeclared = continuation(state, context);
      } else {
        validatesWhenDeclared = false;

        context.debug(`The '${frameString}' declared frame must be singular.`);
      }

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${frameString}' declared frame.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const frameString = this.getString(); ///

      context.trace(`Validating the '${frameString}' derived frame...`);

      validatesWhenDerived = continuation(state, context);

      if (validatesWhenDerived) {
        context.debug(`...validated the '${frameString}' derived frame.`);
      }
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

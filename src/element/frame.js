"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { every } from "../utilities/continuation";
import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { instantiateFrame } from "../process/instantiate";
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

  validate(stated, context, continuation) {
    let validates;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame...`);

    let frame;

    frame = this.findFrame(context);

    if (frame !== null) {
      context.debug(`The '${frameString}' frame is already present.`);

      validates = continuation(frame, context);
    } else {
      frame = this;

      const validateAssumptions = this.validateAssumptions.bind(this),
            validateMetavariable = this.validateMetavariable.bind(this);

      validates = all([
        validateMetavariable,
        validateAssumptions
      ], stated, context, (stated, context) => {
        let validates;

        const validateWhenStated = this.validateWhenStated.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenStated,
          validateWhenDerived
        ], stated, context, (stated, context) => {
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

  validateAssumption(assumption, assumptions, stated, context, continuation) {
    let assumptionValidates;

    const frameString = this.getString(),  ///
          assumptionString = assumption.getString();

    context.trace(`Validating the '${frameString}' frame's '${assumptionString}' assumption...`);

    assumptionValidates = assumption.validate(context, (assumption, context) => {
      let validates;

      assumptions.push(assumption);

      validates = continuation(stated, context);

      return validates;
    });

    if (assumptionValidates) {
      context.debug(`...validated the '${frameString}' frame's '${assumptionString}' assumption.`);
    }

    return assumptionValidates;
  }

  validateAssumptions(context, stated, continuation) {
    let assumptionsValidate;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's assumptions...`);

    const assumptions = [],
          validateAssumption = this.validateAssumption.bind(this);

    assumptionsValidate = every(this.assumptions, validateAssumption, assumptions, context, (assumptions, context) => {
      let assumptionsValidate;

      this.assumptions = assumptions;

      assumptionsValidate = continuation(stated, context);

      return assumptionsValidate;
    });

    if (assumptionsValidate) {
      context.debug(`...validates the'${frameString}' frame's assumptions.`);
    }

    return assumptionsValidate;
  }

  validateMetavariable(stated, context, continuation) {
    let metavariableValidates;

    const frameString = this.getString();  ///

    context.trace(`Validating the '${frameString}' frame's metavariable...`);

    metavariableValidates = this.metavariable.validate(stated, context, (metavariable, context) => {
      let validates;

      this.metavariable = metavariable;

      validates = continuation(stated, context);

      return validates;
    });

    if (metavariableValidates) {
      context.debug(`...validates the'${frameString}' frame's metavariable.`);
    }

    return metavariableValidates;
  }

  validateWhenStated(stated, context, continuation) {
    let validatesWhenStated = false;

    if (stated) {
      const frameString = this.getString(); ///

      context.trace(`Validating the '${frameString}' stated frame...`);

      const singular = this.isSingular();

      if (singular) {
        validatesWhenStated = continuation(stated, context);
      } else {
        validatesWhenStated = false;

        context.debug(`The '${frameString}' stated frame must be singular.`);
      }

      if (validatesWhenStated) {
        context.debug(`...validated the '${frameString}' stated frame.`);
      }
    }

    return validatesWhenStated;
  }

  validateWhenDerived(stated, context, continuation) {
    let validatesWhenDerived = false;

    if (!stated) {
      const frameString = this.getString(); ///

      context.trace(`Validating the '${frameString}' derived frame...`);

      validatesWhenDerived = continuation(context);

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

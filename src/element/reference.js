"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateReference } from "../process/instantiate";
import { REFERENCE_META_TYPE_NAME } from "../metaTypeNames";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { ablate, attempt, serialise, reconcile, unserialise, instantiate } from "../utilities/context";
import { referenceFromReferenceNode, metavariableFromReferenceNode, topLevelMetaAssertionFromReferenceNode } from "../utilities/element";

export default define(class Reference extends Element {
  constructor(context, string, node, breakPoint, metavariable, topLevelMetaAssertion) {
    super(context, string, node, breakPoint);

    this.metavariable = metavariable;
    this.topLevelMetaAssertion = topLevelMetaAssertion;
  }

  getMetavariable() {
    return this.metavariable;
  }

  getTopLevelMetaAssertion() {
    return this.topLevelMetaAssertion;
  }

  getReferenceNode() {
    const node = this.getNode(),
          referenceNode = node; ///

    return referenceNode;
  }

  getMetavariableNode() {
    const metavariableNode = this.metavariable.getNode();

    return metavariableNode;
  }

  getMetaType() { return this.metavariable.getMetaType(); }

  isEqualTo(reference) {
    const referenceNode = reference.getNode(),
          referenceNodeMatches = this.matchReferenceNode(referenceNode),
          equalTo = referenceNodeMatches;  ///

    return equalTo;
  }

  matchReferenceNode(referenceNode) {
    const node = referenceNode, ///
          nodeMatches = this.matchNode(node),
          referenceNodeMatches = nodeMatches; ///

    return referenceNodeMatches;
  }

  matchMetavariableNode(metavariableNode) { return this.metavariable.matchMetavariableNode(metavariableNode); }

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

  compareTopLevelMetaAssertion(topLevelMetaAssertion) {
    let topLevelMetaAssertionCompares = false;

    const context = this.getContext(),
          referenceString = this.getString(), ///
          topLevelMetaAssertionString = topLevelMetaAssertion.getString();

    context.trace(`Comparing the '${topLevelMetaAssertionString}' top level meta-assertion to the '${referenceString}' reference...`);

    const label = topLevelMetaAssertion.getLabel(),
          labelUnifies = this.unifyLabel(label, context);

    if (labelUnifies) {
      topLevelMetaAssertionCompares = true;
    }

    if (topLevelMetaAssertionCompares) {
      context.trace(`...compared the '${topLevelMetaAssertionString}' top level meta-assertion to the '${referenceString}' reference.`);
    }

    return topLevelMetaAssertionCompares;
  }

  findValidReference(context) {
    const referenceNode = this.getReferenceNode(),
          reference = context.findReferenceByReferenceNode(referenceNode),
          validReference = reference;  ///

    return validReference;
  }

  validate(context) {
    let reference = null;

    const referenceString = this.getString(); ///

    context.trace(`Validating the '${referenceString}' reference...`);

    let validates = false;

    const validReference = this.findValidReference(context);

    if (validReference) {
      validates = true;

      reference = validReference;  ///

      context.debug(`...the '${referenceString}' reference is already valid.`);
    } else {
      const temporaryContext = context; ///

      context = this.getContext();

      attempt((context) => {
        const metavariableValidates = this.validateMetavariable(context);

        if (metavariableValidates) {
          const metaType = this.metavariable.getMetaType();

          if (metaType === null) {
            validates = true;
          } else {
            const referenceMetaTypeName = REFERENCE_META_TYPE_NAME,
                  referenceMetaType = context.findMetaTypeByMetaTypeName(referenceMetaTypeName),
                  metavariableMetaTypeEqualToReferenceMetaType = this.metavariable.isMetaTypeEqualTo(referenceMetaType);

            if (metavariableMetaTypeEqualToReferenceMetaType) {
              validates = true;
            } else {
              const metaTypeString = metaType.getString(),
                    metavariableString = this.metavariable.getString(),
                    referenceMetaTypeString = referenceMetaType.getString();

              context.debug(`The '${referenceString}' reference's '${metavariableString}' metavariable's '${metaTypeString}' meta-type should be the '${referenceMetaTypeString}' meta-type.`);
            }
          }
        }

        if (validates) {
          this.commit(context);
        }
      }, context);

      context = temporaryContext; ///

      if (validates) {
        reference = this;  ///

        context.addReference(reference);
      }
    }

    if (validates) {
      context.debug(`...validated the '${referenceString}' reference.`);
    }

    return reference;
  }

  validateMetavariable(context) {
    let metavariableValidates = false;

    const referenceString = this.getString(); ///

    context.trace(`Validating the '${referenceString}' reference's metavariable...'`);

    const metavariable = this.metavariable.validate(context);

    if (metavariable !== null) {
      this.metavariable = metavariable;

      metavariableValidates = true;
    }

    if (metavariableValidates) {
      context.debug(`...validated the '${referenceString}' reference's metavariable.'`);
    }

    return metavariableValidates;
  }

  unifyLabel(label, context) {
    let labelUnifies = false;

    const labelString = label.getString(),
          referenceString = this.getString(); ///

    context.trace(`Unifying the '${labelString}' label with the '${referenceString}' reference...`);

    const labelContext = label.getContext(),
          generalContext = context, ///
          specificContext = labelContext;  ///

    reconcile((specificContext) => {
      const metavariable = label.getMetavariable(),
            metavariableUnifies = this.unifyMetavariable(metavariable, generalContext, specificContext);

      if (metavariableUnifies) {
        labelUnifies = true;
      }
    }, specificContext);

    if (labelUnifies) {
      context.debug(`...unified the '${labelString}' label with the '${referenceString}' reference.`);
    }

    return labelUnifies;
  }

  unifyMetavariable(metavariable, generalContext, specificContext) {
    let metavariableUnifies = false;

    const context = specificContext,  ///
          referenceString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${referenceString}' reference...`);

    const metavariableUnifiesIntrinsically = this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext);

    if (metavariableUnifiesIntrinsically) {
      metavariableUnifies = true;
    }

    if (metavariableUnifies) {
      context.debug(`...unified the '${metavariableString}' metavariable with the '${referenceString}' reference.`);
    }

    return metavariableUnifies;
  }

  unifyTopLevelMetaAssertion(topLevelMetaAssertion, context) {
    let topLevelMetaAssertionUUnifies = false;

    const label = topLevelMetaAssertion.getLabel(),
          referenceString = this.getString(), ///
          topLevelMetaAssertionString = topLevelMetaAssertion.getString();

    context.trace(`Unifying the '${topLevelMetaAssertionString}' top level meta-assertion's label with the '${referenceString}' reference...`);

    const labelContext = label.getContext(),
          referenceContext = this.getContext(), ///
          generalContext = referenceContext, ///
          specificContext = labelContext; ///

    reconcile((specificContext) => {
      const metavariable = label.getMetavariable(),
            metavariableUnifies = this.unifyMetavariable(metavariable, generalContext, specificContext);

      if (metavariableUnifies) {
        this.topLevelMetaAssertion = topLevelMetaAssertion;

        specificContext.commit(context);

        topLevelMetaAssertionUUnifies = true;
      }
    }, specificContext);

    if (topLevelMetaAssertionUUnifies) {
      context.debug(`...unified the '${topLevelMetaAssertionString}' top level meta-assertion's label with the '${referenceString}' reference.`);
    }

    return topLevelMetaAssertionUUnifies;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }

  static name = "Reference";

  static fromJSON(json, context) {
    let reference;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              referenceNode = instantiateReference(string, context),
              node = referenceNode,  ///
              breakPoint = breakPointFromJSON(json),
              metavariable = metavariableFromReferenceNode(referenceNode, context),
              topLevelMetaAssertion = topLevelMetaAssertionFromReferenceNode(referenceNode, context);

        reference = new Reference(context, string, node, breakPoint, metavariable, topLevelMetaAssertion);
      }, json, context);
    }, context);

    return reference;
  }

  static fromReferenceString(referenceString, context) {
    let reference;

    ablate((context) => {
      instantiate((context) => {
        const string = referenceString,  ///
              referenceNode = instantiateReference(string, context);

        reference = referenceFromReferenceNode(referenceNode, context);
      }, context);
    }, context);

    return reference;
  }
});

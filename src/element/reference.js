"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { instantiateReference } from "../process/instantiate";
import { REFERENCE_META_TYPE_NAME } from "../metaTypeNames";
import { referenceFromReferenceNode, metavariableFromReferenceNode } from "../utilities/element";
import { join, ablate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Reference extends Element {
  constructor(context, string, node, breakPoint, metavariable) {
    super(context, string, node, breakPoint);

    this.metavariable = metavariable;
  }

  getMetavariable() {
    return this.metavariable;
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

  findReference(context) {
    const referenceNode = this.getReferenceNode(),
          reference = context.findReferenceByReferenceNode(referenceNode);

    return reference;
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

  validate(state, context, continuation) {
    let validates = false;

    const specificContext = context,  ///
          referenceString = this.getString(); ///

    context.trace(`Validating the '${referenceString}' reference...`);

    let reference;

    reference = this.findReference(context);

    if (reference !== null) {
      context.debug(`...the '${referenceString}' reference is already present.`);

      validates = continuation(reference, context);
    } else {
      reference = this; ///

      context = this.getContext();

      attempt((context) => {
        const validateMetavariable = this.validateMetavariable.bind(this);

        validates = all([
          validateMetavariable
        ], state, context, (state, context) => {
          let validates;

          context = specificContext;  ///

          validates = continuation(reference, context);

          return validates;
        });

        if (validates) {
          this.commit(context);

          context = specificContext;  ///

          context.addReference(reference);
        }
      }, context);
    }

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${referenceString}' reference.`);
    }

    return validates;
  }

  validateMetavariable(state, context, continuation) {
    let metavariableValidates;

    const referenceString = this.getString(); ///

    context.trace(`Validating the '${referenceString}' reference's metavariable...'`);

    metavariableValidates = this.metavariable.validate(state, context, (metavariable, context) => {
      let validates = false;

      const metaType = metavariable.getMetaType();

      if (metaType === null) {
        validates = true;
      } else {
        const referenceMetaTypeName = REFERENCE_META_TYPE_NAME,
              referenceMetaType = context.findMetaTypeByMetaTypeName(referenceMetaTypeName),
              metavariableMetaTypeEqualToReferenceMetaType = metavariable.isMetaTypeEqualTo(referenceMetaType);

        if (metavariableMetaTypeEqualToReferenceMetaType) {
          validates = true;
        } else {
          const metaTypeString = metaType.getString(),
                metavariableString = metavariable.getString(),
                referenceMetaTypeString = referenceMetaType.getString();

          context.debug(`The '${referenceString}' reference's '${metavariableString}' metavariable's '${metaTypeString}' meta-type should be the '${referenceMetaTypeString}' meta-type.`);
        }
      }

      if (validates) {
        this.metavariable = metavariable;

        validates = continuation(state, context);
      }

      return validates;
    });

    if (metavariableValidates) {
      context.debug(`...validated the '${referenceString}' reference's metavariable.'`);
    }

    return metavariableValidates;
  }

  unifyLabel(label, context, continuation) {
    const labelString = label.getString(),
          referenceString = this.getString(); ///

    context.trace(`Unifying the '${labelString}' label with the '${referenceString}' reference...`);

    const metavariable = label.getMetavariable(),
          labelContext = label.getContext(),
          generalContext = this.getContext(), ///
          specificContext = labelContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return this.unifyMetavariable(metavariable, generalContext, specificContext, (metavariableUnifies) => {
          let labelUnifies = false;

          if (metavariableUnifies) {
            specificContext.commit(context);

            labelUnifies = true;
          }

          if (labelUnifies) {
            context.debug(`...unified the '${labelString}' label with the '${referenceString}' reference.`);
          }

          return continuation(labelUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifyMetavariable(metavariable, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          referenceString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${referenceString}' reference...`);

    return this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, (metavariableUnifiesIntrinsically) => {
      let metavariableUnifies = false;

      if (metavariableUnifiesIntrinsically) {
        metavariableUnifies = true;
      }

      if (metavariableUnifies) {
        context.debug(`...unified the '${metavariableString}' metavariable with the '${referenceString}' reference.`);
      }

      return continuation(metavariableUnifies);
    });
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
              metavariable = metavariableFromReferenceNode(referenceNode, context);

        reference = new Reference(context, string, node, breakPoint, metavariable);
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

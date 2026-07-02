"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateReference } from "../process/instantiate";
import { REFERENCE_META_TYPE_NAME } from "../metaTypeNames";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { referenceFromReferenceNode, metavariableFromReferenceNode } from "../utilities/element";
import { ablate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

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

  findValidReference(context) {
    const referenceNode = this.getReferenceNode(),
          reference = context.findReferenceByReferenceNode(referenceNode),
          validReference = reference;  ///

    return validReference;
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

  compareSchema(schema) {
    let schemaCompares = false;

    const context = this.getContext(),
          schemaString = schema.getString(),
          referenceString = this.getString(); ///

    context.trace(`Comparing the '${schemaString}' schema to the '${referenceString}' reference...`);

    const label = schema.getLabel(),
          labelUnifies = this.unifyLabel(label, context);

    if (labelUnifies) {
      schemaCompares = true;
    }

    if (schemaCompares) {
      context.trace(`...compared the '${schemaString}' schema to the '${referenceString}' reference.`);
    }

    return schemaCompares;
  }

  validate(context) {
    let reference = null;

    const referenceString = this.getString(); ///

    context.trace(`Validating the '${referenceString}' reference...`);

    let validates = false;

    const validReference = this.findValidReference(context);

    if (validReference !== null) {
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
          generalContext = this.getContext(), ///
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

"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateLabel } from "../process/instantiate";
import { labelFromLabelNode, metavariableFromLabelNode } from "../utilities/element";
import { attempt, reconcile, serialise, unserialise, instantiate} from "../utilities/context";

const { breakable } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Label extends Element {
  constructor(context, string, node, breakPoint, metavariable) {
    super(context, string, node, breakPoint);

    this.metavariable = metavariable;
  }

  getMetavariable() {
    return this.metavariable;
  }

  getLabelNode() {
    const node = this.getNode(),
          labelNode = node; ///

    return labelNode;
  }

  getMetavariableNode() { return this.metavariable.getNode(); }

  matchLabelNode(labelNode) {
    const node = labelNode, ///
          nodeMatches = this.matchNode(node),
          labelNodeMatches = nodeMatches; ///

    return labelNodeMatches;
  }

  matchMetavariableNode(metavariableNode) { return this.metavariable.matchMetavariableNode(metavariableNode); }

  compareReference(reference) {
    const metavariable = reference.getMetavariable(),
          metavariableComparesToMetavariable = this.compareMetavariable(metavariable),
          comparesToReference = metavariableComparesToMetavariable; ///

    return comparesToReference;
  }

  compareMetavariable(metavariable) { return this.metavariable.compareMetavariable(metavariable); }

  verify() {
    let verifies = false;

    const context = this.getContext(),
          labelString = this.getString(); ///

    context.trace(`Verifying the '${labelString}' label...`);

    const labelNode = this.getLabelNode(),
          labelPresent = context.isLabelPresentByLabelNode(labelNode);

    if (!labelPresent) {
      const validates = this.validate();

      if (validates !== null) {
        verifies = true;
      }
    } else {
      context.debug(`The '${labelString}' label is already present.`);
    }

    if (verifies) {
      context.debug(`...verified the '${labelString}' label.`);
    }

    return verifies;
  }

  validate() {
    let validates = false;

    const context = this.getContext(),
          labelString = this.getString(); ///

    context.trace(`Validating the '${labelString}' label...`);

    attempt((context) => {
      const metavariableValidates = this.validateMetavariable(context);

      if (metavariableValidates) {
        validates = true;
      }

      if (validates) {
        this.commit(context);
      }
    }, context);

    if (validates) {
      context.debug(`...validated the '${labelString}' label.`);
    }

    return validates;
  }

  validateMetavariable(context) {
    let metavariableValidates = false;

    const labelString = this.getString(); ///

    context.trace(`Validating the '${labelString}' label's metavariable...`);

    const metavariable = this.metavariable.validate(context);

    if (metavariable !== null) {
      this.metavariable = metavariable;

      metavariableValidates = true;
    }

    if (metavariableValidates) {
      context.debug(`...validated the '${labelString}' label's metavariable.'`);
    }

    return metavariableValidates;
  }

  unifyReference(reference, context) {
    let referenceUnifies = false;

    const labelString = this.getString(), ///
          referenceString = reference.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${labelString}' label...`);

    const labelContext = this.getContext(), ///
          referenceContext = reference.getContext(),
          generalContext = labelContext, ///
          specificContext = referenceContext;  ///

    reconcile((specificContext) => {
      const metavariable = reference.getMetavariable(),
            metavariableUnifies = this.unifyMetavariable(metavariable, generalContext, specificContext);

      if (metavariableUnifies) {
        referenceUnifies = true;
      }
    }, specificContext);

    if (referenceUnifies) {
      context.debug(`...unified the '${referenceString}' reference with the '${labelString}' label.`);
    }

    return referenceUnifies;
  }

  unifyMetavariable(metavariable, generalContext, specificContext) {
    let metavariableUnifies = false;

    const context = specificContext,  ///
          labelString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${labelString}' label...`);

    const metavariableUnifiesIntrinsically = this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext);

    if (metavariableUnifiesIntrinsically) {
      metavariableUnifies = true;
    }

    if (metavariableUnifies) {
      context.debug(`...unified the '${metavariableString}' metavariable with the '${labelString}' label.`);
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

  static name = "Label";

  static fromJSON(json, context) {
    let label;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              labelNode = instantiateLabel(string, context),
              node = labelNode, ///
              breakPoint = breakPointFromJSON(json),
              metavariable = metavariableFromLabelNode(labelNode, context);

        label = new Label(context, string, node, breakPoint, metavariable);
      }, json, context);
    }, context);

    return label;
  }

  static fromLabelString(labelString, context) {
    let label;

    instantiate((context) => {
      const string = labelString,  ///
            labelNode = instantiateLabel(string, context);

      label = labelFromLabelNode(labelNode, context);
    }, context);

    return label;
  }
});

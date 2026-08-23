"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { instantiateLabel } from "../process/instantiate";
import { labelFromLabelNode, metavariableFromLabelNode } from "../utilities/element";
import { join, ablate, attempt, reconcile, serialise, unserialise, instantiate} from "../utilities/context";

const { cut, all } = continuationUtilities,
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

  verify(forward, back) {
    const context = this.getContext(),
          labelString = this.getString(); ///

    context.trace(`Verifying the '${labelString}' label...`);

    const labelNode = this.getLabelNode(),
          labelPresent = context.isLabelPresentByLabelNode(labelNode);

    if (labelPresent) {
      context.debug(`The '${labelString}' label is already present.`);

      return back();
    }

    return declare((state) => {
      return this.validate(state, context, cut((label, context, back) => {
        context.debug(`...verified the '${labelString}' label.`);

        return forward(back);
      }, back), back);
    });
  }

  validate(state, context, forward, back) {
    const labelString = this.getString(); ////

    context.trace(`Validating the '${labelString}' label...`);

    context = this.getContext();

    return attempt((context) => {
      const validateMetavariable = this.validateMetavariable.bind(this);

      return all([
        validateMetavariable
      ], state, context, (state, context, back) => {
        const label = this; ///

        this.commit(context);

        context.debug(`...validated the '${labelString}' label.`);

        return forward(label, context, back);
      }, back);
    }, context);
  }

  validateMetavariable(state, context, forward, back) {
    const labelString = this.getString(); ///

    context.trace(`Validating the '${labelString}' label's metavariable...`);

    return this.metavariable.validate(state, context, (metavariable, context, back) => {
      this.metavariable = metavariable;

      context.debug(`...validated the '${labelString}' label's metavariable.'`);

      return forward(state, context, back);
    }, back);
  }

  unifyReference(reference, context, forward, back) {
    const labelString = this.getString(), ///
          referenceString = reference.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${labelString}' label...`);

    const labelContext = this.getContext(), ///
          referenceContext = reference.getContext(),
          generalContext = labelContext, ///
          specificContext = referenceContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const metavariable = reference.getMetavariable();

        return this.unifyMetavariable(metavariable, generalContext, specificContext, (back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${referenceString}' reference with the '${labelString}' label.`);

          return forward(context, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifyMetavariable(metavariable, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          labelString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${labelString}' label...`);

    return this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, (metavariableUnifiesIntrinsically) => {
      let metavariableUnifies = false;

      if (metavariableUnifiesIntrinsically) {
        metavariableUnifies = true;
      }

      if (metavariableUnifies) {
        context.debug(`...unified the '${metavariableString}' metavariable with the '${labelString}' label.`);
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

    ablate((context) => {
      instantiate((context) => {
        const string = labelString,  ///
              labelNode = instantiateLabel(string, context);

        label = labelFromLabelNode(labelNode, context);
      }, context);
    }, context);

    return label;
  }
});

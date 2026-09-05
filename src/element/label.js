"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { instantiateLabel } from "../process/instantiate";
import { join, isolate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { cut, all } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

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

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const labelString = this.getString(); ///

    context.trace(`Verifying the '${labelString}' label...`);

    const labelNode = this.getLabelNode(),
          labelPresent = context.isLabelPresentByLabelNode(labelNode);

    if (labelPresent) {
      context.debug(`The '${labelString}' label is already present.`);

      return back();
    }

    return declare((state) => {
      return this.validate(state, context, (label, context , back) => {
        context.debug(`...verified the '${labelString}' label.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    const labelString = this.getString(); ////

    context.trace(`Validating the '${labelString}' label...`);

    return isolate((state, context, forward, back) => {
      context = this.getContext();

      return attempt((context) => {
        const validateMetavariable = this.validateMetavariable.bind(this);

        return all([
          validateMetavariable
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      const label = this; ///

      context.debug(`...validated the '${labelString}' label.`);

      return forward(label, context, back);
    }, back);
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

  unifyLink(link, context, forward, back) {
    const linkString = link.getString(),
          labelString = this.getString(); ///

    context.trace(`Unifying the '${linkString}' link with the '${labelString}' label...`);

    return isolate((link, context, forward, back) => {
      return reconcile((context) => {
        const metavariable = link.getMetavariable(),
              generalContext = this.getContext(),  ///
              specificContext = context;  ///

        return this.unifyMetavariable(metavariable, generalContext, specificContext, (generalContext, specificContext, back) => {
          context = specificContext;  ///

          context.commit();

          return forward(back);
        }, back);
      }, context);
    }, link, context, (link, context, back) => {
      context.debug(`...unified the '${linkString}' link with the '${labelString}' label.`);

      return forward(context, back);
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

    return this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${metavariableString}' metavariable with the '${labelString}' label.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  toJSON() {
    let json;

    const context = this.getContext();

    serialise((context) => {
      const string = this.getString();

      json = {
        context,
        string
      };
    }, context);

    return json;
  }

  static name = "Label";

  static fromJSON(json, context) {
    let label;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              labelNode = instantiateLabel(string, context),
              node = labelNode, ///
              breakPoint = null,
              metavariable = metavariableFromLabelNode(labelNode, context);

        label = new Label(context, string, node, breakPoint, metavariable);
      }, json, context);
    }, context);

    return label;
  }
});

function metavariableFromLabelNode(labelNode, context) {
  const metavariablenode = labelNode.getMetavariableNode(),
        metavariable = context.findMetavariableByMetavariableNode(metavariablenode);

  return metavariable;
}

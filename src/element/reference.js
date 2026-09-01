"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { isolate, attempt } from "../utilities/context";
import { REFERENCE_META_TYPE_NAME } from "../metaTypeNames";

const { cut, all } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

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

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const referenceString = this.getString(); ///

    context.trace(`Verifying the '${referenceString}' reference...`);

    return declare((state) => {
      return this.validate(state, context, (reference, context , back) => {
        context.debug(`...verified the '${referenceString}' reference.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    const referenceString = this.getString(); ////

    context.trace(`Validating the '${referenceString}' reference...`);

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
      const reference = this; ///

      context.debug(`...validated the '${referenceString}' reference.`);

      return forward(reference, context, back);
    }, back);
  }

  validateMetavariable(state, context, forward, back) {
    const referenceString = this.getString(); ///

    context.trace(`Validating the '${referenceString}' reference's metavariable...'`);

    return this.metavariable.validate(state, context, (metavariable, context, back) => {
      const metaType = metavariable.getMetaType();

      if (metaType !== null) {
        const referenceMetaTypeName = REFERENCE_META_TYPE_NAME,
              referenceMetaType = context.findMetaTypeByMetaTypeName(referenceMetaTypeName),
              metavariableMetaTypeEqualToReferenceMetaType = metavariable.isMetaTypeEqualTo(referenceMetaType);

        if (!metavariableMetaTypeEqualToReferenceMetaType) {
          const metaTypeString = metaType.getString(),
                metavariableString = metavariable.getString(),
                referenceMetaTypeString = referenceMetaType.getString();

          context.debug(`The '${referenceString}' reference's '${metavariableString}' metavariable's '${metaTypeString}' meta-type should be the '${referenceMetaTypeString}' meta-type.`);

          return back();
        }
      }

      this.metavariable = metavariable;

      context.debug(`...validated the '${referenceString}' reference's metavariable.'`);

      return forward(state, context, back);
    }, back);
  }

  unifyLink(link, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          linkString = link.getString(),
          referenceString = this.getString(); ///

    context.trace(`Unifying the '${linkString}' link with the '${referenceString}' reference...`);

    return isolate((link, generalContext, specificContext, forward, back) => {
      const context = this.getContext(),
            metavariable = link.getMetavariable();

      generalContext = context; ///

      return this.unifyMetavariable(metavariable, generalContext, specificContext, (generalContext, specificContext, back) => {
        return forward(back);
      }, back);
    }, link, generalContext, specificContext, (link, generalContext, specificContext, back) => {
      context.debug(`...unified the '${linkString}' link with the '${referenceString}' reference.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  unifyMetavariable(metavariable, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          referenceString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${referenceString}' reference...`);

    return this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${metavariableString}' metavariable with the '${referenceString}' reference.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  static name = "Reference";
});

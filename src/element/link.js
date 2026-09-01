"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateLink } from "../process/instantiate";
import { REFERENCE_META_TYPE_NAME } from "../metaTypeNames";
import { linkFromLinkNode, metavariableFromLinkNode } from "../utilities/element";
import { join, ablate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { all } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Link extends Element {
  constructor(context, string, node, breakPoint, metavariable) {
    super(context, string, node, breakPoint);

    this.metavariable = metavariable;
  }

  getMetavariable() {
    return this.metavariable;
  }

  getLinkNode() {
    const node = this.getNode(),
          linkNode = node; ///

    return linkNode;
  }

  getMetavariableNode() {
    const metavariableNode = this.metavariable.getNode();

    return metavariableNode;
  }

  getMetaType() { return this.metavariable.getMetaType(); }

  isEqualTo(link) {
    const linkNode = link.getNode(),
          linkNodeMatches = this.matchLinkNode(linkNode),
          equalTo = linkNodeMatches;  ///

    return equalTo;
  }

  matchLinkNode(linkNode) {
    const node = linkNode, ///
          nodeMatches = this.matchNode(node),
          linkNodeMatches = nodeMatches; ///

    return linkNodeMatches;
  }

  matchMetavariableNode(metavariableNode) { return this.metavariable.matchMetavariableNode(metavariableNode); }

  findLink(context) {
    const linkNode = this.getLinkNode(),
          link = context.findLinkByLinkNode(linkNode);

    return link;
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

  validate(state, context, forward, back) {
    let link;

    const linkString = this.getString(); ///

    context.trace(`Validating the '${linkString}' link...`);

    link = this.findLink(context);

    if (link !== null) {
      context.debug(`...the '${linkString}' link is already present.`);

      return forward(link, context, back);
    }

    link = this; ///

    const validateMetavariable = this.validateMetavariable.bind(this);

    return all([
      validateMetavariable
    ], state, context, (state, context, back) => {
      context.addLink(link);

      context.debug(`...validated the '${linkString}' link.`);

      return forward(link, context, back);
    }, back);
  }

  validateMetavariable(state, context, forward, back) {
    const linkString = this.getString(); ///

    context.trace(`Validating the '${linkString}' link's metavariable...'`);

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

          context.debug(`The '${linkString}' link's '${metavariableString}' metavariable's '${metaTypeString}' meta-type should be the '${referenceMetaTypeString}' meta-type.`);

          return back();
        }
      }

      this.metavariable = metavariable;

      context.debug(`...validated the '${linkString}' link's metavariable.'`);

      return forward(state, context, back);
    }, back);
  }

  unifyLabel(label, context, forward, back) {
    const labelString = label.getString(),
          linkString = this.getString(); ///

    context.trace(`Unifying the '${labelString}' label with the '${linkString}' link...`);

    const metavariable = label.getMetavariable(),
          labelContext = label.getContext(),
          generalContext = this.getContext(), ///
          specificContext = labelContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return this.unifyMetavariable(metavariable, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${labelString}' label with the '${linkString}' link.`);

          return forward(context, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifyMetavariable(metavariable, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          linkString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${linkString}' link...`);

    return this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, (metavariableUnifiesIntrinsically) => {
      let metavariableUnifies = false;

      if (metavariableUnifiesIntrinsically) {
        metavariableUnifies = true;
      }

      if (metavariableUnifies) {
        context.debug(`...unified the '${metavariableString}' metavariable with the '${linkString}' link.`);
      }

      return continuation(metavariableUnifies);
    });
  }

  toJSON() {
    let json;

    const context = this.getContext();

    serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      json = {
        context,
        string,
        breakPoint
      };
    }, context);

    return json;
  }

  static name = "Link";

  static fromJSON(json, context) {
    let link;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              linkNode = instantiateLink(string, context),
              node = linkNode,  ///
              breakPoint = breakPointFromJSON(json),
              metavariable = metavariableFromLinkNode(linkNode, context);

        link = new Link(context, string, node, breakPoint, metavariable);
      }, json, context);
    }, context);

    return link;
  }
});

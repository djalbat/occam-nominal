"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTypePrefix } from "../process/instantiate";
import { nameFromTypePrefixNode } from "../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class TypePrefix extends Element {
  constructor(context, string, node, breakPoint, name) {
    super(context, string, node, breakPoint);

    this.name = name;
  }

  getName() {
    return this.name;
  }

  getTypePrefixNode() {
    const node = this.getNode(),
          typePrefixNode = node;  ///

    return typePrefixNode;
  }

  getPrefixName() {
    const prefixName = this.name;  ///

    return prefixName;
  }

  compareTypePrefixName(typePrefixName) {
    const comparesToTypePrefixName = (this.name === typePrefixName);

    return comparesToTypePrefixName;
  }

  verify(context, forward, back) {
    const typePrefixString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixString}' type prefix...`);

    const typePrefix = context.getTypePrefix();

    if (typePrefix !== null) {
      context.trace(`The package already has a '${typePrefixString}' type prefix.`);

      return back();
    }

    const typePrefixName = this.name, ///
          typePrefixPresent = context.isTypePrefixPresentByTypePrefixName(typePrefixName);

    if (typePrefixPresent) {
      context.debug(`The '${typePrefixString}' type prefix is already present.`);

      return back();
    }

    const nominalTypeName = typePrefixName,  ///
          typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

    if (typePresent) {
      context.debug(`The '${typePrefixString}' type is already present.`);

      return back();
    }

    context.debug(`...verified the '${typePrefixString}' type prefix.`);

    return forward(context, back);
  }

  toJSON() {
    let json;

    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    json = {
      string,
      breakPoint
    };

    return json;
  }

  static name = "TypePrefix";

  static fromJSON(json, context) {
    let typePrefix;

    instantiate((context) => {
      const { string } = json,
            typePrefixNode = instantiateTypePrefix(string, context),
            node = typePrefixNode, ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromTypePrefixNode(typePrefixNode, context);

      context = null; ///

      typePrefix = new TypePrefix(context, string, node, breakPoint, name);
    }, context);

    return typePrefix;
  }
});

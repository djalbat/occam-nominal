"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTypePrefix } from "../process/instantiate";
import { nameFromTypePrefixNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

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

  verify(context) {
    let verifies = false;

    const typePrefixString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixString}' type prefix...`);

    const typePrefix = context.getTypePrefix();

    if (typePrefix === null) {
      const typePrefixName = this.name, ///
            typePrefixPresent = context.isTypePrefixPresentByTypePrefixName(typePrefixName);

      if (!typePrefixPresent) {
        const nominalTypeName = typePrefixName,  ///
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (!typePresent) {
          verifies = true;
        } else {
          context.debug(`The '${typePrefixString}' type is already present.`);
        }
      } else {
        context.debug(`The '${typePrefixString}' type prefix is already present.`);
      }
    } else {
      context.trace(`The package already has a '${typePrefixString}' type prefix.`);
    }

    if (verifies) {
      context.debug(`...verified the '${typePrefixString}' type prefix.`);
    }

    return verifies;
  }

  static name = "TypePrefix";

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

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            typePrefixNode = instantiateTypePrefix(string, context),
            node = typePrefixNode, ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromTypePrefixNode(typePrefixNode, context);

      context = null; ///

      const typePrefix = new TypePrefix(context, string, node, breakPoint, name);

      return typePrefix;
    }, context);
  }
});

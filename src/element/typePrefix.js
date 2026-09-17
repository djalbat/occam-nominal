"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTypePrefix } from "../process/instantiate";
import { nameFromTypePrefixNode } from "../utilities/element";

const { unbreakable } = breakPointUtilities;

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

  verify = unbreakable(function (context, forward, back) {
    const typePrefixString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixString}' type prefix...`);

    const includeRelease = true,
          includeDependencies = false,
          types = context.getTypes(includeRelease, includeDependencies),
          typesLength = types.length;

    if (typesLength > 0) {
      context.debug(`Unable to verify the '${typePrefixString}' type prefix because types have already been declared.`);

      return back();
    }

    const typePrefixPresent = context.isTypePrefixPresentByTypePrefixName(includeRelease);

    if (typePrefixPresent) {
      context.debug(`Unable to verify the '${typePrefixString}' type prefix because a type prefix is already present.`);

      return back();
    }

    context.debug(`...verified the '${typePrefixString}' type prefix.`);

    return forward(context, back);
  });

  toJSON() {
    let json;

    const string = this.getString();

    json = {
      string
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
            breakPoint = null,
            name = nameFromTypePrefixNode(typePrefixNode, context);

      context = null; ///

      typePrefix = new TypePrefix(context, string, node, breakPoint, name);
    }, context);

    return typePrefix;
  }
});

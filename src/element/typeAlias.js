"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTypeAlias } from "../process/instantiate";

const { unbreakable } = breakPointUtilities;

export default define(class TypeAlias extends Element {
  constructor(context, string, node, breakPoint, name) {
    super(context, string, node, breakPoint);

    ///
  }

  getTypeAliasNode() {
    const node = this.getNode(),
          typeAliasNode = node;  ///

    return typeAliasNode;
  }

  verify = unbreakable(function (context, forward, back) {
    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type prefix...`);

    ///

    context.debug(`...verified the '${typeAliasString}' type prefix.`);

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

  static name = "TypeAlias";

  static fromJSON(json, context) {
    let typeAlias;

    instantiate((context) => {
      const { string } = json,
            typeAliasNode = instantiateTypeAlias(string, context),
            node = typeAliasNode, ///
            breakPoint = null;

      context = null; ///

      typeAlias = new TypeAlias(context, string, node, breakPoint);
    }, context);

    return typeAlias;
  }
});

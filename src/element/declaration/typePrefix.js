"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class TypePrefixDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, typePrefix) {
    super(context, string, node, breakPoint);

    this.typePrefix = typePrefix;
  }

  getTypePrefix() {
    return this.typePrefix;
  }

  getTypePrefixDeclarationNode() {
    const node = this.getNode(),
          typePrefixDeclarationNode = node; ///

    return typePrefixDeclarationNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const typePrefixDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixDeclarationString}' type prefix declaration...`);

    const verifyTypes = this.verifyTypes.bind(this),
          verifyTypePrefix = this.verifyTypePrefix.bind(this);

    return all([
      verifyTypes,
      verifyTypePrefix
    ], context, (context, back) => {
      context.addTypePrefix(this.typePrefix);

      context.debug(`...verified the '${typePrefixDeclarationString}' type prefix declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${typePrefixDeclarationString}' type prefix declaration.`);

      return back();
    });
  });

  verifyTypes(context, forward, back) {
    const typePrefixDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixDeclarationString}' type prefix declaration's associated types...`);

    const includeRelease = true,
          includeDependencies = false,
          types = context.getTypes(includeRelease, includeDependencies),
          typesLength = types.length;

    if (typesLength !== 0) {
      context.debug(`Unable to verify the '${typePrefixDeclarationString}' type prefix declaration because types have already been declared.`);

      return back();
    }

    context.trace(`...verified the '${typePrefixDeclarationString}' type prefix declaration's associated types.`);

    return forward(context, back);
  }

  verifyTypePrefix(context, forward, back) {
    const typePrefixDeclarationString = this.getString();  ///

    context.trace(`Verifiying the '${typePrefixDeclarationString}' type prefix declaration's type prefix...`);

    const typePrefix = context.getTypePrefix();

    if (typePrefix !== null) {
      const typePrefixString = typePrefix.getString();

      context.trace(`The package already has a '${typePrefixString}' type prefix.`);

      return back();
    }

    return this.typePrefix.verify(context, (context, back) => {
      context.debug(`...verified the '${typePrefixDeclarationString}' type prefix declaration's type prefix.`);

      return forward(context, back);
    }, back);
  }

  static name = "TypePrefixDeclaration";
});

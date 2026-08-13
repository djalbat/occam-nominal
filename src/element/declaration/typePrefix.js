"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = breakPointUtilities,
      { asynchronousAll } = continuationUtilities;

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

  verify = breakable(function (context, continuation) {
    const typePrefixDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixDeclarationString}' type prefix declaration...`);

    const verifyTypePrefix = this.verifyTypePrefix.bind(this);

    return asynchronousAll([
      verifyTypePrefix
    ], context, (verifies, context) => {
      if (verifies) {
        context.addTypePrefix(this.typePrefix);
      }

      if (verifies) {
        context.debug(`...verified the '${typePrefixDeclarationString}' type prefix declaration.`);
      }

      return continuation(verifies, context);
    });
  });

  verifyTypePrefix(context, continuation) {
    let typePrevixVerifies = false;

    const typePrefixDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixDeclarationString}' type prefix declaration's type prefix...`);

    const includeRelease = false,
          types = context.getTypes(includeRelease),
          typesLength = types.length;

    if (typesLength !== 0) {
      context.debug(`Unable to verify the '${typePrefixDeclarationString}' type prefix declaration because types have already been declared.`);

      return continuation(typePrevixVerifies, context);
    }

    return this.typePrefix.verify(context, (typePrevixVerifies, context) => {
      if (typePrevixVerifies) {
        context.debug(`...verified the '${typePrefixDeclarationString}' type prefix declaration's type prefix.`);
      }

      return continuation(typePrevixVerifies, context);
    });
  }


  static name = "TypePrefixDeclaration";
});

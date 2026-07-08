"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

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

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const typePrefixDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typePrefixDeclarationString}' type prefix declaration...`);

    const includeRelease = false,
          types = context.getTypes(includeRelease),
          typesLength = types.length;

    if (typesLength === 0) {
      const typePrefixVerifies = this.typePrefix.verify(context);

      if (typePrefixVerifies) {
        context.addTypePrefix(this.typePrefix);

        verifies = true;
      }
    } else {
      context.debug(`Unable to verify the '${typePrefixDeclarationString}' type prefix declaration because types have already been declared.`);
    }

    if (verifies) {
      context.debug(`...verified the '${typePrefixDeclarationString}' type prefix declaration.`);
    }

    return verifies;
  }

  static name = "TypePrefixDeclaration";
});

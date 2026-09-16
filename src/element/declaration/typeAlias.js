"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class TypeAliasDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, typeAlias) {
    super(context, string, node, breakPoint);

    this.typeAlias = typeAlias;
  }

  getTypeAlias() {
    return this.typeAlias;
  }

  getTypeAliasDeclarationNode() {
    const node = this.getNode(),
          typeAliasDeclarationNode = node; ///

    return typeAliasDeclarationNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasDeclarationString}' type alias declaration...`);

    const verifyTypeAlias = this.verifyTypeAlias.bind(this);

    return all([
      verifyTypeAlias
    ], context, (context, back) => {
      context.addTypeAlias(this.typeAlias);

      context.debug(`...verified the '${typeAliasDeclarationString}' type alias declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${typeAliasDeclarationString}' type alias declaration.`);

      return back();
    });
  });

  verifyTypeAlias(context, forward, back) {
    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifiying the '${typeAliasDeclarationString}' type alias declaration's type alias...`);

    return this.typeAlias.verify(context, (context, back) => {
      context.debug(`...verified the '${typeAliasDeclarationString}' type alias declaration's type alias.`);

      return forward(context, back);
    }, back);
  }

  static name = "TypeAliasDeclaration";
});

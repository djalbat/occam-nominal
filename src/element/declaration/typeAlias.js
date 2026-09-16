"use strict";

import { arrayUtilities } from "necessary";
import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { first } = arrayUtilities,
      { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class TypeAliasDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, aliasType) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.aliasType = aliasType;
  }

  getType() {
    return this.type;
  }

  getAliasType() {
    return this.aliasType;
  }

  isImplicit() {
    const implicit = (this.aliasType === null);

    return implicit;
  }

  isExplicit() {
    const implicit = this.isImplicit(),
          explicit = !implicit; ///

    return explicit;
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

    const verifyAliasType = this.verifyAliasType.bind(this),
          verifyImplicitType = this.verifyImplicitType.bind(this),
          verifyExplicitType = this.verifyExplicitType.bind(this);

    return all([
      verifyAliasType,
      verifyImplicitType,
      verifyExplicitType
    ], context, (context, back) => {
      debugger

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

  verifyAliasType(context, forward, back) {
    const implicit = this.isImplicit();

    if (implicit) {
      return forward(context, back);
    }

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifiying the '${typeAliasDeclarationString}' type alias declaration's alias type...`);

    debugger

    context.debug(`...verified the '${typeAliasDeclarationString}' type alias declaration's alias type.`);

    return forward(context, back);
  }

  verifyImplicitType(context, forward, back) {
    const implicit = this.isImplicit();

    if (!implicit) {
      return forward(context, back);
    }

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasDeclarationString}' type alias declaration's implicit type...`);

    const strict = this.type.isStrict();

    if (!strict) {
      context.trace(`The '${typeAliasDeclarationString}' type alias declaration's implicit type is not strictly defined.`);

      return back();
    }

    let includeDependencies;

    includeDependencies = false;

    const includeRelease = true,
          typeName = this.type.getName(),
          typePresent = context.findTypeByTypeName(typeName, includeRelease, includeDependencies); ///

    if (typePresent) {
      context.trace(`The '${typeAliasDeclarationString}' type alias declaration's implicit type is present locally.`);

      return back();
    }

    includeDependencies = true;

    const types = context.findTypesByTypeName(typeName, includeRelease, includeDependencies),
          typesLength = types.length;

    if (typesLength === 0) {
      context.trace(`The '${typeAliasDeclarationString}' type alias declaration's implicit type is not present globally.`);

      return back();
    }

    if (typesLength > 1) {
      context.trace(`The '${typeAliasDeclarationString}' type alias declaration's implicit type is ambiguous globally.`);

      return back();
    }

    const firstType = first(types),
          type = firstType; ///

    this.type = type; ///

    context.trace(`...verified the '${typeAliasDeclarationString}' type alias declaration's implicit type.`);

    return forward(context, back);
  }

  verifyExplicitType(context, forward, back) {
    const explicit = this.isExplicit();

    if (!explicit) {
      return forward(context, back);
    }

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasDeclarationString}' type alias declaration's explicit type...`);

    debugger

    context.trace(`...verified the '${typeAliasDeclarationString}' type alias declaration's explicit type.`);

    return forward(context, back);
  }

  static name = "TypeAliasDeclaration";
});

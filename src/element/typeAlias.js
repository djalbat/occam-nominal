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

  isImplicit() {
    const implicit = (this.aliasType === null);

    return implicit;
  }

  isExplicit() {
    const implicit = this.isImplicit(),
          explicit = !implicit; ///

    return explicit;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasDeclarationString}' type alias...`);

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

      context.debug(`...verified the '${typeAliasDeclarationString}' type alias.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${typeAliasDeclarationString}' type alias.`);

      return back();
    });
  });

  verifyAliasType(context, forward, back) {
    const implicit = this.isImplicit();

    if (implicit) {
      return forward(context, back);
    }

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifiying the '${typeAliasDeclarationString}' type alias's alias type...`);

    debugger

    context.debug(`...verified the '${typeAliasDeclarationString}' type alias's alias type.`);

    return forward(context, back);
  }

  verifyImplicitType(context, forward, back) {
    const implicit = this.isImplicit();

    if (!implicit) {
      return forward(context, back);
    }

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasDeclarationString}' type alias's implicit type...`);

    const strict = this.type.isStrict();

    if (!strict) {
      context.trace(`The '${typeAliasDeclarationString}' type alias's implicit type is not strictly defined.`);

      return back();
    }

    let includeDependencies;

    includeDependencies = false;

    const includeRelease = true,
      typeName = this.type.getName(),
      typePresent = context.findTypeByTypeName(typeName, includeRelease, includeDependencies); ///

    if (typePresent) {
      context.trace(`The '${typeAliasDeclarationString}' type alias's implicit type is present locally.`);

      return back();
    }

    includeDependencies = true;

    const types = context.findTypesByTypeName(typeName, includeRelease, includeDependencies),
      typesLength = types.length;

    if (typesLength === 0) {
      context.trace(`The '${typeAliasDeclarationString}' type alias's implicit type is not present globally.`);

      return back();
    }

    if (typesLength > 1) {
      context.trace(`The '${typeAliasDeclarationString}' type alias's implicit type is ambiguous globally.`);

      return back();
    }

    const firstType = first(types),
      type = firstType; ///

    this.type = type; ///

    context.trace(`...verified the '${typeAliasDeclarationString}' type alias's implicit type.`);

    return forward(context, back);
  }

  verifyExplicitType(context, forward, back) {
    const explicit = this.isExplicit();

    if (!explicit) {
      return forward(context, back);
    }

    const typeAliasDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasDeclarationString}' type alias's explicit type...`);

    debugger

    context.trace(`...verified the '${typeAliasDeclarationString}' type alias's explicit type.`);

    return forward(context, back);
  }

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

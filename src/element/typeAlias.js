"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTypeAlias } from "../process/instantiate";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";

const { all } = continuationUtilities,
      { first } = arrayUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class TypeAlias extends Element {
  constructor(context, string, node, breakPoint, type, typeName) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.typeName = typeName;
  }

  getType() {
    return this.type;
  }

  getTypeName() {
    return this.typeName;
  }

  getTypeAliasNode() {
    const node = this.getNode(),
          typeAliasNode = node;  ///

    return typeAliasNode;
  }

  isImplicit() {
    const implicit = (this.type === null);

    return implicit;
  }

  isExplicit() {
    const implicit = this.isImplicit(),
          explicit = !implicit; ///

    return explicit;
  }

  getAliasedType() {
    const aliasedType = this.type;

    return aliasedType;
  }

  compareTypeName(typeName) {
    const typeNameCompares = (this.typeName === typeName);

    return typeNameCompares;
  }

  verify = unbreakable(function (context, forward, back) {
    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias...`);

    const implicit = this.isImplicit(),
          verifyTypeName = this.verifyTypeName.bind(this),
          verifyImplicitType = this.verifyImplicitType.bind(this),
          verifyExplicitType = this.verifyExplicitType.bind(this);

    return all([
      verifyTypeName,
      verifyImplicitType,
      verifyExplicitType
    ], implicit, context, (implicit, context, back) => {
      context.debug(`...verified the '${typeAliasString}' type alias.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${typeAliasString}' type alias.`);

      return back();
    });
  });

  verifyTypeName(implicit, context, forward, back) {
    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias's type name...`);

    const includeRelease = true,
          typeAliasPresent = context.isTypeAliasPresentByTypeName(this.typeName, includeRelease);

    if (typeAliasPresent) {
      context.trace(`The '${this.typeName}' type alias is present locally.`);

      return back();
    }

    const includeDependencies = false,
          typePresent = context.isTypePresentByTypeName(this.typeName, includeRelease, includeDependencies);

    if (typePresent) {
      context.trace(`The '${this.typeName}' type is present locally.`);

      return back();
    }

    context.debug(`...verified the '${typeAliasString}' type alias's type name.`);

    return forward(implicit, context, back);
  }

  verifyImplicitType(implicit, context, forward, back) {
    if (!implicit) {
      return forward(implicit, context, back);
    }

    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias's implicit type...`);

    const includeRelease = true,
          includeDependencies = true,
          types = context.findTypesByTypeName(this.typeName, includeRelease, includeDependencies),
          typesLength = types.length;

    if (typesLength === 0) {
      context.trace(`The '${typeAliasString}' type alias's implicit type is not presenet globally.`);

      return back();
    }

    if (typesLength > 1) {
      context.trace(`The '${typeAliasString}' type alias's implicit type is ambiguous globally.`);

      return back();
    }

    const firstType = first(types),
          type = firstType; ///

    this.type = type; ///

    context.debug(`...verified the '${typeAliasString}' type alias's implicit type...`);

    return forward(implicit, context, back);
  }

  verifyExplicitType(implicit, context, forward, back) {
    if (implicit) {
      return forward(implicit, context, back);
    }

    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias's explicit type...`);

    const typePrefixed = this.type.isPrefixed();

    if (!typePrefixed) {
      context.trace(`The '${typeAliasString}' type alias's explicit type is not prefixed.`);

      return back();
    }

    const prefixedTypeName = this.type.getPrefixedTypeName(),
          includeRelease = true,
          includeDependencies = true,
          types = context.findTypesByPrefixedTypeName(prefixedTypeName, includeRelease, includeDependencies),
          typesLength = types.length;

    if (typesLength === 0) {
      context.trace(`The '${typeAliasString}' type alias's explicit type is not present globally.`);

      return back();
    }

    if (typesLength > 1) {
      context.trace(`The '${typeAliasString}' type alias's explicit type is ambiguous globally.`);

      return back();
    }

    const firstType = first(types),
          type = firstType; ///

    this.type = type; ///

    context.debug(`...verified the '${typeAliasString}' type alias's explicittype.`);

    return forward(implicit, context, back);
  }

  toJSON() {
    let json;

    const string = this.getString(),
          typeJSON = typeToTypeJSON(this.type),
          type = typeJSON;  ///

    json = {
      string,
      type
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
            breakPoint = null,
            type = typeFromJSON(json, context),
            typeName = typeAliasNode.getTypeName();

      context = null; ///

      typeAlias = new TypeAlias(context, string, node, breakPoint, type, typeName);
    }, context);

    return typeAlias;
  }
});

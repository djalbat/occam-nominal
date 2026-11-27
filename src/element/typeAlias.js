"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTypeAlias } from "../process/instantiate";
import { typePrefixFromTypeAliasNode } from "../utilities/element";
import { typeFromJSON, typeToTypeJSON, prefixedTypeFromJSON, typePrefixToTypePrefixJSON, prefixedTypeToPrefixedTypeJSON } from "../utilities/json";

const { all } = continuationUtilities,
      { first } = arrayUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class TypeAlias extends Element {
  constructor(context, string, node, breakPoint, type, typePrefix, prefixedType) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.typePrefix = typePrefix;
    this.prefixedType = prefixedType;
  }

  getType() {
    return this.type;
  }

  getTypePrefix() {
    return this.typePrefix;
  }

  getPrefixedType() {
    return this.prefixedType;
  }

  getTypeName() {
    const typeName = this.type.getName();

    return typeName;
  }

  getTypeAliasNode() {
    const node = this.getNode(),
          typeAliasNode = node;  ///

    return typeAliasNode;
  }

  isImplicit() { return this.node.isImplicit(); }

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
    const typeNameA = typeName; ///

    typeName = this.getTypeName();

    const typeNameB = typeName, ///
          typeNameCompares = (typeNameA === typeNameB);

    return typeNameCompares;
  }

  verify = unbreakable(function (context, forward, back) {
    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias...`);

    const implicit = this.isImplicit(),
          verifyType = this.verifyType.bind(this),
          verifyImplicitType = this.verifyImplicitType.bind(this),
          verifyExplicitType = this.verifyExplicitType.bind(this);

    return all([
      verifyType,
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

  verifyType(implicit, context, forward, back) {
    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias's type...`);

    const typeName = this.getTypeName(),
          includeRelease = true,
          typeAliasPresent = context.isTypeAliasPresentByTypeName(typeName, includeRelease);

    if (typeAliasPresent) {
      context.trace(`The '${typeName}' type alias is present locally.`);

      return back();
    }

    const includeDependencies = false,
          typePresent = context.isTypePresentByTypeName(typeName, includeRelease, includeDependencies);

    if (typePresent) {
      context.trace(`The '${typeName}' type is present locally.`);

      return back();
    }

    context.debug(`...verified the '${typeAliasString}' type alias's type.`);

    return forward(implicit, context, back);
  }

  verifyImplicitType(implicit, context, forward, back) {
    if (!implicit) {
      return forward(implicit, context, back);
    }

    const typeAliasString = this.getString();  ///

    context.trace(`Verifying the '${typeAliasString}' type alias's implicit type...`);

    const typeName = this.getTypeName(),
          includeRelease = true,
          includeDependencies = true,
          types = context.findTypesByTypeName(typeName, includeRelease, includeDependencies),
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
          typePrefixJSON = typePrefixToTypePrefixJSON(this.type),
          prefixedTypeJSON = prefixedTypeToPrefixedTypeJSON(this.type),
          type = typeJSON,  ///
          typePrefix = typePrefixJSON,  ///
          prefixedType = prefixedTypeJSON;  ///

    json = {
      string,
      type,
      typePrefix,
      prefixedType
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
            typePrefix = typePrefixFromTypeAliasNode(typeAliasNode, context),
            prefixedType = prefixedTypeFromJSON(json, context);

      context = null; ///

      typeAlias = new TypeAlias(context, string, node, breakPoint, type, typePrefix, prefixedType);
    }, context);

    return typeAlias;
  }
});

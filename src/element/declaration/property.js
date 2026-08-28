"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class PropertyDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, property) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.property = property;
  }

  getType() {
    return this.type;
  }

  getProperty() {
    return this.property;
  }

  getPropertyDeclarationNode() {
    const node = this.getNode(),
          propertyDeclarationNode = node; ///

    return propertyDeclarationNode;
  }

  isMalformed() {
    const propertyDeclarationNode = this.getPropertyDeclarationNode(),
          malformed = propertyDeclarationNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    let verifies = false;

    const specificContext = context,  ///
          propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${propertyDeclarationString}' property delcaration because it is malformed.`);

      return continuation(verifies);
    }

    const verifyType = this.verifyType.bind(this),
          verifyProperty = this.verifyProperty.bind(this);

    return all([
      verifyType,
      verifyProperty
    ], context, ( _ , back) => {
      context = specificContext;  ///

      this.property.setType(this.type);

      context.debug(`...verified the '${propertyDeclarationString}' property declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${propertyDeclarationString}' property declaration.`);

      return back();
    });
  });

  verifyType(context, continuation) {
    let typeVerifies = false;

    const propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          typeString = this.type.getString(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type !== null) {
      this.type = type;

      typeVerifies = true;
    } else {
      context.debug(`The '${typeString}' type is not present.`);
    }

    if (typeVerifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration's type.`);
    }

    return continuation(typeVerifies, context);
  }

  verifyProperty(context, continuation) {
    const includeType = false,
          propertyString = this.property.getString(includeType),
          propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration's '${propertyString}' property...`);

    return this.property.verify(context, (propertyVerifies, context) => {
      if (propertyVerifies) {
        context.debug(`...verified the '${propertyDeclarationString}' property declaration's '${propertyString}' property.`);
      }

      return continuation(propertyVerifies, context);
    });
  }

  static name = "PropertyDeclaration";
});

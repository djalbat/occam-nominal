"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class MetavariableDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, metaType, metavariable) {
    super(context, string, node, breakPoint);

    this.metaType = metaType;
    this.metavariable = metavariable;
  }

  getMetaType() {
    return this.metaType;
  }

  getMetavariable() {
    return this.metavariable;
  }

  verify = breakable(function (context, continuation) {
    const metavariableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metavariableDeclarationString}' metavariable declaration...`);

    const verifyMetaType = this.verifyMetaType.bind(this),
          verifyMetavariable = this.verifyMetavariable.bind(this);

    return all([
      verifyMetaType,
      verifyMetavariable
    ],  context, (verifies) => {
      if (verifies) {
        const declaredMetavariable = this.metavariable;

        context.addDeclaredMetavariable(declaredMetavariable);
      }

      if (verifies) {
        context.debug(`...verified the '${metavariableDeclarationString}' metavariable declaration.`);
      }

      return continuation(verifies, context);
    });
  });

  verifyMetaType(context, continuation) {
    let metaTypeVerifies = true;

    const metaTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metaTypeDeclarationString}' metavariable declaration's metaType...`);

    this.metavariable.setMetaType(this.metaType);

    if (metaTypeVerifies) {
      context.debug(`...verified the '${metaTypeDeclarationString}' metavariable declaration's metaType.`);
    }

    return continuation(metaTypeVerifies, context);
  }

  verifyMetavariable(context, continuation) {
    let metavariableVerifies = false;

    const metavariableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metavariableDeclarationString}' metavariable declaration's metavariable...`);

    const metavariableName = this.metavariable.getName(),
          declaredMetavariablePresent = context.isDeclaredMetavariablePresentByMetavariableName(metavariableName);

    if (!declaredMetavariablePresent) {
      metavariableVerifies = this.metavariable.verify(context);
    } else {
      context.debug(`The '${metavariableName}' declared metavariable is already present.`);
    }

    if (metavariableVerifies) {
      context.debug(`...verified the '${metavariableDeclarationString}' metavariable declaration's metavariable.`);
    }

    return continuation(metavariableVerifies, context);
  }

  static name = "MetavariableDeclaration";
});

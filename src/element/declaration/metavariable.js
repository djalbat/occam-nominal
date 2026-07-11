"use strict";

import { breakPointUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

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
    let verifies;

    const metavariableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metavariableDeclarationString}' metavariable declaration...`);

    const metavariableVerifies = this.verifyMetavariable(context);

    if (metavariableVerifies) {
      const metaTypeVerifies = this.verifyMetaType(context);

      if (metaTypeVerifies) {
        const declaredMetavariable = this.metavariable; ///

        context.addDeclaredMetavariable(declaredMetavariable);

        verifies = true;
      }
    }

    if (verifies) {
      context.debug(`...verified the '${metavariableDeclarationString}' metavariable declaration.`);
    }

    return continuation(verifies);
  });

  verifyMetaType(context) {
    let metaTypeVerifies = true;

    const metaTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metaTypeDeclarationString}' metavariable declaration's metaType...`);

    this.metavariable.setMetaType(this.metaType);

    if (metaTypeVerifies) {
      context.debug(`...verified the '${metaTypeDeclarationString}' metavariable declaration's metaType.`);
    }

    return metaTypeVerifies;
  }

  verifyMetavariable(context) {
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

    return metavariableVerifies;
  }

  static name = "MetavariableDeclaration";
});

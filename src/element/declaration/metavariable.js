"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { cut, all } = continuationUtilities,
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

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const specificContext = context,  ///
          metavariableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metavariableDeclarationString}' metavariable declaration...`);

    const verifyMetaType = this.verifyMetaType.bind(this),
          verifyMetavariable = this.verifyMetavariable.bind(this);

    return all([
      verifyMetaType,
      verifyMetavariable
    ],  context, ( _ , back) => {
      const declaredMetavariable = this.metavariable;

      context = specificContext;  ///

      context.addDeclaredMetavariable(declaredMetavariable);

      context.debug(`...verified the '${metavariableDeclarationString}' metavariable declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${metavariableDeclarationString}' metavariable declaration.`);

      return back();
    });
  });

  verifyMetaType(context, forward, back) {
    const metaTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metaTypeDeclarationString}' metavariable declaration's metaType...`);

    this.metavariable.setMetaType(this.metaType);

    context.debug(`...verified the '${metaTypeDeclarationString}' metavariable declaration's metaType.`);

    return forward(context, back);
  }

  verifyMetavariable(context, forward, back) {
    const metavariableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${metavariableDeclarationString}' metavariable declaration's metavariable...`);

    const metavariableName = this.metavariable.getName(),
          declaredMetavariablePresent = context.isDeclaredMetavariablePresentByMetavariableName(metavariableName);

    if (declaredMetavariablePresent) {
      context.debug(`The '${metavariableName}' declared metavariable is already present.`);

      return back();
    }

    return this.metavariable.verify(context, (context, back) => {
      context.debug(`...verified the '${metavariableDeclarationString}' metavariable declaration's metavariable.`);

      return forward(context, back);
    }, back);
  }

  static name = "MetavariableDeclaration";
});

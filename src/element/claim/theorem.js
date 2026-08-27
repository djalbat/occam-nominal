"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";

const { cut } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class Theorem extends Claim {
  getThoeremNode() {
    const node = this.getNode(),
          theoremNode = node; ///

    return theoremNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const theoremString = this.getString(); ///

    context.trace(`Verifying the '${theoremString}' theorem...`);

    return this.verifyEx(context, (context, back) => {
      const theorem = this; ///

      context.addTheorem(theorem);

      context.debug(`...verified the '${theoremString}' theorem.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Verifying the '${theoremString}' theorem...`);

      return back();
    });
  });

  static name = "Theorem";

  static fromJSON(json, context) { return Claim.fromJSON(Theorem, json, context); }
});

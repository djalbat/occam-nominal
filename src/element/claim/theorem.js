"use strict";

import { breakPointUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class Theorem extends Claim {
  getThoeremNode() {
    const node = this.getNode(),
          theoremNode = node; ///

    return theoremNode;
  }

  verify = breakable(function (context, forward, back) {
    const theoremString = this.getString(); ///

    context.trace(`Verifying the '${theoremString}' theorem...`);

    return this.verifyEx(context, (context, back) => {
      const theorem = this; ///

      context.addTheorem(theorem);

      context.debug(`...verified the '${theoremString}' theorem.`);

      return forward(context, back);
    }, back);
  });

  static name = "Theorem";

  static fromJSON(json, context) { return Claim.fromJSON(Theorem, json, context); }
});

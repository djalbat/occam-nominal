"use strict";

import { breakPointUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class Conjecture extends Claim {
  getConjectureNode() {
    const node = this.getNode(),
          conjectureNode = node;  ///

    return conjectureNode;
  }

  verify = breakable(function (context, continuation) {
    const conjectureString = this.getString();  ///

    context.trace(`Verifying the '${conjectureString}' conjecture...`);

    return this.verifyEx(context, (verifies) => {
      if (verifies) {
        const conjecture = this;  ///

        context.addConjecture(conjecture);

        context.debug(`...verified the '${conjectureString}' conjecture.`);
      }

      return continuation(verifies, context);
    });
  });

  static name = "Conjecture";

  static fromJSON(json, context) { return Claim.fromJSON(Conjecture, json, context); }
});

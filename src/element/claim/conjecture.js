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

  verify = breakable(function (context, forward, back) {
    const conjecttureString = this.getString(); ///

    context.trace(`Verifying the '${conjecttureString}' conjectture...`);

    return this.verifyEx(context, (context, back) => {
      const conjectture = this; ///

      context.addConjecture(conjectture);

      context.debug(`...verified the '${conjecttureString}' conjectture.`);

      return forward(context, back);
    }, back);
  });

  static name = "Conjecture";

  static fromJSON(json, context) { return Claim.fromJSON(Conjecture, json, context); }
});

"use strict";

import { breakPointUtilities } from "occam-languages";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class Conjecture extends TopLevelAssertion {
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

      return continuation(verifies);
    });
  });

  static name = "Conjecture";

  static fromJSON(json, context) { return TopLevelAssertion.fromJSON(Conjecture, json, context); }
});

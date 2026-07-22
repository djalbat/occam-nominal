"use strict";

import { breakPointUtilities } from "occam-languages";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class Theorem extends TopLevelAssertion {
  getThoeremNode() {
    const node = this.getNode(),
          theoremNode = node; ///

    return theoremNode;
  }

  verify = breakable(function (context, continuation) {
    const theoremString = this.getString();  ///

    context.trace(`Verifying the '${theoremString}' theorem...`);

    return this.verifyEx(context, (verifies) => {
      if (verifies) {
        const theorem = this; ///

        context.addTheorem(theorem);

        context.debug(`...verified the '${theoremString}' theorem.`);
      }

      return continuation(verifies, context);
    });
  });

  static name = "Theorem";

  static fromJSON(json, context) { return TopLevelAssertion.fromJSON(Theorem, json, context); }
});

"use strict";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";

export default define(class Theorem extends TopLevelAssertion {
  getThoeremNode() {
    const node = this.getNode(),
          theoremNode = node; ///

    return theoremNode;
  }

  async verify(context) {
    let verifies;

    await this.break(context);

    const theoremString = this.getString();  ///

    context.trace(`Verifying the '${theoremString}' theorem...`);

    verifies = await super.verify(context);

    if (verifies) {
      const theorem = this; ///

      context.addTheorem(theorem);

      context.debug(`...verified the '${theoremString}' theorem.`);
    }

    return verifies;
  }

  static name = "Theorem";

  static fromJSON(json, context) { return TopLevelAssertion.fromJSON(Theorem, json, context); }
});

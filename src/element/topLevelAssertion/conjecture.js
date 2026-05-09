"use strict";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";

export default define(class Conjecture extends TopLevelAssertion {
  getConjectureNode() {
    const node = this.getNode(),
          conjectureNode = node;  ///

    return conjectureNode;
  }

  async verify(context) {
    let verifies;

    await this.break(context);

    const conjectureString = this.getString();  ///

    context.trace(`Verifying the '${conjectureString}' conjecture...`);

    verifies = await super.verify(context);

    if (verifies) {
      const conjecture = this;  ///

      context.addConjecture(conjecture);

      context.debug(`...verified the '${conjectureString}' conjecture.`);
    }

    return verifies;
  }

  static name = "Conjecture";

  static fromJSON(json, context) { return TopLevelAssertion.fromJSON(Conjecture, json, context); }
});

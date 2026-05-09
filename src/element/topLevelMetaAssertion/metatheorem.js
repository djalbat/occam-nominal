"use strict";

import TopLevelMetaAssertion from "../topLevelMetaAssertion";

import { define } from "../../elements";

export default define(class Metatheorem extends TopLevelMetaAssertion {
  getMetatheoremNode() {
    const node = this.getNode(),
          metatheoremNode = node; ///

    return metatheoremNode;
  }

  async verify(context) {
    let verifies;

    await this.break(context);

    const metaLemmaString = this.getString(); ///

    context.trace(`Verifying the '${metaLemmaString}' metatheorem...`);

    verifies = super.verify(context);

    if (verifies) {
      const metaTheorem = this; ///

      context.addMetatheorem(metaTheorem);

      context.debug(`...verified the '${metaLemmaString}' metatheorem.`);
    }

    return verifies;
  }

  static name = "Metatheorem";

  static fromJSON(json, context) { return TopLevelMetaAssertion.fromJSON(Metatheorem, json, context); }
});

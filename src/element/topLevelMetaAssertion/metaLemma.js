"use strict";

import TopLevelMetaAssertion from "./../topLevelMetaAssertion";

import { define } from "../../elements";

export default define(class MetaLemma extends TopLevelMetaAssertion {
  getMetaLemmaNode() {
    const node = this.getNode(),
          metaLemmaNode = node; ///

    return metaLemmaNode;
  }

  async verify(context) {
    let verifies;

    await this.break(context);

    const metaLemmaString = this.getString(); ///

    context.trace(`Verifying the '${metaLemmaString}' meta-lemma...`);

    verifies = super.verify(context);

    if (verifies) {
      const metaTheorem = this; ///

      context.addMetatheorem(metaTheorem);

      context.debug(`...verified the '${metaLemmaString}' meta-lemma.`);
    }

    return verifies;
  }

  static name = "MetaLemma";

  static fromJSON(json, context) { return TopLevelMetaAssertion.fromJSON(MetaLemma, json, context); }
});

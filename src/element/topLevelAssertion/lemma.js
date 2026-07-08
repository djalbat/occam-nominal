"use strict";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";

export default define(class Lemma extends TopLevelAssertion {
  getLemmaNode() {
    const node = this.getNode(),
          lemmaNode = node; ///

    return lemmaNode;
  }

  async verify(context) {
    let verifies;

    await this.break(context);

    const lemmaString = this.getString(); ///

    (lemmaString === null) ?
      context.trace(`Verifying a lemma...`) :
        context.trace(`Verifying the '${lemmaString}' lemma...`);

    verifies = await super.verify(context);

    if (verifies) {
      const lemma = this; ///

      context.addLemma(lemma);

      (lemmaString === null) ?
        context.debug(`...verified a lemma.`) :
          context.debug(`...verified the '${lemmaString}' lemma.`);
    }

    return verifies;
  }

  static name = "Lemma";
});

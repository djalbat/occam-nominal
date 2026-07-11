"use strict";

import { breakPointUtilities } from "occam-languages";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class Lemma extends TopLevelAssertion {
  getLemmaNode() {
    const node = this.getNode(),
          lemmaNode = node; ///

    return lemmaNode;
  }

  verify = breakable(function (context, continuation) {
    const lemmaString = this.getString(); ///

    (lemmaString === null) ?
      context.trace(`Verifying a lemma...`) :
        context.trace(`Verifying the '${lemmaString}' lemma...`);

    this.verifyEx(context, (verifies) => {
      if (verifies) {
        const lemma = this; ///

        context.addLemma(lemma);

        (lemmaString === null) ?
          context.debug(`...verified a lemma.`) :
            context.debug(`...verified the '${lemmaString}' lemma.`);
      }

      continuation(verifies);
    });
  });

  static name = "Lemma";
});

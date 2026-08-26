"use strict";

import { breakPointUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class Lemma extends Claim {
  getLemmaNode() {
    const node = this.getNode(),
          lemmaNode = node; ///

    return lemmaNode;
  }

  verify = breakable(function (context, forward, back) {
    const lemmaString = this.getString(); ///

    (lemmaString === null) ?
      context.trace(`Verifying a lemma...`) :
        context.trace(`Verifying the '${lemmaString}' lemma...`);

    return this.verifyEx(context, (context, back) => {
      const lemma = this; ///

      context.addLemma(lemma);

      context.debug(`...verified the '${lemmaString}' lemma.`);

      return forward(context, back);
    }, back);
  });

  static name = "Lemma";
});

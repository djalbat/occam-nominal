"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { enclose } from "../../utilities/context";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class Conjecture extends Claim {
  getConjectureNode() {
    const node = this.getNode(),
          conjectureNode = node;  ///

    return conjectureNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const conjectureString = this.getString(), ///
          speicifcContext = context;  ///

    context.trace(`Verifying the '${conjectureString}' conjecture...`);

    return enclose((context) => {
      const verifyProof = this.verifyProof.bind(this),
            verifyLabels = this.verifyLabels.bind(this),
            verifyDeduction = this.verifyDeduction.bind(this),
            verifySuppositions = this.verifySuppositions.bind(this);

      return all([
        verifyLabels,
        verifySuppositions,
        verifyDeduction,
        verifyProof
      ], context, ( _ , back) => {
        const conjecture = this; ///

        context = speicifcContext;  ///

        context.addConjecture(conjecture);

        context.debug(`...verified the '${conjectureString}' conjecture.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${conjectureString}' conjecture.`);

        return back();
      });
    }, context);
  });

  static name = "Conjecture";

  static fromJSON(json, context) { return Claim.fromJSON(Conjecture, json, context); }
});

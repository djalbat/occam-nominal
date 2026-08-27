"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { enclose } from "../../utilities/context";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class Theorem extends Claim {
  getThoeremNode() {
    const node = this.getNode(),
          theoremNode = node; ///

    return theoremNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const theoremString = this.getString(), ///
          speicifcContext = context;  ///

    context.trace(`Verifying the '${theoremString}' theorem...`);

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
        const theorem = this; ///

        context = speicifcContext;  ///

        context.addTheorem(theorem);

        context.debug(`...verified the '${theoremString}' theorem.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${theoremString}' theorem.`);

        return back();
      });
    }, context);
  });

  static name = "Theorem";

  static fromJSON(json, context) { return Claim.fromJSON(Theorem, json, context); }
});

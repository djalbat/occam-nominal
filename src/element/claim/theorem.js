"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { enclose } from "../../utilities/context";

const { breakable } = breakPointUtilities,
      { cut, all, isolate } = continuationUtilities;

export default define(class Theorem extends Claim {
  getThoeremNode() {
    const node = this.getNode(),
          theoremNode = node; ///

    return theoremNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const theoremString = this.getString();  ///

    context.trace(`Verifying the '${theoremString}' theorem...`);

    return isolate((context, forward, back) => {
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
        ], context, (context, back) => {
          return forward(back);
        }, back);
      }, context);
    }, context, (context, back) => {
      const theorem = this; ///

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
  });

  static name = "Theorem";

  static fromJSON(json, context) { return Claim.fromJSON(Theorem, json, context); }
});

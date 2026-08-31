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

  apply = breakable(function (step, factOrSubproofs, context, forward, back) {
    forward = cut(forward, back); ///

    const theoremString = this.getString();  ///

    context.trace(`Applying the '${theoremString}' theorem...`);

    return isolate((step, factOrSubproofs, context, forward, back) => {
      const applyDeduction = this.applyDeduction.bind(this),
            applySuppositions = this.applySuppositions.bind(this);

      return reconcile((context) => {
        return all([
          applyDeduction,
          applySuppositions
        ], step, factOrSubproofs, context, (step, factOrSubproofs, context, back) => {
          const complexSubstitutionsUnsolved = context.areComplexSubstitutionsUnsolved();

          if (complexSubstitutionsUnsolved) {
            context.debug(`There are unsolved complex substitutions.`);

            return back();
          }

          return forward(back);
        }, back);
      }, context)
    }, step, factOrSubproofs, context, (step, factOrSubproofs, context, back) => {
      context.debug(`...applied the '${theoremString}' theorem.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${claimString}' claim.`);

      return back();
    });
  });

  static name = "Theorem";

  static fromJSON(json, context) { return Claim.fromJSON(Theorem, json, context); }
});

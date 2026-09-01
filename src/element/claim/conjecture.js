"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { isolate, enclose, reconcile } from "../../utilities/context";

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

    const conjectureString = this.getString();  ///

    context.trace(`Verifying the '${conjectureString}' conjecture...`);

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
      const conjecture = this; ///

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
  });

  apply = breakable(function (step, factOrSubproofs, context, forward, back) {
    forward = cut(forward, back); ///

    const conjectureString = this.getString();  ///

    context.trace(`Applying the '${conjectureString}' conjecture...`);

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
      context.debug(`...applied the '${conjectureString}' conjecture.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${conjectureString}' conjecture.`);

      return back();
    });
  });

  static name = "Conjecture";

  static fromJSON(json, context) { return Claim.fromJSON(Conjecture, json, context); }
});

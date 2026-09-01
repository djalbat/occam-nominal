"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { isolate, enclose, reconcile } from "../../utilities/context";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class Lemma extends Claim {
  getLemmaNode() {
    const node = this.getNode(),
          lemmaNode = node; ///

    return lemmaNode;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const lemmaString = this.getString();  ///

    context.trace(`Verifying the '${lemmaString}' lemma...`);

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
      const lemma = this; ///

      context.addLemma(lemma);

      context.debug(`...verified the '${lemmaString}' lemma.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${lemmaString}' lemma.`);

      return back();
    });
  });

  apply = breakable(function (step, factOrSubproofs, context, forward, back) {
    forward = cut(forward, back); ///

    const lemmaString = this.getString();  ///

    context.trace(`Applying the '${lemmaString}' lemma...`);

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
      context.debug(`...applied the '${lemmaString}' lemma.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${lemmaString}' lemma.`);

      return back();
    });
  });

  static name = "Lemma";
});

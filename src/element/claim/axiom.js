"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { termsStringFromTerms } from "../../utilities/string";
import { join, isolate, enclose, reconcile } from "../../utilities/context";

const { breakable } = breakPointUtilities,
      { cut, all, backwardsEvery } = continuationUtilities;

export default define(class Axiom extends Claim {
  getAxiomNode() {
    const node = this.getNode(),
          axiomNode = node; ///

    return axiomNode;
  }

  isSatisfiable() {
    const signature = this.getSignature(),
          satisfiable = (signature !== null);

    return satisfiable;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const axiomString = this.getString();  ///

    context.trace(`Verifying the '${axiomString}' axiom...`);

    return isolate((context, forward, back) => {
      return enclose((context) => {
        const verifyProof = this.verifyProof.bind(this),
              verifyLabels = this.verifyLabels.bind(this),
              verifySignature = this.verifySignature.bind(this),
              verifyDeduction = this.verifyDeduction.bind(this),
              verifySuppositions = this.verifySuppositions.bind(this);

        return all([
          verifyLabels,
          verifySignature,
          verifySuppositions,
          verifyDeduction,
          verifyProof
        ], context, (context, back) => {
          return forward(back);
        }, back);
      }, context);
    }, context, (context, back) => {
      const axiom = this; ///

      context.addAxiom(axiom);

      context.debug(`...verified the '${axiomString}' axiom.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${axiomString}' axiom.`);

      return back();
    });
  });

  apply = breakable(function (step, factOrSubproofs, context, forward, back) {
    forward = cut(forward, back); ///

    const axiomString = this.getString();  ///

    context.trace(`Applying the '${axiomString}' axiom...`);

    return isolate((step, factOrSubproofs, context, forward, back) => {
      const applyDeduction = this.applyDeduction.bind(this),
            applySuppositions = this.applySuppositions.bind(this),
            dischargeHypotheses = this.dischargeHypotheses.bind(this);

      return reconcile((context) => {
        return all([
          applyDeduction,
          dischargeHypotheses,
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
      context.debug(`...applied the '${axiomString}' axiom.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${axiomString}' axiom.`);

      return back();
    });
  });

  verifySignature(context, forward, back) {
    const satisfiable = this.isSatisfiable();

    if (!satisfiable) {
      return forward(context, back);
    }

    const signature = this.getSignature(),
          axiomString = this.getString(); ///

    context.trace(`Verifying the '${axiomString}' axiom's signature...`);

    return signature.verify(context, (context, back) => {
      context.trace(`...verified the '${axiomString}' axiom's signature.`);

      return forward(context, back);
    }, back);
  }

  unifyTerms(terms, context, forward, back) {
    const quoted = true,
          termsString = termsStringFromTerms(terms, quoted),
          axiomString = this.getString(); ///

    context.trace(`Unifying the ${termsString} terms with the '${axiomString}' axiom...`);

    const signature = this.getSignature();

    return signature.unifyTerms(terms, context, (context, back) => {
      context.debug(`...unified the ${termsString} terms with the '${axiomString}' axiom...`);

      return forward(context, back);
    }, back);
  }

  unifyClaim(claim, context, forward, back) {
    forward = cut(forward, back); ///

    const axiomString = this.getString(), ///
          claimString = claim.getString();

    context.trace(`Unifying the '${claimString}' claim with the '${axiomString}' axiom...`);

    return isolate((claim, context, forward, back) => {
      return reconcile((context) => {
        const deduction = claim.getDeduction();

        return this.unifyDeduction(deduction, context, (context, back) => {
          const suppositions = claim.getSuppositions();

          return this.unifySuppositions(suppositions, context, (context, back) => {
            context.commit();

            return forward(back);
          }, back);
        }, back);
      }, context);
    }, claim, context, (claim, context, back) => {
      context.debug(`...unified the '${claimString}' claim with the '${axiomString}' axiom.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to unify the '${claimString}' claim with the '${axiomString}' axiom.`);

      return back();
    });
  }

  unifyDeduction(deduction, context, forward, back) {
    const generalDeduction = this.getDeduction(), ///
          specificDeduction = deduction,  ///
          generalDeductionString = generalDeduction.getString(),
          specificDeductionString = specificDeduction.getString();

    context.trace(`Unifying the '${specificDeductionString}' deduction with the '${generalDeductionString}' deduction...`);

    const specificDeductionContext = specificDeduction.getContext(),
          generalDeductionContext = generalDeduction.getContext(),
          specificContext = specificDeductionContext,  ///
          generalContext = generalDeductionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const statement = specificDeduction.getStatement();

        deduction = generalDeduction; ///

        return deduction.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${specificDeductionString}' deduction with the '${generalDeductionString}' deduction.`);

          return forward(context, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifySupposition(supposition, context, forward, back, index) {
    const specificSupposition = supposition;  ///

    supposition = this.getSupposition(index);

    const generalSupposition = supposition, ///
          generalSuppositionString = generalSupposition.getString(),
          specificSuppositionString = specificSupposition.getString();

    context.trace(`Unifying the '${specificSuppositionString}' supposition with the '${generalSuppositionString}' supposition...`);

    const specificSuppositionContext = specificSupposition.getContext(),
          generalSuppositionContext = generalSupposition.getContext(),
          specificContext = specificSuppositionContext,  ///
          generalContext = generalSuppositionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const statement = specificSupposition.getStatement(),
              supposition = generalSupposition; ///

        return supposition.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${specificSuppositionString}' supposition with the '${generalSuppositionString}' supposition.`);

          return forward(context, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, context, forward, back) {
    const specificSuppositions = suppositions,  ///
          specificSuppositionsLength = specificSuppositions.length;

    suppositions = this.getSuppositions();

    const generalSuppositions = suppositions, ///
          generalSuppositionsLength = generalSuppositions.length;

    if (generalSuppositionsLength !== specificSuppositionsLength) {
      return back();
    }

    return backwardsEvery(suppositions, (supposition, context, forward, back, index) => {
      return this.unifySupposition(supposition, context, forward, back, index);
    }, context, forward, back);
  }

  unifySignatureAssertion(signatureAssertion, context, forward, back) {
    const axiomString = this.getString(), ///
          signatureAssertionString = signatureAssertion.getString();

    context.trace(`Unifying the '${signatureAssertionString}' signature assertion with the '${axiomString}' axiom...`);

    const terms = signatureAssertion.getTerms(),
          signature = this.getSignature();

    return signature.unifyTerms(terms, context, (context, back) => {
      context.debug(`...unified the '${signatureAssertionString}' signature assertion with the '${axiomString}' axiom.`);

      return forward(context, back);
    }, back);
  }

  static name = "Axiom";

  static fromJSON(json, context) { return Claim.fromJSON(Axiom, json, context); }
});

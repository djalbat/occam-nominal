"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { join, reconcile } from "../../utilities/context";
import { termsStringFromTerms } from "../../utilities/string";

const { breakable } = breakPointUtilities,
      { asynchronousBackwardsEvery } = continuationUtilities;

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

  verify = breakable(function (context, continuation) {
    const axiomString = this.getString(); ///

    context.trace(`Verifying the '${axiomString}' axiom...`);

    this.verifySignature(context, (signatureVerifies) => {
      if (!signatureVerifies) {
        const verifies = false;

        return continuation(verifies);
      }

      return this.verifyEx(context, (verifies) => {
        if (verifies) {
          const axiom = this; ///

          context.addAxiom(axiom);

          context.debug(`...verified the '${axiomString}' axiom.`);
        }

        return continuation(verifies, context);
      });
    });
  });

  verifySignature(context, continuation) {
    const satisfiable = this.isSatisfiable();

    if (!satisfiable) {
      const signatureVerifies = true; ///

      return continuation(signatureVerifies);
    }

    const signature = this.getSignature(),
          axiomString = this.getString(); ///

    context.trace(`Verifying the '${axiomString}' axiom's signature...`);

    return signature.verify(context, (signatureVerifies) => {
      if (signatureVerifies) {
        context.trace(`...verified the '${axiomString}' axiom's signature.`);
      }

      return continuation(signatureVerifies);
    });
  }

  unifyTerms(terms, context, continuation) {
    const quoted = true,
          termsString = termsStringFromTerms(terms, quoted),
          axiomString = this.getString(); ///

    context.trace(`Unifying the ${termsString} terms with the '${axiomString}' axiom...`);

    const signature = this.getSignature();

    return signature.unifyTerms(terms, context, (termsUnify) => {
      if (termsUnify) {
        context.debug(`...unified the ${termsString} terms with the '${axiomString}' axiom...`);
      }

      return continuation(termsUnify);
    });
  }

  unifyClaim(claim, context, continuation) {
    let claimUnifies = false;

    const axiomString = this.getString(), ///
          claimString = claim.getString();

    context.trace(`Unifying the '${claimString}' claim with the '${axiomString}' axiom...`);

    return reconcile((context) => {
      const deduction = claim.getDeduction();

      return this.unifyDeduction(deduction, context, (deductionUnifies) => {
        if (!deductionUnifies) {
          return continuation(claimUnifies);
        }

        const suppositions = claim.getSuppositions();

        return this.unifySuppositions(suppositions, context, (suppositionsUnify) => {
          if (suppositionsUnify) {
            claimUnifies = true;
          }

          if (claimUnifies) {
            context.commit();
          }

          if (claimUnifies) {
            context.debug(`...unified the '${claimString}' claim with the '${axiomString}' axiom.`);
          }

          return continuation(claimUnifies);
        });
      });
    }, context);
  }

  unifyDeduction(deduction, context, continuation) {
    let deductionUnifies = false;

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

        return deduction.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          if (statementUnifies) {
            deductionUnifies = true;
          }

          if (deductionUnifies) {
            specificContext.commit(context);
          }

          if (deductionUnifies) {
            context.debug(`...unified the '${specificDeductionString}' deduction with the '${generalDeductionString}' deduction.`);
          }

          return continuation(deductionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySupposition(specificSupposition, generalSupposition, context, continuation) {
    let suppositionUnifies = false;

    const generalSuppositionString = generalSupposition.getString(),
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

        return supposition.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          if (statementUnifies) {
            suppositionUnifies = true;
          }

          if (suppositionUnifies) {
            specificContext.commit(context);
          }

          if (suppositionUnifies) {
            context.debug(`...unified the '${specificSuppositionString}' supposition with the '${generalSuppositionString}' supposition.`);
          }

          return continuation(suppositionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, context, continuation) {
    let suppositionsUnify = false;

    const specificSuppositions = suppositions,  ///
          specificSuppositionsLength = specificSuppositions.length;

    suppositions = this.getSuppositions();

    const generalSuppositions = suppositions, ///
          generalSuppositionsLength = generalSuppositions.length;

    if (generalSuppositionsLength !== specificSuppositionsLength) {
      return continuation(suppositionsUnify);
    }

    let index = specificSuppositionsLength;

    return asynchronousBackwardsEvery(generalSuppositions, (generalSupposition, continuation) => {
      index--;

      const specificSupposition = specificSuppositions[index];

      return this.unifySupposition(specificSupposition, generalSupposition, context, continuation);
    }, continuation);
  }

  unifySignatureAssertion(signatureAssertion, context, continuation) {
    let signatureAssertionUnifies = false;

    const axiomString = this.getString(), ///
          signatureAssertionString = signatureAssertion.getString();

    context.trace(`Unifying the '${signatureAssertionString}' signature assertion with the '${axiomString}' axiom...`);

    const terms = signatureAssertion.getTerms(),
          signature = this.getSignature();

    return signature.unifyTerms(terms, context, (termsUnify) => {
      if (termsUnify) {
        signatureAssertionUnifies = true;
      }

      if (signatureAssertionUnifies) {
        context.debug(`...unified the '${signatureAssertionString}' signature assertion with the '${axiomString}' axiom.`);
      }

      return continuation(signatureAssertionUnifies);
    });
  }

  static name = "Axiom";

  static fromJSON(json, context) { return Claim.fromJSON(Axiom, json, context); }
});

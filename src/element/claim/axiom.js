"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Claim from "../claim";

import { define } from "../../elements";
import { reconcile } from "../../utilities/context";

const { breakable } = breakPointUtilities,
      { asynchronousMatch } = continuationUtilities;

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

  unifySignature(signature, context) {
    let signatureUnifies;

    const axiomString = this.getString(), ///
          signatureString = signature.getString();

    context.trace(`Unifying the '${signatureString}' signature with the '${axiomString}' axiom...`);

    const specificSignature = signature;  ///

    signature = this.getSignature();

    const generalSignature = signature; ///

    signatureUnifies = generalSignature.unifySignature(specificSignature, context);

    if (signatureUnifies) {
      context.debug(`...unified the '${signatureString}' signature with the '${axiomString}' axiom.`);
    }

    return signatureUnifies;
  }

  unifyDeduction(deduction, context) {
    let deductionUnifies;

    const axiomString = this.getString(), ///
          generalDeduction = this.deduction,  ///
          specificDeduction = deduction,  ///
          generalDeductionString = generalDeduction.getString(),
          specificDeductionString = specificDeduction.getString();

    context.trace(`Unifying the '${specificDeductionString}' deduction with the '${axiomString}' axiom's '${generalDeductionString}' deduction...`);

    const generalDeductionContext = generalDeduction.getContext(),
          specificDeductionContext = specificDeduction.getContext(),
          generalContext = generalDeductionContext, ///
          specificContext = specificDeductionContext; ///

    debugger

    return reconcile((specificContext) => {
      let statement;

      statement = specificDeduction.getStatement();

      const specificStatement = statement;  ///

      statement = generalDeduction.getStatement();

      const generalStatement = statement, ///
            statementUnifies = generalStatement.unifyStatement(specificStatement, generalContext, specificContext);

      if (statementUnifies) {
        specificContext.commit(context);

        deductionUnifies = true;
      }
    }, specificContext);

    if (deductionUnifies) {
      context.debug(`...unified the '${specificDeductionString}' deduction with the '${axiomString}' axiom's '${generalDeductionString}' deduction.`);
    }

    return deductionUnifies;
  }

  unifySupposition(supposition, index, context) {
    let suppositionUnifies = false;

    const specificSupposition = supposition;  ///

    supposition = this.getSupposition(index);

    const axiomString = this.getString(), ///
          generalSupposition = supposition,  ///
          generalSuppositionString = generalSupposition.getString(),
          specificSuppositionString = specificSupposition.getString();

    context.trace(`Unifying the '${specificSuppositionString}' supposition with the '${axiomString}' axiom's '${generalSuppositionString}' supposition...`);

    const generalSuppositionContext = generalSupposition.getContext(),
          specificSuppositionContext = specificSupposition.getContext(),
          generalContext = generalSuppositionContext, ///
          specificContext = specificSuppositionContext; ///

    debugger

    return reconcile((specificContext) => {
      let statement;

      statement = specificSupposition.getStatement();

      const specificStatement = statement;  ///

      statement = generalSupposition.getStatement();

      const generalStatement = statement, ///
            statementUnifies = generalStatement.unifyStatement(specificStatement, generalContext, specificContext);

      if (statementUnifies) {
        specificContext.commit(context);

        suppositionUnifies = true;
      }
    }, specificContext);

    if (suppositionUnifies) {
      context.debug(`...unified the '${specificSuppositionString}' supposition with the '${axiomString}' axiom's '${generalSuppositionString}' supposition...`);
    }

    return suppositionUnifies;
  }

  unifySuppositions(suppositions, context) {
    let suppositionsUnify;

    const specificSuppositions = suppositions;  ///

    suppositions = this.getSuppositions();

    const generalSuppositions = suppositions; ///

    suppositionsUnify = asynchronousMatch(generalSuppositions, specificSuppositions, (generalSupposition, specificSupposition, index) => {
      const supposition = specificSupposition,  ///
            suppositionUnifies = this.unifySupposition(supposition, index, context);

      if (suppositionUnifies) {
        return true;
      }
    });

    return suppositionsUnify;
  }

  unifyClaim(claim, context) {
    let claimUnifies = false;

    const axiomString = this.getString(), ///
          claimString = claim.getString();

    context.trace(`Unifying the '${claimString}' claim with the '${axiomString}' axiom...`);

    const deduction = claim.getDeduction(),
          deductionUnifies = this.unifyDeduction(deduction, context);

    if (deductionUnifies) {
      const hypothesesDischarges = claim.dischargeHypotheses(context);

      if (hypothesesDischarges) {
        const suppositions = claim.getSuppositions(),
              suppositionsUnify = this.unifySuppositions(suppositions, context);

        if (suppositionsUnify) {
          claimUnifies = true;
        }
      }
    }

    if (claimUnifies) {
      context.debug(`...unified the '${claimString}' claim with the '${axiomString}' axiom.`);
    }

    return claimUnifies;
  }

  static name = "Axiom";

  static fromJSON(json, context) { return Claim.fromJSON(Axiom, json, context); }
});

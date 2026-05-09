"use strict";

import { asynchronousUtilities } from "occam-languages";

import TopLevelAssertion from "../topLevelAssertion";

import { define } from "../../elements";
import { reconcile } from "../../utilities/context";

const { asyncMatch } = asynchronousUtilities;

export default define(class Axiom extends TopLevelAssertion {
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

  async verify(context) {
    let verifies;

    await this.break(context);

    const axiomString = this.getString(); ///

    context.trace(`Verifying the '${axiomString}' axiom...`);

    const signatureVerifies = this.verifySignature(context);

    if (signatureVerifies) {
      verifies = await super.verify(context);
    }

    if (verifies) {
      const axiom = this; ///

      context.addAxiom(axiom);

      context.debug(`...verified the '${axiomString}' axiom.`);
    }

    return verifies;
  }

  verifySignature(context) {
    let signatureVerifies;

    const satisfiable = this.isSatisfiable();

    if (satisfiable) {
      const axiomString = this.getString(); ///

      context.trace(`Verifying the '${axiomString}' axiom's signature...`);

      const signature = this.getSignature();

      signatureVerifies = signature.verify(context);

      if (signatureVerifies) {
        context.trace(`...verified the '${axiomString}' axiom's signature.`);
      }
    } else {
      signatureVerifies = true
    }

    return signatureVerifies;
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

  async unifyDeduction(deduction, context) {
    let deductionUnifies;

    await this.break(context);

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

    reconcile((specificContext) => {
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

  async unifySupposition(supposition, index, context) {
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

    reconcile((specificContext) => {
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

  async unifySuppositions(suppositions, context) {
    let suppositionsUnify;

    const specificSuppositions = suppositions;  ///

    suppositions = this.getSuppositions();

    const generalSuppositions = suppositions; ///

    suppositionsUnify = await asyncMatch(generalSuppositions, specificSuppositions, async (generalSupposition, specificSupposition, index) => {
      const supposition = specificSupposition,  ///
            suppositionUnifies = await this.unifySupposition(supposition, index, context);

      if (suppositionUnifies) {
        return true;
      }
    });

    return suppositionsUnify;
  }

  async unifyTopLevelAssertion(topLevelAssertion, context) {
    let topLevelAssertionUnifies = false;

    const axiomString = this.getString(), ///
          topLevelAssertionString = topLevelAssertion.getString();

    context.trace(`Unifying the '${topLevelAssertionString}' top level assertion with the '${axiomString}' axiom...`);

    const deduction = topLevelAssertion.getDeduction(),
          deductionUnifies = await this.unifyDeduction(deduction, context);

    if (deductionUnifies) {
      const hypothesesDischarged = await topLevelAssertion.dischargeHypotheses(context);

      if (hypothesesDischarged) {
        const suppositions = topLevelAssertion.getSuppositions(),
              suppositionsUnify = await this.unifySuppositions(suppositions, context);

        if (suppositionsUnify) {
          topLevelAssertionUnifies = true;
        }
      }
    }

    if (topLevelAssertionUnifies) {
      context.debug(`...unified the '${topLevelAssertionString}' top level assertion with the '${axiomString}' axiom.`);
    }

    return topLevelAssertionUnifies;
  }

  static name = "Axiom";

  static fromJSON(json, context) { return TopLevelAssertion.fromJSON(Axiom, json, context); }
});

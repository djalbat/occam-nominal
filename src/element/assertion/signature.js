"use strict";

import Assertion from "../assertion";

import { define } from "../../elements";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { reconcile, instantiate } from "../../utilities/context";
import { instantiateSignatureAssertion } from "../../process/instantiate";
import { signatureFromSignatureAssertionNode, referenceFromSignatureAssertionNode, signatureAssertionFromStatementNode } from "../../utilities/element";

export default define(class SignatureAssertion extends Assertion {
  constructor(context, string, node, breakPoint, signature, reference) {
    super(context, string, node, breakPoint);

    this.signature = signature;
    this.reference = reference;
  }

  getSignature() {
    return this.signature;
  }

  getReference() {
    return this.reference;
  }

  getSignatureAssertionNode() {
    const node = this.getNode(),
          signatureAssertionNode = node;  ///

    return signatureAssertionNode;
  }

  validate(context) {
    let signatureAssertion = null;

    const signatureAssertionString = this.getString(); ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion...`);

    let validates = true;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion) {
      validates = true;

      signatureAssertion = validAssertion; ///

      context.debug(`...the '${signatureAssertionString}' signature assertion is already valid.`);
    } else {
      const signatureVerifies = this.validateSignature(context);

      if (signatureVerifies) {
        const referenceVerifies = this.validateReference(context);

        if (referenceVerifies) {
          validates = true;
        }

        validates = true;
      }

      if (validates) {
        const assertion = this; ///

        signatureAssertion = assertion; ///

        context.addAssertion(signatureAssertion);
      }
    }

    if (validates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion.`);
    }

    return signatureAssertion;
  }

  validateSignature(context) {
    let signatureValidates = false;

    const signatureAssertionString = this.getString(); ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's signature...`);

    const signature = this.signature.validate(context);

    if (signature !== null) {
      this.signature = signature;

      signatureValidates = true;
    }

    if (signatureValidates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion's signature.`);
    }

    return signatureValidates;
  }

  validateReference(context) {
    let referenceVerifies = false;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's reference...`);

    const reference = this.reference.validate(context);

    if (reference !== null) {
      const axiom = context.findAxiomByReference(reference);

      if (axiom !== null) {
        const satisfiable = axiom.isSatisfiable();

        if (satisfiable) {
          const signatureUnifies = this.unifySignature(context);

          if (signatureUnifies) {
            this.reference = reference;

            referenceVerifies = true;
          }
        } else {
          const axiomString = axiom.getString();

          context.debug(`The '${axiomString}' axiom is not satisfiable.`);
        }
      } else {
        const referencdString = reference.getString();

        context.debug(`There is no axiom for the '${referencdString}' reference.`);
      }
    }

    if (referenceVerifies) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion's reference.`);
    }

    return referenceVerifies;
  }

  unifySignature(context) {
    let signatureUnifies;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Unifying the '${signatureAssertionString}' signature assertion's signature...`);

    reconcile((context) => {
      const axiom = context.findAxiomByReference(this.reference);

      signatureUnifies = axiom.unifySignature(this.signature, context);
    }, context);

    if (signatureUnifies) {
      context.debug(`...unified the '${signatureAssertionString}' signature assertion's signature.`);
    }

    return signatureUnifies;
  }

  async unifyTopLevelAssertion(topLevelAssertion, context) {
    let topLevelAssertionUnifies;

    const topLevelAssertionString = topLevelAssertion.getString(),
          signatureAssertionString = this.getString();

    context.trace(`Unifying the '${topLevelAssertionString}' top-level assertion with the '${signatureAssertionString}' signature assertion...`);

    await reconcile(async (context) => {
      const axiom = context.findAxiomByReference(this.reference);

      axiom.unifySignature(this.signature, context);

      topLevelAssertionUnifies = await axiom.unifyTopLevelAssertion(topLevelAssertion, context);
    }, context);

    if (topLevelAssertionUnifies) {
      context.trace(`...unified the '${topLevelAssertionString}' top-level assertion with the '${signatureAssertionString}' signature assertion...`);
    }

    return topLevelAssertionUnifies;
  }

  async unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context) {
    let stepAndSubproofOrProofAssertionsUnify;

    await reconcile(async (context) => {
      const axiom = context.findAxiomByReference(this.reference);

      axiom.unifySignature(this.signature, context);

      stepAndSubproofOrProofAssertionsUnify = await axiom.unifyStepAndSubproofOrProofAssertions(step, subproofOrProofAssertions, context);
    }, context);

    return stepAndSubproofOrProofAssertionsUnify;
  }

  static name = "SignatureAssertion";

  static fromJSON(json, context) {
    let signatureAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              definedAssertionNode = instantiateSignatureAssertion(string, context),
              node = definedAssertionNode,  ///
              breakPoint = breakPointFromJSON(json),
              signature = signatureFromSignatureAssertionNode(definedAssertionNode, context),
              reference = referenceFromSignatureAssertionNode(definedAssertionNode, context);

        context = null;

        signatureAssertion = new SignatureAssertion(context, string, node, breakPoint, signature, reference);
      }, context);
    }

    return signatureAssertion;
  }

  static fromStep(step, context) {
    const statementNode = step.getStatementNode(),
          signatureAssertion = signatureAssertionFromStatementNode(statementNode, context);

    return signatureAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          signatureAssertion = signatureAssertionFromStatementNode(statementNode, context);

    return signatureAssertion;
  }
});

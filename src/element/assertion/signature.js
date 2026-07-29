"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { reconcile, instantiate } from "../../utilities/context";
import { instantiateSignatureAssertion } from "../../process/instantiate";
import { signatureFromSignatureAssertionNode, referenceFromSignatureAssertionNode, signatureAssertionFromStatementNode } from "../../utilities/element";

const { breakPointFromJSON } = breakPointUtilities;

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

  async validate(context) {
    let signatureAssertion = null;

    const signatureAssertionString = this.getString(); ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion...`);

    let validates = true;

    const assertion = this.findAssertion(context);

    if (assertion !== null) {
      const signatureAssertion = assertion; ///

      context.debug(`The '${signatureAssertionString}' signature assertion is already present.`);
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

    return reconcile((context) => {
      const axiom = context.findAxiomByReference(this.reference);

      signatureUnifies = axiom.unifySignature(this.signature, context);
    }, context);

    if (signatureUnifies) {
      context.debug(`...unified the '${signatureAssertionString}' signature assertion's signature.`);
    }

    return signatureUnifies;
  }

  async unifyClaim(claim, context) {
    let claimUnifies;

    const claimString = claim.getString(),
          signatureAssertionString = this.getString();

    context.trace(`Unifying the '${claimString}' claim with the '${signatureAssertionString}' signature assertion...`);

    await reconcile(async (context) => {
      const axiom = context.findAxiomByReference(this.reference);

      axiom.unifySignature(this.signature, context);

      claimUnifies = await axiom.unifyClaim(claim, context);
    }, context);

    if (claimUnifies) {
      context.trace(`...unified the '${claimString}' claim with the '${signatureAssertionString}' signature assertion...`);
    }

    return claimUnifies;
  }

  async unifyStepAndFactOrSubproofs(step, factOrSubproofs, context) {
    let stepAndFactOrSubproofsUnify;

    await reconcile(async (context) => {
      const axiom = context.findAxiomByReference(this.reference);

      axiom.unifySignature(this.signature, context);

      stepAndFactOrSubproofsUnify = await axiom.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context);
    }, context);

    return stepAndFactOrSubproofsUnify;
  }

  static name = "SignatureAssertion";

  static fromJSON(json, context) {
    const { name } = json;

    if (this.name !== name) {
      return;
    }

    return instantiate((context) => {
      const { string } = json,
            definedAssertionNode = instantiateSignatureAssertion(string, context),
            node = definedAssertionNode,  ///
            breakPoint = breakPointFromJSON(json),
            signature = signatureFromSignatureAssertionNode(definedAssertionNode, context),
            reference = referenceFromSignatureAssertionNode(definedAssertionNode, context);

      context = null;

      const signatureAssertion = new SignatureAssertion(context, string, node, breakPoint, signature, reference);

      return signatureAssertion;
    }, context);
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

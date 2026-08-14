"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { reconcile, instantiate } from "../../utilities/context";
import { instantiateSignatureAssertion } from "../../process/instantiate";
import { signatureFromSignatureAssertionNode, referenceFromSignatureAssertionNode, signatureAssertionFromStatementNode } from "../../utilities/element";
import {all, exists} from "../../utilities/continuation";

const { breakPointFromJSON } = breakPointUtilities;

export default define(class SignatureAssertion extends Assertion {
  constructor(context, string, node, breakPoint, terms, reference) {
    super(context, string, node, breakPoint);

    this.terms = terms;
    this.reference = reference;
  }

  getTerms() {
    return this.terms;
  }

  getReference() {
    return this.reference;
  }

  getSignatureAssertionNode() {
    const node = this.getNode(),
          signatureAssertionNode = node;  ///

    return signatureAssertionNode;
  }

  validate(state, context, continuation) {
    let validates;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const signatureAssertion = assertion; ///

      context.debug(`The '${signatureAssertionString}' signature assertion is already present.`);

      validates = continuation(signatureAssertion, context);
    } else {
      assertion = this; ///

      const validateTerms = this.validateTerms.bind(this),
            validateReference = this.validateReference.bind(this);

      validates = all([
        validateTerms,
        validateReference
      ], state, context, (state, context) => {
        let validates;

        context.addAssertion(assertion);

        const signatureAssertion = assertion; ///

        validates = continuation(signatureAssertion, context);

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion.`);
    }

    return validates;
  }

  validateTerms(context) {
    debugger

    let signatureValidates = false;

    const signatureAssertionString = this.getString(); ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's signature...`);

    const signature = this.signature.validate(state, context);

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

    const reference = this.reference.validate(state, context);

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
    debugger

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
    debugger

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
    debugger

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

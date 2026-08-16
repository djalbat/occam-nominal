"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { all, every } from "../../utilities/continuation";
import { reconcile, instantiate } from "../../utilities/context";
import { instantiateSignatureAssertion } from "../../process/instantiate";
import { termsFromSignatureAssertionNode, referenceFromSignatureAssertionNode, signatureAssertionFromStatementNode } from "../../utilities/element";
import continuation from "occam-languages/lib/utilities/continuation";

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

  validateTerm(term, terms, state, context, continuation) {
    let termValidates;

    const termString = term.getString(),
          signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's '${termString}' term...`);

    termValidates = term.validate(state, context, (term, context) => {
      let validates;

      terms.push(term);

      validates = continuation(terms, state, context);

      return validates;
    });

    if (termValidates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion's '${termString}' term.`);
    }

    return termValidates;
  }

  validateTerms(state, context, continuation) {
    let termsValidate;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's terms...`);

    const terms = [],
          validateTerm = this.validateTerm.bind(this);

    termsValidate = every(this.terms, validateTerm, terms, state, context, (terms, state, context) => {
      let termsValidate;

      termsValidate = continuation(state, context);

      if (termsValidate) {
        this.terms = terms;
      }

      return termsValidate;
    });

    if (termsValidate){
      context.debug(`...validated the '${signatureAssertionString}' signature assertion's terms.`);
    }

    return termsValidate
  }

  validateReference(state, context, continuation) {
    let referenceValidates;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, context) => {
      let validates = false;

      const axiom = context.findAxiomByReference(reference);

      if (axiom !== null) {
        const axiomSatisfiable = axiom.isSatisfiable();

        if (axiomSatisfiable) {
          validates = true;
        }
      }

      if (validates) {
        this.reference = reference;

        validates = continuation(state, context);
      }

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion's reference.`);
    }

    return referenceValidates;
  }

  unifyClaim(claim, context, continuation) {
    const claimString = claim.getString(),
          signatureAssertionString = this.getString();

    context.trace(`Unifying the '${claimString}' claim with the '${signatureAssertionString}' signature assertion...`);

    return reconcile((context) => {
      const axiom = context.findAxiomByReference(this.reference);

      return axiom.unifyTerms(this.terms, context, (termsUnify) => {
        if (!termsUnify) {
          const claimUnifies = false;

          return continuation(claimUnifies);
        }

        return axiom.unifyClaim(claim, context, (claimUnifies) => {
          if (claimUnifies) {
            context.debug(`...unified the '${claimString}' claim with the '${signatureAssertionString}' signature assertion.`);
          }

          if (claimUnifies) {
            context.commit();
          }

          return continuation(claimUnifies);
        });
      });
    }, context);
  }

  unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, continuation) {
    let stepAndFactOrSubproofsUnify = false;

    return reconcile((context) => {
      const axiom = context.findAxiomByReference(this.reference),
            signatureAssertion = this;  ///

      return axiom.unifySignatureAssertion(signatureAssertion, context, (signatureAssertionUnifies) => {
        if (!signatureAssertionUnifies) {
          return continuation(stepAndFactOrSubproofsUnify);
        }

        axiom.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, continuation);
      });
    }, context);
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
              terms = termsFromSignatureAssertionNode(definedAssertionNode, context),
              reference = referenceFromSignatureAssertionNode(definedAssertionNode, context);

        context = null;

        signatureAssertion = new SignatureAssertion(context, string, node, breakPoint, terms, reference);
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

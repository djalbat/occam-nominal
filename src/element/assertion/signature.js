"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { reconcile, instantiate } from "../../utilities/context";
import { instantiateSignatureAssertion } from "../../process/instantiate";
import { termsFromSignatureAssertionNode, linkFromSignatureAssertionNode, signatureAssertionFromStatementNode } from "../../utilities/element";
import {declare} from "../../utilities/state";

const { cut } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class SignatureAssertion extends Assertion {
  constructor(context, string, node, breakPoint, link, terms) {
    super(context, string, node, breakPoint);

    this.link = link;
    this.terms = terms;
  }

  getTerms() {
    return this.terms;
  }

  getLink() {
    return this.link;
  }

  getSignatureAssertionNode() {
    const node = this.getNode(),
          signatureAssertionNode = node;  ///

    return signatureAssertionNode;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const signatureAssertionString = this.getString(); ///

    context.trace(`Verifying the '${signatureAssertionString}' signature assertion...`);

    return declare((state) => {
      return this.validate(state, context, (signatureAssertion, context , back) => {
        context.debug(`...verified the '${signatureAssertionString}' signature assertion.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    forward = cut(forward, back); ///

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion...`);

    assertion = this; ///

    const validateTerms = this.validateTerms.bind(this),
          validateLink = this.validateLink.bind(this);

    validates = all([
      validateTerms,
      validateLink
    ], state, context, (state, context) => {
      let validates;

      context.addAssertion(assertion);

      const signatureAssertion = assertion; ///

      validates = continuation(signatureAssertion, context);

      return validates;
    });

    if (validates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion.`);
    }

    return validates;
  }

  validateTerm(term, terms, state, context, forward, back) {
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

  validateTerms(state, context, forward, back) {
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

  validateLink(state, context, forward, back) {
    let linkValidates;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's link...`);

    linkValidates = this.link.validate(state, context, (link, context) => {
      let validates = false;

      const axiom = context.findAxiomByLink(link);

      if (axiom !== null) {
        const axiomSatisfiable = axiom.isSatisfiable();

        if (axiomSatisfiable) {
          validates = true;
        }
      }

      if (validates) {
        this.link = link;

        validates = continuation(state, context);
      }

      return validates;
    });

    if (linkValidates) {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion's link.`);
    }

    return linkValidates;
  }

  unifyClaim(claim, context, forward, back) {
    const claimString = claim.getString(),
          signatureAssertionString = this.getString();

    context.trace(`Unifying the '${claimString}' claim with the '${signatureAssertionString}' signature assertion...`);

    return reconcile((context) => {
      const axiom = context.findAxiomByLink(this.link);

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

  unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, forward, back) {
    let stepAndFactOrSubproofsUnify = false;

    return reconcile((context) => {
      const axiom = context.findAxiomByLink(this.link),
            signatureAssertion = this;  ///

      return axiom.unifySignatureAssertion(signatureAssertion, context, (signatureAssertionUnifies) => {
        if (!signatureAssertionUnifies) {
          return continuation(stepAndFactOrSubproofsUnify);
        }

        axiom.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, forward, back);
      });
    }, context);
  }

  static name = "SignatureAssertion";

  static fromJSON(json, context) {
    let signatureAssertion;

    instantiate((context) => {
      const { string } = json,
            definedAssertionNode = instantiateSignatureAssertion(string, context),
            node = definedAssertionNode,  ///
            breakPoint = null,
            terms = termsFromSignatureAssertionNode(definedAssertionNode, context),
            link = linkFromSignatureAssertionNode(definedAssertionNode, context);

      context = null;

      signatureAssertion = new SignatureAssertion(context, string, node, breakPoint, terms, link);
    });

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

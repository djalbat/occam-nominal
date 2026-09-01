"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import {attempt, reconcile} from "../../utilities/context";
import { signatureAssertionFromStatementNode } from "../../utilities/element";

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

  apply = unbreakable(function (step, factOrSubproofs, context, forward, back) {
    forward = cut(forward, back); ///

    let stepAndFactOrSubproofsUnify = false;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Applying the '${signatureAssertionString}' signature assertion...`);

    return reconcile((context) => {
      const axiom = context.findAxiomByLink(this.link),
            signatureAssertion = this;  ///

      return axiom.unifySignatureAssertion(signatureAssertion, context, (signatureAssertionUnifies) => {
        if (!signatureAssertionUnifies) {
          return continuation(stepAndFactOrSubproofsUnify);
        }

        context.debug(`applied the '${signatureAssertionString}' signature assertion.`);

        axiom.unifyStepAndFactOrSubproofs(step, factOrSubproofs, context, forward, back);
      });
    }, context);
  });

  validate(state, context, forward, back) {
    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateLink = this.validateLink.bind(this),
              validateTerms = this.validateTerms.bind(this);

        return all([
          validateLink,
          validateTerms
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      context.debug(`...validated the '${signatureAssertionString}' signature assertion.`);

      return forward(context, back);
    }, back);
  }

  validateLink(state, context, forward, back) {
    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's link...`);

    return this.link.validate(state, context, (link, context, back) => {
      this.link = link;

      context.debug(`...validated the '${signatureAssertionString}' signature assertion's link.`);

      return forward(state, context, back);
    }, back);
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
    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's terms...`);

    const terms = [];

    return every(this.terms, validateTerm, terms, state, context, (terms, state, context) => {
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

  static name = "SignatureAssertion";

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

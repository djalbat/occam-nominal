"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiatePropertyAssertion } from "../../process/instantiate";
import { isolate, reconcile, instantiate } from "../../utilities/context";
import { signatureAssertionFromStatementNode } from "../../utilities/element";

const { unbreakable } = breakPointUtilities,
      { cut, all, every } = continuationUtilities;

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

  apply = unbreakable(function (step, factOrSubproofs, context, forward, back) {
    forward = cut(forward, back); ///

    const signatureAssertionString = this.getString();  ///

    context.trace(`Applying the '${signatureAssertionString}' signature assertion...`);

    return isolate((step, factOrSubproofs, context, forward, back) => {
      return reconcile((context) => {
        const axiom = context.findAxiomByLink(this.link),
              signatureAssertion = this;  ///

        return axiom.unifySignatureAssertion(signatureAssertion, context, (context, back) => {
          axiom.apply(step, factOrSubproofs, context, (context, back) => {
            return forward(back);
          }, back);
        }, back);
      }, context);
    }, step, factOrSubproofs, context, (step, factOrSubproofs, context, back) => {
      context.debug(`applied the '${signatureAssertionString}' signature assertion.`);

      return forward(context, back);
    }, back);
  });

  validate(state, context, forward, back) {
    let assertion;

    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion...`);

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const signatureAssertion = assertion; ///

      context.debug(`The '${signatureAssertionString}' signature assertion is already present.`);

      return forward(signatureAssertion, context, back);
    }

    assertion = this; ///

    const validateLink = this.validateLink.bind(this),
          validateTerms = this.validateTerms.bind(this);

    return all([
      validateLink,
      validateTerms
    ], state, context, (state, context, back) => {
      context.addAssertion(assertion);

      const signatureAssertion = assertion; ///

      context.debug(`...validated the '${signatureAssertionString}' signature assertion.`);

      return forward(signatureAssertion, context, back);
    }, back);
  }

  validateTerm(term, terms, state, context, forward, back) {
    const termString = term.getString(),
          signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's '${termString}' term...`);

    return term.validate(state, context, (term, context, back) => {
      terms.push(term);

      context.debug(`...validated the '${signatureAssertionString}' signature assertion's '${termString}' term.`);

      return forward(terms, state, context, back);
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

  validateTerms(state, context, forward, back) {
    const signatureAssertionString = this.getString();  ///

    context.trace(`Validating the '${signatureAssertionString}' signature assertion's terms...`);

    const terms = [];

    return every(this.terms, (term, terms, state, context, forward, back) => {
      return this.validateTerm(term, terms, state, context, forward, back);
    }, terms, state, context, (terms, state, context, back) => {
      this.terms = terms;

      context.debug(`...validated the '${signatureAssertionString}' signature assertion's terms.`);

      return forward(state, context, back);
    }, back);
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

  toJSON() {
    let json;

    const name = this.getName(),
          string = this.getString();

    json = {
      name,
      string
    };

    return json;
  }

  static name = "SignatureAssertion";

  static fromJSON(json, context) {
    let signatureAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              signatureAssertionNode = instantiatePropertyAssertion(string, context),
              node = signatureAssertionNode,  ///
              breakPoint = null,
              link = linkFromSignatureAssertionNode(signatureAssertionNode, context),
              terms = termsFromSignatureAssertionNode(signatureAssertionNode, context);

        context = null;

        signatureAssertion = new SignatureAssertion(context, string, node, breakPoint, link, terms);
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

function linkFromSignatureAssertionNode(signatureAssertionNode, context) {
  const linkNode = signatureAssertionNode.getLinkNode(),
        link = context.findLinkByLinkNode(linkNode);

  return link;
}

function termsFromSignatureAssertionNode(signatureAssertionNode, context) {
  const termNodes = signatureAssertionNode.getTermNodes(),
        terms = termNodes.map((termNode) => {
          const term = context.findTermByTermNode(termNode);

          return term;
        });

  return terms;
}

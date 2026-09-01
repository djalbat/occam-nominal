"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { termsStringFromTerms } from "../utilities/string";
import { instantiateSignature } from "../process/instantiate";
import { isolate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { unbreakable } = breakPointUtilities,
      { cut, all, every } = continuationUtilities;

export default define(class Signature extends Element {
  constructor(context, string, node, breakPoint, terms) {
    super(context, string, node, breakPoint);

    this.terms = terms;
  }

  getTerms() {
    return this.terms;
  }

  getSignatureNode() {
    const node = this.getNode(),
          signatureNode = node; ///

    return signatureNode;
  }

  getLength() {
    const termsLength = this.terms.length,
          length = termsLength; ///

    return length;
  }

  getTerm(index) {
    const term = this.terms[index];

    return term;
  }

  isEqualTo(signature) {
    const signatureNode = signature.getNode(),
          signatureNodeMatches = this.matchSignatureNode(signatureNode),
          equalTo = signatureNodeMatches;  ///

    return equalTo;
  }

  matchSignatureNode(signatureNode) {
    const node = signatureNode, ///
          nodeMatches = this.matchNode(node),
          signatureNodeMatches = nodeMatches; ///

    return signatureNodeMatches;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const signatureString = this.getString(); ///

    context.trace(`Verifying the '${signatureString}' signature...`);

    return declare((state) => {
      return this.validate(state, context, (signature, context , back) => {
        context.debug(`...verified the '${signatureString}' signature.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    const signatureString = this.getString(); ////

    context.trace(`Validating the '${signatureString}' signature...`);

    return isolate((state, context, forward, back) => {
      context = this.getContext();

      return attempt((context) => {
        const validateTerms = this.validateTerms.bind(this);

        return all([
          validateTerms
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      const signature = this; ///

      context.debug(`...validated the '${signatureString}' signature.`);

      return forward(signature, context, back);
    }, back);
  }

  validateTerm(term, terms, state, context, forward, back) {
    const termString = term.getString(),
          signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature's '${termString}' term...`);

    return term.validate(state, context, (term, context, back) => {
      terms.push(term);

      context.debug(`...validated the '${signatureString}' signature's '${termString}' term.`);

      return forward(terms, state, context, back);
    }, back);
  }

  validateTerms(state, context, forward, back) {
    const signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature's terms...`);

    const terms = [];

    return every(this.terms, (term, terms, state, context, forward, back) => {
      return this.validateTerm(term, terms, state, context, forward, back);
    }, terms, state, context, (terms, state, context, back) => {
      this.terms = terms;

      context.debug(`...validated the '${signatureString}' signature's terms.`);

      return forward(state, context, back);
    }, back);
  }

  unifyTerms(terms, context, forward, back) {
    const quoted = true,
          termsString = termsStringFromTerms(terms, quoted),
          signatureString = this.getString(); ///

    context.trace(`Unifying the ${termsString} terms with the '${signatureString}' signature...`);

    const generalTerms = this.terms,  ///
          specificTerms = terms,  //
          generalTermsLength = generalTerms.length,
          specificTermsLength = specificTerms.length;

    if (generalTermsLength !== specificTermsLength) {
      return back();
    }

    return isolate((terms, context, forward, back) => {
      return reconcile((context) => {
        const generalContext = this.getContext(), ///
              specificContext = context;  ///

        return every(generalTerms, (generalTerm, generalContext, specificContext, forward, back, index) => {
          const specificTerm = specificTerms[index];

          return generalTerm.unifyTerm(specificTerm, generalContext, specificContext, forward, back);
        }, generalContext, specificContext, (generalContext, specificContext, back) => {
          context = specificContext;  ///

          context.commit();

          return forward(back);
        }, back);
      }, context);
    }, terms, context, (terms, context, back) => {
      context.debug(`...unified the ${termsString} terms with the '${signatureString}' signature.`);

      return forward(context, back);
    }, back);
  }

  toJSON() {
    let json;

    const context = this.getContext();

    serialise((context) => {
      const string = this.getString();

      json = {
        context,
        string
      };
    }, context);

    return json;
  }

  static name = "Signature";

  static fromJSON(json, context) {
    let signature;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              signatureNode = instantiateSignature(string, context),
              node = signatureNode,  ///
              breakPoint = null,
              terms = termsFromSignatureNode(signatureNode, context);

        signature = new Signature(context, string, node, breakPoint, terms);
      }, json, context);
    }, context);

    return signature;
  }
});

function termsFromSignatureNode(signatureNode, context) {
  const termNodes = signatureNode.getTermNodes(),
        terms = termNodes.map((termNode) => {
          const term = context.findTermByTermNode(termNode);

          return term;
        });

  return terms;
}

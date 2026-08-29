"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { termsStringFromTerms } from "../utilities/string";
import { instantiateSignature } from "../process/instantiate";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { unbreakable } = breakPointUtilities,
      { cut, all, every, isolate } = continuationUtilities;

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

    let verifies = false;

    const signatureString = this.getString(); ///

    context.trace(`Verifying the '${signatureString}' signature...`);

    declare((state) => {
      const validates = this.validate(state, context, (signature, context) => true);  ///

      if (validates) {
        verifies = true;
      }
    });

    if (verifies) {
      context.debug(`...verified the '${signatureString}' signature.`);
    }

    return continuation(verifies, context);
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
    let termValidates;

    const termString = term.getString(),
          signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature's '${termString}' term...`);

    termValidates = term.validate(state, context, (term, context) => {
      let validates;

      terms.push(term);

      validates = continuation(terms, state, context);

      return validates;
    });

    if (termValidates) {
      context.debug(`...validated the '${signatureString}' signature's '${termString}' term.`);
    }

    return termValidates;
  }

  validateTerms(state, context, forward, back) {
    let termsValidate;

    const signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature's terms...`);

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
      context.debug(`...validated the '${signatureString}' signature's terms.`);
    }

    return termsValidate
  }

  unifyTerms(terms, context, forward, back) {
    let termsUnify = false;

    const quoted = true,
          termsString = termsStringFromTerms(terms, quoted),
          signatureString = this.getString();

    context.trace(`Unifying the ${termsString} terms with the '${signatureString}' signature...`);

    const generalTerms = this.terms,  ///
          specificTerms = terms,  //
          generalTermsLength = generalTerms.length,
          specificTermsLength = specificTerms.length;

    if (generalTermsLength !== specificTermsLength) {
      return continuation(termsUnify);
    }

    const specificContext = context; ///

    context = this.getContext();

    const generalContext = context; ///

    let index = -1;

    return reconcile((specificContext) => {
      return every(generalTerms, (generalTerm, forward, back) => {
        index++;

        const specificTerm = specificTerms[index];

        generalTerm.unifyTerm(specificTerm, generalContext, specificContext, forward, back);
      }, (termsUnify) => {
        if (termsUnify) {
          specificContext.commit();
        }

        if (termsUnify) {
          context.debug(`...unified the ${termsString} terms with the '${signatureString}' signature.`);
        }

        return continuation(termsUnify);
      });
    }, specificContext);
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

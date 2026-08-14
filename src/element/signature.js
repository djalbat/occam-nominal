"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { all, every } from "../utilities/continuation";
import { instantiateSignature } from "../process/instantiate";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { match } = arrayUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  verify(context, continuation) {
    let verifies = false;

    const signatureString = this.getString(); ///

    context.trace(`Verifying the '${signatureString}' signature...`);

    declare((state) => {
      const validates = this.validate(state, context, (conclusion, context) => true);

      if (validates) {
        verifies = true;
      }
    });

    if (verifies) {
      context.debug(`...verified the '${signatureString}' signature.`);
    }

    return continuation(verifies, context);
  }

  validate(state, context, continuation) {
    let validates;

    const specificContext = context,  ///
          signatureString = this.getString();

    context.trace(`Validating the '${signatureString}' signature...`);

    const signature = this;  ///

    attempt((context) => {
      const validateTerms = this.validateTerms.bind(this);

      validates = all([
        validateTerms
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        context = specificContext;  ///

        validates = continuation(signature, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${signatureString}' signature.`);
    }

    return validates;
  }

  validateTerm(term, terms, state, context, continuation) {
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

  validateTerms(state, context, continuation) {
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

  unifyTerms(terms, context, continuation) {
    let termsUnify;

    debugger

    const generalSignature = this,  ///
          specificSignature = signature,  ///
          generalSignatureString = generalSignature.getString(),
          specificSignatureString = specificSignature.getString();

    context.trace(`Unifying the '${specificSignatureString}' signature with the '${generalSignatureString}' signature...`);

    const generalSignatureTerms = generalSignature.getTerms(),
          specificSignatureTerms = specificSignature.getTerms(),
          generalSignatureContext = generalSignature.getContext(),
          specificSignatureContext = specificSignature.getContext(),
          generalTerms = generalSignatureTerms,  ///
          specificTerms = specificSignatureTerms, ///
          generalContext = generalSignatureContext, ///
          specificContext = specificSignatureContext;  ///

    debugger

    termsUnify = reconcile((specificContext) => {
      match(generalTerms, specificTerms, (generalTerm, specificTerm) => {
        let termUnifies;

        termUnifies = generalTerm.unifyTerm(specificTerm, generalContext, specificContext);

        if (termUnifies) {
          return true;
        }
      });

      if (termsUnify) {
        specificContext.commit(context);
      }
    }, specificContext);

    if (termsUnify) {
      context.debug(`...unified the '${specificSignatureString}' signature with the '${generalSignatureString}' signature.`);
    }

    return termsUnify;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }

  static name = "Signature";

  static fromJSON(json, context) {
    let signature;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              signatureNode = instantiateSignature(string, context),
              node = signatureNode,  ///
              breakPoint = breakPointFromJSON(json),
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

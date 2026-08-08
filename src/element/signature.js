"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateSignature } from "../process/instantiate";
import { signatureFromSignatureNode } from "../utilities/element";
import { ablate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";
import {all} from "../utilities/continuation";

const { match } = arrayUtilities,
      { asynchronousEvery } = continuationUtilities,
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

  findSignature(context) {
    const signatureNode = this.getSignatureNode(),
          signature = context.findSignatureBySignatureNode(signatureNode);

    return signature;
  }

  verify(context) {
    let verifies = false;

    const signatureString = this.getString();  ///

    context.trace(`Verifying the '${signatureString}' signature...`);

    debugger

    const termsValidate = this.validateTerms(context);

    if (termsValidate !== null) {
      verifies = true;
    }

    if (verifies) {
      this.commit(context);
    }

    if (verifies) {
      context.debug(`...validated the '${signatureString}' signature.`);
    }

    return verifies;
  }

  validate(state, context, continuation) {
    let validates;

    const specificContext = context,  ///
          signatureString = this.getString(); ///

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

  validateTerms(context) {
    let termsValidate;

    const signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature's terms...`);

    const terms = [];

    termsValidate = asynchronousEvery(this.terms, (term) => {
      term = term.validate(state, context, (term, context) => { ///
        const validatesForwards = true;

        return validatesForwards;
      });

      if (term !== null) {
        terms.push(term);

        return true;
      }
    });

    if (termsValidate) {
      this.terms = terms;
    }

    if (termsValidate){
      context.debug(`...validated the '${signatureString}' signature's terms.`);
    }

    return termsValidate
  }

  unifySignature(signature, context) {
    let signatureUnifies;

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

    signatureUnifies = reconcile((specificContext) => {
      match(generalTerms, specificTerms, (generalTerm, specificTerm) => {
        let termUnifies;

        termUnifies = generalTerm.unifyTerm(specificTerm, generalContext, specificContext);

        if (termUnifies) {
          return true;
        }
      });

      if (signatureUnifies) {
        specificContext.commit(context);
      }
    }, specificContext);

    if (signatureUnifies) {
      context.debug(`...unified the '${specificSignatureString}' signature with the '${generalSignatureString}' signature.`);
    }

    return signatureUnifies;
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

  static fromSignatureString(signatureString, context) {
    let signature;

    ablate((context) => {
      instantiate((context) => {
        const string = signatureString,  ///
              signatureNode = instantiateSignature(string, context);

        signature = signatureFromSignatureNode(signatureNode, context);
      }, context);
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

"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, asynchronousUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateSignature } from "../process/instantiate";
import { signatureFromSignatureNode } from "../utilities/element";
import { ablate, attempt, reconcile, serialise, unserialise, instantiate } from "../utilities/context";

const { match } = arrayUtilities,
      { asyncEvery } = asynchronousUtilities,
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

  findValidSignature(context) {
    const signatureNode = this.getSignatureNode(),
          signature = context.findSignatureBySignatureNode(signatureNode),
          validSignature = signature;  ///

    return validSignature;
  }

  async verify(context) {
    let verifies = false;

    const signatureString = this.getString();  ///

    context.trace(`Verifying the '${signatureString}' signature...`);

    await attempt(async (context) => {
      const termsValidate = await this.validateTerms(context);

      if (termsValidate !== null) {
        verifies = true;
      }

      if (verifies) {
        this.commit(context);
      }
    }, context);

    if (verifies) {
      context.debug(`...validated the '${signatureString}' signature.`);
    }

    return verifies;
  }

  async validate(context) {
    let signature = null;

    const signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature...`);

    let validates = false;

    const validSignature = this.findValidSignature(context);

    if (validSignature !== null) {
      validates = true;

      signature = validSignature;  ///

      context.debug(`...the '${signatureString}' signature is already valid.`);
    } else {
      const temporaryContext = context; ///

      context = this.getContext();

      await attempt(async (context) => {
        const termsValidate = await this.validateTerms(context);

        if (termsValidate !== null) {
          validates = true;
        }

        if (validates) {
          this.commit(context);
        }
      }, context);

      context = temporaryContext; ///

      if (validates) {
        signature = this; ///

        context.addSignature(signature);
      }
    }

    if (validates) {
      context.debug(`...validated the '${signatureString}' signature.`);
    }

    return signature;
  }

  async validateTerms(context) {
    let termsValidate;

    const signatureString = this.getString();  ///

    context.trace(`Validating the '${signatureString}' signature's terms...`);

    const terms = [];

    termsValidate = await asyncEvery(this.terms, async (term) => {
      term = await term.validate(context, async (term, context) => { ///
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

    const generalSignature = this,
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

    reconcile((specificContext) => {
      signatureUnifies = match(generalTerms, specificTerms, (generalTerm, specificTerm) => {
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

  static name = "Signature";

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

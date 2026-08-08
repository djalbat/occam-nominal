"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

const { push, extract } = arrayUtilities;

export default class CladicContext extends Context {
  constructor(context, terms, assertions, metavariables) {
    super(context);

    this.terms = terms;
    this.assertions = assertions;
    this.metavariables = metavariables;
  }

  getTerms(terms = []) {
    const context = this.getContext();

    push(terms, this.terms);

    context.getTerms(terms);

    return terms;
  }

  getAssertions(assertions = []) {
    const context = this.getContext();

    push(assertions, this.assertions);

    context.getAssertions(assertions);

    return assertions;
  }

  getMetavariables(metavariables = []) {
    const context = this.getContext();

    push(metavariables, this.metavariables);

    context.getMetavariables(metavariables);

    return metavariables;
  }

  addTerm(term) {
    const context = this, ///
          termString = term.getString();

    context.trace(`Adding the '${termString}' term to the cladic context...`);

    const termA = term; ///

    extract(this.terms, (term) => {
      const termB = term, ///
            termAEqualToTermB = termA.isEqualTo(termB);

      if (termAEqualToTermB) {
        const termString = term.getString();

        context.trace(`Removed the existing '${termString}' term from the cladic context...`);

        return true;
      }
    });

    this.terms.push(term);

    context.debug(`...added the '${termString}' term to the cladic context.`);
  }

  addAssertion(assertion) {
    const context = this, ///
          assertionString = assertion.getString();

    context.trace(`Adding the '${assertionString}' assertion to the cladic context...`);

    const assertionA = assertion; ///

    extract(this.assertions, (assertion) => {
      const assertionB = assertion, ///
            assertionAEqualToAssertionB = assertionA.isEqualTo(assertionB);

      if (assertionAEqualToAssertionB) {
        const assertionString = assertion.getString();

        context.trace(`Removed the existing '${assertionString}' assertion from the cladic context...`);

        return true;
      }
    });

    this.assertions.push(assertion);

    context.debug(`...added the '${assertionString}' assertion to the cladic context.`);
  }

  addMetavariable(metavariable) {
    const context = this, ///
          metavariableString = metavariable.getString();

    context.trace(`Adding the '${metavariableString}' metavariable to the cladic context...`);

    const metavariableA = metavariable; ///

    extract(this.metavariables, (metavariable) => {
      const metavariableB = metavariable, ///
            metavariableAEqualToMetavariableB = metavariableA.isEqualTo(metavariableB);

      if (metavariableAEqualToMetavariableB) {
        const metavariableString = metavariable.getString();

        context.trace(`Removed the existing '${metavariableString}' metavariable from the cladic context...`);

        return true;
      }
    });

    this.metavariables.push(metavariable);

    context.debug(`...added the '${metavariableString}' metavariable to the cladic context.`);
  }

  addTerms(terms) {
    terms.forEach((term) => {
      this.addTerm(term);
    });
  }

  addAssertions(assertions) {
    assertions.forEach((assertion) => {
      this.addAssertion(assertion);
    });
  }

  addMetavariables(metavariables) {
    metavariables.forEach((metavariable) => {
      this.addMetavariable(metavariable);
    });
  }

  findTermByTermNode(termNode) {
    const terms = this.getTerms(),
          term = terms.find((term) => {
            const termNodeMatches = term.matchTermNode(termNode);

            if (termNodeMatches) {
              return true;
            }
          }) || null;

    return term;
  }

  findAssertionByAssertionNode(assertionNode) {
    const assertions = this.getAssertions(),
          assertion = assertions.find((assertion) => {
            const assertionNodeMatches = assertion.matchAssertionNode(assertionNode);

            if (assertionNodeMatches) {
              return true;
            }
          }) || null;

    return assertion;
  }

  findMetavariableByMetavariableNode(metavariableNode) {
    const metavariables = this.getMetavariables(),
          metavariable = metavariables.find((metavariable) => {
            const metavariableNodeMatches = metavariable.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return metavariable;
  }

  isTermPresentByTermNode(termNode) {
    const term = this.findTermByTermNode(termNode),
          termPresent = (term !== null);

    return termPresent;
  }

  isAssertionPresentByAssertionNode(assertionNode) {
    const assertion = this.findAssertionByAssertionNode(assertionNode),
          assertionPresent = (assertion !== null);

    return assertionPresent;
  }

  isMetavariablePresentByMetavariableNode(metavariableNode) {
    const metavariablen = this.findMetavariableByMetavariableNode(metavariableNode),
          metavariablenPresent = (metavariablen !== null);

    return metavariablenPresent;
  }

  merge(context) {
    context.debug(`Merging the cladic context`);

    context.addTerms(this.terms);

    context.addAssertions(this.assertions);

    context.addMetavariables(this.metavariables);
  }

  static fromNothing(context) {
    const terms = [],
          assertions = [],
          metavariables = [],
          cladicContext = new CladicContext(context, terms, assertions ,metavariables);

    return cladicContext;
  }
}

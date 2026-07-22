"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { compressTerms, compressAssertions, compressMetavariables } from "../utilities/compression";

const { push } = arrayUtilities;

export default class BranchingContext extends Context {
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

    compressTerms(terms);

    return terms;
  }

  getAssertions(assertions = []) {
    const context = this.getContext();

    push(assertions, this.assertions);

    context.getAssertions(assertions);

    compressAssertions(assertions);

    return assertions;
  }

  getMetavariables(metavariables = []) {
    const context = this.getContext();

    push(metavariables, this.metavariables);

    context.getMetavariables(metavariables);

    compressMetavariables(metavariables);

    return metavariables;
  }

  addTerm(term) {
    const context = this, ///
          termString = term.getString();

    context.trace(`Adding the '${termString}' term to the branching context...`);

    this.terms.push(term);

    context.debug(`...added the '${termString}' term to the branching context.`);
  }

  addAssertion(assertion) {
    const context = this, ///
          assertionString = assertion.getString();

    context.trace(`Adding the '${assertionString}' assertion to the branching context...`);

    this.assertions.push(assertion);

    context.debug(`...added the '${assertionString}' assertion to the branching context.`);
  }

  addMetavariable(metavariable) {
    const context = this, ///
          metavariableString = metavariable.getString();

    context.trace(`Adding the '${metavariableString}' metavariable to the branching context...`);

    this.metavariables.push(metavariable);

    context.debug(`...added the '${metavariableString}' metavariable to the branching context.`);
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

  commit() {
    const context = this.getContext();

    context.addTerms(this.terms);

    context.addAssertions(this.assertions);

    context.addMetavariables(this.metavariables);
  }

  static fromNothing(context) {
    const terms = [],
          assertions = [],
          metavariables = [],
          branchingContext = new BranchingContext(context, terms, assertions ,metavariables);

    return branchingContext;
  }
}

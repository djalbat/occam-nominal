"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

const { first, last } = arrayUtilities;

export default class SynopticContext extends Context {
  constructor(context, contexts) {
    super(context);

    this.contexts = contexts;
  };

  getContexts() {
    return this.contexts;
  }

  getOtherContext() {
    const lastContext = last(this.contexts),
          otherContext = lastContext; ///

    return otherContext;
  }

  getDerivedSubstitutions(derivedSubstitutions = []) {
    const otherContext = this.getOtherContext();

    otherContext.getDerivedSubstitutions(derivedSubstitutions);

    return derivedSubstitutions;
  }

  findDerivedSubstitutionByVariableNode(variableNode) {
    const otherContext = this.getOtherContext(),
          derivedSubstitution = otherContext.findDerivedSubstitutionByVariableNode(variableNode);

    return derivedSubstitution;
  }

  findDerivedSubstitutionByMetavariableNode(metavariableNode) {
    const otherContext = this.getOtherContext(),
          derivedSubstitution = otherContext.findDerivedSubstitutionByMetavariableNode(metavariableNode);

    return derivedSubstitution;
  }

  findSimpleDerivedSubstitutionByMetavariableNode(metavariableNode) {
    const otherContext = this.getOtherContext(),
          simpleDerivedSubstitution = otherContext.findSimpleDerivedSubstitutionByMetavariableNode(metavariableNode);

    return simpleDerivedSubstitution;
  }

  findDerivedSubstitutionByMetavariableNodeAndSubstitution(metavariableNode, substitution) {
    const otherContext = this.getOtherContext(),
          derivedSubstitution = otherContext.findDerivedSubstitutionByMetavariableNodeAndSubstitution(metavariableNode, substitution);

    return derivedSubstitution;
  }

  isDerivedSubstitutionPresentByMetavariableNodeAndSubstitution(metavariableNode, substitution) {
    const otherContext = this.getOtherContext(),
          derivedSubstitutionPresent = otherContext.isDerivedSubstitutionPresentByMetavariableNodeAndSubstitution(metavariableNode, substitution);

    return derivedSubstitutionPresent;
  }

  addDerivedSubstitution(derivedSubstitution) {
    const otherContext = this.getOtherContext();

    otherContext.addDerivedSubstitution(derivedSubstitution);
  }

  static fromContexts(contexts) {
    const firstContext = first(contexts),
          context = firstContext, ///
          synopticContext = new SynopticContext(context, contexts);

    return synopticContext;
  }
}

"use strict";

import { arrayUtilities } from "necessary";

import { serialises } from "../utilities/context";
import { primitiveUtilities } from "occam-furtle";
import { breakPointToBreakPointJSON } from "../utilities/breakPoint";

const { first, second } = arrayUtilities,
      { primitiveFromNode } =primitiveUtilities;

class Element {
  constructor(contexts, string, node, breakPoint) {
    this.contexts = contexts;
    this.string = string;
    this.node = node;
    this.breakPoint = breakPoint;
  }

  getContexts() {
    return this.contexts;
  }

  getString() {
    return this.string;
  }

  getNode() {
    return this.node;
  }

  getBreakPoint() {
    return this.breakPoint;
  }

  setContexts(contexts) {
    this.contexts = contexts;
  }

  setString(string) {
    this.string = string;
  }

  setNode(node) {
    this.node = node;
  }

  setLineIndex(breakPoint) {
    this.breakPoint = breakPoint;
  }

  async break(context) {
    this.breakPoint = await context.break(this.node, this.breakPoint);
  }

  matchNode(node) { return this.node.match(node); }
}

export default class Substitution extends Element {
  getName() {
    const { name } = this.constructor;

    return name;
  }

  getPrimitive(context) {
    const replacementNode = this.getReplacementNode(),
          node = replacementNode, ///
          primitive = primitiveFromNode(node, context);

    return primitive;
  }

  getSubstitutionNode() {
    const node = this.getNode(),
          substitutionNode = node; ///

    return substitutionNode;
  }

  getGeneralContext() {
    const contexts = this.getContexts(),
          firstContext = first(contexts),
          generalContext = firstContext;  ///

    return generalContext;
  }

  getSpecificContext() {
    const contexts = this.getContexts(),
          secondContext = second(contexts),
          specificContext = secondContext;  ///

    return specificContext;
  }

  setGeneralContext(generalContext) {
    const specificContext = this.getSpecificContext(),
          contexts = [
            generalContext,
            specificContext
          ];

    this.setContexts(contexts);
  }

  setSpecificContext(specificContext) {
    const generalContext = this.getGeneralContext(),
          contexts = [
            generalContext,
            specificContext
          ];

    this.setContexts(contexts);
  }

  isEqualTo(substitution) {
    const substitutionNode = substitution.getNode(),
          substitutionNodeMatches = this.matchSubstitutionNode(substitutionNode),
          equalTo = substitutionNodeMatches;  ///

    return equalTo;
  }

  isComplex() {
    const simple = this.isSimple(),
          complex = !simple;

    return complex;
  }

  isNonTrivial() {
    const trivial = this.isTrivial(),
          nonTrivlal = !trivial;

    return nonTrivlal;
  }

  getVariable() {
    const variable = null;

    return variable;
  }

  getMetavariable() {
    const metavariable = null;

    return metavariable;
  }

  getSubstitution() {
    const substitution = null;

    return substitution;
  }

  getVariableNode() {
    const variableNode = null;

    return variableNode;
  }

  getMetavariableNode() {
    const metavariableNode = null;

    return metavariableNode;
  }

  getReplacementTerm() {
    const replacementTerm = null;

    return replacementTerm;
  }

  getReplacementFrame() {
    const replacementFrame = null;

    return replacementFrame;
  }

  getReplacementStatement() {
    const replacementStatement = null;

    return replacementStatement;
  }

  getReplacementReference() {
    const replacementReference = null;

    return replacementReference;
  }

  isSimple() {
    const simple = true;

    return simple;
  }

  matchVariableNode(variableNode) {
    const variableNodeMatches = false;

    return variableNodeMatches;
  }

  matchMetavariableNode(metavariableNode) {
    const metavariableNodeMatches = false;

    return metavariableNodeMatches;
  }

  matchSubstitutionNode(substitutionNode) {
    const node = substitutionNode, ///
          nodeMatches = this.matchNode(node),
          substitutionNodeMatches = nodeMatches; ///

    return substitutionNodeMatches;
  }

  findValidSubstitution(context) {
    const substitutionNode = this.getSubstitutionNode(),
          substitution = context.findSubstitutionBySubstitutionNode(substitutionNode),
          validSubstitution = substitution;  ///

    return validSubstitution;
  }

  commit(generalContext, specificContext) {
    const contexts = [
      generalContext,
      specificContext
    ];

    this.setContexts(contexts);
  }

  toJSON() {
    const contexts = this.getContexts();

    return serialises((...contexts) => {
      const name = this.getName(),
            string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        name,
        contexts,
        string,
        breakPoint
      };

      return json;
    }, ...contexts);
  }
}

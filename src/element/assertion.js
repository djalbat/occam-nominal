"use strict";

import { Element } from "occam-languages";

import { breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default class Assertion extends Element {
  getName() {
    const { name } = this.constructor;

    return name;
  }

  getAssertionNode() {
    const node = this.getNode(),
          assertionNode = node; ///

    return assertionNode;
  }

  matchAssertionNode(assertionNode) {
    const node = assertionNode, ///
          nodeMatches = this.matchNode(node),
          assertionNodeMatches = nodeMatches; ///

    return assertionNodeMatches;
  }

  isEqualTo(assertion) {
    const assertionNode = assertion.getNode(),
          assertionNodeMatches = this.matchAssertionNode(assertionNode),
          equalTo = assertionNodeMatches;  ///

    return equalTo;
  }

  findValidAssertion(context) {
    const assertionNode = this.getAssertionNode(),
          assertion = context.findAssertionByAssertionNode(assertionNode),
          validAssertion = assertion;  ///

    return validAssertion;
  }

  toJSON() {
    const name = this.getName(),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      name,
      string,
      breakPoint
    };

    return json;
  }
}

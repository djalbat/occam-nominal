"use strict";

import { Element } from "occam-languages";

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

  findAssertion(context) {
    const assertionNode = this.getAssertionNode(),
          assertion = context.findAssertionByAssertionNode(assertionNode);

    return assertion;
  }
}

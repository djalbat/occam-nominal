"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { AXIOM_RULE_NAME, LEMMA_RULE_NAME, THEOREM_RULE_NAME, CONJECTURE_RULE_NAME, HYPOTHESIS_RULE_NAME } from "../ruleNames";

export default class SectionNode extends NonTerminalNode {
  getAxiomNode() {
    const ruleName = AXIOM_RULE_NAME,
          axiomNode = this.getNodeByRuleName(ruleName);

    return axiomNode;
  }

  getLemmaNode() {
    const ruleName = LEMMA_RULE_NAME,
          lemmaNode = this.getNodeByRuleName(ruleName);

    return lemmaNode;
  }

  getTheoremNode() {
    const ruleName = THEOREM_RULE_NAME,
          theoremNode = this.getNodeByRuleName(ruleName);

    return theoremNode;
  }

  getConjectureNode() {
    const ruleName = CONJECTURE_RULE_NAME,
          conjectureNode = this.getNodeByRuleName(ruleName);

    return conjectureNode;
  }

  getHypothesisNodes() {
    const ruleName = HYPOTHESIS_RULE_NAME,
          hypothesisNodes = this.getNodesByRuleName(ruleName);

    return hypothesisNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(SectionNode, ruleName, childNodes, opacity, precedence); }
}

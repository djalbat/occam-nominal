"use strict";

import TopLevelMetaAssertionNode from "../../node/topLevelMetaAssertion";

import { META_LEMMA_BODY_RULE_NAME, META_LEMMA_HEADER_RULE_NAME } from "../../ruleNames";

export default class MetaLemmaNode extends TopLevelMetaAssertionNode {
  static bodyRuleName = META_LEMMA_BODY_RULE_NAME;

  static headerRuleName = META_LEMMA_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return TopLevelMetaAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(MetaLemmaNode, ruleName, childNodes, opacity, precedence); }
}

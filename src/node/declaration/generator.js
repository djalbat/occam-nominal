"use strict";

import DeclarationNode from "../../node/declaration";

import { PROVISIONALLY } from "../../constants";
import { TYPE_RULE_NAME, STUFF_RULE_NAME, GENERATOR_RULE_NAME } from "../../ruleNames";

export default class GeneratorDeclarationNode extends DeclarationNode {
  isMalformed() {
    let malformed = false;

    if (!malformed) {
      const stuffNode = this.getStuffNode();

      malformed = (stuffNode !== null);
    }

    if (!malformed) {
      const generatorNode = this.getGeneratorNode();

      malformed = generatorNode.isMalformed();
    }

    return malformed;
  }

  isProvisional() {
    let provisional = false;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode,
              content = terminalNode.getContent(),
              contentProvisionally = (content === PROVISIONALLY);

        if (contentProvisionally) {
          provisional = true;

          return true;
        }
      }
    });

    return provisional;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getStuffNode() {
    const ruleName = STUFF_RULE_NAME,
          stuffNode = this.getNodeByRuleName(ruleName);

    return stuffNode;
  }

  getGeneratorNode() {
    const ruleName = GENERATOR_RULE_NAME,
          generatorNode = this.getNodeByRuleName(ruleName);

    return generatorNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(GeneratorDeclarationNode, ruleName, childNodes, opacity, precedence); }
}

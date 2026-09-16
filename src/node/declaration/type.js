"use strict";

import DeclarationNode from "../../node/declaration";

import { CLOSED ,PROVISIONAL } from "../../constants";
import { TYPE_RULE_NAME, TYPES_RULE_NAME } from "../../ruleNames";

export default class TypeDeclarationNode extends DeclarationNode {
  isClosed() {
    let closed = false;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent(),
            contentProvisional = (content === CLOSED);

      if (contentProvisional) {
        closed = true;

        return true;
      }
    });

    return closed;
  }

  isProvisional() {
    let provisional = false;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent(),
            contentProvisional = (content === PROVISIONAL);

      if (contentProvisional) {
        provisional = true;

        return true;
      }
    });

    return provisional;
  }

  getTypePrefixName() {
    const typeNode = this.getTypeNode(),
          typePrefixName = typeNode.getTypePrefixName();

    return typePrefixName;
  }

  getSuperTypeNodes() {
    let superTypeNodes = [];

    const typesNode = this.getTypesNode();

    if (typesNode !== null) {
      const typeNodes = typesNode.getTypeNodes();

      superTypeNodes = typeNodes; ///
    }

    return superTypeNodes;
  }

  getTypeName() {
    let typeName = null;

    const typeNode = this.getTypeNode();

    if (typeNode !== null) {
      typeName = typeNode.getTypeName();
    }

    return typeName;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getTypesNode() {
    const ruleName = TYPES_RULE_NAME,
          typesNode = this.getNodeByRuleName(ruleName);

    return typesNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(TypeDeclarationNode, ruleName, childNodes, opacity, precedence); }
}


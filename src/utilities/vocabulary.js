"use strict";

import { arrayUtilities } from "necessary";

import { nodesQuery } from "../utilities/query";
import { customGrammarVocabularyLexer, customGrammarVocabularyParser } from "../utilities/grammar"

const { second } = arrayUtilities;

const expressionNodesQuery = nodesQuery("//expression");

export function expressionsFromVocabulary(vocabulary, expressions) {
  const content = vocabulary, ///
        tokens = customGrammarVocabularyLexer.tokenise(content),
        node = customGrammarVocabularyParser.parse(tokens);

  if (node === null) {
    return;
  }

  const expressionNodes = expressionNodesQuery(node);

  expressionNodes.forEach((expressionNode) => {
    const content = contentFromExpressionNode(expressionNode),
          expression = escape(content);

    expressions.push(expression);
  });
}

function contentFromExpressionNode(expressionNode) {
  const nonTerminalNode = expressionNode, ///
        childNodes = nonTerminalNode.getChildNodes(),
        secondChildNode = second(childNodes),
        unassignedTerminalNode = secondChildNode,  ///
        content = unassignedTerminalNode.getContent();

  return content;
}

function escape(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
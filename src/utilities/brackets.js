"use strict";

import { termFromTermNode, statementFromStatementNode } from "../utilities/element";
import { BRACKETED_TERM_DEPTH, BRACKETED_STATEMENT_DEPTH } from "../constants";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

export function stripBracketsFromTerm(term, context) {
  const termNode = term.getNode(),
        bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode);

  if (bracketedTermChildNode !== null) {
    const termNode = bracketedTermChildNode;  ///

    term = termFromTermNode(termNode, context);
  }

  return term;
}

export function stripBracketsFromTermNode(termNode) {
  const bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode);

  if (bracketedTermChildNode !== null) {
    termNode = bracketedTermChildNode;  ///
  }

  return termNode;
}

export function stripBracketsFromStatement(statement, context) {
  const statementNode = statement.getNode(),
        bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode);

  if (bracketedStatementChildNode !== null) {
    const statementNode = bracketedStatementChildNode;  ///

    statement = statementFromStatementNode(statementNode, context);
  }

  return statement;
}

export function stripBracketsFromStatementNode(statementNode) {
  const bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode);

  if (bracketedStatementChildNode !== null) {
    statementNode = bracketedStatementChildNode;  ///
  }

  return statementNode;
}

function bracketedTermChildNodeFromTermNode(termNode) {
  let bracketedTermChildNode = null;

  const depth = BRACKETED_TERM_DEPTH,
        bracketedConstructor = bracketedConstructorFromNothing(),
        bracketedConstructorTerm = bracketedConstructor.getTerm(),
        bracketedConstructorTermNode = bracketedConstructorTerm.getNode(),
        termNodeMatchBracketedConstructorNode = termNode.match(bracketedConstructorTermNode, depth);

  if (termNodeMatchBracketedConstructorNode) {
    const singularTermNode = termNode.getSingularTermNode();

    bracketedTermChildNode = singularTermNode;  ///
  }

  return bracketedTermChildNode;
}

function bracketedStatementChildNodeFromStatementNode(statementNode) {
  let bracketedStatementChildNode = null;

  const depth = BRACKETED_STATEMENT_DEPTH,
        bracketedCombinator = bracketedCombinatorFromNothing(),
        bracketedCombinatorStatement = bracketedCombinator.getStatement(),
        bracketedCombinatorStatementnNode = bracketedCombinatorStatement.getNode(),
        statementNodeMatchBracketedCombinatorStatementNode = statementNode.match(bracketedCombinatorStatementnNode, depth);

  if (statementNodeMatchBracketedCombinatorStatementNode) {
    const singularStatementNode = statementNode.getSingularStatementNode();

    bracketedStatementChildNode = singularStatementNode;  ///
  }

  return bracketedStatementChildNode;
}

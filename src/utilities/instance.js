"use strict";

import { ground } from "../utilities/context";
import { BASE_TYPE_SYMBOL } from "../constants";
import { STATEMENT_META_TYPE_NAME } from "../metaTypeNames";
import { instantiateCombinator, instantiateConstructor } from "../process/instantiate";
import { bracketedCombinatorFromBracketedCombinatorNode, bracketedConstructorFromBracketedConstructorNode } from "../utilities/element";

let bracketedCombinator = null,
    bracketedConstructor = null;

export function bracketedCombinatorFromNothing() {
  if (bracketedCombinator === null) {
    ground((context) => {
      const bracketedCombinatorString = `(${STATEMENT_META_TYPE_NAME})`,
            string = bracketedCombinatorString, ///
            combinatorNode = instantiateCombinator(string, context),
            bracketedCombinatorNode = combinatorNode;  ///

      bracketedCombinator = bracketedCombinatorFromBracketedCombinatorNode(bracketedCombinatorNode, context);
    });
  }

  return bracketedCombinator;
}

export function bracketedConstructorFromNothing() {
  if (bracketedConstructor === null) {
    ground((context) => {
      const bracketedConstructorString = `(${BASE_TYPE_SYMBOL})`,
            string = bracketedConstructorString,  ///
            constructorNode = instantiateConstructor(string, context),
            bracketedConstructorNode = constructorNode; ///

      bracketedConstructor = bracketedConstructorFromBracketedConstructorNode(bracketedConstructorNode, context);
    });
  }

  return bracketedConstructor;
}

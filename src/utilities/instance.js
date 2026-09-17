"use strict";

import { ground } from "../utilities/context";
import { BASE_TYPE_SYMBOL } from "../constants";
import { STATEMENT_META_TYPE_NAME } from "../metaTypeNames";
import { instantiateGenerator, instantiateCombinator, instantiateConstructor } from "../process/instantiate";
import { bracketedGeneratorFromBracketedGeneratorNode,
         bracketedCombinatorFromBracketedCombinatorNode,
         bracketedConstructorFromBracketedConstructorNode } from "../utilities/element";

export function bracketedGeneratorFromNothing(context) {
  let bracketedGenerator;

  ground((context) => {
    const bracketedGeneratorString = `(${BASE_TYPE_SYMBOL})`,
          string = bracketedGeneratorString,  ///
          constructorNode = instantiateGenerator(string, context),
          bracketedGeneratorNode = constructorNode;

    bracketedGenerator = bracketedGeneratorFromBracketedGeneratorNode(bracketedGeneratorNode, context);
  }, context);

  return bracketedGenerator;
}

export function bracketedCombinatorFromNothing(context) {
  let bracketedCombinator;

  ground((context) => {
    const bracketedCombinatorString = `(${STATEMENT_META_TYPE_NAME})`,
          string = bracketedCombinatorString, ///
          combinatorNode = instantiateCombinator(string, context),
          bracketedCombinatorNode = combinatorNode; ///

    bracketedCombinator = bracketedCombinatorFromBracketedCombinatorNode(bracketedCombinatorNode, context);
  }, context);

  return bracketedCombinator;
}

export function bracketedConstructorFromNothing(context) {
  let bracketedConstructor;

  ground((context) => {
    const bracketedConstructorString = `(${BASE_TYPE_SYMBOL})`,
          string = bracketedConstructorString,  ///
          constructorNode = instantiateConstructor(string, context),
          bracketedConstructorNode = constructorNode;

    bracketedConstructor = bracketedConstructorFromBracketedConstructorNode(bracketedConstructorNode, context);
  }, context);

  return bracketedConstructor;
}

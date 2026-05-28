"use strict";

import { SimplePass } from "occam-languages";
import { queryUtilities } from "occam-query";

import { descend } from "../utilities/context";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      statementNodeQuery = nodeQuery("/statement");

class TermPass extends SimplePass {
  run(termNode, context) {
    let success = false;

    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(), ///
          descended = this.descend(childNodes, context);

    if (descended) {
      success = true;
    }

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context) => {
        let success = false;

        let term;

        term = termFromTermNode(termNode, context);

        term = term.validate(context, (term, context) => { ///
          const validatesForwards = true;

          return validatesForwards;
        });

        if (term !== null) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        return success;
      }
    }
  ];
}

class CombinatorPass extends SimplePass {
  run(statementNode, context) {
    let success = false;

    const nonTerminalNode = statementNode,  ///
          childNodes = nonTerminalNode.getChildNodes(), ///
          descended = this.descend(childNodes, context);

    if (descended) {
      success = true;
    }

    return success;
  }

  static maps = [
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context) => {
        let success = false;

        descend((context) => {
          let statement;

          statement = statementFromStatementNode(statementNode, context);

          statement = statement.validate(context);  ///

          if (statement !== null) {
            success = true;
          }
        }, context);

        return success;
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context) => {
        let success = false;

        let term;

        term = termFromTermNode(termNode, context);

        term = term.validate(context, (term, context) => { ///
          const validatesForwards = true;

          return validatesForwards;
        });

        if (term !== null) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        return success;
      }
    }
  ];
}

class PropertyPass extends TermPass {}

class GeneratorPass extends TermPass {}

class ConstructorPass extends TermPass {}

const propertyPass = new PropertyPass(),
      generatorPass = new GeneratorPass(),
      combinatorPass = new CombinatorPass(),
      constructorPass = new ConstructorPass();

export function validateTermAsProperty(term, context) {
  let termValidatesAsProperty = false;

  const termNode = term.getNode(),
        success = propertyPass.run(termNode, context);

  if (success) {
    termValidatesAsProperty = true;
  }

  return termValidatesAsProperty;
}

export function validateTermAsGenerator(term, context) {
  let termValidatesAsGenerator = false;

  const termNode = term.getNode(),
        success = generatorPass.run(termNode, context);

  if (success) {
    termValidatesAsGenerator = true;
  }

  return termValidatesAsGenerator;
}

export function validateTermAsConstructor(term, context) {
  let termValidatesAsConstructor = false;

  const termNode = term.getNode(),
        success = constructorPass.run(termNode, context);

  if (success) {
    termValidatesAsConstructor = true;
  }

  return termValidatesAsConstructor;
}

export function validateStatementAsCombinator(statement, context) {
  let statementValidatesAsCombinator = false;

  const statementNode = statement.getNode(),
        success = combinatorPass.run(statementNode, context);

  if (success) {
    statementValidatesAsCombinator = true;
  }

  return statementValidatesAsCombinator;
}

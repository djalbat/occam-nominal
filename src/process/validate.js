"use strict";

import { AsyncPass } from "occam-languages";
import { queryUtilities } from "occam-query";

import { descend } from "../utilities/context";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      statementNodeQuery = nodeQuery("/statement");

class PropertyPass extends AsyncPass {
  async run(termNode, context) {
    let success = false;

    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(), ///
          descended = await this.descend(childNodes, context);

    if (descended) {
      success = true;
    }

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: async (termNode, context) => {
        let success = false;

        let term;

        term = termFromTermNode(termNode, context);

        term = await term.validate(context, async (term, context) => { ///
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
      run: async (typeNode, context) => {
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

class GeneratorPass extends AsyncPass {
  async run(termNode, context) {
    let success = false;

    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(), ///
          descended = await this.descend(childNodes, context);

    if (descended) {
      success = true;
    }

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: async (termNode, context) => {
        let success = false;

        let term;

        term = termFromTermNode(termNode, context);

        term = await term.validate(context, async (term, context) => { ///
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
      run: async (typeNode, context) => {
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

class CombinatorPass extends AsyncPass {
  async run(statementNode, context) {
    let success = false;

    const nonTerminalNode = statementNode,  ///
          childNodes = nonTerminalNode.getChildNodes(), ///
          descended = await this.descend(childNodes, context);

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
      run: async (termNode, context) => {
        let success = false;

        let term;

        term = termFromTermNode(termNode, context);

        term = await term.validate(context, async (term, context) => { ///
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
      run: async (typeNode, context) => {
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

class ConstructorPass extends AsyncPass {
  async run(termNode, context) {
    let success = false;

    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(), ///
          descended = await this.descend(childNodes, context);

    if (descended) {
      success = true;
    }

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: async (termNode, context) => {
        let success = false;

        let term;

        term = termFromTermNode(termNode, context);

        term = await term.validate(context, async (term, context) => { ///
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
      run: async (typeNode, context) => {
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

const propertyPass = new PropertyPass(),
      generatorPass = new GeneratorPass(),
      combinatorPass = new CombinatorPass(),
      constructorPass = new ConstructorPass();

export async function validateTermAsProperty(term, context) {
  let termValidatesAsProperty = false;

  const termNode = term.getNode(),
        success = await propertyPass.run(termNode, context);

  if (success) {
    termValidatesAsProperty = true;
  }

  return termValidatesAsProperty;
}

export async function validateTermAsGenerator(term, context) {
  let termValidatesAsGenerator = false;

  const termNode = term.getNode(),
        success = await generatorPass.run(termNode, context);

  if (success) {
    termValidatesAsGenerator = true;
  }

  return termValidatesAsGenerator;
}

export async function validateTermAsConstructor(term, context) {
  let termValidatesAsConstructor = false;

  const termNode = term.getNode(),
        success = await constructorPass.run(termNode, context);

  if (success) {
    termValidatesAsConstructor = true;
  }

  return termValidatesAsConstructor;
}

export async function validateStatementAsCombinator(statement, context) {
  let statementValidatesAsCombinator = false;

  const statementNode = statement.getNode(),
        success = await combinatorPass.run(statementNode, context);

  if (success) {
    statementValidatesAsCombinator = true;
  }

  return statementValidatesAsCombinator;
}

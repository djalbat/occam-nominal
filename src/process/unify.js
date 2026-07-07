"use strict";

import { queryUtilities } from "occam-query";
import { AsyncZipPass as AsyncZipPassBase } from "occam-languages";

import AsyncZipPass from "../pass/asyncZip";

import { reconcile } from "../utilities/context";
import { FRAME_META_TYPE_NAME, STATEMENT_META_TYPE_NAME } from "../metaTypeNames";
import { termFromTermNode, frameFromFrameNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const typeNodeQuery = nodeQuery("/type"),
      termNodeQuery = nodeQuery("/term"),
      frameNodeQuery = nodeQuery("/frame"),
      metaTypeNodeQuery = nodeQuery("/metaType"),
      signatureNodeQuery = nodeQuery("/signature"),
      statementNodeQuery = nodeQuery("/statement"),
      termVariableNodeQuery = nodeQuery("/term/variable!"),
      frameMetavariableNodeQuery = nodeQuery("/frame/metavariable!"),
      statementMetavariableNodeQuery = nodeQuery("/statement/metavariable!"),
      assumptionMetavariableNodeQuery = nodeQuery("/assumption/metavariable!");

class PropertyPass extends AsyncZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTypeNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          let term;

          term = termFromTermNode(termNode, context);

          const strict = false;

          term = await term.validateGivenType(type, strict, context);

          if (term !== null) {
            success = true;
          }
        }

        return success;
      }
    }
  ];
}

class GeneratorPass extends AsyncZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTypeNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          let term;

          term = termFromTermNode(termNode, context);

          term = await term.validateGivenType(type, context);

          if (term !== null) {
            success = true;
          }
        }

        return success;
      }
    }
  ];
}

class ConstructorPass extends AsyncZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTypeNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          let term;

          term = termFromTermNode(termNode, context);

          term = await term.validateGivenType(type, context);

          if (term !== null) {
            success = true;
          }
        }

        return success;
      }
    }
  ];
}

class MetaLevelPass extends AsyncZipPassBase {
  static maps = [
    {
      generalNodeQuery: assumptionMetavariableNodeQuery,
      specificNodeQuery: assumptionMetavariableNodeQuery,
      run: async (generalAssumptionMetavariableNode, specificAssumptionMetavariableNode, generalContext, specificContext) => {
        let success = false;

        let context,
            reference,
            metavariableNode;

        context = generalContext; ///

        metavariableNode = generalAssumptionMetavariableNode;  ///

        reference = context.findReferenceByMetavariableNode(metavariableNode);

        const metavariable = reference.getMetavariable();

        context = specificContext;  ///

        metavariableNode = specificAssumptionMetavariableNode; ///

        reference = context.findReferenceByMetavariableNode(metavariableNode);

        const referenceUnifies = metavariable.unifyReference(reference, generalContext, specificContext);

        if (referenceUnifies) {
          success = true;
        }

        return success;
      }
    },
    {
      generalNodeQuery: statementMetavariableNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: async (generalStatementMetavariableNode, specificStatementNode, generalContext, specificContext) => {
        let success = false;

        let context,
            statementNode;

        context = generalContext; ///

        const metavariableNode = generalStatementMetavariableNode,  ///
              metavariable = context.findMetavariableByMetavariableNode(metavariableNode),
              metavariableNodeParentNode = metavariableNode.getParentNode();

        statementNode = metavariableNodeParentNode; ///

        const substitutionNode = statementNode.getSubstitutionNode(),
              substitution = (substitutionNode !== null) ?
                               context.findSubstitutionBySubstitutionNode(substitutionNode) :
                                 null;

        context = specificContext; ///

        statementNode = specificStatementNode;  ///

        const statement = context.findStatementByStatementNode(statementNode),
              statementUnifies = await metavariable.unifyStatement(statement, substitution, generalContext, specificContext);

        if (statementUnifies) {
          success = true;
        }

        return success;
      }
    },
    {
      generalNodeQuery: frameMetavariableNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: async (generalFrameMetavariableNode, specificFrameNode, generalContext, specificContext) => {
        let success = false;

        const frameNode = specificFrameNode, ///
              metavariableNode = generalFrameMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const frame = context.findFrameByFrameNode(frameNode),
              frameUnifies = await metavariable.unifyFrame(frame, generalContext, specificContext);

        if (frameUnifies) {
          success = true;
        }

        return success;
      }
    },
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTermVariableNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variable = context.findVariableByVariableNode(variableNode);

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode),
              termUnifies = await variable.unifyTerm(term, generalContext, specificContext);

        if (termUnifies) {
          success = true;
        }

        return success;
      }
    },
    {
      generalNodeQuery: signatureNodeQuery,
      specificNodeQuery: signatureNodeQuery,
      run: async (generalSignatureNode, specificSignatureNode, generalContext, specificContext) => {
        let success = false;

         let context;

        context = generalContext; ///

        const generalSignature = context.findSignatureBySignatureNode(generalSignatureNode);

        context = specificContext;  ///

        const specificSignature = context.findSignatureBySignatureNode(specificSignatureNode);

        await reconcile(async (context) => {
          const signatureUnifies = await generalSignature.unifySignature(specificSignature, context);

          if (signatureUnifies) {
            success = true;
          }
        }, context)

        return success;
      }
    }
  ];
}

class CombinatorPass extends AsyncZipPass {
  static maps = [
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: async (generalMetaTypeNode, specificStatementNode, generalContext, specificContext) => {
        let success = false;

        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameStatementMetaTypeName = (metaTypeName === STATEMENT_META_TYPE_NAME);

        if (metaTypeNameStatementMetaTypeName) {
          const context = specificContext,  ///
                statementNode = specificStatementNode;  ///

          let statement;

          statement = statementFromStatementNode(statementNode, context);

          statement = await statement.validate(context);  ///

          if (statement !== null) {
            success = true;
          }
        }

        return success;
      }
    },
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: async (generalMetaTypeNode, specificFrameNode, generalContext, specificContext) => {
        let success = false;

        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameFrameMetaTypeName = (metaTypeName === FRAME_META_TYPE_NAME);

        if (metaTypeNameFrameMetaTypeName) {
          const context = specificContext,  ///
                frameNode = specificFrameNode;  ///

          let frame;

          frame = frameFromFrameNode(frameNode, context);

          frame = await frame.validate(context);  ///

          if (frame !== null) {
            success = true;
          }
        }

        return success;
      }
    },
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTypeNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        context = specificContext;  ///

        let term;

        term = termFromTermNode(termNode, context);

        term = await term.validateGivenType(type, context);

        if (term !== null) {
          success = true;
        }

        return success;
      }
    }
  ];
}

class MetavariablePass extends AsyncZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTypeNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        let context;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        context = specificContext; ///

        const term = context.findTermByTermNode(termNode),
              termType = term.getType(),
              termTypeEqualToOrSubTypeOfGivenTypeType = termType.isEqualToOrSubTypeOf(type);

        if (termTypeEqualToOrSubTypeOfGivenTypeType) {
          success = true;
        }

        return success;
      }
    }
  ];
}

class IntrinsicTermPass extends AsyncZipPassBase {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTermVariableNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variable = context.findVariableByVariableNode(variableNode);

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode),
              termUnifies = await variable.unifyTerm(term, generalContext, specificContext);

        if (termUnifies) {
          success = true;
        }

        return success;
      }
    }
  ];
}

class IntrinsicMetavariablePass extends AsyncZipPass {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: async (generalTermVariableNode, specificTermNode, generalContext, specificContext) => {
        let success = false;

        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variable = context.findVariableByVariableNode(variableNode);

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode),
              termUnifies = await variable.unifyTerm(term, generalContext, specificContext);

        if (termUnifies) {
          success = true;
        }

        return success;
      }
    }
  ];
}

const metaLevelPass = new MetaLevelPass(),
      propertyPass = new PropertyPass(),
      generatorPass = new GeneratorPass(),
      combinatorPass = new CombinatorPass(),
      constructorPass = new ConstructorPass(),
      metavariablePass = new MetavariablePass(),
      intrinsicTermPass = new IntrinsicTermPass(),
      intrinsicMetavariablePass = new IntrinsicMetavariablePass();

export async function unifyStatement(generalStatement, specificStatement, generalContext, specificContext) {
  let statementUnifies = false;

  const generalStatementNode = generalStatement.getNode(),
        specificStatementNode = specificStatement.getNode(),
        generalNode = generalStatementNode, ///
        specificNode = specificStatementNode,  ///
        success = await metaLevelPass.run(generalNode, specificNode, generalContext, specificContext);

  if (success) {
    statementUnifies = true;
  }

  return statementUnifies;
}

export async function unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext) {
  let metavariableUnifies = false;

  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        success = await metavariablePass.run(generalMetavariableNode, specificMetavariableNode, generalContext, specificContext);

  if (success) {
    metavariableUnifies = true;
  }

  return metavariableUnifies;
}

export async function unifyTermWithProperty(term, property, generalContext, specificContext) {
  let termUnifiesWithProperty = false;

  const termNode = term.getNode(),
        propertyTerm = property.getTerm(),
        propertyTermNode = propertyTerm.getNode(),
        success = await propertyPass.run(propertyTermNode, termNode, generalContext, specificContext);

  if (success) {
    termUnifiesWithProperty = true;
  }

  return termUnifiesWithProperty;
}

export async function unifyTermWithGenerator(term, generator, generalContext, specificContext) {
  let termUnifiesWithGenerator = false;

  const termNode = term.getNode(),
        generatorTerm = generator.getTerm(),
        generatorTermNode = generatorTerm.getNode(),
        success = await generatorPass.run(generatorTermNode, termNode, generalContext, specificContext);

  if (success) {
    termUnifiesWithGenerator = true;
  }

  return termUnifiesWithGenerator;
}

export async function unifyTermWithConstructor(term, constructor, generalContext, specificContext) {
  let termUnifiesWithConstructor = false;

  const termNode = term.getNode(),
        constructorTerm = constructor.getTerm(),
        constructorTermNode = constructorTerm.getNode(),
        success = await constructorPass.run(constructorTermNode, termNode, generalContext, specificContext);

  if (success) {
    termUnifiesWithConstructor = true;
  }

  return termUnifiesWithConstructor;
}

export async function unifyStatementWithCombinator(statement, combinator, generalContext, specificContext) {
  let statementUnifiesWithCombinator = false;

  const statementNode = statement.getNode(),
        combinatorStatement = combinator.getStatement(),
        combinatorStatementNode = combinatorStatement.getNode(),
        success = await combinatorPass.run(combinatorStatementNode, statementNode, generalContext, specificContext);

  if (success) {
    statementUnifiesWithCombinator = true;
  }

  return statementUnifiesWithCombinator;
}

export async function unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext) {
  let termUnifiesIntrinsically = false;

  const generalTermNode = generalTerm.getNode(),
        specificTermNode = specificTerm.getNode(),
        generalNode = generalTermNode, ///
        specificNode = specificTermNode, ///
        success = await intrinsicTermPass.run(generalNode, specificNode, generalContext, specificContext);

  if (success) {
    termUnifiesIntrinsically = true;
  }

  return termUnifiesIntrinsically;
}

export async function unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext) {
  let metavariableUnifiesIntrinsically = false;

  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalNode = generalMetavariableNode, ///
        specificNode = specificMetavariableNode, ///
        success = await intrinsicMetavariablePass.run(generalNode, specificNode, generalContext, specificContext);

  if (success) {
    metavariableUnifiesIntrinsically = true;
  }

  return metavariableUnifiesIntrinsically;
}

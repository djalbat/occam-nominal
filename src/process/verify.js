"use strict";

import { queryUtilities } from "occam-query"
import { ContinuationPass } from "occam-languages";

import { ruleFromRuleNode,
         errorFromErrorNode,
         axiomFromAxiomNode,
         lemmaFromLemmaNode,
         schemaFromSchemaNode,
         sectionFromSectionNode,
         theoremFromTheoremNode,
         conjectureFromConjectureNode,
         typeDeclarationFromTypeDeclarationNode,
         cotypeDeclarationFromCotypeDeclarationNode,
         variableDeclarationFromVariableDeclarationNode,
         generatorDeclarationFromGeneratorDeclarationNode,
         typePrefixDeclarationFromTypePrefixDeclarationNode,
         combinatorDeclarationFromCombinatorDeclarationNode,
         constructorDeclarationFromConstructorDeclarationNode,
         metavariableDeclarationFromMetavariableDeclarationNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const ruleNodeQuery = nodeQuery("/rule"),
      errorNodeQuery = nodeQuery("/error"),
      axiomNodeQuery = nodeQuery("/axiom"),
      lemmaNodeQuery = nodeQuery("/lemma"),
      schemaNodeQuery = nodeQuery("/schema"),
      sectionNodeQuery = nodeQuery("/section"),
      theoremNodeQuery = nodeQuery("/theorem"),
      conjectureNodeQuery = nodeQuery("/conjecture"),
      typeDeclarationNodeQuery = nodeQuery("/typeDeclaration"),
      cotypeDeclarationNodeQuery = nodeQuery("/cotypeDeclaration"),
      variableDeclarationNodeQuery = nodeQuery("/variableDeclaration"),
      generatorDeclarationNodeQuery = nodeQuery("/generatorDeclaration"),
      combinatorDeclarationNodeQuery = nodeQuery("/combinatorDeclaration"),
      typePrefixDeclarationNodeQuery = nodeQuery("/typePrefixDeclaration"),
      constructorDeclarationNodeQuery = nodeQuery("/constructorDeclaration"),
      metavariableDeclarationNodeQuery = nodeQuery("/metavariableDeclaration");

class TopLevelPass extends ContinuationPass {
  static maps = [
    {
      nodeQuery: errorNodeQuery,
      run: (errorNode, context, continuation) => {
        const error = errorFromErrorNode(errorNode, context);

        return error.verify(context, continuation);
      }
    },
    {
      nodeQuery: ruleNodeQuery,
      run: (ruleNode, context, continuation) => {
        const rule = ruleFromRuleNode(ruleNode, context);

        return rule.verify(context, continuation);
      }
    },
    {
      nodeQuery: axiomNodeQuery,
      run: (axiomNode, context, continuation) => {
        const axiom = axiomFromAxiomNode(axiomNode, context);

        return axiom.verify(context, continuation);
      }
    },
    {
      nodeQuery: lemmaNodeQuery,
      run: (lemmaNode, context, continuation) => {
        const lemma = lemmaFromLemmaNode(lemmaNode, context);

        return lemma.verify(context, continuation);
      }
    },
    {
      nodeQuery: schemaNodeQuery,
      run: (schemaNode, context, continuation) => {
        const schema = schemaFromSchemaNode(schemaNode, context);

        return schema.verify(context, continuation);
      }
    },
    {
      nodeQuery: sectionNodeQuery,
      run: (sectionNode, context, continuation) => {
        const section = sectionFromSectionNode(sectionNode, context);

        return section.verify(context, continuation);
      }
    },
    {
      nodeQuery: theoremNodeQuery,
      run: (theoremNode, context, continuation) => {
        const theorem = theoremFromTheoremNode(theoremNode, context);

        return theorem.verify(context, continuation);
      }
    },
    {
      nodeQuery: conjectureNodeQuery,
      run: (conjectureNode, context, continuation) => {
        const conjecture = conjectureFromConjectureNode(conjectureNode, context);

        return conjecture.verify(context, continuation);
      }
    },
    {
      nodeQuery: typeDeclarationNodeQuery,
      run: (typeDeclarationNode, context, continuation) => {
        const typeDeclaration = typeDeclarationFromTypeDeclarationNode(typeDeclarationNode, context);

        return typeDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: cotypeDeclarationNodeQuery,
      run: (cotypeDeclarationNode, context, continuation) => {
        const cotypeDeclaration = cotypeDeclarationFromCotypeDeclarationNode(cotypeDeclarationNode, context);

        return cotypeDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: variableDeclarationNodeQuery,
      run: (variableDeclarationNode, context, continuation) => {
        const variableDeclaration = variableDeclarationFromVariableDeclarationNode(variableDeclarationNode, context);

        return variableDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: generatorDeclarationNodeQuery,
      run: (generatorDeclarationNode, context, continuation) => {
        const generatorDeclaration = generatorDeclarationFromGeneratorDeclarationNode(generatorDeclarationNode, context);

        return generatorDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: typePrefixDeclarationNodeQuery,
      run: (typePrefixDeclarationNode, context, continuation) => {
        const typePrefixDeclaration = typePrefixDeclarationFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context);

        return typePrefixDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: combinatorDeclarationNodeQuery,
      run: (combinatorDeclarationNode, context, continuation) => {
        const combinatorDeclaration = combinatorDeclarationFromCombinatorDeclarationNode(combinatorDeclarationNode, context);

        return combinatorDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: constructorDeclarationNodeQuery,
      run: (constructorDeclarationNode, context, continuation) => {
        const constructorDeclaration = constructorDeclarationFromConstructorDeclarationNode(constructorDeclarationNode, context);

        return constructorDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: metavariableDeclarationNodeQuery,
      run: (metavariableDeclarationNode, context, continuation) => {
        const metavariableDeclaration = metavariableDeclarationFromMetavariableDeclarationNode(metavariableDeclarationNode, context);

        return metavariableDeclaration.verify(context, continuation);
      }
    }
  ];
}

const topLevelPass = new TopLevelPass();

export function verifyFile(fileNode, context, continuation) {
  const node = fileNode; ///

  return topLevelPass.run(node, context, continuation);
}

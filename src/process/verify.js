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
      run: (errorNode, context, back, forward) => {
        const error = errorFromErrorNode(errorNode, context);

        return error.verify(context, back, forward);
      }
    },
    {
      nodeQuery: ruleNodeQuery,
      run: (ruleNode, context, back, forward) => {
        const rule = ruleFromRuleNode(ruleNode, context);

        return rule.verify(context, back, forward);
      }
    },
    {
      nodeQuery: axiomNodeQuery,
      run: (axiomNode, context, back, forward) => {
        const axiom = axiomFromAxiomNode(axiomNode, context);

        return axiom.verify(context, back, forward);
      }
    },
    {
      nodeQuery: lemmaNodeQuery,
      run: (lemmaNode, context, back, forward) => {
        const lemma = lemmaFromLemmaNode(lemmaNode, context);

        return lemma.verify(context, back, forward);
      }
    },
    {
      nodeQuery: schemaNodeQuery,
      run: (schemaNode, context, back, forward) => {
        const schema = schemaFromSchemaNode(schemaNode, context);

        return schema.verify(context, back, forward);
      }
    },
    {
      nodeQuery: sectionNodeQuery,
      run: (sectionNode, context, back, forward) => {
        const section = sectionFromSectionNode(sectionNode, context);

        return section.verify(context, back, forward);
      }
    },
    {
      nodeQuery: theoremNodeQuery,
      run: (theoremNode, context, back, forward) => {
        const theorem = theoremFromTheoremNode(theoremNode, context);

        return theorem.verify(context, back, forward);
      }
    },
    {
      nodeQuery: conjectureNodeQuery,
      run: (conjectureNode, context, back, forward) => {
        const conjecture = conjectureFromConjectureNode(conjectureNode, context);

        return conjecture.verify(context, back, forward);
      }
    },
    {
      nodeQuery: typeDeclarationNodeQuery,
      run: (typeDeclarationNode, context, back, forward) => {
        const typeDeclaration = typeDeclarationFromTypeDeclarationNode(typeDeclarationNode, context);

        return typeDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: cotypeDeclarationNodeQuery,
      run: (cotypeDeclarationNode, context, back, forward) => {
        const cotypeDeclaration = cotypeDeclarationFromCotypeDeclarationNode(cotypeDeclarationNode, context);

        return cotypeDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: variableDeclarationNodeQuery,
      run: (variableDeclarationNode, context, back, forward) => {
        const variableDeclaration = variableDeclarationFromVariableDeclarationNode(variableDeclarationNode, context);

        return variableDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: generatorDeclarationNodeQuery,
      run: (generatorDeclarationNode, context, back, forward) => {
        const generatorDeclaration = generatorDeclarationFromGeneratorDeclarationNode(generatorDeclarationNode, context);

        return generatorDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: typePrefixDeclarationNodeQuery,
      run: (typePrefixDeclarationNode, context, back, forward) => {
        const typePrefixDeclaration = typePrefixDeclarationFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context);

        return typePrefixDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: combinatorDeclarationNodeQuery,
      run: (combinatorDeclarationNode, context, back, forward) => {
        const combinatorDeclaration = combinatorDeclarationFromCombinatorDeclarationNode(combinatorDeclarationNode, context);

        return combinatorDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: constructorDeclarationNodeQuery,
      run: (constructorDeclarationNode, context, back, forward) => {
        const constructorDeclaration = constructorDeclarationFromConstructorDeclarationNode(constructorDeclarationNode, context);

        return constructorDeclaration.verify(context, back, forward);
      }
    },
    {
      nodeQuery: metavariableDeclarationNodeQuery,
      run: (metavariableDeclarationNode, context, back, forward) => {
        const metavariableDeclaration = metavariableDeclarationFromMetavariableDeclarationNode(metavariableDeclarationNode, context);

        return metavariableDeclaration.verify(context, back, forward);
      }
    }
  ];
}

const topLevelPass = new TopLevelPass();

export function verifyFile(fileNode, context, back, forward) {
  const node = fileNode; ///

  return topLevelPass.run(node, context, back, forward);
}

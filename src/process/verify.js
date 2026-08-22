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
      run: (errorNode, context, forward, back) => {
        const error = errorFromErrorNode(errorNode, context);

        return error.verify(context, forward, back);
      }
    },
    {
      nodeQuery: ruleNodeQuery,
      run: (ruleNode, context, forward, back) => {
        const rule = ruleFromRuleNode(ruleNode, context);

        return rule.verify(context, forward, back);
      }
    },
    {
      nodeQuery: axiomNodeQuery,
      run: (axiomNode, context, forward, back) => {
        const axiom = axiomFromAxiomNode(axiomNode, context);

        return axiom.verify(context, forward, back);
      }
    },
    {
      nodeQuery: lemmaNodeQuery,
      run: (lemmaNode, context, forward, back) => {
        const lemma = lemmaFromLemmaNode(lemmaNode, context);

        return lemma.verify(context, forward, back);
      }
    },
    {
      nodeQuery: schemaNodeQuery,
      run: (schemaNode, context, forward, back) => {
        const schema = schemaFromSchemaNode(schemaNode, context);

        return schema.verify(context, forward, back);
      }
    },
    {
      nodeQuery: sectionNodeQuery,
      run: (sectionNode, context, forward, back) => {
        const section = sectionFromSectionNode(sectionNode, context);

        return section.verify(context, forward, back);
      }
    },
    {
      nodeQuery: theoremNodeQuery,
      run: (theoremNode, context, forward, back) => {
        const theorem = theoremFromTheoremNode(theoremNode, context);

        return theorem.verify(context, forward, back);
      }
    },
    {
      nodeQuery: conjectureNodeQuery,
      run: (conjectureNode, context, forward, back) => {
        const conjecture = conjectureFromConjectureNode(conjectureNode, context);

        return conjecture.verify(context, forward, back);
      }
    },
    {
      nodeQuery: typeDeclarationNodeQuery,
      run: (typeDeclarationNode, context, forward, back) => {
        const typeDeclaration = typeDeclarationFromTypeDeclarationNode(typeDeclarationNode, context);

        return typeDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: cotypeDeclarationNodeQuery,
      run: (cotypeDeclarationNode, context, forward, back) => {
        const cotypeDeclaration = cotypeDeclarationFromCotypeDeclarationNode(cotypeDeclarationNode, context);

        return cotypeDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: variableDeclarationNodeQuery,
      run: (variableDeclarationNode, context, forward, back) => {
        const variableDeclaration = variableDeclarationFromVariableDeclarationNode(variableDeclarationNode, context);

        return variableDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: generatorDeclarationNodeQuery,
      run: (generatorDeclarationNode, context, forward, back) => {
        const generatorDeclaration = generatorDeclarationFromGeneratorDeclarationNode(generatorDeclarationNode, context);

        return generatorDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: typePrefixDeclarationNodeQuery,
      run: (typePrefixDeclarationNode, context, forward, back) => {
        const typePrefixDeclaration = typePrefixDeclarationFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context);

        return typePrefixDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: combinatorDeclarationNodeQuery,
      run: (combinatorDeclarationNode, context, forward, back) => {
        const combinatorDeclaration = combinatorDeclarationFromCombinatorDeclarationNode(combinatorDeclarationNode, context);

        return combinatorDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: constructorDeclarationNodeQuery,
      run: (constructorDeclarationNode, context, forward, back) => {
        const constructorDeclaration = constructorDeclarationFromConstructorDeclarationNode(constructorDeclarationNode, context);

        return constructorDeclaration.verify(context, forward, back);
      }
    },
    {
      nodeQuery: metavariableDeclarationNodeQuery,
      run: (metavariableDeclarationNode, context, forward, back) => {
        const metavariableDeclaration = metavariableDeclarationFromMetavariableDeclarationNode(metavariableDeclarationNode, context);

        return metavariableDeclaration.verify(context, forward, back);
      }
    }
  ];
}

const topLevelPass = new TopLevelPass();

export function verifyFile(fileNode, context, forward, back) {
  const node = fileNode; ///

  return topLevelPass.run(node, context, forward, back);
}

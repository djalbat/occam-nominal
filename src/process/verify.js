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

        error.verify(context, continuation);
      }
    },
    {
      nodeQuery: ruleNodeQuery,
      run: (ruleNode, context, continuation) => {
        const rule = ruleFromRuleNode(ruleNode, context);

        rule.verify(context, continuation);
      }
    },
    {
      nodeQuery: axiomNodeQuery,
      run: (axiomNode, context, continuation) => {
        const axiom = axiomFromAxiomNode(axiomNode, context);

        axiom.verify(context, continuation);
      }
    },
    {
      nodeQuery: lemmaNodeQuery,
      run: (lemmaNode, context, continuation) => {
        const lemma = lemmaFromLemmaNode(lemmaNode, context);

        lemma.verify(context, continuation);
      }
    },
    {
      nodeQuery: schemaNodeQuery,
      run: (schemaNode, context, continuation) => {
        const schema = schemaFromSchemaNode(schemaNode, context);

        schema.verify(context, continuation);
      }
    },
    {
      nodeQuery: sectionNodeQuery,
      run: (sectionNode, context, continuation) => {
        const section = sectionFromSectionNode(sectionNode, context);

        section.verify(context, continuation);
      }
    },
    {
      nodeQuery: theoremNodeQuery,
      run: (theoremNode, context, continuation) => {
        const theorem = theoremFromTheoremNode(theoremNode, context);

        theorem.verify(context, continuation);
      }
    },
    {
      nodeQuery: conjectureNodeQuery,
      run: (conjectureNode, context, continuation) => {
        const conjecture = conjectureFromConjectureNode(conjectureNode, context);

        conjecture.verify(context, continuation);
      }
    },
    {
      nodeQuery: typeDeclarationNodeQuery,
      run: (typeDeclarationNode, context, continuation) => {
        const typeDeclaration = typeDeclarationFromTypeDeclarationNode(typeDeclarationNode, context);

        typeDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: cotypeDeclarationNodeQuery,
      run: (cotypeDeclarationNode, context, continuation) => {
        const cotypeDeclaration = cotypeDeclarationFromCotypeDeclarationNode(cotypeDeclarationNode, context);

        cotypeDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: variableDeclarationNodeQuery,
      run: (variableDeclarationNode, context, continuation) => {
        const variableDeclaration = variableDeclarationFromVariableDeclarationNode(variableDeclarationNode, context);

        variableDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: generatorDeclarationNodeQuery,
      run: (generatorDeclarationNode, context, continuation) => {
        const generatorDeclaration = generatorDeclarationFromGeneratorDeclarationNode(generatorDeclarationNode, context);

        generatorDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: typePrefixDeclarationNodeQuery,
      run: (typePrefixDeclarationNode, context, continuation) => {
        const typePrefixDeclaration = typePrefixDeclarationFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context);

        typePrefixDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: combinatorDeclarationNodeQuery,
      run: (combinatorDeclarationNode, context, continuation) => {
        const combinatorDeclaration = combinatorDeclarationFromCombinatorDeclarationNode(combinatorDeclarationNode, context);

        combinatorDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: constructorDeclarationNodeQuery,
      run: (constructorDeclarationNode, context, continuation) => {
        const constructorDeclaration = constructorDeclarationFromConstructorDeclarationNode(constructorDeclarationNode, context);

        constructorDeclaration.verify(context, continuation);
      }
    },
    {
      nodeQuery: metavariableDeclarationNodeQuery,
      run: (metavariableDeclarationNode, context, continuation) => {
        const metavariableDeclaration = metavariableDeclarationFromMetavariableDeclarationNode(metavariableDeclarationNode, context);

        metavariableDeclaration.verify(context, continuation);
      }
    }
  ];
}

const topLevelPass = new TopLevelPass();

export function verifyFile(fileNode, context, continuation) {
  const node = fileNode; ///

  topLevelPass.run(node, context, continuation);
}

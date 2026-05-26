"use strict";

import { AsyncPass } from "occam-languages"
import { queryUtilities } from "occam-query"

import { ruleFromRuleNode,
         errorFromErrorNode,
         axiomFromAxiomNode,
         lemmaFromLemmaNode,
         schemaFromSchemaNode,
         sectionFromSectionNode,
         theoremFromTheoremNode,
         conjectureFromConjectureNode,
         cotypeDeclarationFromCotypeDeclarationNode,
         variableDeclarationFromVariableDeclarationNode,
         simpleTypeDeclarationFromSimpleTypeDeclarationNode,
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
      cotypeDeclarationNodeQuery = nodeQuery("/cotypeDeclaration"),
      variableDeclarationNodeQuery = nodeQuery("/variableDeclaration"),
      combinatorDeclarationNodeQuery = nodeQuery("/combinatorDeclaration"),
      simpleTypeDeclarationNodeQuery = nodeQuery("/simpleTypeDeclaration"),
      typePrefixDeclarationNodeQuery = nodeQuery("/typePrefixDeclaration"),
      constructorDeclarationNodeQuery = nodeQuery("/constructorDeclaration"),
      metavariableDeclarationNodeQuery = nodeQuery("/metavariableDeclaration");

class TopLevelPass extends AsyncPass {
  static maps = [
    {
      nodeQuery: errorNodeQuery,
      run: async (errorNode, context) => {
        let success = false;

        const error = errorFromErrorNode(errorNode, context),
              errorVerifies = await error.verify(context);

        if (errorVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: ruleNodeQuery,
      run: async (ruleNode, context) => {
        let success = false;

        const rule = ruleFromRuleNode(ruleNode, context),
              ruleVerifies = await rule.verify(context);

        if (ruleVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: axiomNodeQuery,
      run: async (axiomNode, context) => {
        let success = false;

        const axiom = axiomFromAxiomNode(axiomNode, context),
              axiomVerifies = await axiom.verify(context);

        if (axiomVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: lemmaNodeQuery,
      run: async (lemmaNode, context) => {
        let success = false;

        const lemma = lemmaFromLemmaNode(lemmaNode, context),
              lemmaVerifies = await lemma.verify(context);

        if (lemmaVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: schemaNodeQuery,
      run: async (schemaNode, context) => {
        let success = false;

        const schema = schemaFromSchemaNode(schemaNode, context),
              schemaVerifies = await schema.verify(context);

        if (schemaVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: sectionNodeQuery,
      run: async (sectionNode, context) => {
        let success = false;

        const section = sectionFromSectionNode(sectionNode, context),
              sectionVerifies = await section.verify(context);

        if (sectionVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: theoremNodeQuery,
      run: async (theoremNode, context) => {
        let success = false;

        const theorem = theoremFromTheoremNode(theoremNode, context),
              theoremVerifies = await theorem.verify(context);

        if (theoremVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: conjectureNodeQuery,
      run: async (conjectureNode, context) => {
        let success = false;

        const conjecture = conjectureFromConjectureNode(conjectureNode, context),
              conjectureVerifies = await conjecture.verify(context);

        if (conjectureVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: cotypeDeclarationNodeQuery,
      run: async (cotypeDeclarationNode, context) => {
        let success = false;

        const cotypeDeclaration = cotypeDeclarationFromCotypeDeclarationNode(cotypeDeclarationNode, context),
              cotypeDeclarationVerifies = await cotypeDeclaration.verify(context);

        if (cotypeDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: variableDeclarationNodeQuery,
      run: async (variableDeclarationNode, context) => {
        let success = false;

        const variableDeclaration = variableDeclarationFromVariableDeclarationNode(variableDeclarationNode, context),
              variableDeclarationVerifies = await variableDeclaration.verify(context);

        if (variableDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: simpleTypeDeclarationNodeQuery,
      run: async (simpleTypeDeclarationNode, context) => {
        let success = false;

        const simpleTypeDeclaration = simpleTypeDeclarationFromSimpleTypeDeclarationNode(simpleTypeDeclarationNode, context),
              simpleTypeDeclarationVerifies = await simpleTypeDeclaration.verify(context);

        if (simpleTypeDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typePrefixDeclarationNodeQuery,
      run: async (typePrefixDeclarationNode, context) => {
        let success = false;

        const typePrefixDeclaration = typePrefixDeclarationFromTypePrefixDeclarationNode(typePrefixDeclarationNode, context),
              typePrefixDeclarationVerifies = await typePrefixDeclaration.verify(context);

        if (typePrefixDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: combinatorDeclarationNodeQuery,
      run: async (combinatorDeclarationNode, context) => {
        let success = false;

        const combinatorDeclaration = combinatorDeclarationFromCombinatorDeclarationNode(combinatorDeclarationNode, context),
              combinatorDeclarationVerifies = await combinatorDeclaration.verify(context);

        if (combinatorDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: constructorDeclarationNodeQuery,
      run: async (constructorDeclarationNode, context) => {
        let success = false;

        const constructorDeclaration = constructorDeclarationFromConstructorDeclarationNode(constructorDeclarationNode, context),
              constructorDeclarationVerifies = await constructorDeclaration.verify(context);

        if (constructorDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: metavariableDeclarationNodeQuery,
      run: async (metavariableDeclarationNode, context) => {
        let success = false;

        const metavariableDeclaration = metavariableDeclarationFromMetavariableDeclarationNode(metavariableDeclarationNode, context),
              metavariableDeclarationVerifies = await metavariableDeclaration.verify(context);

        if (metavariableDeclarationVerifies) {
          success = true;
        }

        return success;
      }
    }
  ];
}

const topLevelPass = new TopLevelPass();

export async function verifyFile(fileNode, context) {
  let fileVerifies = false;

  const node = fileNode, ///
        sucess = await topLevelPass.run(node, context);

  if (sucess) {
    fileVerifies = true;
  }

  return fileVerifies;
}

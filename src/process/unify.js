"use strict";

import { queryUtilities } from "occam-query";
import { ContinuationZipPass as ContinuationZipPassBase } from "occam-languages";

import ContinuationZipPass from "../pass/continuationZip";

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

class PropertyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          const term = termFromTermNode(termNode, context),
                strict = false;

          term.validateGivenType(strict, type, context, (term) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            return continuation(success);
          });
        }
      }
    }
  ];
}

class GeneratorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          const term = termFromTermNode(termNode, context);

          term.validateGivenType(type, context, (term) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            return continuation(success);
          });
        }
      }
    }
  ];
}

class ConstructorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        context = specificContext;  ///

        let success = false;

        if (type === null) {
          return continuation(success, generalContext, specificContext);
        }

        const term = termFromTermNode(termNode, context);

        term.validateGivenType(type, (term, context) => {
          const specificContext = context;  ///

          if (term !== null) {
            success = true;
          }

          return continuation(success, generalContext, specificContext);
        }, context, continuation);
      }
    }
  ];
}

class MetaLevelPass extends ContinuationZipPassBase {
  static maps = [
    {
      generalNodeQuery: assumptionMetavariableNodeQuery,
      specificNodeQuery: assumptionMetavariableNodeQuery,
      run: (generalAssumptionMetavariableNode, specificAssumptionMetavariableNode, generalContext, specificContext, continuation) => {
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

        return metavariable.unifyReference(reference, generalContext, specificContext, (referenceUnifies) => {
          let success = false;

          if (referenceUnifies) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      generalNodeQuery: statementMetavariableNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: (generalStatementMetavariableNode, specificStatementNode, generalContext, specificContext, continuation) => {
        const statementNode = specificStatementNode, ///
              metavariableNode = generalStatementMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const statement = context.findStatementByStatementNode(statementNode);

        return metavariable.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let success = false;

          if (statementUnifies) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      generalNodeQuery: frameMetavariableNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalFrameMetavariableNode, specificFrameNode, generalContext, specificContext, continuation) => {
        const frameNode = specificFrameNode, ///
              metavariableNode = generalFrameMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const frame = context.findFrameByFrameNode(frameNode);

        return metavariable.unifyFrame(frame, generalContext, specificContext, (frameUnifies) => {
          let success = false;

          if (frameUnifies) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, continuation) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
          let success = false;

          if (termUnifies) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      generalNodeQuery: signatureNodeQuery,
      specificNodeQuery: signatureNodeQuery,
      run: (generalSignatureNode, specificSignatureNode, generalContext, specificContext, continuation) => {
        let context;

        context = generalContext; ///

        const generalSignature = context.findSignatureBySignatureNode(generalSignatureNode);

        context = specificContext;  ///

        const specificSignature = context.findSignatureBySignatureNode(specificSignatureNode);

        reconcile((context) => {
          return generalSignature.unifySignature(specificSignature, context, (signatureUnifies) => {
            let success = false;

            if (signatureUnifies) {
              success = true;
            }

            return continuation(success);
          });
        }, context)
      }
    }
  ];
}

class CombinatorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: (generalMetaTypeNode, specificStatementNode, generalContext, specificContext, continuation) => {
        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameStatementMetaTypeName = (metaTypeName === STATEMENT_META_TYPE_NAME);

        let success = false;

        if (!metaTypeNameStatementMetaTypeName) {
          return continuation(success, generalContext, specificContext);
        }

        const statementNode = specificStatementNode,  ///
              context = specificContext,  ///
              statement = statementFromStatementNode(statementNode, context);

        return statement.validate(context, (statement, context) => {
          const specificContext = context;  ///

          if (statement !== null) {
            success = true;
          }

          return continuation(success, generalContext, specificContext);
        });
      }
    },
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalMetaTypeNode, specificFrameNode, generalContext, specificContext, continuation) => {
        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameFrameMetaTypeName = (metaTypeName === FRAME_META_TYPE_NAME);

        let success = false;

        if (!metaTypeNameFrameMetaTypeName) {
          return continuation(success, generalContext, specificContext);
        }

        const frameNode = specificFrameNode,  ///
              context = specificContext,  ///
              frame = frameFromFrameNode(frameNode, context);

        return frame.validate((frame, context) => {
          const specificContext = context; ///

          if (frame !== null) {
            success = true;
          }

          return continuation(success, generalContext, specificContext);
        }, context, continuation);
      }
    },
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context);

        let success = false;

        return term.validateGivenType(type, (term, context) => {
          const specificContext = context;  ///

          if (term !== null) {
            success = true;
          }

          return continuation(success, generalContext, specificContext);
        }, context, continuation);
      }
    }
  ];
}

class MetavariablePass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
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

        return continuation(success);
      }
    }
  ];
}

class IntrinsicTermPass extends ContinuationZipPassBase {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, continuation) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
          let success = false;

          if (termUnifies) {
            success = true;
          }

          return continuation(success);
        });
      }
    }
  ];
}

class IntrinsicMetavariablePass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, continuation) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
          let success = false;

          if (termUnifies) {
            success = true;
          }

          return continuation(success);
        });
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

export function unifyStatement(generalStatement, specificStatement, generalContext, specificContext, continuation) {
  const generalStatementNode = generalStatement.getNode(),
        specificStatementNode = specificStatement.getNode(),
        generalNode = generalStatementNode, ///
        specificNode = specificStatementNode;  ///

  return metaLevelPass.run(generalNode, specificNode, generalContext, specificContext, continuation);
}

export function unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext, continuation) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode();

  return metavariablePass.run(generalMetavariableNode, specificMetavariableNode, generalContext, specificContext, continuation);
}

export function unifyTermWithProperty(term, property, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        propertyTerm = property.getTerm(),
        propertyTermNode = propertyTerm.getNode();

  return propertyPass.run(propertyTermNode, termNode, generalContext, specificContext, continuation);
}

export function unifyTermWithGenerator(term, generator, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        generatorTerm = generator.getTerm(),
        generatorTermNode = generatorTerm.getNode();

  return generatorPass.run(generatorTermNode, termNode, generalContext, specificContext, continuation);
}

export function unifyTermWithConstructor(term, constructor, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        constructorTerm = constructor.getTerm(),
        constructorTermNode = constructorTerm.getNode();

  return constructorPass.run(constructorTermNode, termNode, generalContext, specificContext, continuation);
}

export function unifyStatementWithCombinator(statement, combinator, generalContext, specificContext, continuation) {
  const statementNode = statement.getNode(),
        combinatorStatement = combinator.getStatement(),
        combinatorStatementNode = combinatorStatement.getNode();

  return combinatorPass.run(combinatorStatementNode, statementNode, generalContext, specificContext, continuation);
}

export function unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext, continuation) {
  const generalTermNode = generalTerm.getNode(),
        specificTermNode = specificTerm.getNode(),
        generalNode = generalTermNode, ///
        specificNode = specificTermNode; ///

  return intrinsicTermPass.run(generalNode, specificNode, generalContext, specificContext, continuation);
}

export function unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, continuation) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalNode = generalMetavariableNode, ///
        specificNode = specificMetavariableNode;

  return intrinsicMetavariablePass.run(generalNode, specificNode, generalContext, specificContext, continuation);
}

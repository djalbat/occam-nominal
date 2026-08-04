"use strict";

import { queryUtilities } from "occam-query";

import { ContinuationZipPass as AsynchronousContinuationZipPass } from "occam-languages";

import ContinuationZipPassBase from "../pass/continuationZip";  ///

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

class ContinuationZipPass extends ContinuationZipPassBase {
  run(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          generalChildNodes = generalNonTerminalNode.getChildNodes(), ///
          specificChildNodes = specificNonTerminalNode.getChildNodes(); ///

    return this.descend(generalChildNodes, specificChildNodes, ...remainingArguments, continuation);
  }
}

class UnifyStatementPass extends AsynchronousContinuationZipPass {
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

          return continuation(success, generalContext, specificContext);
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

          return continuation(success, generalContext, specificContext);
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

          return continuation(success, generalContext, specificContext);
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

          return continuation(success, generalContext, specificContext);
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

        return reconcile((context) => {
          return generalSignature.unifySignature(specificSignature, context, (signatureUnifies) => {
            let success = false;

            if (signatureUnifies) {
              success = true;
            }

            return continuation(success, generalContext, specificContext);
          });
        }, context)
      }
    }
  ];
}

class UnifyMetavariablePass extends ContinuationZipPass {
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

class UnifyTermIntrinsicallyPass extends ContinuationZipPassBase {
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

class UnifyMetavariableIntrisicallyPass extends AsynchronousContinuationZipPass {
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

class UnifyTermWithPropertyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          const term = termFromTermNode(termNode, context),
                strict = false,
                validates = term.validateGivenType(strict, type, context, (term, context) => {
                  const specificContext = context;  ///

                  return continuation(generalContext, specificContext);
                });

          if (validates) {
            success = true;
          }
        }

        return success;
      }
    }
  ];
}

class UnifyTermWithGeneratorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type !== null) {
          context = specificContext;  ///

          const term = termFromTermNode(termNode, context),
                validates = term.validateGivenType(type, context, (term, context) => {
                  const specificContext = context;  ///

                  return continuation(generalContext, specificContext);
                });

          if (validates) {
            success = true;
          }
        }

        return success;
      }
    }
  ];
}

class UnifyTermWithConstructorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        context = specificContext;  ///

        if (type !== null) {
          const term = termFromTermNode(termNode, context),
                validates = term.validateGivenType(type, context, (term, context) => {
                  const specificContext = context;  ///

                  return continuation(generalContext, specificContext);
                });

          if (validates) {
            success = true;
          }
        }

        return success;
      }
    }
  ];
}

class UnifyStatementWithCombinatorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: (generalMetaTypeNode, specificStatementNode, generalContext, specificContext, continuation) => {
        let success = false;

        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameStatementMetaTypeName = (metaTypeName === STATEMENT_META_TYPE_NAME);

        if (metaTypeNameStatementMetaTypeName) {
          const statementNode = specificStatementNode,  ///
                context = specificContext,  ///
                statement = statementFromStatementNode(statementNode, context),
                validates = statement.validate(context, (statement, context) => {
                  const specificContext = context;  ///

                  return continuation(generalContext, specificContext);
                });

          if (validates) {
            success = true;
          }
        }

        return success;
      }
    },
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalMetaTypeNode, specificFrameNode, generalContext, specificContext, continuation) => {
        let success = false;

        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameFrameMetaTypeName = (metaTypeName === FRAME_META_TYPE_NAME);

        if (metaTypeNameFrameMetaTypeName) {
          const frameNode = specificFrameNode,  ///
                context = specificContext,  ///
                frame = frameFromFrameNode(frameNode, context),
                validates = frame.validate(context, (frame, context) => {
                  const specificContext = context;  ///

                  return continuation(generalContext, specificContext);
                });

          if (validates) {
            success = true;
          }
        }

        return success;
      }
    },
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        let success = false;

        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              validates = term.validateGivenType(type, context, (term, context) => {
                const specificContext = context;  ///

                return continuation(generalContext, specificContext);
              });

        if (validates) {
          success = true;
        }

        return success;
      }
    }
  ];
}

const unifyStatementPass = new UnifyStatementPass(),
      unifyMetavariablePass = new UnifyMetavariablePass(),
      unifyTermInstrinsicallyPass = new UnifyTermIntrinsicallyPass(),
      unifyMetavariableIntrisicallyPass = new UnifyMetavariableIntrisicallyPass(),
      unifyTermWithPropertyPass = new UnifyTermWithPropertyPass(),
      unifyTermWithGeneratorPass = new UnifyTermWithGeneratorPass(),
      unifyTermWithConstructorPass = new UnifyTermWithConstructorPass(),
      unifyStatementWithCombinatorPass = new UnifyStatementWithCombinatorPass();

export function unifyStatement(generalStatement, specificStatement, generalContext, specificContext, continuation) {
  const generalStatementNode = generalStatement.getNode(),
        specificStatementNode = specificStatement.getNode(),
        generalNode = generalStatementNode, ///
        specificNode = specificStatementNode;  ///

  return unifyStatementPass.run(generalNode, specificNode, generalContext, specificContext, continuation);
}

export function unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext, continuation) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode();

  return unifyMetavariablePass.run(generalMetavariableNode, specificMetavariableNode, generalContext, specificContext, continuation);
}

export function unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext, continuation) {
  const generalTermNode = generalTerm.getNode(),
        specificTermNode = specificTerm.getNode(),
        generalNode = generalTermNode, ///
        specificNode = specificTermNode; ///

  return unifyTermInstrinsicallyPass.run(generalNode, specificNode, generalContext, specificContext, continuation);
}

export function unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, continuation) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalNode = generalMetavariableNode, ///
        specificNode = specificMetavariableNode;

  return unifyMetavariableIntrisicallyPass.run(generalNode, specificNode, generalContext, specificContext, continuation);
}

export function unifyTermWithProperty(term, property, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        propertyTerm = property.getTerm(),
        propertyTermNode = propertyTerm.getNode();

  return unifyTermWithPropertyPass.run(propertyTermNode, termNode, generalContext, specificContext, continuation);
}

export function unifyTermWithGenerator(term, generator, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        generatorTerm = generator.getTerm(),
        generatorTermNode = generatorTerm.getNode();

  return unifyTermWithGeneratorPass.run(generatorTermNode, termNode, generalContext, specificContext, continuation);
}

export function unifyTermWithConstructor(term, constructor, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        constructorTerm = constructor.getTerm(),
        constructorTermNode = constructorTerm.getNode();

  return unifyTermWithConstructorPass.run(constructorTermNode, termNode, generalContext, specificContext, continuation);
}

export function unifyStatementWithCombinator(statement, combinator, generalContext, specificContext, continuation) {
  const statementNode = statement.getNode(),
        combinatorStatement = combinator.getStatement(),
        combinatorStatementNode = combinatorStatement.getNode();

  return unifyStatementWithCombinatorPass.run(combinatorStatementNode, statementNode, generalContext, specificContext, continuation);
}

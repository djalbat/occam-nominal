"use strict";

import { queryUtilities } from "occam-query";

import { ContinuationZipPass } from "occam-languages";

import { declare } from "../utilities/state";
import { FRAME_META_TYPE_NAME, STATEMENT_META_TYPE_NAME } from "../metaTypeNames";
import { termFromTermNode, frameFromFrameNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const typeNodeQuery = nodeQuery("/type"),
      termNodeQuery = nodeQuery("/term"),
      frameNodeQuery = nodeQuery("/frame"),
      metaTypeNodeQuery = nodeQuery("/metaType"),
      statementNodeQuery = nodeQuery("/statement"),
      termVariableNodeQuery = nodeQuery("/term/variable!"),
      frameMetavariableNodeQuery = nodeQuery("/frame/metavariable!"),
      statementMetavariableNodeQuery = nodeQuery("/statement/metavariable!");

class UnifyStatementPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: statementMetavariableNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: (generalStatementMetavariableNode, specificStatementNode, generalContext, specificContext, back, forward) => {
        const statementNode = specificStatementNode, ///
              metavariableNode = generalStatementMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const statement = context.findStatementByStatementNode(statementNode);

        return metavariable.unifyStatement(statement, generalContext, specificContext, back, () => {
          return forward(generalContext, specificContext);
        });
      }
    },
    {
      generalNodeQuery: frameMetavariableNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalFrameMetavariableNode, specificFrameNode, generalContext, specificContext, back, forward) => {
        const frameNode = specificFrameNode, ///
              metavariableNode = generalFrameMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const frame = context.findFrameByFrameNode(frameNode);

        return metavariable.unifyFrame(frame, generalContext, specificContext, back, () => {
          return forward(generalContext, specificContext);
        });
      }
    },
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, back, back, () => {
          return forward(generalContext, specificContext);
        });
      }
    }
  ];
}

class UnifyMetavariablePass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, back, forward) => {
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

        if (!termTypeEqualToOrSubTypeOfGivenTypeType) {
          return back();
        }

        return forward(generalContext, specificContext);
      }
    }
  ];
}

class UnifyTermIntrinsicallyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, back, () => {
          return forward(generalContext, specificContext);
        });
      }
    }
  ];
}

class UnifyMetavariableIntrisicallyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, back, () => {
          return forward(generalContext, specificContext);
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
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type === null) {
          return back();
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, back, (term, context) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext);
          });
        });
      }
    }
  ];
}

class UnifyTermWithGeneratorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type === null) {
          return back();
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, back, (term, context) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext);
          });
        });
      }
    }
  ];
}

class UnifyTermWithConstructorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type === null) {
          return back();
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, back, (term, context) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext);
          });
        });
      }
    }
  ];
}

class UnifyStatementWithCombinatorPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: statementNodeQuery,
      run: (generalMetaTypeNode, specificStatementNode, generalContext, specificContext, back, forward) => {
        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameStatementMetaTypeName = (metaTypeName === STATEMENT_META_TYPE_NAME);

        if (!metaTypeNameStatementMetaTypeName) {
          return back();
        }

        const context = specificContext,  ///
              statementNode = specificStatementNode,  ///
              statement = statementFromStatementNode(statementNode, context);

        return declare((state) => {
          return statement.validate(state, context, back, (statement, context) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext);
          });
        });
      }
    },
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalMetaTypeNode, specificFrameNode, generalContext, specificContext, back, forward) => {
        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameFrameMetaTypeName = (metaTypeName === FRAME_META_TYPE_NAME);

        if (metaTypeNameFrameMetaTypeName) {
          return back();
        }

        const frameNode = specificFrameNode,  ///
              context = specificContext,  ///
              frame = frameFromFrameNode(frameNode, context);

        return declare((state) => {
          return frame.validate(state, context, back, (frame, context) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext);
          });
        });
      }
    },
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, back, forward) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type === null) {
          return back();
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, back, (term, context) => {
            const specificContext = context;  ///

            return back(generalContext, specificContext);
          });
        });
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

export function unifyStatement(generalStatement, specificStatement, generalContext, specificContext, back, forward) {
  const generalStatementNode = generalStatement.getNode(),
        specificStatementNode = specificStatement.getNode(),
        generalNode = generalStatementNode, ///
        specificNode = specificStatementNode;  ///

  return unifyStatementPass.run(generalNode, specificNode, generalContext, specificContext, back, forward);
}

export function unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext, back, forward) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalMetavariableChildNodes = generalMetavariableNode.getChildNodes(),  ///
        specificMetavariableChildNodes = specificMetavariableNode.getChildNodes();  ///

  return unifyMetavariablePass.descend(generalMetavariableChildNodes, specificMetavariableChildNodes, generalContext, specificContext, back, forward);
}

export function unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext, back, forward) {
  const generalTermNode = generalTerm.getNode(),
        specificTermNode = specificTerm.getNode(),
        generalNode = generalTermNode, ///
        specificNode = specificTermNode; ///

  return unifyTermInstrinsicallyPass.run(generalNode, specificNode, generalContext, specificContext, back, forward);
}

export function unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, back, forward) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalNode = generalMetavariableNode, ///
        specificNode = specificMetavariableNode;

  return unifyMetavariableIntrisicallyPass.run(generalNode, specificNode, generalContext, specificContext, back, forward);
}

export function unifyTermWithProperty(term, property, generalContext, specificContext, back, forward) {
  const termNode = term.getNode(),
        propertyTerm = property.getTerm(),
        termChildNodes = termNode.getChildNodes(),  ///
        propertyTermNode = propertyTerm.getNode(),
        propertyTermChildNodes = propertyTermNode.getChildNodes();  ///

  return unifyTermWithPropertyPass.descend(propertyTermChildNodes, termChildNodes, generalContext, specificContext, back, forward);
}

export function unifyTermWithGenerator(term, generator, generalContext, specificContext, back, forward) {
  const termNode = term.getNode(),
        generatorTerm = generator.getTerm(),
        termChildNodes = termNode.getChildNodes(),  ///
        generatorTermNode = generatorTerm.getNode(),
        generatorTermChildNodes = generatorTermNode.getChildNodes();  ///

  return unifyTermWithGeneratorPass.descend(generatorTermChildNodes, termChildNodes, generalContext, specificContext, back, forward);
}

export function unifyTermWithConstructor(term, constructor, generalContext, specificContext, back, forward) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes(), ///
        constructorTerm = constructor.getTerm(),
        constructorTermNode = constructorTerm.getNode(),
        constructorTermChildNodes = constructorTermNode.getChildNodes();  ///

  return unifyTermWithConstructorPass.descend(constructorTermChildNodes, termChildNodes, generalContext, specificContext, back, forward);
}

export function unifyStatementWithCombinator(statement, combinator, generalContext, specificContext, back, forward) {
  const statementNode = statement.getNode(),
        combinatorStatement = combinator.getStatement(),
        statementChildNodes = statementNode.getChildNodes(),  ///
        combinatorStatementNode = combinatorStatement.getNode(),
        combinatorStatementChildNodes = combinatorStatementNode.getChildNodes(); ///

  return unifyStatementWithCombinatorPass.descend(combinatorStatementChildNodes, statementChildNodes, generalContext, specificContext, back, forward);
}

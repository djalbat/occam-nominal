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
      run: (generalStatementMetavariableNode, specificStatementNode, generalContext, specificContext, forward, back) => {
        const statementNode = specificStatementNode, ///
              metavariableNode = generalStatementMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const statement = context.findStatementByStatementNode(statementNode);

        return metavariable.unifyStatement(statement, generalContext, specificContext, (back) => {
          return forward(generalContext, specificContext, back);
        }, back);
      }
    },
    {
      generalNodeQuery: frameMetavariableNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalFrameMetavariableNode, specificFrameNode, generalContext, specificContext, forward, back) => {
        const frameNode = specificFrameNode, ///
              metavariableNode = generalFrameMetavariableNode;

        let context;

        context = generalContext; ///

        const metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

        context = specificContext;  ///

        const frame = context.findFrameByFrameNode(frameNode);

        return metavariable.unifyFrame(frame, generalContext, specificContext, (back) => {
          return forward(generalContext, specificContext, back);
        }, back);
      }
    },
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, forward, back) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, (back) => {
          return forward(generalContext, specificContext, back);
        }, back);
      }
    }
  ];
}

class UnifyMetavariablePass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, forward, back) => {
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

        return forward(generalContext, specificContext, back);
      }
    }
  ];
}

class UnifyTermIntrinsicallyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, forward, back) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, (back) => {
          return forward(generalContext, specificContext, back);
        }, back);
      }
    }
  ];
}

class UnifyMetavariableIntrisicallyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: termVariableNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTermVariableNode, specificTermNode, generalContext, specificContext, forward, back) => {
        const termNode = specificTermNode, ///
              variableNode = generalTermVariableNode; ///

        let context;

        context = generalContext; ///

        const variableIdentifier = variableNode.getVariableIdentifier(),
              declaredVariable = context.findDeclaredVariableByVariableIdentifier(variableIdentifier),
              variable = declaredVariable;  ///

        context = specificContext;  ///

        const term = context.findTermByTermNode(termNode);

        return variable.unifyTerm(term, generalContext, specificContext, (back) => {
          return forward(generalContext, specificContext, back);
        }, back);
      }
    }
  ];
}

class UnifyTermWithPropertyPass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, forward, back) => {
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
          return term.validateGivenType(strict, type, state, context, (term, context, back) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext, back);
          }, back);
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
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, forward, back) => {
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
          return term.validateGivenType(strict, type, state, context, (term, context, back) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext, back);
          }, back);
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
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, forward, back) => {
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
          return term.validateGivenType(strict, type, state, context, (term, context, back) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext, back);
          }, back);
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
      run: (generalMetaTypeNode, specificStatementNode, generalContext, specificContext, forward, back) => {
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
          return statement.validate(state, context, (statement, context, back) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext, back);
          }, back);
        });
      }
    },
    {
      generalNodeQuery: metaTypeNodeQuery,
      specificNodeQuery: frameNodeQuery,
      run: (generalMetaTypeNode, specificFrameNode, generalContext, specificContext, forward, back) => {
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
          return frame.validate(state, context, (frame, context, back) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext, back);
          }, back);
        });
      }
    },
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, forward, back) => {
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
          return term.validateGivenType(strict, type, state, context, (term, context, back) => {
            const specificContext = context;  ///

            return forward(generalContext, specificContext, back);
          }, back);
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

export function unifyStatement(generalStatement, specificStatement, generalContext, specificContext, forward, back) {
  const generalStatementNode = generalStatement.getNode(),
        specificStatementNode = specificStatement.getNode(),
        generalNode = generalStatementNode, ///
        specificNode = specificStatementNode;  ///

  return unifyStatementPass.run(generalNode, specificNode, generalContext, specificContext, forward, back);
}

export function unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext, forward, back) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalMetavariableChildNodes = generalMetavariableNode.getChildNodes(),  ///
        specificMetavariableChildNodes = specificMetavariableNode.getChildNodes();  ///

  return unifyMetavariablePass.descend(generalMetavariableChildNodes, specificMetavariableChildNodes, generalContext, specificContext, forward, back);
}

export function unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext, forward, back) {
  const generalTermNode = generalTerm.getNode(),
        specificTermNode = specificTerm.getNode(),
        generalNode = generalTermNode, ///
        specificNode = specificTermNode; ///

  return unifyTermInstrinsicallyPass.run(generalNode, specificNode, generalContext, specificContext, forward, back);
}

export function unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, forward, back) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalNode = generalMetavariableNode, ///
        specificNode = specificMetavariableNode;

  return unifyMetavariableIntrisicallyPass.run(generalNode, specificNode, generalContext, specificContext, forward, back);
}

export function unifyTermWithProperty(term, property, generalContext, specificContext, forward, back) {
  const termNode = term.getNode(),
        propertyTerm = property.getTerm(),
        termChildNodes = termNode.getChildNodes(),  ///
        propertyTermNode = propertyTerm.getNode(),
        propertyTermChildNodes = propertyTermNode.getChildNodes();  ///

  return unifyTermWithPropertyPass.descend(propertyTermChildNodes, termChildNodes, generalContext, specificContext, forward, back);
}

export function unifyTermWithGenerator(term, generator, generalContext, specificContext, forward, back) {
  const termNode = term.getNode(),
        generatorTerm = generator.getTerm(),
        termChildNodes = termNode.getChildNodes(),  ///
        generatorTermNode = generatorTerm.getNode(),
        generatorTermChildNodes = generatorTermNode.getChildNodes();  ///

  return unifyTermWithGeneratorPass.descend(generatorTermChildNodes, termChildNodes, generalContext, specificContext, forward, back);
}

export function unifyTermWithConstructor(term, constructor, generalContext, specificContext, forward, back) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes(), ///
        constructorTerm = constructor.getTerm(),
        constructorTermNode = constructorTerm.getNode(),
        constructorTermChildNodes = constructorTermNode.getChildNodes();  ///

  return unifyTermWithConstructorPass.descend(constructorTermChildNodes, termChildNodes, generalContext, specificContext, forward, back);
}

export function unifyStatementWithCombinator(statement, combinator, generalContext, specificContext, forward, back) {
  const statementNode = statement.getNode(),
        combinatorStatement = combinator.getStatement(),
        statementChildNodes = statementNode.getChildNodes(),  ///
        combinatorStatementNode = combinatorStatement.getNode(),
        combinatorStatementChildNodes = combinatorStatementNode.getChildNodes(); ///

  return unifyStatementWithCombinatorPass.descend(combinatorStatementChildNodes, statementChildNodes, generalContext, specificContext, forward, back);
}

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
    }
  ];
}

class UnifyMetavariablePass extends ContinuationZipPass {
  static maps = [
    {
      generalNodeQuery: typeNodeQuery,
      specificNodeQuery: termNodeQuery,
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
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

        let success = false;

        if (termTypeEqualToOrSubTypeOfGivenTypeType) {
          success = true;
        }

        return continuation(success, generalContext, specificContext);
      }
    }
  ];
}

class UnifyTermIntrinsicallyPass extends ContinuationZipPass {
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

          return continuation(success, generalContext, specificContext);
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
    }
  ];
}

class UnifyTermWithPropertyPass extends ContinuationZipPass {
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

        if (type === null) {
          const success = false;

          return continuation(success, generalContext, specificContext);
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, (term, context) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            const specificContext = context;  ///

            return continuation(success, generalContext, specificContext);
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
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type === null) {
          const success = false;

          return continuation(success, generalContext, specificContext);
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, (term, context) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            const specificContext = context;  ///

            return continuation(success, generalContext, specificContext);
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
      run: (generalTypeNode, specificTermNode, generalContext, specificContext, continuation) => {
        const typeNode = generalTypeNode, ///
              termNode = specificTermNode, ///
              nominalTypeName = typeNode.getNominalTypeName();

        let context;

        context = generalContext; ///

        const type = context.findTypeByNominalTypeName(nominalTypeName);

        if (type === null) {
          const success = false;

          return continuation(success, generalContext, specificContext);
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, (term, context) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            const specificContext = context;  ///

            return continuation(success, generalContext, specificContext);
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
      run: (generalMetaTypeNode, specificStatementNode, generalContext, specificContext, continuation) => {
        const metaTypeNode = generalMetaTypeNode, ///
              metaTypeName = metaTypeNode.getMetaTypeName(),
              metaTypeNameStatementMetaTypeName = (metaTypeName === STATEMENT_META_TYPE_NAME);

        if (!metaTypeNameStatementMetaTypeName) {
          const success = false;

          return continuation(success, generalContext, specificContext);
        }

        const context = specificContext,  ///
              statementNode = specificStatementNode,  ///
              statement = statementFromStatementNode(statementNode, context);

        return declare((state) => {
          return statement.validate(state, context, (statement, context) => {
            let success = false;

            if (statement !== null) {
              success = true;
            }

            const specificContext = context;  ///

            return continuation(success, generalContext, specificContext);
          });
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

        if (metaTypeNameFrameMetaTypeName) {
          const success = false;

          return continuation(success, generalContext, specificContext);
        }

        const frameNode = specificFrameNode,  ///
              context = specificContext,  ///
              frame = frameFromFrameNode(frameNode, context);

        return declare((state) => {
          return frame.validate(state, context, (frame, context) => {
            let success = false;

            if (frame !== null) {
              success = true;
            }

            const specificContext = context;  ///

            return continuation(success, generalContext, specificContext);
          });
        });
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

        if (type === null) {
          const success = false;

          return continuation(success, generalContext, specificContext);
        }

        context = specificContext;  ///

        const term = termFromTermNode(termNode, context),
              strict = false;

        return declare((state) => {
          return term.validateGivenType(strict, type, state, context, (term, context) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            const specificContext = context;  ///

            return continuation(success, generalContext, specificContext);
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

export function unifyStatement(generalStatement, specificStatement, generalContext, specificContext, continuation) {
  const generalStatementNode = generalStatement.getNode(),
        specificStatementNode = specificStatement.getNode(),
        generalNode = generalStatementNode, ///
        specificNode = specificStatementNode;  ///

  return unifyStatementPass.run(generalNode, specificNode, generalContext, specificContext, (success, generalContext, specificContext) => {
    let statementUnifies = false;

    if (success) {
      statementUnifies = true;
    }

    return continuation(statementUnifies, generalContext, specificContext);
  });
}

export function unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext, continuation) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalMetavariableChildNodes = generalMetavariableNode.getChildNodes(),  ///
        specificMetavariableChildNodes = specificMetavariableNode.getChildNodes();  ///

  return unifyMetavariablePass.descend(generalMetavariableChildNodes, specificMetavariableChildNodes, generalContext, specificContext, (descended, generalContext, specificContext) => {
    let metavaraibleUnifies = false;

    if (descended) {
      metavaraibleUnifies = true;
    }

    return continuation(metavaraibleUnifies, generalContext, specificContext);
  });
}

export function unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext, continuation) {
  const generalTermNode = generalTerm.getNode(),
        specificTermNode = specificTerm.getNode(),
        generalNode = generalTermNode, ///
        specificNode = specificTermNode; ///

  return unifyTermInstrinsicallyPass.run(generalNode, specificNode, generalContext, specificContext, (success, generalContext, specificContext) => {
    let termUnifiesIntrinsically = false;

    if (success) {
      termUnifiesIntrinsically = true;
    }

    return continuation(termUnifiesIntrinsically, generalContext, specificContext);
  });
}

export function unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, continuation) {
  const generalMetavariableNode = generalMetavariable.getNode(),
        specificMetavariableNode = specificMetavariable.getNode(),
        generalNode = generalMetavariableNode, ///
        specificNode = specificMetavariableNode;

  return unifyMetavariableIntrisicallyPass.run(generalNode, specificNode, generalContext, specificContext, (success, generalContext, specificContext) => {
    let metavaraibleUnifiesIntrinsically = false;

    if (success) {
      metavaraibleUnifiesIntrinsically = true;
    }

    return continuation(metavaraibleUnifiesIntrinsically, generalContext, specificContext);
  });
}

export function unifyTermWithProperty(term, property, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        propertyTerm = property.getTerm(),
        termChildNodes = termNode.getChildNodes(),  ///
        propertyTermNode = propertyTerm.getNode(),
        propertyTermChildNodes = propertyTermNode.getChildNodes();  ///

  unifyTermWithPropertyPass.descend(propertyTermChildNodes, termChildNodes, generalContext, specificContext, (descended, generalContext, specificContext) => {
    let termUnifiesWithProperty = false;

    if (descended) {
      termUnifiesWithProperty = true;
    }

    return continuation(termUnifiesWithProperty, generalContext, specificContext);
  });
}

export function unifyTermWithGenerator(term, generator, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        generatorTerm = generator.getTerm(),
        termChildNodes = termNode.getChildNodes(),  ///
        generatorTermNode = generatorTerm.getNode(),
        generatorTermChildNodes = generatorTermNode.getChildNodes();  ///

  return unifyTermWithGeneratorPass.descend(generatorTermChildNodes, termChildNodes, generalContext, specificContext, (descnded) => {
    let termUNifiesWithCombinator = false;

    if (descnded) {
      termUNifiesWithCombinator = true;
    }

    return continuation(termUNifiesWithCombinator, generalContext, specificContext);
  });
}

export function unifyTermWithConstructor(term, constructor, generalContext, specificContext, continuation) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes(), ///
        constructorTerm = constructor.getTerm(),
        constructorTermNode = constructorTerm.getNode(),
        constructorTermChildNodes = constructorTermNode.getChildNodes();  ///

  return unifyTermWithConstructorPass.descend(constructorTermChildNodes, termChildNodes, generalContext, specificContext, continuation, (descended, generalContext, specificContext) => {
    let termUnifiesWithCConstructor = false;

    if (descended) {
      termUnifiesWithCConstructor = true;
    }

    return continuation(termUnifiesWithCConstructor, generalContext, specificContext);
  });
}

export function unifyStatementWithCombinator(statement, combinator, generalContext, specificContext, continuation) {
  const statementNode = statement.getNode(),
        combinatorStatement = combinator.getStatement(),
        statementChildNodes = statementNode.getChildNodes(),  ///
        combinatorStatementNode = combinatorStatement.getNode(),
        combinatorStatementChildNodes = combinatorStatementNode.getChildNodes(); ///

  return unifyStatementWithCombinatorPass.descend(combinatorStatementChildNodes, statementChildNodes, generalContext, specificContext, (descended, generalContext, specificContext) => {
    let statementUnifiesWithCombinator = false;

    if (descended) {
      statementUnifiesWithCombinator = true;
    }

    return continuation(statementUnifiesWithCombinator, generalContext, specificContext);
  });
}

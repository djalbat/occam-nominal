"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { declare, desist } from "../utilities/state";
import { instantiateMetavariable } from "../process/instantiate";
import { metaTypeFromJSON, metaTypeToMetaTypeJSON } from "../utilities/json";
import { unifyMetavariable, unifyMetavariableIntrinsically } from "../process/unify";
import { nameFromMetavariableNode, termFromMetavariableNode, typeFromMetavariableNode, metavariableFromStatementNode } from "../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Metavariable extends Element {
  constructor(context, string, node, breakPoint, name, term, type, metaType) {
    super(context, string, node, breakPoint);
    
    this.name = name;
    this.term = term;
    this.type = type;
    this.metaType = metaType;
  }

  getName() {
    return this.name;
  }

  getTerm() {
    return this.term;
  }

  getType() {
    return this.type;
  }

  getMetaType() {
    return this.metaType;
  }

  setMetaType(metaType) {
    this.metaType = metaType;
  }

  getMetavariableNode() {
    const node = this.getNode(),
          metavariableNode = node;  ///

    return metavariableNode;
  }

  getMetavariableName() {
    const metavariableNode = this.getMetavariableNode(),
          metavariableName = metavariableNode.getMetavariableName();

    return metavariableName;
  }

  isDeclared() {
    const declared = (this.metaType !== null);

    return declared;
  }

  isEqualTo(metavariable) {
    const metavariableNode = metavariable.getNode(),
          metavariableNodeMatches = this.matchMetavariableNode(metavariableNode),
          equalTo = metavariableNodeMatches;  ///

    return equalTo;
  }

  isMetaTypeEqualTo(metaType) { return this.metaType.isEqualTo(metaType); }

  matchMetavariableNode(metavariableNode) {
    const node = metavariableNode, ///
          nodeMatches = this.matchNode(node),
          metavariableNodeMatches = nodeMatches; ///

    return metavariableNodeMatches;
  }

  findMetavariable(context) {
    const metavariableNode = this.getMetavariableNode(),
          metavariable = context.findMetavariableByMetavariableNode(metavariableNode);

    return metavariable;
  }

  compareMetavariable(metavariable) {
    const metavariableName = metavariable.getName(),
          comparesToMetavariableName = this.compareMetavariableName(metavariableName),
          comparesToMetavariable = comparesToMetavariableName;  ///

    return comparesToMetavariable;
  }

  compareMetavariableName(metavariableName) {
    const nameMetavariableName = (this.name === metavariableName),
          comparesToMetavariableName = nameMetavariableName;  ///

    return comparesToMetavariableName;
  }

  verify(context) {
    let verifies = false;

    const metavariableString = this.getString();  ///

    context.trace(`Verifying the '${metavariableString}' metavariable...`);

    const termVerifies = this.verifyTerm(context);

    if (termVerifies) {
      const typeVerifies = this.verifyType(context);

      if (typeVerifies) {
        verifies = true;
      }
    }

    if (verifies) {
      context.debug(`...verified the '${metavariableString}' metavariable.`);
    }

    return verifies;
  }

  verifyTerm(context) {
    let termVerifies = true;  ///

    if (this.term !== null) {
      const termString = this.term.getString(),
            metavariableString = this.getString();

      termVerifies = false;

      context.trace(`A '${termString}' term is present in the '${metavariableString}' metavariable.`);
    }

    return termVerifies;
  }

  verifyType(context) {
    let typeVerifies = true;  ///

    if (this.type !== null) {
      const metavariableString = this.getString();  ///

      context.trace(`Verifying the '${metavariableString}' metavariable's type...`);

      const typeName = this.type.getName(),
            type = context.findTypeByTypeName(typeName);

      if (type !== null) {
        this.type = type;

        typeVerifies = true;
      }

      if (typeVerifies) {
        context.debug(`...verifieds the '${metavariableString}' metavariable's type.`);
      }
    }

    return typeVerifies;
  }

  validate(strict, state, context, continuation) {
    if (continuation === undefined) {
      continuation = context; ///

      context = state;

      state = strict; ///

      strict = false;
    }

    let validates;

    const metavariableString = this.getString(); ///

    context.trace(`Validating the '${metavariableString}' metavariable...`);

    let metavariable;

    metavariable = this.findMetavariable(context);

    if (metavariable !== null) {
      context.debug(`...the '${metavariableString}' metavariable is already present.`);

      validates = continuation(metavariable, context);
    } else {
      metavariable = this;  ///

      const validateName = this.validateName.bind(this),
            validateType = this.validateType.bind(this),
            validateTerm = this.validateTerm.bind(this);

      validates = all([
        validateName,
        validateType,
        validateTerm
      ], strict, state, context, (strict, state, context) => {
        let validates;

        context.addMetavariable(metavariable);

        validates = continuation(metavariable, context);

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${metavariableString}' metavariable.`);
    }

    return validates;
  }

  validateName(strict, state, context, continuation) {
    let nameValidates = true; ///

    const metavariableString = this.getString();  ///

    context.trace(`Validating the '${metavariableString}' metavariable's name...`);

    const metavariableName = this.getMetavariableName(),  ///
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    if (declaredMetavariable !== null) {
      const metaType = declaredMetavariable.getMetaType(),
            metaTypeString = metaType.getString();

      this.metaType = metaType;

      context.trace(`Setting the '${metavariableString}' metavariable's meta-type to the '${metaTypeString}' meta-type.`);
    } else {
      if (strict) {
        nameValidates = false;
      }
    }

    if (nameValidates) {
      nameValidates = continuation(strict, state, context);
    }

    if (nameValidates) {
      context.debug(`...validated the '${metavariableString}' metavariable's name.`);
    }

    return nameValidates;
  }

  validateType(strict, state, context, continuation) {
    let typeValidates;

    if (this.type !== null) {
      const metavariableString = this.getString();  ///

      context.trace(`Validating  the '${metavariableString}' metavariable's type...`);

      typeValidates = false;

      const typeName = this.type.getName(),
            typePresenet = context.isTypePresentByTypeName(typeName);

      if (typePresenet) {
        typeValidates = continuation(strict, state, context);
      }

      if (typeValidates) {
        context.trace(`...validated  the '${metavariableString}' metavariable's type.`);
      }
    } else {
      typeValidates = continuation(strict, state, context);
    }

    return typeValidates;
  }

  validateTerm(strict, state, context, continuation) {
    let termValidates;

    if (this.term !== null) {
      const metavariableString = this.getString();  ///

      context.trace(`Validating the '${metavariableString}' metavariable's term...`);

      const metavariableName = this.getMetavariableName(),
            declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

      if (declaredMetavariable === null) {
        if (strict) {
          termValidates = continuation(strict, state, context);
        } else {
          termValidates = this.term.validate(state, context, (term, context) => {
            let validates;

            this.term = term;

            validates = continuation(strict, state, context);

            return validates;
          });
        }
      } else {
        const type = declaredMetavariable.getType();

        if (type === null) {
          termValidates = continuation(strict, state, context);
        } else {
          termValidates = false;

          const termValidatesGivenType = this.term.validateGivenType(type, state, context, (term, context) => {
            let validatesGivenType;

            this.term = term;

            validatesGivenType = continuation(strict, state, context);

            return validatesGivenType;
          });

          if (termValidatesGivenType) {
            termValidates = true;
          }
        }
      }

      if (termValidates) {
        context.debug(`...validated the '${metavariableString}' metavariable's term.`);
      }
    } else {
      termValidates = continuation(strict, state, context);
    }

    return termValidates;
  }

  unifyFrame(frame, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          frameString = frame.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${frameString}' frame with the '${metavariableString}}' metavariable...`);

    const frameMetavariableCompares = this.compareFrameMetavariable(frame, generalContext, specificContext);

    if (frameMetavariableCompares) {
      const frameUnifies = true;

      return continuation(frameUnifies);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
      let frameUnifies = false;

      const inferredSubstitutionComparesToTerm = inferredSubstitution.compareFrame(frame, context);

      if (inferredSubstitutionComparesToTerm) {
        const inferredSubstitutionString = inferredSubstitution.getString();

        context.trace(`The '${inferredSubstitutionString}' inferred substitution is already present.`);

        frameUnifies = true;
      }

      return continuation(frameUnifies);
    }

    const { FrameSubstitution } = elements,
          frameSubstitution = FrameSubstitution.fromFrameAndMetavariable(frame, metavariable, generalContext, specificContext);

    declare((state) => {
      desist((state) => {
        frameSubstitution.validate(state, context, (frameSubstitution, context) => {
          let validates;

          const inferredSubstitution = frameSubstitution;  ///

          context.addInferredSubstitution(inferredSubstitution);

          validates = true;

          return validates;
        });
      }, state)
    });

    const frameUnifies = true;

    if (frameUnifies) {
      context.debug(`...unified the '${frameString}' frame with the '${metavariableString}' variable.`);
    }

    return continuation(frameUnifies);
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${metavariableString}}' metavariable...`);

    const statementMetavariableCompares = this.compareStatementMetavariable(statement, generalContext, specificContext);

    if (statementMetavariableCompares) {
      const statementUnifies = true;

      return continuation(statementUnifies);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          sublingSubstitutionNode = metavariableNode.getSiblingSubstitutionNode(),
          substitutionNode = sublingSubstitutionNode, ///
          inferredSubstitution = (substitutionNode !== null) ?
                                  context.findInferredSubstitutionByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode) :
                                    context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
      let statementUnifies = false;

      const inferredSubstitutionComparesToStatement = inferredSubstitution.compareStatement(statement, context);

      if (inferredSubstitutionComparesToStatement) {
        const inferredSubstitutionString = inferredSubstitution.getString();

        context.trace(`The '${inferredSubstitutionString}' inferred substitution is already present.`);

        statementUnifies = true;
      }

      return continuation(statementUnifies);
    }

    const { StatementSubstitution } = elements;

    let statementSubstitution;

    if (substitutionNode !== null) {
      const context = generalContext, ///
            substitution = context.findSubstitutionBySubstitutionNode(substitutionNode);

      statementSubstitution = StatementSubstitution.fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext);
    } else {
      statementSubstitution = StatementSubstitution.fromStatementAndMetavariable(statement, metavariable, generalContext, specificContext);
    }

    declare((state) => {
      desist((state) => {
        statementSubstitution.validate(state, context, (statementSubstitution, context) => {
          let validates;

          const inferredSubstitution = statementSubstitution;  ///

          context.addInferredSubstitution(inferredSubstitution);

          validates = true;

          return validates;
        });
      }, state);
    });

    const statementUnifies = true;

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${metavariableString}' metavariable.`);
    }

    return continuation(statementUnifies);
  }

  unifyReference(reference, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          referenceString = reference.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${metavariableString}}' metavariable...`);

    const referenceMetavariableCompares = this.compareReferenceMetavariable(reference, generalContext, specificContext);

    if (referenceMetavariableCompares) {
      const referenceUnifies = true;

      return continuation(referenceUnifies);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
      let referenceUnifies = false;

      const inferredSubstitutionComparesToTerm = inferredSubstitution.compareTerm(reference, context);

      if (inferredSubstitutionComparesToTerm) {
        const inferredSubstitutionString = inferredSubstitution.getString();

        context.trace(`The '${inferredSubstitutionString}' inferred substitution is already present.`);

        referenceUnifies = true;
      }

      return continuation(referenceUnifies);
    }

    const { ReferenceSubstitution } = elements,
          referenceSubstitution = ReferenceSubstitution.fromReferenceAndMetavariable(reference, metavariable, generalContext, specificContext);

    declare((state) => {
      desist((state) => {
        referenceSubstitution.validate(state, context, (referenceSubstitution, context) => {
          let validates;

          const inferredSubstitution = referenceSubstitution;  ///

          context.addInferredSubstitution(inferredSubstitution);

          validates = true;

          return validates;
        });
      }, state);
    });

    const referenceUnifies = true;

    if (referenceUnifies) {
      context.debug(`...unified the '${referenceString}' reference with the '${metavariableString}' variable.`);
    }

    return continuation(referenceUnifies);
  }

  unifyMetavariable(metavariable, context, continuation) {
    let metavariableUnifies;

    debugger

    const generalContext = context, ///
          specificContext = context,  ///
          generalMetavariable = this, ///
          specificMetavariable = metavariable,  ///
          generalMetavariableString = generalMetavariable.getString(),
          specificMetavariableString = specificMetavariable.getString();

    context.trace(`Unifying the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable...`);

    metavariableUnifies = unifyMetavariable(generalMetavariable, specificMetavariable, generalContext, specificContext);

    if (metavariableUnifies) {
      context.debug(`...unified the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable.`);
    }

    return metavariableUnifies;
  }

  unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          generalMetavariable = this, ///
          specificMetavariable = metavariable,
          generalMetavariableString = generalMetavariable.getString(),  ///
          specificMetavariableString = specificMetavariable.getString();

    context.trace(`Unifying the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically...`);

    return unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, (metavariableUnifiesIntrinsically) => {
      if (metavariableUnifiesIntrinsically) {
        context.debug(`...unified the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically.`);
      }

      return continuation(metavariableUnifiesIntrinsically);
    });
  }

  compareFrameMetavariable(frame, generalContext, specificContext) {
    let frameMetavariablCompares = false;

    const context = specificContext,  ///
          frameString = frame.getString(),
          metavariableString = this.getString();  ///

    context.trace(`Comparing the '${frameString}' frame's metavariable to the '${metavariableString}' metavariable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const metavariableNode = this.getMetavariableNode(),  ///
            metavariableNodeMatches = frame.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        frameMetavariablCompares = true;
      }
    }

    if (frameMetavariablCompares) {
      context.debug(`...compared the '${frameString}' frame's metavariable to the '${metavariableString}' metavariable.`);
    }

    return frameMetavariablCompares;
  }

  compareReferenceMetavariable(reference, generalContext, specificContext) {
    let referenceMetavariableCompares = false;

    const context = specificContext,  ///
          referenceString = reference.getString(),
          metavariableString = this.getString();

    context.trace(`Comparing the '${referenceString}' reference's metavariable to the '${metavariableString}' metavariable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const metavariableNode = this.getMetavariableNode(),
            metavariableNodeMatches = reference.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        referenceMetavariableCompares = true;
      }
    }

    if (referenceMetavariableCompares) {
      context.trace(`...compared the '${referenceString}' reference's metavariable to the '${metavariableString}' metavariable.`);
    }

    return referenceMetavariableCompares;
  }

  compareStatementMetavariable(statement, generalContext, specificContext) {
    let statementMetavariableCompares = false;

    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString();  ///

    context.trace(`Comparing the '${statementString}' statement's metavariable to the '${metavariableString}' metavariable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const metavariableNode = this.getMetavariableNode(),
            metavariableNodeMatches = statement.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        statementMetavariableCompares = true;
      }
    }

    if (statementMetavariableCompares) {
      context.debug(`...compared the '${statementString}' statement's metavariable to the '${metavariableString}' metavariable.`);
    }

    return statementMetavariableCompares;
  }

  toJSON() {
    const metaTypeJSON = metaTypeToMetaTypeJSON(this.metaType),
          metaType = metaTypeJSON,  ///
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint,
      metaType
    };

    return json;
  }

  static name = "Metavariable";

  static fromJSON(json, context) {
    let metavariable;

    instantiate((context) => {
      const { string } = json,
            metavariableNode = instantiateMetavariable(string, context),
            node = metavariableNode,  ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromMetavariableNode(metavariableNode, context),
            term = termFromMetavariableNode(metavariableNode, context),
            type = typeFromMetavariableNode(metavariableNode, context),
            metaType = metaTypeFromJSON(json, context);

      metavariable = new Metavariable(context, string, node, breakPoint, name, term, type, metaType);
    }, context);

    return metavariable;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          metavariable = metavariableFromStatementNode(statementNode, context);

    return metavariable;
  }
});

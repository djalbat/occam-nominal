"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { EMPTY_STRING } from "../constants";
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

  findValidMetavariable(context) {
    const metavariableNode = this.getMetavariableNode(),
          metavariable = context.findMetavariableByMetavariableNode(metavariableNode),
          validMetavariable = metavariable; ///

    return validMetavariable;
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

  validate(strict, context, continuation) {
    if (continuation === undefined) {
      continuation = context; ///

      context = strict; ///

      strict = false;
    }

    const metavariableString = this.getString(); ///

    context.trace(`Validating the '${metavariableString}' metavariable...`);

    const validMetavariable = this.findValidMetavariable(context);

    if (validMetavariable !== null) {
      const metavariable = validMetavariable; ///

      context.debug(`...the '${metavariableString}' metavariable is already valid.`);

      continuation(metavariable);

      return;
    }

    const validateName = this.validateName.bind(this),
          validateTerm = this.validateTerm.bind(this),
          validateType = this.validateType.bind(this);

    all([
      validateName,
      validateTerm,
      validateType
    ], strict, context, (validated) => {
      let metavariable = null;

      if (validated) {
        metavariable = this;  ///

        const metavariableName = this.getMetavariableName(),  ///
              declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

        if (declaredMetavariable !== null) {
          context.addMetavariable(metavariable);
        }

        context.debug(`...validated the '${metavariableString}' metavariable.`);
      }

      continuation(metavariable);
    });
  }

  validateName(strict, context, continuation) {
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
      context.debug(`...validated the '${metavariableString}' metavariable's name.`);
    }

    continuation(nameValidates);
  }

  validateTerm(strict, context, continuation) {
    if (this.term === null) {
      const termValidates = true;

      continuation(termValidates);

      return;
    }

    const metavariableString = this.getString();  ///

    context.trace(`Validating the '${metavariableString}' metavariable's term...`);

    let termValidates = false;

    const metavariableName = this.getMetavariableName(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    let term = null;

    if (declaredMetavariable !== null) {
      const type = declaredMetavariable.getType();

      if (type !== null) {
        term = this.term.validateGivenType(type, context);
      }
    } else {
      if (!strict) {
        term = this.term.validate(context, async (term, context) => {
          const validatesForwards = true;

          return validatesForwards;
        });
      }
    }

    if (term !== null) {
      this.term = term;

      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${metavariableString}' metavariable's term.`);
    }
  }

  validateType(strict, context, continuation) {
    if (this.type === null) {
      const typeValidates = true;

      continuation(typeValidates);

      return;
    }

    let typeValidates;

    const metavariableString = this.getString();  ///

    context.trace(`Validating  the '${metavariableString}' metavariable's type...`);

    typeValidates = false;

    const typeString = this.type.getString();

    context.trace(`A '${typeString}' type is present in the '${metavariableString}' metavariable.`);

    if (typeValidates) {
      context.trace(`...validated  the '${metavariableString}' metavariable's type.`);
    }

    continuation(typeValidates);
  }

  unifyFrame(frame, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          frameString = frame.getString(),
          metavariableString = this.getString(); ///

    context.trace(`Unifying the '${frameString}' frame with the '${metavariableString}' metavariable...`);

    const frameMetavariablCompares = this.compareFraemMetavaraible(frame, generalContext, specificContext);

    if (frameMetavariablCompares) {
      const frameUnifies = true;

      return continuation(frameUnifies);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          derivedSubstitution = context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

    if (derivedSubstitution !== null) {
      let frameUnifies = false;

      const derivedSubstitutionFrameComparesToFrame = derivedSubstitution.compareFrame(frame, context);

      if (derivedSubstitutionFrameComparesToFrame) {
        const derivedSubstitutionString = derivedSubstitution.getString();

        context.trace(`The '${derivedSubstitutionString}' derived substitution is already present.`);

        frameUnifies = true;
      }

      return continuation(frameUnifies);
    }

    const { FrameSubstitution } = elements,
          frameSubstitution = FrameSubstitution.fromFrameAndMetavariable(frame, metavariable, generalContext, specificContext);

    frameSubstitution.validate(context, (frameSubstitution) => {
      let frameUnifies = false;

      if (frameSubstitution !== null) {
        const derivedSubstitution = frameSubstitution;  ///

        context.addDerivedSubstitution(derivedSubstitution);

        frameUnifies = true;
      }

      if (frameUnifies) {
        context.debug(`...unified the '${frameString}' frame with the '${metavariableString}' metavariable.`);
      }

      return continuation(frameUnifies);
    });
  }

  unifyStatement(statement, substitution, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString(), ///
          substitutionString = (substitution !== null) ?
                                  substitution.getString() :
                                    EMPTY_STRING;

    context.trace(`Unifying the '${statementString}' statement with the '${metavariableString}${substitutionString}' metavariable...`);

    this.compareStatementMetavariable(statement, generalContext, specificContext, (statementMetavariableCompares) => {
      if (statementMetavariableCompares) {
        const statementUnifies = true;

        return continuation(statementUnifies);
      }

      const metavariable = this,  ///
            metavariableNode = metavariable.getNode(),
            derivedSubstitution = (substitution !== null) ?
                                    context.findDerivedSubstitutionByMetavariableNodeAndSubstitution(metavariableNode, substitution) :
                                      context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

      if (derivedSubstitution !== null) {
        let statementUnifies = false;

        const derivedSubstitutionComparesToStatement = derivedSubstitution.compareStatement(statement, context);

        if (derivedSubstitutionComparesToStatement) {
          const derivedSubstitutionString = derivedSubstitution.getString();

          context.trace(`The '${derivedSubstitutionString}' derived substitution is already present.`);

          statementUnifies = true;
        }

        return continuation(statementUnifies);
      }

      const { StatementSubstitution } = elements,
            statementSubstitution = (substitution !== null) ?
                                      StatementSubstitution.fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext) :
                                        StatementSubstitution.fromStatementAndMetavariable(statement, metavariable, generalContext, specificContext);

      statementSubstitution.validate(substitution, context, (statementSubstitution) => {
        const derivedSubstitution = statementSubstitution;  ///

        context.addDerivedSubstitution(derivedSubstitution);

        const statementUnifies = true;

        if (statementUnifies) {
          context.debug(`...unified the '${statementString}' statement with the '${metavariableString}${substitutionString}' metavariable.`);
        }

        return continuation(statementUnifies);
      });
    });
  }

  unifyReference(reference, generalContext, specificContext) {
    let referenceUnifies = false;

    const context = specificContext,  ///
          referenceString = reference.getString(),
          metavariableString = this.getString(); ///

    context.trace(`Unifying the '${referenceString}' reference with the '${metavariableString}' metavariable...`);

    const metavariable = this,  ///
          referenceMetavariableCompares = this.compareReferenceMetavariable(reference, generalContext, specificContext);

    if (referenceMetavariableCompares) {
      referenceUnifies = true;
    } else {
      const metavariableNode = metavariable.getNode(),
            derivedSubstitution = context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

      if (derivedSubstitution !== null) {
        const derivedSubstitutionReferenceComparesToReference = derivedSubstitution.compareReference(reference, context);

        if (derivedSubstitutionReferenceComparesToReference) {
          const derivedSubstitutionString = derivedSubstitution.getString();

          context.trace(`The '${derivedSubstitutionString}' derived substitution is already present.`);

          referenceUnifies = true;
        }
      } else {
        const { ReferenceSubstitution } = elements;

        let referenceSubstitution;

        referenceSubstitution = ReferenceSubstitution.fromReferenceAndMetavariable(reference, metavariable, generalContext, specificContext);

        referenceSubstitution = referenceSubstitution.validate(context);  ///

        const derivedSubstitution = referenceSubstitution;  ///

        context.addDerivedSubstitution(derivedSubstitution);

        referenceUnifies = true;
      }
    }

    if (referenceUnifies) {
      context.debug(`...unified the '${referenceString}' reference with the '${metavariableString}' metavariable.`);
    }

    return referenceUnifies;
  }

  unifyMetavariable(metavariable, context) {
    let metavariableUnifies;

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

    unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, (metavariableUnifiesIntrinsically) => {
      if (metavariableUnifiesIntrinsically) {
        context.debug(`...unified the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically.`);
      }

      return continuation(metavariableUnifiesIntrinsically);
    });
  }

  compareFraemMetavaraible(frame, generalContext, specificContext) {
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

  compareStatementMetavariable(statement, generalContext, specificContext, continuation) {
    let statementMetavariableCompares = false;

    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString();  ///

    context.trace(`Compares the '${statementString}' statement's metavariable to the '${metavariableString}' metavariable...`);

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

    continuation(statementMetavariableCompares);
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
    return instantiate((context) => {
      const { string } = json,
            metavariableNode = instantiateMetavariable(string, context),
            node = metavariableNode,  ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromMetavariableNode(metavariableNode, context),
            term = termFromMetavariableNode(metavariableNode, context),
            type = typeFromMetavariableNode(metavariableNode, context),
            metaType = metaTypeFromJSON(json, context),
            metavariable = new Metavariable(context, string, node, breakPoint, name, term, type, metaType);

      return metavariable;
    }, context);
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          metavariable = metavariableFromStatementNode(statementNode, context);

    return metavariable;
  }
});

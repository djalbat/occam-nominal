"use strict";

import { Element } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { EMPTY_STRING } from "../constants";
import { instantiateMetavariable } from "../process/instantiate";
import { metaTypeFromJSON, metaTypeToMetaTypeJSON } from "../utilities/json";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { unifyMetavariable, unifyMetavariableIntrinsically } from "../process/unify";
import { nameFromMetavariableNode, termFromMetavariableNode, typeFromMetavariableNode, metavariableFromStatementNode } from "../utilities/element";

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

  isDeclared(context) {
    const metavariableName = this.getMetavariableName(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName),
          declared = (declaredMetavariable !== null);

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

  findValidMetavariable(context) {
    const metavariableNode = this.getMetavariableNode(),
          metavariable = context.findMetavariableByMetavariableNode(metavariableNode),
          validMetavariable = metavariable; ///

    return validMetavariable;
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

  validate(strict, context) {
    if (context === undefined) {
      context = strict; ///

      strict = false;
    }

    let metavariable = null;

    const metavariableString = this.getString(); ///

    context.trace(`Validating the '${metavariableString}' metavariable...`);

    let validates = false;

    const validMetavariable = this.findValidMetavariable(context);

    if (validMetavariable !== null) {
      validates = true;

      metavariable = validMetavariable; ///

      context.debug(`...the '${metavariableString}' metavariable is already valid.`);
    } else {
      const nameValidates = this.validateName(strict, context);

      if (nameValidates) {
        const termValidates = this.validateTerm(strict, context);

        if (termValidates) {
          const typeValidates = this.validateType(strict, context);

          if (typeValidates) {
            validates = true;
          }
        }
      }

      if (validates) {
        metavariable = this;  ///

        const declared = this.isDeclared(context);

        if (declared) {
          context.addMetavariable(metavariable);
        }
      }
    }

    if (validates) {
      context.debug(`...validated the '${metavariableString}' metavariable.`);
    }

    return metavariable;
  }

  validateName(strict, context) {
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

    return nameValidates;
  }

  validateTerm(strict, context) {
    let termValidates = false;

    if (this.term === null) {
      termValidates = true;
    } else {
      const metavariableString = this.getString();  ///

      context.trace(`Validating the '${metavariableString}' metavariable's term...`);

      const metavariableName = this.getMetavariableName(),
            declaredMetavaraible = context.findDeclaredMetavariableByMetavariableName(metavariableName);

      let term = null;

      if (declaredMetavaraible !== null) {
        const type = declaredMetavaraible.getType();

        if (type !== null) {
          term = this.term.validateGivenType(type, context);
        }
      } else {
        if (!strict) {
          term = this.term.validate(context, (term, context) => {
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

    return termValidates;
  }

  validateType(strict, context) {
    let typeValidates;

    if (this.type === null) {
      typeValidates = true;
    } else {
      const metavariableString = this.getString();  ///

      context.trace(`Validating  the '${metavariableString}' metavariable's type...`);

      typeValidates = false;

      const typeString = this.type.getString();

      context.trace(`A '${typeString}' type is present in the '${metavariableString}' metavariable.`);

      if (typeValidates) {
        context.trace(`...validated  the '${metavariableString}' metavariable's type.`);
      }
    }

    return typeValidates;
  }

  unifyFrame(frame, generalContext, specificContext) {
    let frameUnifies = false;

    const context = specificContext,  ///
          frameString = frame.getString(),
          metavariableString = this.getString(); ///

    context.trace(`Unifying the '${frameString}' frame with the '${metavariableString}' metavariable...`);

    const metavariable = this,  ///
          frameMetavariableUnifies = this.unifyFrameMetavariable(frame, generalContext, specificContext);

    if (frameMetavariableUnifies) {
      frameUnifies = true;
    } else {
      const metavariableNode = metavariable.getNode(),
            derivedSubstitution = context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

      if (derivedSubstitution !== null) {
        const derivedSubstitutionFrameComparesToFrame = derivedSubstitution.compareFrame(frame, context);

        if (derivedSubstitutionFrameComparesToFrame) {
          const derivedSubstitutionString = derivedSubstitution.getString();

          context.trace(`The '${derivedSubstitutionString}' derived substitution is already present.`);

          frameUnifies = true;
        }
      } else {
        const { FrameSubstitution } = elements;

        let frameSubstitution;

        frameSubstitution = FrameSubstitution.fromFrameAndMetavariable(frame, metavariable, generalContext, specificContext);

        frameSubstitution = frameSubstitution.validate(context);  ///

        const derivedSubstitution = frameSubstitution;  ///

        context.addDerivedSubstitution(derivedSubstitution);

        frameUnifies = true;
      }
    }

    if (frameUnifies) {
      context.debug(`...unified the '${frameString}' frame with the '${metavariableString}' metavariable.`);
    }

    return frameUnifies;
  }

  unifyStatement(statement, substitution, generalContext, specificContext) {
    let statementUnifies = false;

    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString(), ///
          substitutionString = (substitution !== null) ?
                                  substitution.getString() :
                                    EMPTY_STRING;

    context.trace(`Unifying the '${statementString}' statement with the '${metavariableString}${substitutionString}' metavariable...`);

    const metavariable = this, ///
          statementMetavariableUnifies = this.unifyStatementMetavariable(statement, generalContext, specificContext);

    if (statementMetavariableUnifies) {
      statementUnifies = true;
    } else {
      const metavariableNode = metavariable.getNode(),
            derivedSubstitution = (substitution !== null) ?
                                    context.findDerivedSubstitutionByMetavariableNodeAndSubstitution(metavariableNode, substitution) :
                                      context.findDerivedSubstitutionByMetavariableNode(metavariableNode);

      if (derivedSubstitution !== null) {
        const derivedSubstitutionComparesToStatement = derivedSubstitution.compareStatement(statement, context);

        if (derivedSubstitutionComparesToStatement) {
          const derivedSubstitutionString = derivedSubstitution.getString();

          context.trace(`The '${derivedSubstitutionString}' derived substitution is already present.`);

          statementUnifies = true;
        }
      } else {
        const { StatementSubstitution } = elements;

        let statementSubstitution;

        statementSubstitution = (substitution !== null) ?
                                  StatementSubstitution.fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext) :
                                    StatementSubstitution.fromStatementAndMetavariable(statement, metavariable, generalContext, specificContext);

        statementSubstitution = statementSubstitution.validate(substitution, context);  ///

        const derivedSubstitution = statementSubstitution;  ///

        context.addDerivedSubstitution(derivedSubstitution);

        statementUnifies = true;
      }
    }

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${metavariableString}${substitutionString}' metavariable.`);
    }

    return statementUnifies;
  }

  unifyReference(reference, generalContext, specificContext) {
    let referenceUnifies = false;

    const context = specificContext,  ///
          referenceString = reference.getString(),
          metavariableString = this.getString(); ///

    context.trace(`Unifying the '${referenceString}' reference with the '${metavariableString}' metavariable...`);

    const metavariable = this,  ///
          referenceMetavariableUnifies = this.unifyReferenceMetavariable(reference, generalContext, specificContext);

    if (referenceMetavariableUnifies) {
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

  unifyFrameMetavariable(frame, generalContext, specificContext) {
    let frameMetavariableUnifies = false;

    const context = specificContext,  ///
          frameString = frame.getString(),
          metavariableString = this.getString();  ///

    context.trace(`Unifying the '${frameString}' frame's metavariable with the '${metavariableString}' metavariable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const metavariableNode = this.getMetavariableNode(),  ///
            metavariableNodeMatches = frame.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        frameMetavariableUnifies = true;
      }
    }

    if (frameMetavariableUnifies) {
      context.debug(`...unified the '${frameString}' frame's metavariable with the '${metavariableString}' metavariable.`);
    }

    return frameMetavariableUnifies;
  }

  unifyReferenceMetavariable(reference, generalContext, specificContext) {
    let referenceMetavariableUnifies = false;

    const context = specificContext,  ///
          referenceString = reference.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${referenceString}' reference's metavariable with the '${metavariableString}' metavariable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const metavariableNode = this.getMetavariableNode(),
            metavariableNodeMatches = reference.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        referenceMetavariableUnifies = true;
      }
    }

    if (referenceMetavariableUnifies) {
      context.trace(`...unified the '${referenceString}' reference's metavariable with the '${metavariableString}' metavariable.`);
    }

    return referenceMetavariableUnifies;
  }

  unifyStatementMetavariable(statement, generalContext, specificContext) {
    let statementMetavariableUnifies = false;

    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement's metavariable with the '${metavariableString}' metavariable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const metavariableNode = this.getMetavariableNode(),
            metavariableNodeMatches = statement.matchMetavariableNode(metavariableNode);

      if (metavariableNodeMatches) {
        statementMetavariableUnifies = true;
      }
    }

    if (statementMetavariableUnifies) {
      context.debug(`...unified the '${statementString}' statement's metavariable with the '${metavariableString}' metavariable.`);
    }

    return statementMetavariableUnifies;
  }

  unifyMetavariableIntrinsically(metavariable, generalContext, specificContext) {
    let metavariableUnifiesIntrinsically;

    const context = specificContext,  ///
          generalMetavariable = this, ///
          specificMetavariable = metavariable,
          generalMetavariableString = generalMetavariable.getString(),  ///
          specificMetavariableString = specificMetavariable.getString();

    context.trace(`Unifying the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically...`);

    metavariableUnifiesIntrinsically = unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext);

    if (metavariableUnifiesIntrinsically) {
      context.debug(`...unified the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically.`);
    }

    return metavariableUnifiesIntrinsically;
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

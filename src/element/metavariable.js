"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { synchronousAll } from "../utilities/continuation";
import { declare, desist } from "../utilities/state";
import { instantiateMetavariable } from "../process/instantiate";
import { metaTypeFromJSON, metaTypeToMetaTypeJSON } from "../utilities/json";
import { unifyMetavariable, unifyMetavariableIntrinsically } from "../process/unify";
import { nameFromMetavariableNode, termFromMetavariableNode, typeFromMetavariableNode, metavariableFromStatementNode } from "../utilities/element";

const { asynchronousAll } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  isMalformed() {
    const metavariableNode = this.getMetavariableNode(),
          malformed = metavariableNode.isMalformed();

    return malformed;
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

  verify(context, continuation) {
    let verifies = false;

    const metavariableString = this.getString();  ///

    context.trace(`Verifying the '${metavariableString}' metavariable...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${metavariableString}' metavariable because it is malformed.`);

      return continuation(verifies);
    }

    const verifyTerm = this.verifyTerm.bind(this),
          verifyType = this.verifyType.bind(this);

    return asynchronousAll([
      verifyTerm,
      verifyType
    ],  context, (verifies) => {
      if (verifies) {
        context.debug(`...verified the '${metavariableString}' metavariable.`);
      }

      return continuation(verifies);
    });
  }

  verifyTerm(context, continuation) {
    let termVerifies = true;  ///

    if (this.term !== null) {
      const metavariableString = this.getString();

      context.trace(`Verifying the '${metavariableString}' metavariable's term...`);

      termVerifies = false;

      context.debug(`...verified the '${metavariableString}' metavariable's term.`);
    }

    return continuation(termVerifies, context);
  }

  verifyType(context, continuation) {
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

    return continuation(typeVerifies, context);
  }

  validate(strict, state, context, continuation) {
    if (continuation === undefined) {
      continuation = context; ///

      context = state;

      state = strict; ///

      strict = false;
    }

    let metavariable;

    const metavariableString = this.getString(); ///

    context.trace(`Validating the '${metavariableString}' metavariable...`);

    metavariable = this.findMetavariable(context);

    if (metavariable !== null) {
      context.debug(`...the '${metavariableString}' metavariable is already present.`);

      return continuation(metavariable, context);
    }

    metavariable = this;  ///

    const validateName = this.validateName.bind(this),
          validateType = this.validateType.bind(this),
          validateTerm = this.validateTerm.bind(this);

    return synchronousAll([
      validateName,
      validateType,
      validateTerm
    ], strict, state, context, (validates, strict, state, context) => {
      if (!validates) {
        metavariable = null;
      }

      if (validates) {
        context.addMetavariable(metavariable);

        context.debug(`...validated the '${metavariableString}' metavariable.`);
      }

      return continuation(metavariable, context);
    });
  }

  validateName(strict, state, context, continuation) {
    let nameValidates;

    const metavariableString = this.getString();  ///

    context.trace(`Validating the '${metavariableString}' metavariable's name...`);

    const metavariableName = this.getMetavariableName(),  ///
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    nameValidates = true; ///

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

    return continuation(nameValidates, strict, state, context);
  }

  validateType(strict, state, context, continuation) {
    let typeValidates = true; ///

    if (this.type === null) {
      return continuation(typeValidates, strict, state, context);
    }

    const metavariableString = this.getString();  ///

    context.trace(`Validating  the '${metavariableString}' metavariable's type...`);

    const typeName = this.type.getName(),
          typePresenet = context.isTypePresentByTypeName(typeName);

    if (!typePresenet) {
      typeValidates = false;
    }

    if (typeValidates) {
      context.trace(`...validated  the '${metavariableString}' metavariable's type.`);
    }

    return continuation(typeValidates, strict, state, context);
  }

  validateTerm(strict, state, context, continuation) {
    let termValidates = true; ///

    if (this.term === null) {
      return continuation(termValidates, strict, state, context);
    }

    const metavariableString = this.getString();  ///

    context.trace(`Validating the '${metavariableString}' metavariable's term...`);

    const metavariableName = this.getMetavariableName(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    if (declaredMetavariable === null) {
      if (strict) {
        termValidates = false;

        return continuation(termValidates, strict, state, context);
      }

      return this.term.validate(state, context, (term, context) => {
        if (term === null) {
          termValidates = false;
        }

        if (termValidates) {
          this.term = term;

          context.debug(`...validated the '${metavariableString}' metavariable's term.`);
        }

        return continuation(termValidates, strict, state, context);
      });
    }

    const type = declaredMetavariable.getType();

    if (type === null) {
      termValidates = false;

      return continuation(termValidates, strict, state, context);
    }

    return this.term.validateGivenType(type, state, context, (term, context) => {
      if (term === null) {
        termValidates = false;
      }

      if (termValidates) {
        this.term = term;

        context.debug(`...validated the '${metavariableString}' metavariable's term.`);
      }

      return continuation(termValidates, strict, state, context);
    });
  }

  unifyFrame(frame, generalContext, specificContext, continuation) {
    let frameUnifies = false;

    const context = specificContext,  ///
          frameString = frame.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${frameString}' frame with the '${metavariableString}' metavariable...`);

    const frameMetavariableCompares = this.compareFrameMetavariable(frame, generalContext, specificContext);

    if (frameMetavariableCompares) {
      frameUnifies = true;

      return continuation(frameUnifies, context);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
      const inferredSubstitutionComparesToTerm = inferredSubstitution.compareFrame(frame, context);

      if (inferredSubstitutionComparesToTerm) {
        const inferredSubstitutionString = inferredSubstitution.getString();

        context.trace(`The '${inferredSubstitutionString}' inferred substitution is already present.`);

        frameUnifies = true;
      }

      return continuation(frameUnifies, context);
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

    frameUnifies = true;

    if (frameUnifies) {
      context.debug(`...unified the '${frameString}' frame with the '${metavariableString}' variable.`);
    }

    return continuation(frameUnifies, context);
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    let statementUnifies = false;

    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${metavariableString}' metavariable...`);

    const statementMetavariableCompares = this.compareStatementMetavariable(statement, generalContext, specificContext);

    if (statementMetavariableCompares) {
      statementUnifies = true;

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

    statementUnifies = true;

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${metavariableString}' metavariable.`);
    }

    return continuation(statementUnifies);
  }

  unifyReference(reference, generalContext, specificContext, continuation) {
    let referenceUnifies = false;

    const context = specificContext,  ///
          referenceString = reference.getString(),
          metavariableString = this.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${metavariableString}' metavariable...`);

    const referenceMetavariableCompares = this.compareReferenceMetavariable(reference, generalContext, specificContext);

    if (referenceMetavariableCompares) {
      referenceUnifies = true;

      return continuation(referenceUnifies);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          inferredSubstitution = context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
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

    referenceUnifies = true;

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

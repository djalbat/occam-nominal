"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateMetavariable } from "../process/instantiate";
import { metaTypeFromJSON, metaTypeToMetaTypeJSON } from "../utilities/json";
import { unifyMetavariable, unifyMetavariableIntrinsically } from "../process/unify";
import { nameFromMetavariableNode, termFromMetavariableNode, typeFromMetavariableNode, metavariableFromStatementNode } from "../utilities/element";

const { all } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

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

  verify(context, forward, back) {
    const metavariableString = this.getString();  ///

    context.trace(`Verifying the '${metavariableString}' metavariable...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${metavariableString}' metavariable because it is malformed.`);

      return back();
    }

    const verifyTerm = this.verifyTerm.bind(this),
          verifyType = this.verifyType.bind(this);

    return all([
      verifyTerm,
      verifyType
    ],  context, (context, back) => {
      context.debug(`...verified the '${metavariableString}' metavariable.`);

      return forward(context, back);
    }, back);
  }

  verifyTerm(context, forward, back) {
    const metavariableString = this.getString();  ///

    context.trace(`Verifying the '${metavariableString}' metavariable's term...`);

    if (this.term !== null) {
      context.debug(`The '${metavariableString}' metavariable can only have a type and not a term.`);

      return back();
    }

    context.debug(`...verified the '${metavariableString}' metavariable's term.`);

    return forward(context, back);
  }

  verifyType(context, forward, back) {
    if (this.type === null) {
      return forward(context, back);
    }

    const metavariableString = this.getString();  ///

    context.trace(`Verifying the '${metavariableString}' metavariable's type...`);

    const typeName = this.type.getName(),
          type = context.findTypeByTypeName(typeName);

    if (type === null) {
      return back();
    }

    this.type = type;

    context.debug(`...verifieds the '${metavariableString}' metavariable's type.`);

    return forward(context, back);
  }

  validate = unbreakable(function (strict, state, context, forward, back) {
    if (back === undefined) {
      back = forward; ///

      forward = context; ///

      context = state;  ///

      state = strict; ///

      strict = false;
    }

    let metavariable;

    const metavariableString = this.getString(); ///

    context.trace(`Validating the '${metavariableString}' metavariable...`);

    metavariable = this.findMetavariable(context);

    if (metavariable !== null) {
      context.debug(`...the '${metavariableString}' metavariable is already present.`);

      return forward(metavariable, context, back);
    }

    const validateName = this.validateName.bind(this),
          validateType = this.validateType.bind(this),
          validateTerm = this.validateTerm.bind(this);

    return all([
      validateName,
      validateType,
      validateTerm
    ], strict, state, context, (strict, state, context, back) => {
      metavariable = this;  ///

      context.addMetavariable(metavariable);

      context.debug(`...validated the '${metavariableString}' metavariable.`);

      return forward(metavariable, context, back);
    }, back);
  });

  validateName(strict, state, context, forward, back) {
    const metavariableString = this.getString();  ///

    context.trace(`Validating the '${metavariableString}' metavariable's name...`);

    const metavariableName = this.getMetavariableName(),  ///
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    let nameValidates = true; ///

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

    if (!nameValidates) {
      return back();
    }

    context.debug(`...validated the '${metavariableString}' metavariable's name.`);

    return forward(strict, state, context, back);
  }

  validateType(strict, state, context, forward, back) {
    if (this.type === null) {
      return forward(strict, state, context, back);
    }

    const metavariableString = this.getString();  ///

    context.trace(`Validating  the '${metavariableString}' metavariable's type...`);

    let typeValidates = true; ///

    const typeName = this.type.getName(),
          typePresenet = context.isTypePresentByTypeName(typeName);

    if (!typePresenet) {
      typeValidates = false;
    }

    if (!typeValidates) {
      return back();
    }

    context.trace(`...validated  the '${metavariableString}' metavariable's type.`);

    return forward(strict, state, context, back);
  }

  validateTerm(strict, state, context, forward, back) {
    if (this.term === null) {
      return forward(strict, state, context, back);
    }

    const metavariableString = this.getString();  ///

    context.trace(`Validating the '${metavariableString}' metavariable's term...`);

    const metavariableName = this.getMetavariableName(),
          declaredMetavariable = context.findDeclaredMetavariableByMetavariableName(metavariableName);

    if (declaredMetavariable === null) {
      if (strict) {
        return back();
      }

      return this.term.validate(state, context, (term, context, back) => {
        this.term = term;

        context.debug(`...validated the '${metavariableString}' metavariable's term.`);

        return forward(strict, state, context, back);
      }, back);
    }

    const type = declaredMetavariable.getType();

    if (type === null) {
      return back();
    }

    return this.term.validateGivenType(type, state, context, (term, context, back) => {
      this.term = term;

      context.debug(`...validated the '${metavariableString}' metavariable's term.`);

      return forward(strict, state, context, back);
    }, back);
  }

  unifyStatement(statement, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          statementString = statement.getString(),
          metavariableString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${metavariableString}' metavariable...`);

    const statementMetavariableCompares = this.compareStatementMetavariable(statement, generalContext, specificContext);

    if (statementMetavariableCompares) {
      return forward(generalContext, specificContext, back);
    }

    const metavariable = this,  ///
          metavariableNode = metavariable.getNode(),
          siblingSubstitutionNode = metavariableNode.getSiblingSubstitutionNode(),
          substitutionNode = siblingSubstitutionNode, ///
          inferredSubstitution = (substitutionNode !== null) ?
                                  context.findInferredSubstitutionByMetavariableNodeAndSubstitutionNode(metavariableNode, substitutionNode) :
                                    context.findInferredSubstitutionByMetavariableNode(metavariableNode);

    if (inferredSubstitution !== null) {
      const inferredSubstitutionComparesToStatement = inferredSubstitution.compareStatement(statement, context);

      if (inferredSubstitutionComparesToStatement) {
        const inferredSubstitutionString = inferredSubstitution.getString();

        context.trace(`The '${inferredSubstitutionString}' inferred substitution is already present.`);

        return forward(generalContext, specificContext, back);
      }

      return back();
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

    return statementSubstitution.verify(context, (context, back) => {
      const inferredSubstitution = statementSubstitution;  ///

      context.addInferredSubstitution(inferredSubstitution);

      context.debug(`...unified the '${statementString}' statement with the '${metavariableString}' metavariable.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  unifyMetavariable(metavariable, context, forward, back) {
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

  unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          generalMetavariable = this, ///
          specificMetavariable = metavariable,
          generalMetavariableString = generalMetavariable.getString(),  ///
          specificMetavariableString = specificMetavariable.getString();

    context.trace(`Unifying the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically...`);

    return unifyMetavariableIntrinsically(generalMetavariable, specificMetavariable, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${specificMetavariableString}' metavariable with the '${generalMetavariableString}' metavariable intrinsically.`);

      return forward(generalContext, specificContext, back);
    }, back);
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
    let json;

    const metaTypeJSON = metaTypeToMetaTypeJSON(this.metaType),
          metaType = metaTypeJSON,  ///
          string = this.getString();

    json = {
      string,
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
            breakPoint = null,
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

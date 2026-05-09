"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { compressTerms,
         compressFrames,
         compressProperties,
         compressEqualities,
         compressJudgements,
         compressAssertions,
         compressStatements,
         compressSignatures,
         compressReferences,
         compressAssumptions,
         compressMetavariables,
         compressSubstitutions,
         compressPropertyRelations,} from "../utilities/synoptic";
import { termsFromJSON,
         framesFromJSON,
         termsToTermsJSON,
         framesToFramesJSON,
         propertiesFromJSON,
         equalitiesFromJSON,
         judgementsFromJSON,
         statementsFromJSON,
         assertionsFromJSON,
         referencesFromJSON,
         signaturesFromJSON,
         assumptionsFromJSON,
         metavariablesFromJSON,
         substitutionsFromJSON,
         propertyRelationsFromJSON,
         propertiesToPropertiesJSON,
         judgementsToJudgementsJSON,
         equalitiesToEqualitiesJSON,
         statementsToStatementsJSON,
         signaturesToSignaturesJSON,
         assertionsToAssertionsJSON,
         referencesToReferencesJSON,
         assumptionsToAssumptionsJSON,
         metavariablesToMetavariablesJSON,
         substitutionsToSubstitutionsJSON,
         propertyRelationsToPropertyRelationsJSON } from "../utilities/json";

const { push } = arrayUtilities;

export default class MnemicContext extends Context {
  constructor(context, terms, frames, properties, equalities, judgements, assertions, statements, signatures, references, assumptions, metavariables, substitutions, propertyRelations) {
    super(context);

    this.terms = terms;
    this.frames = frames;
    this.properties = properties;
    this.equalities = equalities;
    this.judgements = judgements;
    this.assertions = assertions;
    this.statements = statements;
    this.signatures = signatures;
    this.references = references;
    this.assumptions = assumptions;
    this.metavariables = metavariables;
    this.substitutions = substitutions;
    this.propertyRelations = propertyRelations;
  }

  getTerms(terms = []) {
    const context = this.getContext();

    push(terms, this.terms);

    context.getTerms(terms);

    compressTerms(context);

    return terms;
  }

  getFrames(frames = []) {
    const context = this.getContext();

    push(frames, this.frames);

    context.getFrames(frames);

    compressFrames(context);

    return frames;
  }

  getProperties(properties = []) {
    const context = this.getContext();

    push(properties, this.properties);

    context.getProperties(properties);

    compressProperties(context);

    return properties;
  }

  getEqualities(equalities = []) {
    const context = this.getContext();

    push(equalities, this.equalities);

    context.getEqualities(equalities);

    compressEqualities(context);

    return equalities;
  }

  getJudgements(judgements = []) {
    const context = this.getContext();

    push(judgements, this.judgements);

    context.getJudgements(judgements);

    compressJudgements(context);

    return judgements;
  }

  getStatements(statements = []) {
    const context = this.getContext();

    push(statements, this.statements);

    context.getStatements(statements);

    compressStatements(context);

    return statements;
  }

  getSignatures(signatures = []) {
    const context = this.getContext();

    push(signatures, this.signatures);

    context.getSignatures(signatures);

    compressSignatures(context);

    return signatures;
  }

  getAssertions(assertions = []) {
    const context = this.getContext();

    push(assertions, this.assertions);

    context.getAssertions(assertions);

    compressAssertions(context);

    return assertions;
  }

  getReferences(references = []) {
    const context = this.getContext();

    push(references, this.references);

    context.getReferences(references);

    compressReferences(context);

    return references;
  }

  getAssumptions(assumptions = []) {
    const context = this.getContext();

    push(assumptions, this.assumptions);

    context.getAssumptions(assumptions);

    compressAssumptions(context);

    return assumptions;
  }

  getMetavariables(metavariables = []) {
    const context = this.getContext();

    push(metavariables, this.metavariables);

    context.getMetavariables(metavariables);

    compressMetavariables(context);

    return metavariables;
  }

  getSubstitutions(substitutions = []) {
    const context = this.getContext();

    push(substitutions, this.substitutions);

    context.getSubstitutions(substitutions);

    compressSubstitutions(context);

    return substitutions;
  }

  getPropertyRelations(propertyRelations = []) {
    const context = this.getContext();

    push(propertyRelations, this.propertyRelations);

    context.getPropertyRelations(propertyRelations);

    compressPropertyRelations(context);

    return propertyRelations;
  }

  addTerm(term) {
    const context = this, ///
          termString = term.getString();

    context.trace(`Adding the '${termString}' term to the mnemic context...`);

    this.terms.push(term);

    context.debug(`...added the '${termString}' term to the mnemic context.`);
  }

  addFrame(frame) {
    const context = this, ///
          frameString = frame.getString();

    context.trace(`Adding the '${frameString}' frame to the mnemic context...`);

    this.frames.push(frame);

    context.debug(`...added the '${frameString}' frame to the mnemic context.`);
  }

  addEquality(equality) {
    const context = this, ///
          equalityString = equality.getString();

    context.trace(`Adding the '${equalityString}' equality to the mnemic context...`);

    this.equalities.push(equality);

    context.debug(`...added the '${equalityString}' equality to the mnemic context.`);
  }

  addProperty(property) {
    const context = this, ///
          propertyString = property.getString();

    context.trace(`Adding the '${propertyString}' property to the mnemic context...`);

    this.properties.push(property);

    context.debug(`...added the '${propertyString}' property to the mnemic context.`);
  }

  addJudgement(judgement) {
    const context = this, ///
          judgementString = judgement.getString();

    context.trace(`Adding the '${judgementString}' judgement to the mnemic context...`);

    this.judgements.push(judgement);

    context.debug(`...added the '${judgementString}' judgement to the mnemic context.`);
  }

  addAssertion(assertion) {
    const context = this, ///
          assertionString = assertion.getString();

    context.trace(`Adding the '${assertionString}' assertion to the mnemic context...`);

    this.assertions.push(assertion);

    context.debug(`...added the '${assertionString}' assertion to the mnemic context.`);
  }

  addStatement(statement) {
    const context = this, ///
          statementString = statement.getString();

    context.trace(`Adding the '${statementString}' statement to the mnemic context...`);

    this.statements.push(statement);

    context.debug(`...added the '${statementString}' statement to the mnemic context.`);
  }

  addSignature(signature) {
    const context = this, ///
          signatureString = signature.getString();

    context.trace(`Adding the '${signatureString}' signature to the mnemic context...`);

    this.signatures.push(signature);

    context.debug(`...added the '${signatureString}' signature to the mnemic context.`);
  }

  addReference(reference) {
    const context = this, ///
          referenceString = reference.getString();

    context.trace(`Adding the '${referenceString}' reference to the mnemic context...`);

    this.references.push(reference);

    context.debug(`...added the '${referenceString}' reference to the mnemic context.`);
  }

  addAssumption(assumption) {
    const context = this, ///
          assumptionString = assumption.getString();

    context.trace(`Adding the '${assumptionString}' assumption to the mnemic context...`);

    this.assumptions.push(assumption);

    context.debug(`...added the '${assumptionString}' assumption to the mnemic context.`);
  }

  addMetavariable(metavariable) {
    const context = this, ///
          metavariableString = metavariable.getString();

    context.trace(`Adding the '${metavariableString}' metavariable to the mnemic context...`);

    this.metavariables.push(metavariable);

    context.debug(`...added the '${metavariableString}' metavariable to the mnemic context.`);
  }

  addSubstitution(substitution) {
    const context = this, ///
          substitutionString = substitution.getString();

    context.trace(`Adding the '${substitutionString}' substitution to the mnemic context...`);

    this.substitutions.push(substitution);

    context.debug(`...added the '${substitutionString}' substitution to the mnemic context.`);
  }

  addPropertyRelation(propertyRelation) {
    const context = this, ///
          propertyRelationString = propertyRelation.getString();

    context.trace(`Adding the '${propertyRelationString}' property relation to the mnemic context...`);

    this.propertyRelations.push(propertyRelation);

    context.debug(`...added the '${propertyRelationString}' property relation to the mnemic context.`);
  }

  addTerms(terms) {
    terms.forEach((term) => {
      this.addTerm(term);
    });
  }

  findTermByTermNode(termNode) {
    const terms = this.getTerms(),
          term = terms.find((term) => {
            const termNodeMatches = term.matchTermNode(termNode);
      
            if (termNodeMatches) {
              return true;
            }
          }) || null;

    return term;
  }

  findFrameByFrameNode(frameNode) {
    const frames = this.getFrames(),
          frame = frames.find((frame) => {
            const frameNodeMatches = frame.matchFrameNode(frameNode);

            if (frameNodeMatches) {
              return true;
            }
          }) || null;

    return frame;
  }

  findEqualityByEqualityNode(equalityNode) {
    const equalities = this.getEqualities(),
      equality = equalities.find((equality) => {
        const equalityNodeMatches = equality.matchEqualityNode(equalityNode);

        if (equalityNodeMatches) {
          return true;
        }
      }) || null;

    return equality;
  }

  findPropertyByPropertyNode(propertyNode) {
    const properties = this.getProperties(),
          property = properties.find((property) => {
            const propertyNodeMatches = property.matchEqualityNode(propertyNode);

            if (propertyNodeMatches) {
              return true;
            }
          }) || null;

    return property;
  }

  findJudgementByJudgementNode(judgementNode) {
    const judgements = this.getJudgements(),
          judgement = judgements.find((judgement) => {
            const judgementNodeMatches = judgement.matchJudgementNode(judgementNode);

            if (judgementNodeMatches) {
              return true;
            }
          }) || null;

    return judgement;
  }

  findAssertionByAssertionNode(assertionNode) {
    const assertions = this.getAssertions(),
          assertion = assertions.find((assertion) => {
            const assertionNodeMatches = assertion.matchAssertionNode(assertionNode);

            if (assertionNodeMatches) {
              return true;
            }
          }) || null;

    return assertion;
  }

  findStatementByStatementNode(statementNode) {
    const statements = this.getStatements(),
          statement = statements.find((statement) => {
            const statementNodeMatches = statement.matchStatementNode(statementNode);

            if (statementNodeMatches) {
              return true;
            }
          }) || null;

    return statement;
  }

  findSignatureBySignatureNode(signatureNode) {
    const signatures = this.getSignatures(),
          signature = signatures.find((signature) => {
            const signatureNodeMatches = signature.matchSignatureNode(signatureNode);

            if (signatureNodeMatches) {
              return true;
            }
          }) || null;

    return signature;
  }

  findReferenceByReferenceNode(referenceNode) {
    const references = this.getReferences(),
          reference = references.find((reference) => {
            const referenceMatcheReferenceNode = reference.matchReferenceNode(referenceNode);

            if (referenceMatcheReferenceNode) {
              return true;
            }
          }) || null;

    return reference;
  }

  findAssumptionByAssumptionNode(assumptionNode) {
    const assumptions = this.getAssumptions(),
          assumption = assumptions.find((assumption) => {
            const assumptionNodeMatches = assumption.matchAssumptionNode(assumptionNode);

            if (assumptionNodeMatches) {
              return true;
            }
          }) || null;

    return assumption;
  }

  findReferenceByMetavariableNode(metavariableNode) {
    const references = this.getReferences(),
          reference = references.find((reference) => {
            const referenceMatcheMetavariableNode = reference.matchMetavariableNode(metavariableNode);

            if (referenceMatcheMetavariableNode) {
              return true;
            }
          }) || null;

    return reference;
  }

  findMetavariableByMetavariableNode(metavariableNode) {
    const metavariables = this.getMetavariables(),
          metavariable = metavariables.find((metavariable) => {
            const metavariableNodeMatches = metavariable.matchMetavariableNode(metavariableNode);

            if (metavariableNodeMatches) {
              return true;
            }
          }) || null;

    return metavariable;
  }

  findSubstitutionBySubstitutionNode(substitutionNode) {
    const substitutions = this.getSubstitutions(),
          substitution = substitutions.find((substitution) => {
            const substitutionNodeMatches = substitution.matchSubstitutionNode(substitutionNode);

            if (substitutionNodeMatches) {
              return true;
            }
          }) || null;

    return substitution;
  }

  findPropertyRelationByPropertyRelationNode(propertyRelationNode) {
    const propertyRelations = this.getPropertyRelations(),
          propertyRelation = propertyRelations.find((propertyRelation) => {
            const propertyRelationNodeMatches = propertyRelation.matchEqualityNode(propertyRelationNode);

            if (propertyRelationNodeMatches) {
              return true;
            }
          }) || null;

    return propertyRelation;
  }

  findVariableByVariableNode(variableNode) {
    const variableIdentifier = variableNode.getVariableIdentifier(),
          declaredVariable = this.findDeclaredVariableByVariableIdentifier(variableIdentifier),
          variable = declaredVariable;  ///

    return variable;
  }

  isTermPresentByTermNode(termNode) {
    const term = this.findTermByTermNode(termNode),
          termPresent = (term !== null);

    return termPresent;
  }

  isFramePresentByFrameNode(frameNode) {
    const frame = this.findFrameByFrameNode(frameNode),
          framePresent = (frame !== null);

    return framePresent;
  }

  isEqualityPresentByEqualityNode(equalityNode) {
    const equality = this.findEqualityByEqualityNode(equalityNode),
          equalityPresent = (equality !== null);

    return equalityPresent;
  }

  isPropertyPresentByPropertyNode(propertyNode) {
    const property = this.findPropertyByPropertyNode(propertyNode),
          propertyPresent = (property !== null);

    return propertyPresent;
  }

  isJudgementPresentByJudgementNode(judgementNode) {
    const judgement = this.findJudgementByJudgementNode(judgementNode),
          judgementPresent = (judgement !== null);

    return judgementPresent;
  }

  isAssertionPresentByAssertionNode(assertionNode) {
    const assertion = this.findAssertionByAssertionNode(assertionNode),
          assertionPresent = (assertion !== null);

    return assertionPresent;
  }

  isStatementPresentByStatementNode(statementNode) {
    const statement = this.findStatementByStatementNode(statementNode),
          statementPresent = (statement !== null);

    return statementPresent;
  }

  isSignaturePresentBySignatureNode(signatureNode) {
    const signature = this.findSignatureBySignatureNode(signatureNode),
          signaturePresent = (signature !== null);

    return signaturePresent;
  }

  isAssumptionPresentByAssumptionNode(assumptionNode) {
    const assumption = this.findAssumptionByAssumptionNode(assumptionNode),
          assumptionPresent = (assumption !== null);

    return assumptionPresent;
  }

  isReferencePresentByMetavariableNode(metavariableNode) {
    const reference = this.findReferenceByMetavariableNode(metavariableNode),
          referencePresent = (reference !== null);

    return referencePresent;
  }

  isMetavariablePresentByMetavariableNode(metavariablenNode) {
    const metavariablen = this.findMetavariableByMetavariableNode(metavariablenNode),
          metavariablenPresent = (metavariablen !== null);

    return metavariablenPresent;
  }

  isPropertyRelationresentByPropertyRelationNode(propertyRelationNode) {
    const propertyRelation = this.findPropertyRelationByPropertyRelationNode(propertyRelationNode),
          propertyRelationresent = (propertyRelation !== null);

    return propertyRelationresent;
  }

  commit(element) {
    const context = this; ///

    element.setContext(context);
  }

  initialise(json) {
    const context = this; ///

    this.terms = termsFromJSON(json, context);

    this.metavariables = metavariablesFromJSON(json, context);

    this.statements = statementsFromJSON(json, context);
    this.references = referencesFromJSON(json, context);

    this.equalities = equalitiesFromJSON(json, context);
    this.assumptions = assumptionsFromJSON(json, context);

    this.frames = framesFromJSON(json, context);

    this.properties = propertiesFromJSON(json, context);

    this.judgements = judgementsFromJSON(json, context);
    this.assertions = assertionsFromJSON(json, context);
    this.signatures = signaturesFromJSON(json, context);
    this.substitutions = substitutionsFromJSON(json, context);
    this.propertyRelations = propertyRelationsFromJSON(json, context);
  }

  toJSON() {
    let terms = this.getTerms(),
        frames = this.getFrames(),
        properties = this.getProperties(),
        equalities = this.getEqualities(),
        judgements = this.getJudgements(),
        assertions = this.getAssertions(),
        statements = this.getStatements(),
        signatures = this.getSignatures(),
        references = this.getReferences(),
        assumptions = this.getAssumptions(),
        metavariables = this.getMetavariables(),
        substitutions = this.getSubstitutions(),
        propertyRelations = this.getPropertyRelations();

    const termsJSON = termsToTermsJSON(terms),
          framesJSON = framesToFramesJSON(frames),
          propertiesJSON = propertiesToPropertiesJSON(properties),
          equalitiesJSON = equalitiesToEqualitiesJSON(equalities),
          judgementsJSON = judgementsToJudgementsJSON(judgements),
          assertionsJSON = assertionsToAssertionsJSON(assertions),
          statementsJSON = statementsToStatementsJSON(statements),
          signaturesJSON = signaturesToSignaturesJSON(signatures),
          referencesJSON = referencesToReferencesJSON(references),
          assumptionsJSON = assumptionsToAssumptionsJSON(assumptions),
          metavariablesJSON = metavariablesToMetavariablesJSON(metavariables),
          substitutionsJSON = substitutionsToSubstitutionsJSON(substitutions),
          propertyRelationsJSON = propertyRelationsToPropertyRelationsJSON(propertyRelations);

    terms = termsJSON; ///
    frames = framesJSON; ///
    properties = propertiesJSON;  ///
    equalities = equalitiesJSON; ///
    judgements = judgementsJSON; ///
    assertions = assertionsJSON; ///
    statements = statementsJSON; ///
    signatures = signaturesJSON; ///
    references = referencesJSON; ///
    assumptions = assumptionsJSON; ///
    metavariables = metavariablesJSON;  //
    substitutions = substitutionsJSON; ///
    propertyRelations = propertyRelationsJSON; ///

    const json = {
      terms,
      frames,
      properties,
      equalities,
      judgements,
      assertions,
      statements,
      signatures,
      references,
      assumptions,
      metavariables,
      substitutions,
      propertyRelations
    };

    return json;
  }

  static fromJSON(json, context) {
    const terms = null,
          frames = null,
          properties = null,
          equalities = null,
          judgements = null,
          statements = null,
          assertions = null,
          signatures = null,
          references = null,
          assumptions = null,
          metavariables = null,
          substitutions = null,
          propertyRelations = null,
          mnemicContext = new MnemicContext(context, terms, frames, properties, equalities, judgements, assertions, statements, signatures, references, assumptions, metavariables, substitutions, propertyRelations);

    mnemicContext.initialise(json);

    return mnemicContext;
  }

  static fromNothing(context) {
    const terms = [],
          frames = [],
          properties = [],
          equalities = [],
          judgements = [],
          statements = [],
          assertions = [],
          signatures = [],
          references = [],
          assumptions = [],
          metavariables = [],
          substitutions = [],
          propertyRelations = [],
          mnemicContext = new MnemicContext(context, terms, frames, properties, equalities, judgements, assertions, statements, signatures, references, assumptions, metavariables, substitutions, propertyRelations);

    return mnemicContext;
  }
}

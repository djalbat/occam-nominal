"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { termsFromJSON,
         framesFromJSON,
         termsToTermsJSON,
         framesToFramesJSON,
         equalitiesFromJSON,
         statementsFromJSON,
         assertionsFromJSON,
         referencesFromJSON,
         assumptionsFromJSON,
         metavariablesFromJSON,
         substitutionsFromJSON,
         equalitiesToEqualitiesJSON,
         statementsToStatementsJSON,
         assertionsToAssertionsJSON,
         referencesToReferencesJSON,
         assumptionsToAssumptionsJSON,
         metavariablesToMetavariablesJSON,
         substitutionsToSubstitutionsJSON } from "../utilities/json";

const { push, extract } = arrayUtilities;

export default class MnemicContext extends Context {
  constructor(context, terms, frames, equalities, assertions, statements, references, assumptions, metavariables, substitutions) {
    super(context);

    this.terms = terms;
    this.frames = frames;
    this.equalities = equalities;
    this.assertions = assertions;
    this.statements = statements;
    this.references = references;
    this.assumptions = assumptions;
    this.metavariables = metavariables;
    this.substitutions = substitutions;
  }

  getTerms(terms = []) {
    const context = this.getContext();

    push(terms, this.terms);

    context.getTerms(terms);

    return terms;
  }

  getFrames(frames = []) {
    const context = this.getContext();

    push(frames, this.frames);

    context.getFrames(frames);

    return frames;
  }

  getEqualities(equalities = []) {
    const context = this.getContext();

    push(equalities, this.equalities);

    context.getEqualities(equalities);

    return equalities;
  }

  getStatements(statements = []) {
    const context = this.getContext();

    push(statements, this.statements);

    context.getStatements(statements);

    return statements;
  }

  getAssertions(assertions = []) {
    const context = this.getContext();

    push(assertions, this.assertions);

    context.getAssertions(assertions);

    return assertions;
  }

  getReferences(references = []) {
    const context = this.getContext();

    push(references, this.references);

    context.getReferences(references);

    return references;
  }

  getAssumptions(assumptions = []) {
    const context = this.getContext();

    push(assumptions, this.assumptions);

    context.getAssumptions(assumptions);

    return assumptions;
  }

  getMetavariables(metavariables = []) {
    const context = this.getContext();

    push(metavariables, this.metavariables);

    context.getMetavariables(metavariables);

    return metavariables;
  }

  getSubstitutions(substitutions = []) {
    const context = this.getContext();

    push(substitutions, this.substitutions);

    context.getSubstitutions(substitutions);

    return substitutions;
  }

  addTerm(term) {
    const context = this, ///
          termString = term.getString();

    context.trace(`Adding the '${termString}' term to the mnemic context...`);

    const termA = term; ///

    extract(this.terms, (term) => {
      const termB = term, ///
            termAEqualToTermB = termA.isEqualTo(termB);

      if (termAEqualToTermB) {
        const termString = term.getString();

        context.trace(`Removed the existing '${termString}' term from the mnemic context...`);

        return true;
      }
    });

    this.terms.push(term);

    context.debug(`...added the '${termString}' term to the mnemic context.`);
  }

  addFrame(frame) {
    const context = this, ///
          frameString = frame.getString();

    context.trace(`Adding the '${frameString}' frame to the mnemic context...`);

    const frameA = frame; ///

    extract(this.frames, (frame) => {
      const frameB = frame, ///
            frameAEqualToFrameB = frameA.isEqualTo(frameB);

      if (frameAEqualToFrameB) {
        const frameString = frame.getString();

        context.trace(`Removed the existing '${frameString}' frame from the mnemic context...`);

        return true;
      }
    });

    this.frames.push(frame);

    context.debug(`...added the '${frameString}' frame to the mnemic context.`);
  }

  addEquality(equality) {
    const context = this, ///
          equalityString = equality.getString();

    context.trace(`Adding the '${equalityString}' equality to the mnemic context...`);

    const equalityA = equality; ///

    extract(this.equalities, (equality) => {
      const equalityB = equality, ///
            equalityAEqualToEqualityB = equalityA.isEqualTo(equalityB);

      if (equalityAEqualToEqualityB) {
        const equalityString = equality.getString();

        context.trace(`Removed the existing '${equalityString}' equality from the mnemic context...`);

        return true;
      }
    });

    this.equalities.push(equality);

    context.debug(`...added the '${equalityString}' equality to the mnemic context.`);
  }

  addAssertion(assertion) {
    const context = this, ///
          assertionString = assertion.getString();

    context.trace(`Adding the '${assertionString}' assertion to the mnemic context...`);

    const assertionA = assertion; ///

    extract(this.assertions, (assertion) => {
      const assertionB = assertion, ///
            assertionAEqualToAssertionB = assertionA.isEqualTo(assertionB);

      if (assertionAEqualToAssertionB) {
        const assertionString = assertion.getString();

        context.trace(`Removed the existing '${assertionString}' assertion from the mnemic context...`);

        return true;
      }
    });

    this.assertions.push(assertion);

    context.debug(`...added the '${assertionString}' assertion to the mnemic context.`);
  }

  addStatement(statement) {
    const context = this, ///
          statementString = statement.getString();

    context.trace(`Adding the '${statementString}' statement to the mnemic context...`);

    const statementA = statement; ///

    extract(this.statements, (statement) => {
      const statementB = statement, ///
            statementAEqualToStatementB = statementA.isEqualTo(statementB);

      if (statementAEqualToStatementB) {
        const statementString = statement.getString();

        context.trace(`Removed the existing '${statementString}' statement from the mnemic context...`);

        return true;
      }
    });

    this.statements.push(statement);

    context.debug(`...added the '${statementString}' statement to the mnemic context.`);
  }

  addReference(reference) {
    const context = this, ///
          referenceString = reference.getString();

    context.trace(`Adding the '${referenceString}' reference to the mnemic context...`);

    const referenceA = reference; ///

    extract(this.references, (reference) => {
      const referenceB = reference, ///
            referenceAEqualToReferenceB = referenceA.isEqualTo(referenceB);

      if (referenceAEqualToReferenceB) {
        const referenceString = reference.getString();

        context.trace(`Removed the existing '${referenceString}' reference from the mnemic context...`);

        return true;
      }
    });

    this.references.push(reference);

    context.debug(`...added the '${referenceString}' reference to the mnemic context.`);
  }

  addAssumption(assumption) {
    const context = this, ///
          assumptionString = assumption.getString();

    context.trace(`Adding the '${assumptionString}' assumption to the mnemic context...`);

    const assumptionA = assumption; ///

    extract(this.assumptions, (assumption) => {
      const assumptionB = assumption, ///
            assumptionAEqualToAssumptionB = assumptionA.isEqualTo(assumptionB);

      if (assumptionAEqualToAssumptionB) {
        const assumptionString = assumption.getString();

        context.trace(`Removed the existing '${assumptionString}' assumption from the mnemic context...`);

        return true;
      }
    });

    this.assumptions.push(assumption);

    context.debug(`...added the '${assumptionString}' assumption to the mnemic context.`);
  }

  addMetavariable(metavariable) {
    const context = this, ///
          metavariableString = metavariable.getString();

    context.trace(`Adding the '${metavariableString}' metavariable to the mnemic context...`);

    const metavariableA = metavariable; ///

    extract(this.metavariables, (metavariable) => {
      const metavariableB = metavariable, ///
            metavariableAEqualToMetavariableB = metavariableA.isEqualTo(metavariableB);

      if (metavariableAEqualToMetavariableB) {
        const metavariableString = metavariable.getString();

        context.trace(`Removed the existing '${metavariableString}' metavariable from the mnemic context...`);

        return true;
      }
    });

    this.metavariables.push(metavariable);

    context.debug(`...added the '${metavariableString}' metavariable to the mnemic context.`);
  }

  addSubstitution(substitution) {
    const context = this, ///
          substitutionString = substitution.getString();

    context.trace(`Adding the '${substitutionString}' substitution to the mnemic context...`);

    const substitutionA = substitution; ///

    extract(this.substitutions, (substitution) => {
      const substitutionB = substitution, ///
            substitutionAEqualToSubstitutionB = substitutionA.isEqualTo(substitutionB);

      if (substitutionAEqualToSubstitutionB) {
        const substitutionString = substitution.getString();

        context.trace(`Removed the existing '${substitutionString}' substitution from the mnemic context...`);

        return true;
      }
    });

    this.substitutions.push(substitution);

    context.debug(`...added the '${substitutionString}' substitution to the mnemic context.`);
  }

  addInferredSubstitutions(inferredSubstitutions) {
    ///
  }

  addTerms(terms) {
    terms.forEach((term) => {
      this.addTerm(term);
    });
  }

  addAssertions(assertions) {
    assertions.forEach((assertion) => {
      this.addAssertion(assertion);
    });
  }

  addMetavariables(metavariables) {
    metavariables.forEach((metavariable) => {
      this.addMetavariable(metavariable);
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

  isMetavariablePresentByMetavariableNode(metavariableNode) {
    const metavariablen = this.findMetavariableByMetavariableNode(metavariableNode),
          metavariablenPresent = (metavariablen !== null);

    return metavariablenPresent;
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

    this.assertions = assertionsFromJSON(json, context);
    this.substitutions = substitutionsFromJSON(json, context);
  }

  commit() {
    const context = this;

    return context;
  }

  toJSON() {
    let terms = this.getTerms(),
        frames = this.getFrames(),
        equalities = this.getEqualities(),
        assertions = this.getAssertions(),
        statements = this.getStatements(),
        references = this.getReferences(),
        assumptions = this.getAssumptions(),
        metavariables = this.getMetavariables(),
        substitutions = this.getSubstitutions();

    const termsJSON = termsToTermsJSON(terms),
          framesJSON = framesToFramesJSON(frames),
          equalitiesJSON = equalitiesToEqualitiesJSON(equalities),
          assertionsJSON = assertionsToAssertionsJSON(assertions),
          statementsJSON = statementsToStatementsJSON(statements),
          referencesJSON = referencesToReferencesJSON(references),
          assumptionsJSON = assumptionsToAssumptionsJSON(assumptions),
          metavariablesJSON = metavariablesToMetavariablesJSON(metavariables),
          substitutionsJSON = substitutionsToSubstitutionsJSON(substitutions);

    terms = termsJSON; ///
    frames = framesJSON; ///
    equalities = equalitiesJSON; ///
    assertions = assertionsJSON; ///
    statements = statementsJSON; ///
    references = referencesJSON; ///
    assumptions = assumptionsJSON; ///
    metavariables = metavariablesJSON;  //
    substitutions = substitutionsJSON; ///

    const json = {
      terms,
      frames,
      equalities,
      assertions,
      statements,
      references,
      assumptions,
      metavariables,
      substitutions
    };

    return json;
  }

  static fromJSON(json, context) {
    const terms = null,
          frames = null,
          equalities = null,
          statements = null,
          assertions = null,
          references = null,
          assumptions = null,
          metavariables = null,
          substitutions = null,
          mnemicContext = new MnemicContext(context, terms, frames, equalities, assertions, statements, references, assumptions, metavariables, substitutions);

    mnemicContext.initialise(json);

    return mnemicContext;
  }

  static fromNothing(context) {
    const terms = [],
          frames = [],
          equalities = [],
          statements = [],
          assertions = [],
          references = [],
          assumptions = [],
          metavariables = [],
          substitutions = [],
          mnemicContext = new MnemicContext(context, terms, frames, equalities, assertions, statements, references, assumptions, metavariables, substitutions);

    return mnemicContext;
  }
}

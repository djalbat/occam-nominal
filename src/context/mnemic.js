"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import {
  termsFromJSON,
  linksFromJSON,
  framesFromJSON,
  equalitiesFromJSON,
  statementsFromJSON,
  assertionsFromJSON,
  parametersFromJSON,
  assumptionsFromJSON,
  metavariablesFromJSON,
  substitutionsFromJSON,
  procedureReferencesFromJSON,
  termsToTermsJSON,
  linksToLinksJSON,
  framesToFramesJSON,
  parametersToParametersJSON,
  equalitiesToEqualitiesJSON,
  statementsToStatementsJSON,
  assertionsToAssertionsJSON,
  assumptionsToAssumptionsJSON,
  metavariablesToMetavariablesJSON,
  substitutionsToSubstitutionsJSON,
  procedureReferencesToProcedureReferencesJSON } from "../utilities/json";

const { push, extract } = arrayUtilities;

export default class MnemicContext extends Context {
  constructor(context, terms, links, frames, equalities, assertions, statements, parameters, assumptions, metavariables, substitutions, procedureReferences) {
    super(context);

    this.terms = terms;
    this.links = links;
    this.frames = frames;
    this.equalities = equalities;
    this.assertions = assertions;
    this.statements = statements;
    this.parameters = parameters;
    this.assumptions = assumptions;
    this.metavariables = metavariables;
    this.substitutions = substitutions;
    this.procedureReferences = procedureReferences;
  }

  getTerms(terms = []) {
    const context = this.getContext();

    push(terms, this.terms);

    context.getTerms(terms);

    return terms;
  }

  getLinks(links = []) {
    const context = this.getContext();

    push(links, this.links);

    context.getLinks(links);

    return links;
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

  getAssertions(assertions = []) {
    const context = this.getContext();

    push(assertions, this.assertions);

    context.getAssertions(assertions);

    return assertions;
  }

  getStatements(statements = []) {
    const context = this.getContext();

    push(statements, this.statements);

    context.getStatements(statements);

    return statements;
  }

  getParameters(parameters = []) {
    const context = this.getContext();

    push(parameters, this.parameters);

    context.getParameters(parameters);

    return parameters;
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

  getProcedureReferences(procedureReferences = []) {
    const context = this.getContext();

    push(procedureReferences, this.procedureReferences);

    context.getProcedureReferences(procedureReferences);

    return procedureReferences;
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

  addLink(link) {
    const context = this, ///
          linkString = link.getString();

    context.trace(`Adding the '${linkString}' link to the mnemic context...`);

    const linkA = link; ///

    extract(this.links, (link) => {
      const linkB = link, ///
            linkAEqualToLinkB = linkA.isEqualTo(linkB);

      if (linkAEqualToLinkB) {
        const linkString = link.getString();

        context.trace(`Removed the existing '${linkString}' link from the mnemic context...`);

        return true;
      }
    });

    this.links.push(link);

    context.debug(`...added the '${linkString}' link to the mnemic context.`);
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

  addParameter(parameter) {
    const context = this, ///
          parameterString = parameter.getString();

    context.trace(`Adding the '${parameterString}' parameter to the mnemic context...`);

    const parameterA = parameter; ///

    extract(this.parameters, (parameter) => {
      const parameterB = parameter, ///
            parameterAEqualToParameterB = parameterA.isEqualTo(parameterB);

      if (parameterAEqualToParameterB) {
        const parameterString = parameter.getString();

        context.trace(`Removed the existing '${parameterString}' parameter from the mnemic context...`);

        return true;
      }
    });

    this.parameters.push(parameter);

    context.debug(`...added the '${parameterString}' parameter to the mnemic context.`);
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

  addProcedureReference(procedureReference) {
    const context = this, ///
          procedureReferenceString = procedureReference.getString();

    context.trace(`Adding the '${procedureReferenceString}' function call to the mnemic context...`);

    const procedureReferenceA = procedureReference; ///

    extract(this.procedureReferences, (procedureReference) => {
      const procedureReferenceB = procedureReference, ///
            procedureReferenceAEqualToProcedureallB = procedureReferenceA.isEqualTo(procedureReferenceB);

      if (procedureReferenceAEqualToProcedureallB) {
        const procedureReferenceString = procedureReference.getString();

        context.trace(`Removed the existing '${procedureReferenceString}' function call from the mnemic context...`);

        return true;
      }
    });

    this.procedureReferences.push(procedureReference);

    context.debug(`...added the '${procedureReferenceString}' function call to the mnemic context.`);
  }

  addAssignment(assignment) {
    const context = this.getContext();

    context.addAssignment(assignment);
  }

  addInferredSubstitutions(inferredSubstitutions) {
    ///
  }

  addTerms(terms) {
    terms.forEach((term) => {
      this.addTerm(term);
    });
  }

  addLinks(links) {
    links.forEach((link) => {
      this.addLink(link);
    });
  }

  addFrames(frames) {
    frames.forEach((frame) => {
      this.addFrame(frame);
    });
  }

  addEqualities(equalities) {
    equalities.forEach((equality) => {
      this.addEquality(equality);
    });
  }

  addAssertions(assertions) {
    assertions.forEach((assertion) => {
      this.addAssertion(assertion);
    });
  }

  addStatements(statements) {
    statements.forEach((statement) => {
      this.addStatement(statement);
    });
  }

  addParameters(parameters) {
    parameters.forEach((parameter) => {
      this.addParameter(parameter);
    });
  }

  addAssumptions(assumptions) {
    assumptions.forEach((assumption) => {
      this.addAssumption(assumption);
    });
  }

  addMetavariables(metavariables) {
    metavariables.forEach((metavariable) => {
      this.addMetavariable(metavariable);
    });
  }

  addProcedureReferences(procedureReferences) {
    procedureReferences.forEach((procedureReference) => {
      this.addProcedureReference(procedureReference);
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

  findLinkByLinkNode(linkNode) {
    const links = this.getLinks(),
          link = links.find((link) => {
            const linkNodeMatches = link.matchLinkNode(linkNode);

            if (linkNodeMatches) {
              return true;
            }
          }) || null;

    return link;
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

  findParameterByParameterNode(parameterNode) {
    const parameters = this.getParameters(),
          parameter = parameters.find((parameter) => {
            const parameterNodeMatches = parameter.matchParameterNode(parameterNode);

            if (parameterNodeMatches) {
              return true;
            }
          }) || null;

    return parameter;
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

  findProcedureReferenceByProcedureReferenceNode(procedureReferenceNode) {
    const procedureReferences = this.getProcedureReferences(),
          procedureReference = procedureReferences.find((procedureReference) => {
            const procedureReferenceNodeMatches = procedureReference.matchProcedureReferenceNode(procedureReferenceNode);

            if (procedureReferenceNodeMatches) {
              return true;
            }
          }) || null;

    return procedureReference;
  }

  isTermPresentByTermNode(termNode) {
    const term = this.findTermByTermNode(termNode),
      termPresent = (term !== null);

    return termPresent;
  }

  isLinkPresentByLinkNode(linkNode) {
    const link = this.findLinkByLinkNode(linkNode),
          linkPresent = (link !== null);

    return linkPresent;
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

  isParameterPresentByParameterNode(parameterNode) {
    const parameter = this.findParameterByParameterNode(parameterNode),
          parameterPresent = (parameter !== null);

    return parameterPresent;
  }

  isAssumptionPresentByAssumptionNode(assumptionNode) {
    const assumption = this.findAssumptionByAssumptionNode(assumptionNode),
          assumptionPresent = (assumption !== null);

    return assumptionPresent;
  }

  isMetavariablePresentByMetavariableNode(metavariableNode) {
    const metavariablen = this.findMetavariableByMetavariableNode(metavariableNode),
          metavariablenPresent = (metavariablen !== null);

    return metavariablenPresent;
  }

  isProcedureReferencePresentByProcedureReferenceNode(procedureReferenceNode) {
    const procedureReference = this.findProcedureReferenceByProcedureReferenceNode(procedureReferenceNode),
          procedureReferencePresent = (procedureReference !== null);

    return procedureReferencePresent;
  }

  initialise(json) {
    const context = this; ///

    this.substitutions = substitutionsFromJSON(json, context);

    this.terms = termsFromJSON(json, context);

    this.statements = statementsFromJSON(json, context);

    this.metavariables = metavariablesFromJSON(json, context);

    this.equalities = equalitiesFromJSON(json, context);

    this.links = linksFromJSON(json, context);

    this.assumptions = assumptionsFromJSON(json, context);

    this.frames = framesFromJSON(json, context);

    this.assertions = assertionsFromJSON(json, context);

    this.parameters = parametersFromJSON(json, context);

    this.procedureReferences = procedureReferencesFromJSON(json, context);
  }

  commit() {
    const context = this;

    context.debug(`Committed the mnemic context.`);

    return context;
  }

  toJSON() {
    let json;

    let terms = this.getTerms(),
        links = this.getLinks(),
        frames = this.getFrames(),
        equalities = this.getEqualities(),
        assertions = this.getAssertions(),
        statements = this.getStatements(),
        parameters = this.getParameters(),
        assumptions = this.getAssumptions(),
        metavariables = this.getMetavariables(),
        substitutions = this.getSubstitutions(),
        procedureReferences = this.getProcedureReferences();

    const termsJSON = termsToTermsJSON(terms),
          linksJSON = linksToLinksJSON(links),
          framesJSON = framesToFramesJSON(frames),
          equalitiesJSON = equalitiesToEqualitiesJSON(equalities),
          assertionsJSON = assertionsToAssertionsJSON(assertions),
          statementsJSON = statementsToStatementsJSON(statements),
          parametersJSON = parametersToParametersJSON(parameters),
          assumptionsJSON = assumptionsToAssumptionsJSON(assumptions),
          metavariablesJSON = metavariablesToMetavariablesJSON(metavariables),
          substitutionsJSON = substitutionsToSubstitutionsJSON(substitutions),
          procedureReferencesJSON = procedureReferencesToProcedureReferencesJSON(procedureReferences);

    terms = termsJSON; ///
    links = linksJSON; ///
    frames = framesJSON; ///
    equalities = equalitiesJSON; ///
    assertions = assertionsJSON; ///
    statements = statementsJSON; ///
    parameters = parametersJSON;  ///
    assumptions = assumptionsJSON; ///
    metavariables = metavariablesJSON;  //
    substitutions = substitutionsJSON; ///
    procedureReferences = procedureReferencesJSON; ///

    json = {
      terms,
      links,
      frames,
      equalities,
      assertions,
      statements,
      parameters,
      assumptions,
      metavariables,
      substitutions,
      procedureReferences
    };

    return json;
  }

  static fromJSON(json, context) {
    const terms = null,
          links = null,
          frames = null,
          equalities = null,
          assertions = null,
          statements = null,
          parameters = null,
          assumptions = null,
          metavariables = null,
          substitutions = null,
          procedureReferences = null,
          mnemicContext = new MnemicContext(context, terms, links, frames, equalities, assertions, statements, parameters, assumptions, metavariables, substitutions, procedureReferences);

    mnemicContext.initialise(json);

    return mnemicContext;
  }

  static fromNothing(context) {
    const terms = [],
          links = [],
          frames = [],
          equalities = [],
          assertions = [],
          statements = [],
          parameters = [],
          assumptions = [],
          metavariables = [],
          substitutions = [],
          procedureReferences = [],
          mnemicContext = new MnemicContext(context, terms, links, frames, equalities, assertions, statements, parameters, assumptions, metavariables, substitutions, procedureReferences);

    return mnemicContext;
  }
}

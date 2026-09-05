"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

const { push, extract } = arrayUtilities;

export default class CladicContext extends Context {
  constructor(context, terms, links, frames, equalities, assertions, statements, parameters, assumptions, metavariables, procedureReferences) {
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

  getAssertions(assertions = []) {
    const context = this.getContext();

    push(assertions, this.assertions);

    context.getAssertions(assertions);

    return assertions;
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

  getProcedureReferences(procedureReferences = []) {
    const context = this.getContext();

    push(procedureReferences, this.procedureReferences);

    context.getProcedureReferences(procedureReferences);

    return procedureReferences;
  }

  addTerm(term) {
    const context = this, ///
          termString = term.getString();

    context.trace(`Adding the '${termString}' term to the cladic context...`);

    const termA = term; ///

    extract(this.terms, (term) => {
      const termB = term, ///
            termAEqualToTermB = termA.isEqualTo(termB);

      if (termAEqualToTermB) {
        const termString = term.getString();

        context.trace(`Removed the existing '${termString}' term from the cladic context...`);

        return true;
      }
    });

    this.terms.push(term);

    context.debug(`...added the '${termString}' term to the cladic context.`);
  }

  addLink(link) {
    const context = this, ///
          linkString = link.getString();

    context.trace(`Adding the '${linkString}' link to the cladic context...`);

    const linkA = link; ///

    extract(this.links, (link) => {
      const linkB = link, ///
            linkAEqualToLinkB = linkA.isEqualTo(linkB);

      if (linkAEqualToLinkB) {
        const linkString = link.getString();

        context.trace(`Removed the existing '${linkString}' link from the cladic context...`);

        return true;
      }
    });

    this.links.push(link);

    context.debug(`...added the '${linkString}' link to the cladic context.`);
  }

  addFrame(frame) {
    const context = this, ///
          frameString = frame.getString();

    context.trace(`Adding the '${frameString}' frame to the cladic context...`);

    const frameA = frame; ///

    extract(this.frames, (frame) => {
      const frameB = frame, ///
            frameAEqualToFrameB = frameA.isEqualTo(frameB);

      if (frameAEqualToFrameB) {
        const frameString = frame.getString();

        context.trace(`Removed the existing '${frameString}' frame from the cladic context...`);

        return true;
      }
    });

    this.frames.push(frame);

    context.debug(`...added the '${frameString}' frame to the cladic context.`);
  }

  addEquality(equality) {
    const context = this, ///
          equalityString = equality.getString();

    context.trace(`Adding the '${equalityString}' equality to the cladic context...`);

    const equalityA = equality; ///

    extract(this.equalities, (equality) => {
      const equalityB = equality, ///
            equalityAEqualToEqualityB = equalityA.isEqualTo(equalityB);

      if (equalityAEqualToEqualityB) {
        const equalityString = equality.getString();

        context.trace(`Removed the existing '${equalityString}' equality from the cladic context...`);

        return true;
      }
    });

    this.equalities.push(equality);

    context.debug(`...added the '${equalityString}' equality to the cladic context.`);
  }

  addAssertion(assertion) {
    const context = this, ///
          assertionString = assertion.getString();

    context.trace(`Adding the '${assertionString}' assertion to the cladic context...`);

    const assertionA = assertion; ///

    extract(this.assertions, (assertion) => {
      const assertionB = assertion, ///
            assertionAEqualToAssertionB = assertionA.isEqualTo(assertionB);

      if (assertionAEqualToAssertionB) {
        const assertionString = assertion.getString();

        context.trace(`Removed the existing '${assertionString}' assertion from the cladic context...`);

        return true;
      }
    });

    this.assertions.push(assertion);

    context.debug(`...added the '${assertionString}' assertion to the cladic context.`);
  }

  addStatement(statement) {
    const context = this, ///
      statementString = statement.getString();

    context.trace(`Adding the '${statementString}' statement to the cladic context...`);

    const statementA = statement; ///

    extract(this.statements, (statement) => {
      const statementB = statement, ///
        statementAEqualToStatementB = statementA.isEqualTo(statementB);

      if (statementAEqualToStatementB) {
        const statementString = statement.getString();

        context.trace(`Removed the existing '${statementString}' statement from the cladic context...`);

        return true;
      }
    });

    this.statements.push(statement);

    context.debug(`...added the '${statementString}' statement to the cladic context.`);
  }

  addParameter(paramter) {
    const context = this, ///
          paramterString = paramter.getString();

    context.trace(`Adding the '${paramterString}' paramter to the cladic context...`);

    const paramterA = paramter; ///

    extract(this.paramters, (paramter) => {
      const paramterB = paramter, ///
            paramterAEqualToParameterB = paramterA.isEqualTo(paramterB);

      if (paramterAEqualToParameterB) {
        const paramterString = paramter.getString();

        context.trace(`Removed the existing '${paramterString}' paramter from the cladic context...`);

        return true;
      }
    });

    this.paramters.push(paramter);

    context.debug(`...added the '${paramterString}' paramter to the cladic context.`);
  }

  addAssumption(assumption) {
    const context = this, ///
          assumptionString = assumption.getString();

    context.trace(`Adding the '${assumptionString}' assumption to the cladic context...`);

    const assumptionA = assumption; ///

    extract(this.assumptions, (assumption) => {
      const assumptionB = assumption, ///
            assumptionAEqualToAssumptionB = assumptionA.isEqualTo(assumptionB);

      if (assumptionAEqualToAssumptionB) {
        const assumptionString = assumption.getString();

        context.trace(`Removed the existing '${assumptionString}' assumption from the cladic context...`);

        return true;
      }
    });

    this.assumptions.push(assumption);

    context.debug(`...added the '${assumptionString}' assumption to the cladic context.`);
  }

  addMetavariable(metavariable) {
    const context = this, ///
          metavariableString = metavariable.getString();

    context.trace(`Adding the '${metavariableString}' metavariable to the cladic context...`);

    const metavariableA = metavariable; ///

    extract(this.metavariables, (metavariable) => {
      const metavariableB = metavariable, ///
            metavariableAEqualToMetavariableB = metavariableA.isEqualTo(metavariableB);

      if (metavariableAEqualToMetavariableB) {
        const metavariableString = metavariable.getString();

        context.trace(`Removed the existing '${metavariableString}' metavariable from the cladic context...`);

        return true;
      }
    });

    this.metavariables.push(metavariable);

    context.debug(`...added the '${metavariableString}' metavariable to the cladic context.`);
  }

  addSubstitution(substitution) {
    const context = this.getContext();

    context.addSubstitution(substitution);
  }

  addProcedureReference(procedureReference) {
    const context = this, ///
          procedureReferenceString = procedureReference.getString();

    context.trace(`Adding the '${procedureReferenceString}' function call to the cladic context...`);

    const procedureReferenceA = procedureReference; ///

    extract(this.procedureReferences, (procedureReference) => {
      const procedureReferenceB = procedureReference, ///
            procedureReferenceAEqualToProcedureallB = procedureReferenceA.isEqualTo(procedureReferenceB);

      if (procedureReferenceAEqualToProcedureallB) {
        const procedureReferenceString = procedureReference.getString();

        context.trace(`Removed the existing '${procedureReferenceString}' function call from the cladic context...`);

        return true;
      }
    });

    this.procedureReferences.push(procedureReference);

    context.debug(`...added the '${procedureReferenceString}' function call to the cladic context.`);
  }

  addAssignment(assignment) {
    const context = this.getContext();

    context.addAssignment(assignment);
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

  merge(context) {
    context.debug(`Merging the cladic context`);

    context.addTerms(this.terms);

    context.addLinks(this.links);

    context.addFrames(this.frames);

    context.addEqualities(this.equalities);

    context.addAssertions(this.assertions);

    context.addStatements(this.statements);

    context.addParameters(this.parameters);

    context.addAssumptions(this.assumptions);

    context.addMetavariables(this.metavariables);

    context.addProcedureReferences(this.procedureReferences);
  }

  static fromNothing(context) {
    const terms = [],
          links = [],
          frames = [],
          equalities = [],
          statements = [],
          parameters = [],
          assertions = [],
          assumptions = [],
          metavariables = [],
          procedureReferences = [],
          cladicContext = new CladicContext(context, terms, links, frames, equalities, assertions, statements, parameters, assumptions, metavariables, procedureReferences);

    return cladicContext;
  }
}

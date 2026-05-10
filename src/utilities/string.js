"use strict";

import { baseTypeFromNothing } from "../utilities/type";
import { EMPTY_STRING, PROVISIONAL, PROVISIONALLY } from "../constants";

export function termsStringFromTerms(terms) {
  const termsString = terms.reduce((termsString, term) => {
    const termString = term.getString();

    termsString = (termsString !== null) ?
                   `${termsString}, ${termString}` :
                      termString;

    return termsString;
  }, null);

  return termsString;
}

export function labelsStringFromLabels(labels) {
  const labelsString = labels.reduce((labelsString, label) => {
    const labelString = label.getString();

    labelsString = (labelsString === null) ?
                     labelString: ///
                      `${labelsString}, ${labelString}`;

    return labelsString;
  }, null);

  return labelsString;
}

export function premisesStringFromPremises(premises) {
  const premisesString = premises.reduce((premisesString, premise) => {
    const premiseString = premise.getString();

    premisesString = (premisesString !== null) ?
                       `${premisesString}, ${premiseString}` :
                         premiseString;  ///

    return premisesString;
  }, null);

  return premisesString;
}

export function hypothesesStringFromHypotheses(hypotheses) {
  const hypothesesString = hypotheses.reduce((hypothesesString, hypothesis) => {
    const hypothesisString = hypothesis.getString();

    hypothesesString = (hypothesesString !== null) ?
                          `${hypothesesString}, ${hypothesisString}` :
                            hypothesisString;  ///

    return hypothesesString;
  }, null);

  return hypothesesString;
}

export function superTypesStringFromSuperTypes(superTypes) {
  let superTypesString;

  const baseType = baseTypeFromNothing();

  superTypesString = superTypes.reduce((superTypesString, superType) => {
    if (superType !== baseType) {
      const superTypeString = superType.getString();

      superTypesString = (superTypesString === null) ?
                           `'${superTypeString}'` :
                              `${superTypesString}, '${superTypeString}'`;
    }

    return superTypesString;
  }, null);

  superTypesString = (superTypesString !== null) ?
                       `:${superTypesString}` :
                          EMPTY_STRING;

  return superTypesString;
}

export function parametersStringFromParameters(parameters) {
  const parametersString = parameters.reduce((parametersString, parameter) => {
    const parameterString = parameter.getString();

    parametersString = (parametersString === null) ?
                         parameterString : ///
                          `${parametersString}, ${parameterString}`;

    return parametersString;
  }, null);

  return parametersString;
}

export function provisinalStringFromProvisional(provisional) {
  const provisinalString = provisional ?
                            `${PROVISIONAL} ` :
                              EMPTY_STRING;

  return provisinalString;
}

export function provisionallyStringFromProvisional(provisional) {
  const provisinallyString = provisional ?
                              ` ${PROVISIONALLY}` :
                                 EMPTY_STRING;

  return provisinallyString;
}

export function suppositionsStringFromSuppositions(suppositions) {
  const suppositionsString = suppositions.reduce((suppositionsString, supposition) => {
    const suppositionString = supposition.getString();

    suppositionsString = (suppositionsString === null) ?
      suppositionString: ///
      `${suppositionsString}, ${suppositionString}`;

    return suppositionsString;
  }, null);

  return suppositionsString;
}

export function equivalenceStringFromTerms(terms) {
  const termsString = termsStringFromTerms(terms),
        equivalenceString = `[${termsString}]`;

  return equivalenceString;
}

export function signatureStringFromSignature(signature) {
  const signatureString = (signature !== null) ?
                            signature.getString() :
                              null;

  return signatureString;
}

export function typeStringFromNominalTypeName(nominalTypeName) {
  const typeString = nominalTypeName;  ///

  return typeString;
}

export function termSubstitutionStringFromTermAndVariable(term, variable) {
  const termString = term.getString(),
        variableString = variable.getString(),
        termSubstitutionString = `[${termString} for ${variableString}]`;

  return termSubstitutionString;
}

export function rulsStringFromLabelsPremisesAndConclusion(labels, premises, conclusion) {
  let ruleString = EMPTY_STRING;

  const conclusionString = conclusion.getString(),
        premisesString = premisesStringFromPremises(premises),
        labelsString = labelsStringFromLabels(labels);

  ruleString = `${ruleString}${labelsString} :: `;

  ruleString = (premisesString !== null) ?
                 `${ruleString}[${premisesString}]...${conclusionString}` :
                   `${ruleString}${conclusionString}`;

  return ruleString;
}

export function subproofStringFromSuppositionsAndSubDerivation(suppositions, subDerivation) {
  const lastStep = subDerivation.getLastStep(),
        suppositionsString = suppositionsStringFromSuppositions(suppositions),
        lastStepString = lastStep.getString(),
        subproofString = `[${suppositionsString}]...${lastStepString}`;

  return subproofString;
}

export function frameSubstitutionStringFromFrameAndMetavariable(frame, metavariable) {
  const frameString = frame.getString(),
        metavariableString = metavariable.getString(),
        string = `[${frameString} for [${metavariableString}]]`;

  return string;
}

export function sectionStringFromHypothesesAndTopLevelAssertion(hypotheses, topLevelAssertion) {
  const topLevelAssertionString = topLevelAssertion.getString(),
        hypothesesString = hypothesesStringFromHypotheses(hypotheses),
        sectionString = `[${hypothesesString}]::: ${topLevelAssertionString}`;

  return sectionString;
}

export function metaLevelAssumptionStringFromReferenceAndStatement(reference, statement) {
  const statementString = statement.getString(),
        referneceString = reference.getString(),
        metaLevelAssumptionString = `${referneceString} :: ${statementString}`;

  return metaLevelAssumptionString;
}

export function procedureCallStringFromProcedureReferenceAndParameters(procedureReference, parameters) {
  const procedureReferenceName = procedureReference.getName(),
        parametersString = parametersStringFromParameters(parameters),
        procedureCallString = `@${procedureReferenceName}(${parametersString})`;

  return procedureCallString;
}

export function statementSubstitutionStringFromStatementAndMetavariable(statement, metavariable) {
  const statementString = statement.getString(),
        metavariableString = metavariable.getString(),
        statementSubstitutionString = `[${statementString} for ${metavariableString}]`;

  return statementSubstitutionString;
}

export function referenceSubstitutionStringFromReferenceAndMetavariable(reference, metavariable) {
  const referenceString = reference.getString(),
        metavariableString = metavariable.getString(),
        referenceSubstitutionString = `[${referenceString} for ${metavariableString}]`;

  return referenceSubstitutionString;
}

export function complexTypeDeclarationStringFromTypeSuperTypesAndProvisional(type, superTypes, provisional) {
  const typeString = type.getString(),
        superTypesString = superTypesStringFromSuperTypes(superTypes),
        provisionalString = provisinalStringFromProvisional(provisional),
        complexTypeDeclarationString = `${provisionalString}${typeString}${superTypesString}`;

  return complexTypeDeclarationString;
}

export function topLevelMetaAssertionStringFromLabelSuppositionsAndDeduction(label, suppositions, deduction) {
  const labelString = label.getString(),
        deductionString = deduction.getString(),
        suppositionsString = suppositionsStringFromSuppositions(suppositions),
        topLevelMetaAssertionString = (suppositionsString !== null) ?
                                       `${labelString} :: [${suppositionsString}]...${deductionString}` :
                                         `${labelString} :: ${deductionString}`;

  return topLevelMetaAssertionString;
}

export function topLevelAssertionStringFromLabelsSignatureSuppositionsAndDeduction(labels, signature, suppositions, deduction) {
  let topLevelAssertionString = EMPTY_STRING;

  const deductionString = deduction.getString(),
        labelsString = labelsStringFromLabels(labels),
        signatureString = signatureStringFromSignature(signature),
        suppositionsString = suppositionsStringFromSuppositions(suppositions);

  topLevelAssertionString = (labelsString !== null) ?
                             `${topLevelAssertionString}${labelsString}` :
                               `${topLevelAssertionString}`;
  topLevelAssertionString = (signatureString !== null) ?
                             `${topLevelAssertionString}${signatureString}` :
                               `${topLevelAssertionString}`;


  topLevelAssertionString = (suppositionsString !== null) ?
                             `${topLevelAssertionString} :: [${suppositionsString}]...${deductionString}` :
                               `${topLevelAssertionString} :: ${deductionString}`;

  return topLevelAssertionString;
}

export function statementSubstitutionStringFromStatementMetavariableAndSubstitution(statement, metavariable, substitution) {
  const statementString = statement.getString(),
        metavariableString = metavariable.getString(),
        substitutionString = substitution.getString(),
        statementSubstitutionString = `[${statementString} for ${metavariableString}${substitutionString}]`;

  return statementSubstitutionString;
}

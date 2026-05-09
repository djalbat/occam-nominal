"use strict";

import elements from "../elements";
import MnemicContext from "../context/mnemic";

export function nameFromJSON(json, context) {
  let { name } = json;

  const nameJSON = name;  ///

  name = nameJSON;  ///

  return name;
}

export function termFromJSON(json, context) {
  let { term } = json;

  if (term !== null) {
    const termJSON = term;  ///

    json = termJSON;  ///

    const { Term } = elements;

    term = Term.fromJSON(json, context);
  }

  return term;
}

export function typeFromJSON(json, context) {
  let { type } = json;

  if (type !== null) {
    json = type;  ///

    const { string } = json,
          name = string;  ///

    type = findTypeByName(name, context);
  }

  return type;
}

export function labelFromJSON(json, context) {
  let { label } = json;

  const { Label } = elements,
    labelJSON = label;  ///

  json = labelJSON; ///

  label = Label.fromJSON(json, context);

  return label;
}

export function frameFromJSON(json, context) {
  let { frame } = json;

  if (frame !== null) {
    const frameJSON = frame;  ///

    json = frameJSON;  ///

    const { Frame } = elements;

    frame = Frame.fromJSON(json, context);
  }

  return frame;
}

export function negatedFromJSON(json, context) {
  const { negated } = json;

  return negated;
}

export function metaTypeFromJSON(json, context) {
  let { metaType } = json;

  if (metaType !== null) {
    json = metaType;  ///

    const { string } = json,
          name = string;  ///

    metaType = findMetaTypeByName(name, context);
  }

  return metaType;
}

export function statementFromJSON(json, context) {
  let { statement = null } = json;

  if (statement !== null) {
    const { Statement } = elements,
          statementJSON = statement;  ///

    json = statementJSON; ///

    statement = Statement.fromJSON(json, context);
  }

  return statement;
}

export function deductionFromJSON(json, context) {
  let { deduction } = json;

  const { Deduction } = elements,
        deductionJSON = deduction;  ///

  json = deductionJSON;  ///

  deduction = Deduction.fromJSON(json, context);

  return deduction;
}

export function signatureFromJSON(json, context) {
  let { signature = null } = json;

  if (signature !== null) {
    const { Signature } = elements,
          signatureJSON = signature;  ///

    json = signatureJSON; ///

    signature = Signature.fromJSON(json, context);
  }

  return signature;
}

export function referenceFromJSON(json, context) {
  let { reference } = json;

  const { Reference } = elements,
        referenceJSON = reference;  ///

  json = referenceJSON; ///

  reference = Reference.fromJSON(json, context);

  return reference;
}

export function identifierFromJSON(json, context) {
  let { identifier } = json;

  const identifierJSON = identifier;  ///

  identifier = identifierJSON;  ///

  return identifier;
}

export function conclusionFromJSON(json, context) {
  let { conclusion } = json;

  const { Conclusion } = elements,
        conclusionJSON = conclusion;  ///

  json = conclusionJSON;  ///

  conclusion = Conclusion.fromJSON(json, context);

  return conclusion;
}

export function provisionalFromJSON(json, context) {
  const { provisional } = json;

  return provisional;
}

export function metavariableFromJSON(json, context) {
  let { metavariable } = json;

  const { Metavariable } = elements,
        metavariableJSON = metavariable;  ///

  json = metavariableJSON; ///

  metavariable = Metavariable.fromJSON(json, context);

  return metavariable;
}

export function mnemicContextFromJSON(json, context) {
  const releaseContext = context; ///

  ({ context } = json);

  json = context; ///

  context = releaseContext; ///

  const mnemicContext = MnemicContext.fromJSON(json, context);

  return mnemicContext;
}

export function procedureCallFromJSON(json, context) {
  let { procedureCall = null } = json;

  if (procedureCall !== null) {
    const { ProcedureCall } = elements,
          procedureCallJSON = procedureCall;  ///

    json = procedureCallJSON; ///

    procedureCall = ProcedureCall.fromJSON(json, context);
  }

  return procedureCall;
}

export function procedureReferenceFromJSON(json, context) {
  let { procedureReference } = json;

  const { ProcedureReference } = elements,
        procedureReferenceJSON = procedureReference;  ///

  json = procedureReferenceJSON;  ///

  procedureReference = ProcedureReference.fromJSON(json, context);

  return procedureReference;
}

export function typesFromJSON(json, types, context) {
  const { types: typesJSON } = json;

  const { Type } = elements;

  typesJSON.forEach((typeJSON) => {
    const json = typeJSON,  ///
          type = Type.fromJSON(json, context);

    types.push(type);
  });
}

export function termsFromJSON(json, context) {
  let { terms } = json;

  const { Term } = elements,
        termsJSON = terms; ///

  terms = termsJSON.map((termJSON) => {
    const json = termJSON,  ///
          term = Term.fromJSON(json, context);

    return term;
  });

  return terms;
}

export function rulesFromJSON(json, context) {
  let { rules } = json;

  const { Rule } = elements,
        rulesJSON = rules; ///

  rules = rulesJSON.map((ruleJSON) => {
    const json = ruleJSON,  ///
          rule = Rule.fromJSON(json, context);

    return rule;
  });

  return rules;
}

export function framesFromJSON(json, context) {
  let { frames } = json;

  const { Frame } = elements,
    framesJSON = frames; ///

  frames = framesJSON.map((frameJSON) => {
    const json = frameJSON,  ///
          frame = Frame.fromJSON(json, context);

    return frame;
  });

  return frames;
}

export function labelsFromJSON(json, context) {
  let { labels } = json;

  const { Label } = elements,
        labelsJSON = labels;  ///

  labels = labelsJSON.map((labelJSON) => {
    const json = labelJSON, ///
          label = Label.fromJSON(json, context);

    return label;
  });

  return labels;
}

export function axiomsFromJSON(json, context) {
  let { axioms } = json;

  const { Axiom } = elements,
        axiomsJSON = axioms; ///

  axioms = axiomsJSON.map((axiomJSON) => {
    const json = axiomJSON,  ///
          axiom = Axiom.fromJSON(json, context);

    return axiom;
  });

  return axioms;
}

export function premisesFromJSON(json, context) {
  let { premises } = json;

  const { Premise } = elements,
        premisesJSON = premises;  ///

  premises = premisesJSON.map((premiseJSON) => {
    const json = premiseJSON, ///
          premise = Premise.fromJSON(json, context);

    return premise;
  });

  return premises;
}

export function theoremsFromJSON(json, context) {
  let { theorems } = json;

  const { Theorem } = elements,
        theoremsJSON = theorems; ///

  theorems = theoremsJSON.map((theoremJSON) => {
    const json = theoremJSON,  ///
          theorem = Theorem.fromJSON(json, context);

    return theorem;
  });

  return theorems;
}

export function variablesFromJSON(json, context) {
  let { variables } = json;

  const { Variable } = elements,
        variablesJSON = variables; ///

  variables = variablesJSON.map((variableJSON) => {
    const json = variableJSON,  ///
          variable = Variable.fromJSON(json, context);

    return variable;
  });

  return variables;
}

export function propertiesFromJSON(json, context) {
  let { properties } = json;

  const { Property } = elements,
        propertiesJSON = properties; ///

  properties = propertiesJSON.map((propertyJSON) => {
    const json = propertyJSON,  ///
          property = Property.fromJSON(json, context);

    return property;
  });

  return properties;
}

export function equalitiesFromJSON(json, context) {
  let { equalities } = json;

  const { Equality } = elements,
    equalitiesJSON = equalities; ///

  equalities = equalitiesJSON.map((equalityJSON) => {
    const json = equalityJSON,  ///
      equality = Equality.fromJSON(json, context);

    return equality;
  });

  return equalities;
}

export function prefixNameFromJSON(json, context) {
  const { prefixName } = json;

  return prefixName;
}

export function superTypesFromJSON(json, context) {
  const { superTypes: superTypesJSON } = json;

  const superTypes = superTypesJSON.map((superTypeJSON) => {
    const json = superTypeJSON,  ///
      { string } = json,
      name = string,  ///
      type = findTypeByName(name, context),
      superType = type; ///

    return superType;
  });

  return superTypes;
}

export function hypothesesFromJSON(json, context) {
  let { hypotheses } = json;

  const { Hypothesis } = elements,
        hypothesesJSON = hypotheses;  ///

  hypotheses = hypothesesJSON.map((hypothesisJSON) => {
    const json = hypothesisJSON, ///
          hypothesis = Hypothesis.fromJSON(json, context);

    return hypothesis;
  });

  return hypotheses;
}

export function parametersFromJSON(json, context) {
  let { parameters } = json;

  const { Parameter } = elements,
        parametersJSON = parameters; ///

  parameters = parametersJSON.map((parameterJSON) => {
    const json = parameterJSON,  ///
          parameter = Parameter.fromJSON(json, context);

    return parameter;
  });

  return parameters;
}

export function judgementsFromJSON(json, context) {
  let { judgements } = json;

  const { Judgement } = elements,
        judgementsJSON = judgements; ///

  judgements = judgementsJSON.map((judgementJSON) => {
    const json = judgementJSON,  ///
          judgement = Judgement.fromJSON(json, context);

    return judgement;
  });

  return judgements;
}

export function statementsFromJSON(json, context) {
  let { statements } = json;

  const { Statement } = elements,
        statementsJSON = statements; ///

  statements = statementsJSON.map((statementJSON) => {
    const json = statementJSON,  ///
          statement = Statement.fromJSON(json, context);

    return statement;
  });

  return statements;
}

export function assertionsFromJSON(json, context) {
  let { assertions } = json;

  const { TypeAssertion, DefinedAssertion, PropertyAssertion, SubproofAssertion, SignatureAssertion, ContainedAssertion } = elements,
        assertionsJSON = assertions; ///

  assertions = assertionsJSON.map((assertionJSON) => {
    const json = assertionJSON,  ///
          assertion = TypeAssertion.fromJSON(json, context) ||
                       DefinedAssertion.fromJSON(json, context) ||
                       PropertyAssertion.fromJSON(json, context) ||
                       SubproofAssertion.fromJSON(json, context) ||
                       SignatureAssertion.fromJSON(json, context) ||
                       ContainedAssertion.fromJSON(json, context);

    return assertion;
  });

  return assertions;
}

export function referencesFromJSON(json, context) {
  let { references } = json;

  const { Reference } = elements,
    referencesJSON = references; ///

  references = referencesJSON.map((referenceJSON) => {
    const json = referenceJSON,  ///
      reference = Reference.fromJSON(json, context);

    return reference;
  });

  return references;
}

export function signaturesFromJSON(json, context) {
  let { signatures } = json;

  const { Signature } = elements,
        signaturesJSON = signatures; ///

  signatures = signaturesJSON.map((signatureJSON) => {
    const json = signatureJSON,  ///
          signature = Signature.fromJSON(json, context);

    return signature;
  });

  return signatures;
}

export function conjecturesFromJSON(json, context) {
  let { conjectures } = json;

  const { Conjecture } = elements,
        conjecturesJSON = conjectures; ///

  conjectures = conjecturesJSON.map((conjectureJSON) => {
    const json = conjectureJSON,  ///
          conjecture = Conjecture.fromJSON(json, context);

    return conjecture;
  });

  return conjectures;
}

export function combinatorsFromJSON(json, context) {
  let { combinators } = json;

  const { Combinator } = elements,
        combinatorsJSON = combinators; ///

  combinators = combinatorsJSON.map((combinatorJSON) => {
    const json = combinatorJSON,  ///
          combinator = Combinator.fromJSON(json, context);

    return combinator;
  });

  return combinators;
}

export function assumptionsFromJSON(json, context) {
  let { assumptions } = json;

  const { Assumption } = elements,
    assumptionsJSON = assumptions; ///

  assumptions = assumptionsJSON.map((assumptionJSON) => {
    const json = assumptionJSON,  ///
          assumption = Assumption.fromJSON(json, context);

    return assumption;
  });

  return assumptions;
}

export function typePrefixesFromJSON(json, context) {
  let { typePrefixes } = json;

  const { TypePrefix } = elements,
        typePrefixesJSON = typePrefixes; ///

  typePrefixes = typePrefixesJSON.map((typePrefixJSON) => {
    const json = typePrefixJSON,  ///
          typePrefix = TypePrefix.fromJSON(json, context);

    return typePrefix;
  });

  return typePrefixes;
}

export function constructorsFromJSON(json, context) {
  let { constructors } = json;

  const { Constructor } = elements,
        constructorsJSON = constructors; ///

  constructors = constructorsJSON.map((constructorJSON) => {
    const json = constructorJSON,  ///
          constructor = Constructor.fromJSON(json, context);

    return constructor;
  });

  return constructors;
}

export function metatheoremsFromJSON(json, context) {
  let { metatheorems } = json;

  const { Metatheorem } = elements,
        metatheoremsJSON = metatheorems; ///

  metatheorems = metatheoremsJSON.map((metatheoremJSON) => {
    const json = metatheoremJSON,  ///
          metatheorem = Metatheorem.fromJSON(json, context);

    return metatheorem;
  });

  return metatheorems;
}

export function suppositionsFromJSON(json, context) {
  let { suppositions } = json;

  const { Supposition } = elements,
        suppositionsJSON = suppositions;  ///

  suppositions = suppositionsJSON.map((suppositionJSON) => {
    const json = suppositionJSON, ///
          supposition = Supposition.fromJSON(json, context);

    return supposition;
  });

  return suppositions;
}

export function substitutionsFromJSON(json, context) {
  let { substitutions } = json;  ///

  const substitutionsJSON = substitutions; ///

  substitutions = substitutionsJSON.map((substitutionJSON) => {
    const json = substitutionJSON,  ///
          substitution = substitutionFromSubstitutionJSON(json, context);

    return substitution;
  });

  return substitutions;
}

export function metavariablesFromJSON(json, context) {
  let { metavariables } = json;

  const { Metavariable } = elements,
        metavariablesJSON = metavariables; ///

  metavariables = metavariablesJSON.map((metavariableJSON) => {
    const json = metavariableJSON,  ///
          metavariable = Metavariable.fromJSON(json, context);

    return metavariable;
  });

  return metavariables;
}

export function mnemicContextsFromJSON(json, context) {
  const releaseContext = context; ///

  const { contexts } = json;

  const mnemicContexts = contexts.map((context) => {
    json = context; ///

    context = releaseContext; ///

    const mnemicContext = MnemicContext.fromJSON(json, context);

    return mnemicContext;  ///
  });

  return mnemicContexts;
}

export function declaredVariablesFromJSON(json, context) {
  let { declaredVariables } = json;

  const { Variable } = elements,
        declaredVariablesJSON = declaredVariables; ///

  declaredVariables = declaredVariablesJSON.map((declaredVariableJSON) => {
    const json = declaredVariableJSON,  ///
          variable = Variable.fromJSON(json, context),
          declaredVariable = variable;  ///

    return declaredVariable;
  });

  return declaredVariables;
}

export function propertyRelationsFromJSON(json, context) {
  let { propertyRelations } = json;

  const { PropertyRelation } = elements,
        propertyRelationsJSON = propertyRelations; ///

  propertyRelations = propertyRelationsJSON.map((propertyRelationJSON) => {
    const json = propertyRelationJSON,  ///
          propertyRelation = PropertyRelation.fromJSON(json, context);

    return propertyRelation;
  });

  return propertyRelations;
}

export function metaLevelAssumptionsFromJSON(json, context) {
  let { metaLevelAssumptions } = json;

  const { MetaLevelAssumption } = elements,
        metaLevelAssumptionsJSON = metaLevelAssumptions; ///

  metaLevelAssumptions = metaLevelAssumptionsJSON.map((metaLevelAssumptionJSON) => {
    const json = metaLevelAssumptionJSON,  ///
          metaLevelAssumption = MetaLevelAssumption.fromJSON(json, context);

    return metaLevelAssumption;
  });

  return metaLevelAssumptions;
}

export function declaredMetavariablesFromJSON(json, context) {
  let { declaredMetavariables } = json;

  const { Metavariable } = elements,
        declaredMetavariablesJSON = declaredMetavariables; ///

  declaredMetavariables = declaredMetavariablesJSON.map((declaredMetavariableJSON) => {
    const json = declaredMetavariableJSON,  ///
          metavariable = Metavariable.fromJSON(json, context),
          declaredMetavariable = metavariable;  ///

    return declaredMetavariable;
  });

  return declaredMetavariables;
}

export function nameToNameJSON(name) {
  const nameJSON = name;  ///

  return nameJSON;
}

export function termToTermJSON(term) {
  const termJSON = (term !== null) ?
                     term.toJSON() :
                       null;

  return termJSON;
}

export function typeToTypeJSON(type) {
  let typeJSON = null;

  if (type !== null) {
    const abridged = true;

    typeJSON = type.toJSON(abridged);
  }

  return typeJSON;
}

export function frameToFrameJSON(frame) {
  const frameJSON = (frame !== null) ?
                      frame.toJSON() :
                        null;

  return frameJSON;
}

export function labelToLabelJSON(label) {
  const labelJSON = label.toJSON();

  return labelJSON;
}

export function negatedToNegatedJSON(negated) {
  const negatedJSON = negated;  ///

  return negatedJSON;
}

export function ariableToVariableJSON(ariable) {
  const ariableJSON = ariable.toJSON();

  return ariableJSON;
}

export function metaTypeToMetaTypeJSON(metaType) {
  const metaTypeJSON = (metaType !== null) ?
                         metaType.toJSON() :
                           null;

  return metaTypeJSON;
}

export function referenceToReferenceJSON(reference) {
  const referenceJSON = reference.toJSON();

  return referenceJSON;
}

export function statementToStatementJSON(statement) {
  const statementJSON = (statement !== null) ?
                          statement.toJSON() :
                            null;

  return statementJSON;
}

export function deductionToDeductionJSON(deduction) {
  const deductionJSON = deduction.toJSON();

  return deductionJSON;
}

export function signatureToSignatureJSON(signature) {
  const signatureJSON = (signature !== null) ?
                          signature.toJSON() :
                            null;

  return signatureJSON;
}

export function identifierToIdentifierJSON(identifier) {
  const identifierJSON = identifier;  ///

  return identifierJSON;
}

export function conclusionToConclusionJSON(conclusion) {
  const conclusionJSON = conclusion.toJSON();

  return conclusionJSON;
}

export function provisionalToProvisionalJSON(provisional) {
  const provisionalJSON = provisional;  ///

  return provisionalJSON;
}

export function metavariableToMetavariableJSON(metavariable) {
  const metavariableJSON = metavariable.toJSON();

  return metavariableJSON;
}

export function procedureCallToProcedureCallJSON(procedureCall) {
  const procedureCallJSON = (procedureCall !== null) ?
                              procedureCall.toJSON() :
                                null;

  return procedureCallJSON;
}

export function mnemicContextToMnemicContextJSON(mnemicContext) {
  const mnemicContextJSON = mnemicContext.toJSON();

  return mnemicContextJSON;
}

export function procedureReferenceToProcedureReferenceJSON(procedureReference) {
  const procedureReferenceJSON = procedureReference.toJSON();

  return procedureReferenceJSON;
}

export function declaredMetavariableToDEclaredMetavariableJSON(declaredMetavariable) {
  const declaredMetavariableJSON = declaredMetavariable.toJSON();

  return declaredMetavariableJSON;
}

export function substitutionFromSubstitutionJSON(json, context) {
  const { TermSubstitution, FrameSubstitution, StatementSubstitution, ReferenceSubstitution } = elements,
        substitution = TermSubstitution.fromJSON(json, context) ||
                       FrameSubstitution.fromJSON(json, context) ||
                       StatementSubstitution.fromJSON(json, context) ||
                       ReferenceSubstitution.fromJSON(json, context);

  return substitution;
}

export function termsToTermsJSON(terms) {
  const termsJSON = terms.map((term) => {
    const termJSON = term.toJSON();

    return termJSON;
  });

  return termsJSON;
}

export function typesToTypesJSON(types) {
  const typesJSON = types.map((type) => {
    const typeJSON = type.toJSON();

    return typeJSON;
  });

  return typesJSON;
}

export function rulesToRulesJSON(rules) {
  const rulesJSON = rules.map((rule) => {
    const ruleJSON = rule.toJSON();

    return ruleJSON;
  });

  return rulesJSON;
}

export function labelsToLabelsJSON(labels) {
  const labelsJSON = labels.map((label) => {
    const labelJSON = label.toJSON();

    return labelJSON;
  });

  return labelsJSON;
}

export function framesToFramesJSON(frames) {
  const framesJSON = frames.map((frame) => {
    const frameJSON = frame.toJSON();

    return frameJSON;
  });

  return framesJSON;
}

export function axiomsToAxiomsJSON(axioms) {
  const axiomsJSON = axioms.map((axiom) => {
    const axiomJSON = axiom.toJSON();

    return axiomJSON;
  });

  return axiomsJSON;
}

export function premisesToPremisesJSON(premises) {
  const premisesJSON = premises.map((premise) => {
    const premiseJSON = premise.toJSON();

    return premiseJSON;
  });

  return premisesJSON;
}

export function theoremsToTheoremsJSON(theorems) {
  const theoremsJSON = theorems.map((theorem) => {
    const theoremJSON = theorem.toJSON();

    return theoremJSON;
  });

  return theoremsJSON;
}

export function variablesToVariablesJSON(variables) {
  const variablesJSON = variables.map((variable) => {
    const variableJSON = variable.toJSON();

    return variableJSON;
  });

  return variablesJSON;
}

export function hypothesesToHypothesesJSON(hypotheses) {
  const hypothesesJSON = hypotheses.map((hypothesis) => {
    const hypothesisJSON = hypothesis.toJSON();

    return hypothesisJSON;
  });

  return hypothesesJSON;
}

export function prefixnameToPrevixNameJSON(prefixname) {
  const prefixNameJSON = prefixname;  ///

  return prefixNameJSON;
}

export function superTypesToSuperTypesJSON(superTypes) {
  const superTypesJSON = superTypes.map((superType) => {
          const abridged = true,
                superTypeJSON = superType.toJSON(abridged);

          return superTypeJSON;
        });

  return superTypesJSON;
}

export function parametersToParametersJSON(parameters) {
  const parametersJSON = parameters.map((parameter) => {
    const parameterJSON = parameter.toJSON();

    return parameterJSON;
  });

  return parametersJSON;
}

export function propertiesToPropertiesJSON(properties) {
  const propertiesJSON = properties.map((property) => {
    const propertyJSON = property.toJSON();

    return propertyJSON;
  });

  return propertiesJSON;
}

export function judgementsToJudgementsJSON(judgements) {
  const judgementsJSON = judgements.map((judgement) => {
    const judgementJSON = judgement.toJSON();

    return judgementJSON;
  });

  return judgementsJSON;
}

export function equalitiesToEqualitiesJSON(equalities) {
  const equalitiesJSON = equalities.map((equality) => {
    const equalityJSON = equality.toJSON();

    return equalityJSON;
  });

  return equalitiesJSON;
}

export function statementsToStatementsJSON(statements) {
  const statementsJSON = statements.map((statement) => {
    const statementJSON = statement.toJSON();

    return statementJSON;
  });

  return statementsJSON;
}

export function signaturesToSignaturesJSON(signatures) {
  const signaturesJSON = signatures.map((signature) => {
    const signatureJSON = signature.toJSON();

    return signatureJSON;
  });

  return signaturesJSON;
}

export function assertionsToAssertionsJSON(assertions) {
  const assertionsJSON = assertions.map((assertion) => {
    const assertionJSON = assertion.toJSON();

    return assertionJSON;
  });

  return assertionsJSON;
}

export function referencesToReferencesJSON(references) {
  const referencesJSON = references.map((reference) => {
    const referenceJSON = reference.toJSON();

    return referenceJSON;
  });

  return referencesJSON;
}

export function conjecturesToConjecturesJSON(conjectures) {
  const conjecturesJSON = conjectures.map((conjecture) => {
    const conjectureJSON = conjecture.toJSON();

    return conjectureJSON;
  });

  return conjecturesJSON;
}

export function combinatorsToCombinatorsJSON(combinators) {
  const combinatorsJSON = combinators.map((combinator) => {
    const combinatorJSON = combinator.toJSON();

    return combinatorJSON;
  });

  return combinatorsJSON;
}

export function assumptionsToAssumptionsJSON(assumptions) {
  const assumptionsJSON = assumptions.map((assumption) => {
    const assumptionJSON = assumption.toJSON();

    return assumptionJSON;
  });

  return assumptionsJSON;
}

export function suppositionsToSuppositionsJSON(suppositions) {
  const suppositionsJSON = suppositions.map((supposition) => {
    const suppositionJSON = supposition.toJSON();

    return suppositionJSON;
  });

  return suppositionsJSON;
}

export function constructorsToConstructorsJSON(constructors) {
  const constructorsJSON = constructors.map((constructor) => {
    const constructorJSON = constructor.toJSON();

    return constructorJSON;
  });

  return constructorsJSON;
}

export function metatheoremsToMetatheoremsJSON(metatheorems) {
  const metatheoremsJSON = metatheorems.map((metatheorem) => {
    const metatheoremJSON = metatheorem.toJSON();

    return metatheoremJSON;
  });

  return metatheoremsJSON;
}

export function typePrefixesToTypePrefixesJSON(typePrefixes) {
  const typePrefixesJSON = typePrefixes.map((typePrefix) => {
    const typePrefixJSON = typePrefix.toJSON();

    return typePrefixJSON;
  });

  return typePrefixesJSON;
}

export function substitutionsToSubstitutionsJSON(substitutions) {
  const substitutionsJSON = substitutions.map((substitution) => {
    const substitutionJSON = substitution.toJSON();

    return substitutionJSON;
  });

  return substitutionsJSON;
}

export function metavariablesToMetavariablesJSON(metavariables) {
  const metavariablesJSON = metavariables.map((metavariable) => {
    const metavariableJSON = metavariable.toJSON();

    return metavariableJSON;
  });

  return metavariablesJSON;
}

export function mnemicContextsToMnemicContextsJSON(mnemicContexts) {
  const mnemicContextsJSON = mnemicContexts.map((mnemicContext) => {
    const mnemicContextJSON = mnemicContext.toJSON();

    return mnemicContextJSON;
  });

  return mnemicContextsJSON;
}

export function propertyRelationsToPropertyRelationsJSON(propertyRelations) {
  const propertyRelationsJSON = propertyRelations.map((propertyRelation) => {
    const propertyRelationJSON = propertyRelation.toJSON();

    return propertyRelationJSON;
  });

  return propertyRelationsJSON;
}

export function declaredVariablesToDeclaredVariablesJSON(declaredVariables) {
  const declaredVariablesJSON = declaredVariables.map((declaredVariable) => {
    const declaredVariableJSON = declaredVariable.toJSON();

    return declaredVariableJSON;
  });

  return declaredVariablesJSON;
}

export function metaLevelAssumptionsToMetaLevelAssumptionsJSON(metaLevelAssumptions) {
  const metaLevelAssumptionsJSON = metaLevelAssumptions.map((metaLevelAssumption) => {
    const metaLevelAssumptionJSON = metaLevelAssumption.toJSON();

    return metaLevelAssumptionJSON;
  });

  return metaLevelAssumptionsJSON;
}

export function declaredMetavariablesToDeclaredMetavariablesJSON(declaredMetavariables) {
  const declaredMetavariablesJSON = declaredMetavariables.map((declaredMetavariable) => {
    const declaredMetavariableJSON = declaredMetavariable.toJSON();

    return declaredMetavariableJSON;
  });

  return declaredMetavariablesJSON;
}

function findTypeByName(name, context) {
  const typeName = name,  ///
        type = context.findTypeByTypeName(typeName);

  return type;
}

function findMetaTypeByName(name, context) {
  const metaTypeName = name,  ///
        metaType = context.findMetaTypeByMetaTypeName(metaTypeName);

  return metaType;
}

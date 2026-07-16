"use strict";

import { continuationUtilities } from "occam-languages";

import elements from "../elements";

import { choose, descend } from "../utilities/context";
import { provisionallyStringFromProvisional } from "../utilities/string";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

const { some } = continuationUtilities;

export function validateTermAsVariable(term, context, continuation) {
  const { Variable } = elements,
        variable = Variable.fromTerm(term, context);

  if (variable === null) {
    const termValidatesAsVariable = false;

    return continuation(termValidatesAsVariable);
  }

  const termString = term.getString();

  context.trace(`Validating the '${termString}' term as a variable...`);

  variable.validate(context, (variable) => {
    if (variable === null) {
      const termValidatesAsVariable = false;

      return continuation(termValidatesAsVariable);
    }

    const type = variable.getType(),
          typeString = type.getString(),
          provisional = variable.isProvisional(),
          provisionallyString = provisionallyStringFromProvisional(provisional);

    context.trace(`Setting the '${termString}' term's type to the '${typeString}' type${provisionallyString}.`);

    term.setType(type);

    term.setProvisional(provisional);

    context.debug(`...validated the '${termString}' term as a variable.`);

    const termValidatesAsVariable = true;

    return continuation(termValidatesAsVariable);
  });
}

function unifyTermWithGenerators(term, context, continuation) {
  let termUnifiesWithGenerators;

  const generators = context.getGenerators();

  termUnifiesWithGenerators = some(generators, (generator) => {
    let termUnifiesWithGenerator = false;

    choose((context) => {
      const termUnifies = generator.unifyTerm(term, context, continuation);

      if (termUnifies) {
        termUnifiesWithGenerator = true;

        context.commit();
      }
    }, context);

    if (termUnifiesWithGenerator) {
      return true;
    }
  });

  return termUnifiesWithGenerators;
}

function unifyTermWithConstructors(term, context, continuation) {
  let termUnifiesWithConstructors;

  const constructors = context.getConstructors();

  termUnifiesWithConstructors = some(constructors, (constructor) => {
    let termUnifiesWithConstructor = false;

    choose((context) => {
      const termUnifies = constructor.unifyTerm(term, context, continuation);

      if (termUnifies) {
        termUnifiesWithConstructor = true;

        context.commit();
      }
    }, context);

    if (termUnifiesWithConstructor) {
      return true;
    }
  });

  return termUnifiesWithConstructors;
}

function unifyTermWithBracketedConstructor(term, context, continuation) {
  let termUnifiesWithBracketedConstructor;

  const bracketedConstructor = bracketedConstructorFromNothing();

  termUnifiesWithBracketedConstructor = bracketedConstructor.unifyTerm(term, context, continuation);

  return termUnifiesWithBracketedConstructor;
}

function validateStatementAsMetavariable(statement, context, continuation) {
  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable === null) {
    const statementValidatesAsMetavariable = false;

    return continuation(statementValidatesAsMetavariable);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a metavariable...`);

  const strict = true;  ///

  metavariable.validate(strict, context, (metavariable) => {
    if (metavariable === null) {
      const statementValidatesAsMetavariable = false;

      return continuation(statementValidatesAsMetavariable);
    }

    const substitution = statement.getSubstitution();

    if (substitution === null) {
      const statementValidatesAsMetavariable = true;

      if (statementValidatesAsMetavariable) {
        context.debug(`...validated the '${statementString}' statement as a metavariable.`);
      }

      return continuation(statementValidatesAsMetavariable);
    }

    const strict = true;

    substitution.validate(strict, context, (substitution) => {
      let statementValidatesAsMetavariable = false;

      if (substitution !== null) {
        statementValidatesAsMetavariable = true;
      }

      if (statementValidatesAsMetavariable) {
        context.debug(`...validated the '${statementString}' statement as a metavariable.`);
      }

      return continuation(statementValidatesAsMetavariable);
    });
  });
}

function unifyStatementWithCombinators(statement, context, continuation) {
  const combinators = context.getCombinators();

  return some(combinators, (combinator, continuation) => {
    descend((context) => {
      return combinator.unifyStatement(statement, context, continuation);
    }, context);
  }, continuation);
}

function unifyStatementWithBracketedCombinator(statement, context, continuation) {
  const bracketedCombinator = bracketedCombinatorFromNothing();

  return bracketedCombinator.unifyStatement(statement, context, continuation);
}

function validateStatementAsEquality(statement, context, continuation) {
  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    const statementValidatesAsEquality = false;

    return continuation(statementValidatesAsEquality);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as an equality...`);

  equality.validate(context, (equality) => {
    let statementValidatesAsEquality = false;

    if (equality !== null) {
      statementValidatesAsEquality = true;
    }

    if (statementValidatesAsEquality) {
      context.debug(`...validated the '${statementString}' statement as an equality.`);
    }

    return continuation(statementValidatesAsEquality);
  });
}

function validateStatementAsJudgement(statement, context, continuation) {
  const { Judgement } = elements,
        judgement = Judgement.fromStatement(statement, context);

  if (judgement === null) {
    const validatesStatementAsJudgement = false;

    return continuation(validatesStatementAsJudgement);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a judgement...`);

  judgement.validate(context, (judgement) => {
    let validatesStatementAsJudgement = false;

    if (judgement !== null) {
      validatesStatementAsJudgement = true;
    }

    if (validatesStatementAsJudgement) {
      context.debug(`...validated the '${statementString}' statement as a judgement.`);
    }

    return continuation(validatesStatementAsJudgement);
  });
}

function validateStatementAsTypeAssertion(statement, context, continuation) {
  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    const validatesStatementAsTypeAssertion = false;

    return continuation(validatesStatementAsTypeAssertion);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a type assertion...`);

  typeAssertion.validate(context, (typeAssertion) => {
    let validatesStatementAsTypeAssertion = false;

    if (typeAssertion !== null) {
      validatesStatementAsTypeAssertion = true;
    }

    if (validatesStatementAsTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }

    return continuation(validatesStatementAsTypeAssertion);
  });
}

function validateStatementAsDefinedAssertion(statement, context, continuation) {
  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion === null) {
    const validatesStatementAsDefinedAssertion = false;

    return continuation(validatesStatementAsDefinedAssertion);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

  definedAssertion.validate(context, (definedAssertion) => {
    let validatesStatementAsDefinedAssertion = false;

    if (definedAssertion !== null) {
      validatesStatementAsDefinedAssertion = true;
    }

    if (validatesStatementAsDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }

    return continuation(validatesStatementAsDefinedAssertion);
  });
}

function validateStatementAsPropertyAssertion(statement, context, continuation) {
  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    const statementValidatesAsPropertyAssertion = false;

    return continuation(statementValidatesAsPropertyAssertion);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a property assertion...`);

  propertyAssertion.validate(context, (propertyAssertion) => {
    let statementValidatesAsPropertyAssertion = false;

    if (propertyAssertion !== null) {
      statementValidatesAsPropertyAssertion = true;
    }

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }

    return continuation(statementValidatesAsPropertyAssertion);
  });
}

function validateStatementAsSubproofAssertion(statement, context, continuation) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion === null) {
    let statementValidatesAsSubproofAssertion = false;

    return continuation(statementValidatesAsSubproofAssertion);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

  subproofAssertion.validate(context, (subproofAssertion) => {
    let statementValidatesAsSubproofAssertion = false;

    if (subproofAssertion !== null) {
      statementValidatesAsSubproofAssertion = true;
    }

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }

    continuation(statementValidatesAsSubproofAssertion);
  });
}

function validateStatementAsContainedAssertion(statement, context, continuation) {
  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion === null) {
    const validatesStatementAsContainedAssertion = false;

    continuation(validatesStatementAsContainedAssertion);

    return;
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

  containedAssertion.validate(context, (containedAssertion) => {
    let validatesStatementAsContainedAssertion = false;

    if (containedAssertion !== null) {
      validatesStatementAsContainedAssertion = true;
    }

    if (validatesStatementAsContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }

    continuation(validatesStatementAsContainedAssertion);
  });
}

function validateStatementAsSignatureAssertion(statement, context, continuation) {
  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    const validatesAStatementsSignatureAssertion = false;

    continuation(validatesAStatementsSignatureAssertion);

    return;
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

  signatureAssertion.validate(context, (signatureAssertion) => {
    let validatesAStatementsSignatureAssertion = false;

    if (signatureAssertion !== null) {
      validatesAStatementsSignatureAssertion = true;
    }

    if (validatesAStatementsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }

    continuation(validatesAStatementsSignatureAssertion);
  });
}

export function unifyTermWithProperties(term, context, continuation) {
  let termUnifiesWithProperties;

  const properties = context.getProperties();

  termUnifiesWithProperties = some(properties, (property) => {
    let termUnifiesWithProperty = false;

    choose((context) => {
      const termUnifies = property.unifyTerm(term, context, continuation);

      if (termUnifies) {
        termUnifiesWithProperty = true;

        context.commit();
      }
    }, context);

    if (termUnifiesWithProperty) {
      return true;
    }
  });

  return termUnifiesWithProperties;
}

export const validateTerms = [
  validateTermAsVariable,
  unifyTermWithGenerators,
  unifyTermWithConstructors,
  unifyTermWithBracketedConstructor
];

export const validateStatements = [
  validateStatementAsMetavariable,
  unifyStatementWithCombinators,
  unifyStatementWithBracketedCombinator,
  validateStatementAsEquality,
  validateStatementAsJudgement,
  validateStatementAsTypeAssertion,
  validateStatementAsDefinedAssertion,
  validateStatementAsPropertyAssertion,
  validateStatementAsSubproofAssertion,
  validateStatementAsContainedAssertion,
  validateStatementAsSignatureAssertion
];

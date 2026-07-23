"use strict";

import { continuationUtilities } from "occam-languages";

import elements from "../elements";

import { choose, descend } from "../utilities/context";
import { provisionallyStringFromProvisional } from "../utilities/string";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

const { some } = continuationUtilities;

export function validateTermAsVariable(term, callback, context, continuation) {
  const { Variable } = elements,
        variable = Variable.fromTerm(term, context);

  if (variable === null) {
    const termValidatesAsVariable = false;

    return continuation(termValidatesAsVariable, term, callback, context);
  }

  const termString = term.getString();

  context.trace(`Validating the '${termString}' term as a variable...`);

  return variable.validate(context, (variable, context) => {
    if (variable === null) {
      const termValidatesAsVariable = false;

      return continuation(termValidatesAsVariable, term, callback, context);
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

    return continuation(termValidatesAsVariable, term, callback, context);
  });
}

function unifyTermWithGenerators(term, callback, context, continuation) {
  const initialContext = context, ///
        generators = context.getGenerators();

  return some(generators, (generator, nullContext, continuation) => {
    choose((context) => {
      return generator.unifyTerm(term, callback, context, continuation);
    }, initialContext);
  }, null, (termUnifies, context) => {
    let termUnifiesWithGenerators = false;

    if (termUnifies) {
      termUnifiesWithGenerators = true;
    }

    if (!termUnifiesWithGenerators) {
      context = initialContext; ///
    }

    return continuation(termUnifiesWithGenerators, term, callback, context);
  });
}

function unifyTermWithConstructors(term, callback, context, continuation) {
  const initialContext = context, ///
        constructors = context.getConstructors();

  return some(constructors, (constructor, nullContext, continuation) => {
    choose((context) => {
      return constructor.unifyTerm(term, callback, context, continuation);
    }, initialContext);
  }, null, (termUnifies, context) => {
    let termUnifiesWithConstructors = false;

    if (termUnifies) {
      termUnifiesWithConstructors = true;
    }

    if (!termUnifiesWithConstructors) {
      context = initialContext; ///
    }

    return continuation(termUnifiesWithConstructors, term, callback, context);
  });
}

function unifyTermWithBracketedConstructor(term, callback, context, continuation) {
  const bracketedConstructor = bracketedConstructorFromNothing();

  return bracketedConstructor.unifyTerm(term, callback, context, (termUnifies, context) => {
    let termUnifiesWithBracketedConstructor = false;

    if (termUnifies) {
      termUnifiesWithBracketedConstructor = true;
    }

    return continuation(termUnifiesWithBracketedConstructor, term, callback, context);
  });
}

function validateStatementAsMetavariable(statement, callback, context, continuation) {
  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable === null) {
    const statementValidatesAsMetavariable = false;

    return continuation(statementValidatesAsMetavariable, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a metavariable...`);

  const strict = true;  ///

  metavariable.validate(strict, context, (metavariable, context) => {
    if (metavariable === null) {
      const statementValidatesAsMetavariable = false;

      return continuation(statementValidatesAsMetavariable, statement, callback, context);
    }

    const substitution = statement.getSubstitution();

    if (substitution === null) {
      const statementValidatesAsMetavariable = true;

      if (statementValidatesAsMetavariable) {
        context.debug(`...validated the '${statementString}' statement as a metavariable.`);
      }

      return continuation(statementValidatesAsMetavariable, statement, callback, context);
    }

    const strict = true;

    substitution.validate(strict, context, (substitution, context) => {
      let statementValidatesAsMetavariable = false;

      if (substitution !== null) {
        statementValidatesAsMetavariable = true;
      }

      if (statementValidatesAsMetavariable) {
        context.debug(`...validated the '${statementString}' statement as a metavariable.`);
      }

      return continuation(statementValidatesAsMetavariable, statement, callback, context);
    });
  });
}

function unifyStatementWithCombinators(statement, callback, context, continuation) {
  const initialContext = context, ///
        combinators = context.getCombinators();

  return some(combinators, (combinator, nullContext, continuation) => {
    descend((context) => {
      return combinator.unifyStatement(statement, callback, context, continuation);
    }, initialContext);
  }, null, (statementUnifies, context) => {
    let statementUnifiesWithCombinators = false;

    if (statementUnifies) {
      statementUnifiesWithCombinators = true;
    }

    if (!statementUnifiesWithCombinators) {
      context = initialContext; ///
    }

    return continuation(statementUnifiesWithCombinators, statement, callback, context);
  });
}

function unifyStatementWithBracketedCombinator(statement, callback, context, continuation) {
  const bracketedCombinator = bracketedCombinatorFromNothing();

  return bracketedCombinator.unifyStatement(statement, callback, context, (statementUnifies, context) => {
    let statementUnifiesWithBracketedCombinator = false;

    if (statementUnifies) {
      statementUnifiesWithBracketedCombinator = true;
    }

    return continuation(statementUnifiesWithBracketedCombinator, statement, callback, context);
  });
}

function validateStatementAsEquality(statement, callback, context, continuation) {
  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    const statementValidatesAsEquality = false;

    return continuation(statementValidatesAsEquality, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as an equality...`);

  return equality.validate((equality, context, continuation) => {
    let statementValidatesAsEquality = false;

    if (equality !== null) {
      statementValidatesAsEquality = true;
    }

    if (statementValidatesAsEquality) {
      context.debug(`...validated the '${statementString}' statement as an equality.`);
    }

    return continuation(statementValidatesAsEquality, statement, callback, context);
  }, context, continuation);
}

function validateStatementAsJudgement(statement, callback, context, continuation) {
  const { Judgement } = elements,
        judgement = Judgement.fromStatement(statement, context);

  if (judgement === null) {
    const validatesStatementAsJudgement = false;

    return continuation(validatesStatementAsJudgement, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a judgement...`);

  return judgement.validate((judgement, context, continuation) => {
    let validatesStatementAsJudgement = false;

    if (judgement !== null) {
      validatesStatementAsJudgement = true;
    }

    if (validatesStatementAsJudgement) {
      context.debug(`...validated the '${statementString}' statement as a judgement.`);
    }

    return continuation(validatesStatementAsJudgement, statement, callback, context);
  }, context, continuation);
}

function validateStatementAsTypeAssertion(statement, callback, context, continuation) {
  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    const validatesStatementAsTypeAssertion = false;

    return continuation(validatesStatementAsTypeAssertion, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a type assertion...`);

  return typeAssertion.validate((typeAssertion, context, continuation) => {
    let validatesStatementAsTypeAssertion = false;

    if (typeAssertion !== null) {
      validatesStatementAsTypeAssertion = true;
    }

    if (!validatesStatementAsTypeAssertion) {
      return continuation(validatesStatementAsTypeAssertion, statement, callback, context);
    }

    if (validatesStatementAsTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }

    return callback(statement, context, continuation);
  }, context, continuation);
}

function validateStatementAsDefinedAssertion(statement, callback, context, continuation) {
  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion === null) {
    const validatesStatementAsDefinedAssertion = false;

    return continuation(validatesStatementAsDefinedAssertion, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

  return definedAssertion.validate((definedAssertion, context, continuation) => {
    let validatesStatementAsDefinedAssertion = false;

    if (definedAssertion !== null) {
      validatesStatementAsDefinedAssertion = true;
    }

    if (validatesStatementAsDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }

    return continuation(validatesStatementAsDefinedAssertion, statement, callback, context);
  }, context, continuation);
}

function validateStatementAsPropertyAssertion(statement, callback, context, continuation) {
  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    const statementValidatesAsPropertyAssertion = false;

    return continuation(statementValidatesAsPropertyAssertion, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a property assertion...`);

  return propertyAssertion.validate((propertyAssertion, context, continuation) => {
    let statementValidatesAsPropertyAssertion = false;

    if (propertyAssertion !== null) {
      statementValidatesAsPropertyAssertion = true;
    }

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }

    return continuation(statementValidatesAsPropertyAssertion, statement, callback, context);
  }, context, continuation);
}

function validateStatementAsSubproofAssertion(statement, callback, context, continuation) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion === null) {
    let statementValidatesAsSubproofAssertion = false;

    return continuation(statementValidatesAsSubproofAssertion, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

  return subproofAssertion.validate((subproofAssertion, context, continuation) => {
    let statementValidatesAsSubproofAssertion = false;

    if (subproofAssertion !== null) {
      statementValidatesAsSubproofAssertion = true;
    }

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }

    return continuation(statementValidatesAsSubproofAssertion, statement, callback, context);
  }, context, continuation);
}

function validateStatementAsContainedAssertion(statement, callback, context, continuation) {
  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion === null) {
    const validatesStatementAsContainedAssertion = false;

    return continuation(validatesStatementAsContainedAssertion, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

  return containedAssertion.validate((containedAssertion, context, continuation) => {
    let validatesStatementAsContainedAssertion = false;

    if (containedAssertion !== null) {
      validatesStatementAsContainedAssertion = true;
    }

    if (validatesStatementAsContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }

    return continuation(validatesStatementAsContainedAssertion, statement, callback, context);
  }, context, continuation);
}

function validateStatementAsSignatureAssertion(statement, callback, context, continuation) {
  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    const validatesAStatementsSignatureAssertion = false;

    return continuation(validatesAStatementsSignatureAssertion, statement, callback, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

  return signatureAssertion.validate((signatureAssertion, context, continuation) => {
    let validatesAStatementsSignatureAssertion = false;

    if (signatureAssertion !== null) {
      validatesAStatementsSignatureAssertion = true;
    }

    if (validatesAStatementsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }

    continuation(validatesAStatementsSignatureAssertion, context);
  }, context, continuation);
}

export function unifyTermWithProperties(term, callback, context, continuation) {
  let termUnifiesWithProperties;

  const properties = context.getProperties();

  return some(properties, (property) => {
    let termUnifiesWithProperty = false;

    choose((context) => {
      const termUnifies = property.unifyTerm(term, callback, context, continuation);

      if (termUnifies) {
        termUnifiesWithProperty = true;

        context.commit();
      }
    }, context);

    if (termUnifiesWithProperty) {
      return true;
    }
  }, context);

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

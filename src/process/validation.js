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

    return continuation(termValidatesAsVariable, term, context);
  }

  const termString = term.getString();

  context.trace(`Validating the '${termString}' term as a variable...`);

  return variable.validate(context, (variable, context) => {
    if (variable === null) {
      const termValidatesAsVariable = false;

      return continuation(termValidatesAsVariable, term, context);
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

    return continuation(termValidatesAsVariable, term, context);
  });
}

function unifyTermWithGenerators(term, context, continuation) {
  const initialContext = context, ///
        generators = context.getGenerators();

  return some(generators, (generator, nullContext, continuation) => {
    return choose((context) => {
      return generator.unifyTerm(term, context, continuation);
    }, initialContext);
  }, null, (termUnifies, context) => {
    let termUnifiesWithGenerators = false;

    if (termUnifies) {
      termUnifiesWithGenerators = true;
    }

    if (!termUnifiesWithGenerators) {
      context = initialContext; ///
    }

    return continuation(termUnifiesWithGenerators, term, context);
  });
}

function unifyTermWithConstructors(term, context, continuation) {
  const initialContext = context, ///
        constructors = context.getConstructors();

  return some(constructors, (constructor, nullContext, continuation) => {
    return choose((context) => {
      return constructor.unifyTerm(term, context, continuation);
    }, initialContext);
  }, null, (termUnifies, context) => {
    let termUnifiesWithConstructors = false;

    if (termUnifies) {
      termUnifiesWithConstructors = true;
    }

    if (!termUnifiesWithConstructors) {
      context = initialContext; ///
    }

    return continuation(termUnifiesWithConstructors, term, context);
  });
}

function unifyTermWithBracketedConstructor(term, context, continuation) {
  const bracketedConstructor = bracketedConstructorFromNothing();

  return bracketedConstructor.unifyTerm(term, context, (termUnifies, context) => {
    let termUnifiesWithBracketedConstructor = false;

    if (termUnifies) {
      termUnifiesWithBracketedConstructor = true;
    }

    return continuation(termUnifiesWithBracketedConstructor, term, context);
  });
}

function validateStatementAsMetavariable(statement, context, continuation) {
  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable === null) {
    const statementValidatesAsMetavariable = false;

    return continuation(statementValidatesAsMetavariable, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a metavariable...`);

  const strict = true;  ///

  metavariable.validate(strict, context, (metavariable, context) => {
    if (metavariable === null) {
      const statementValidatesAsMetavariable = false;

      return continuation(statementValidatesAsMetavariable, statement, context);
    }

    const substitution = statement.getSubstitution();

    if (substitution === null) {
      const statementValidatesAsMetavariable = true;

      if (statementValidatesAsMetavariable) {
        context.debug(`...validated the '${statementString}' statement as a metavariable.`);
      }

      return continuation(statementValidatesAsMetavariable, statement, context);
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

      return continuation(statementValidatesAsMetavariable, statement, context);
    });
  });
}

function unifyStatementWithCombinators(statement, context, continuation) {
  const initialContext = context, ///
        combinators = context.getCombinators();

  return some(combinators, (combinator, nullContext, continuation) => {
    return descend((context) => {
      return combinator.unifyStatement(statement, context, continuation);
    }, initialContext);
  }, null, (statementUnifies, context) => {
    let statementUnifiesWithCombinators = false;

    if (statementUnifies) {
      statementUnifiesWithCombinators = true;
    }

    if (!statementUnifiesWithCombinators) {
      context = initialContext; ///
    }

    return continuation(statementUnifiesWithCombinators, statement, context);
  });
}

function unifyStatementWithBracketedCombinator(statement, context, continuation) {
  const bracketedCombinator = bracketedCombinatorFromNothing();

  return bracketedCombinator.unifyStatement(statement, context, (statementUnifies, context) => {
    let statementUnifiesWithBracketedCombinator = false;

    if (statementUnifies) {
      statementUnifiesWithBracketedCombinator = true;
    }

    return continuation(statementUnifiesWithBracketedCombinator, statement, context);
  });
}

function validateStatementAsEquality(statement, context, continuation) {
  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality === null) {
    const statementValidatesAsEquality = false;

    return continuation(statementValidatesAsEquality, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as an equality...`);

  return equality.validate((equality, context) => {
    let statementValidatesAsEquality = false;

    if (equality !== null) {
      statementValidatesAsEquality = true;
    }

    if (statementValidatesAsEquality) {
      context.debug(`...validated the '${statementString}' statement as an equality.`);
    }

    return continuation(statementValidatesAsEquality, statement, context);
  }, context, continuation);
}

function validateStatementAsJudgement(statement, context, continuation) {
  const { Judgement } = elements,
        judgement = Judgement.fromStatement(statement, context);

  if (judgement === null) {
    const validatesStatementAsJudgement = false;

    return continuation(validatesStatementAsJudgement, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a judgement...`);

  return judgement.validate(context, (judgement, context) => {
    let validatesStatementAsJudgement = false;

    if (judgement !== null) {
      validatesStatementAsJudgement = true;
    }

    if (validatesStatementAsJudgement) {
      context.debug(`...validated the '${statementString}' statement as a judgement.`);
    }

    return continuation(validatesStatementAsJudgement, statement, context);
  });
}

function validateStatementAsTypeAssertion(statement, context, continuation) {
  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion === null) {
    const validatesStatementAsTypeAssertion = false;

    return continuation(validatesStatementAsTypeAssertion, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a type assertion...`);

  return typeAssertion.validate(context, (typeAssertion, context) => {
    let validatesStatementAsTypeAssertion = false;

    if (typeAssertion !== null) {
      validatesStatementAsTypeAssertion = true;
    }

    if (!validatesStatementAsTypeAssertion) {
      return continuation(validatesStatementAsTypeAssertion, statement, context);
    }

    if (validatesStatementAsTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }

    return continuation(validatesStatementAsTypeAssertion, statement, context);
  });
}

function validateStatementAsDefinedAssertion(statement, context, continuation) {
  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion === null) {
    const validatesStatementAsDefinedAssertion = false;

    return continuation(validatesStatementAsDefinedAssertion, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

  return definedAssertion.validate(context, (definedAssertion, context) => {
    let validatesStatementAsDefinedAssertion = false;

    if (definedAssertion !== null) {
      validatesStatementAsDefinedAssertion = true;
    }

    if (validatesStatementAsDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }

    return continuation(validatesStatementAsDefinedAssertion, statement, context);
  });
}

function validateStatementAsPropertyAssertion(statement, context, continuation) {
  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion === null) {
    const statementValidatesAsPropertyAssertion = false;

    return continuation(statementValidatesAsPropertyAssertion, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a property assertion...`);

  return propertyAssertion.validate(context, (propertyAssertion, context) => {
    let statementValidatesAsPropertyAssertion = false;

    if (propertyAssertion !== null) {
      statementValidatesAsPropertyAssertion = true;
    }

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }

    return continuation(statementValidatesAsPropertyAssertion, statement, context);
  });
}

function validateStatementAsSubproofAssertion(statement, context, continuation) {
  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion === null) {
    let statementValidatesAsSubproofAssertion = false;

    return continuation(statementValidatesAsSubproofAssertion, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

  return subproofAssertion.validate(context, (subproofAssertion, context) => {
    let statementValidatesAsSubproofAssertion = false;

    if (subproofAssertion !== null) {
      statementValidatesAsSubproofAssertion = true;
    }

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }

    return continuation(statementValidatesAsSubproofAssertion, statement, context);
  });
}

function validateStatementAsContainedAssertion(statement, context, continuation) {
  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion === null) {
    const validatesStatementAsContainedAssertion = false;

    return continuation(validatesStatementAsContainedAssertion, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

  return containedAssertion.validate(context, (containedAssertion, context) => {
    let validatesStatementAsContainedAssertion = false;

    if (containedAssertion !== null) {
      validatesStatementAsContainedAssertion = true;
    }

    if (validatesStatementAsContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }

    return continuation(validatesStatementAsContainedAssertion, statement, context);
  });
}

function validateStatementAsSignatureAssertion(statement, context, continuation) {
  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion === null) {
    const validatesAStatementsSignatureAssertion = false;

    return continuation(validatesAStatementsSignatureAssertion, statement, context);
  }

  const statementString = statement.getString();

  context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

  return signatureAssertion.validate(context, (signatureAssertion, context) => {
    let validatesAStatementsSignatureAssertion = false;

    if (signatureAssertion !== null) {
      validatesAStatementsSignatureAssertion = true;
    }

    if (validatesAStatementsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }

    continuation(validatesAStatementsSignatureAssertion, context);
  });
}

export function unifyTermWithProperties(term, context, continuation) {
  let termUnifiesWithProperties;

  const properties = context.getProperties();

  return some(properties, (property) => {
    let termUnifiesWithProperty = false;

    return choose((context) => {
      const termUnifies = property.unifyTerm(term, context, continuation);

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

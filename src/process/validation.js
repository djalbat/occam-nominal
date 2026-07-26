"use strict";

import elements from "../elements";

import { some } from "../utilities/continuation";
import { choose, descend } from "../utilities/context";
import { provisionallyStringFromProvisional } from "../utilities/string";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

export function validateTermAsVariable(term, context, continuation) {
  let termValidatesAsVariable = false;

  const { Variable } = elements,
        variable = Variable.fromTerm(term, context);

  if (variable !== null) {
    const termString = term.getString();

    context.trace(`Validating the '${termString}' term as a variable...`);

    termValidatesAsVariable = variable.validate(context, (variable, context) => {
      debugger

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

  return termValidatesAsVariable;
}

function unifyTermWithGenerators(term, context, continuation) {
  let termUnifiesWithGenerators = false;

  const generators = context.getGenerators(),
        generatorsLength = generators.length;

  if (generatorsLength > 0) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with generators...`);

    termUnifiesWithGenerators = some(generators, (generator, context, continuation) => {
      let termUnifies;

      descend((context) => {
        termUnifies = generator.unifyTerm(term, context, continuation);
      }, context);

      return termUnifies;
    }, context, continuation);

    if (termUnifiesWithGenerators) {
      context.debug(`...unified the '${termString}' term with generators.`);
    }
  }

  return termUnifiesWithGenerators;
}

function unifyTermWithConstructors(term, context, continuation) {
  let termUnifiesWithConstructors = false;

  const constructors = context.getConstructors(),
        constructorsLength = constructors.length;

  if (constructorsLength > 0) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with constructors...`);

    termUnifiesWithConstructors = some(constructors, (constructor, context, continuation) => {
      let termUnifies;

      descend((context) => {
        termUnifies = constructor.unifyTerm(term, context, continuation);
      }, context);

      return termUnifies;
    }, context, continuation);

    if (termUnifiesWithConstructors) {
      context.debug(`...unified the '${termString}' term with constructors.`);
    }
  }

  return termUnifiesWithConstructors;
}

function unifyTermWithBracketedConstructor(term, context, continuation) {
  let termUnifiesWithBracketedConstructor;

  const bracketedConstructor = bracketedConstructorFromNothing();

  termUnifiesWithBracketedConstructor = bracketedConstructor.unifyTerm(term, context, continuation);

  return termUnifiesWithBracketedConstructor;
}

function validateStatementAsMetavariable(statement, context, continuation) {
  let statementValidatesAsMetavariable = false;

  const { Metavariable } = elements,
        metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a metavariable...`);

    const strict = true;  ///

    statementValidatesAsMetavariable = metavariable.validate(strict, context, (metavariable, context) => {
      debugger

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

        return continuation(statementValidatesAsMetavariable, statement, context);
      });
    });

    if (statementValidatesAsMetavariable) {
      context.debug(`...validated the '${statementString}' statement as a metavariable.`);
    }
  }

  return statementValidatesAsMetavariable;
}

function unifyStatementWithCombinators(statement, context, continuation) {
  let statementUnifiesWithCombinators = false;

  const combinators = context.getCombinators(),
        combinatorsLength = combinators.length;

  if (combinatorsLength > 0) {
    const statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with combinators...`);

    statementUnifiesWithCombinators = some(combinators, (combinator, context, continuation) => {
      let statementUnifies;

      descend((context) => {
        statementUnifies = combinator.unifyStatement(statement, context, continuation);
      }, context);

      return statementUnifies;
    }, context, continuation);

    if (statementUnifiesWithCombinators) {
      context.debug(`...unified the '${statementString}' statement with combinators.`);
    }
  }

  return statementUnifiesWithCombinators;
}

function unifyStatementWithBracketedCombinator(statement, context, continuation) {
  let statementUnifiesWithBracketedCombinator;

  const bracketedCombinator = bracketedCombinatorFromNothing();

  statementUnifiesWithBracketedCombinator = bracketedCombinator.unifyStatement(statement, context, continuation);

  return statementUnifiesWithBracketedCombinator;
}

function validateStatementAsEquality(statement, context, continuation) {
  let statementValidatesAsEquality = false;

  const { Equality } = elements,
        equality = Equality.fromStatement(statement, context);

  if (equality !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as an equality...`);

    statementValidatesAsEquality = equality.validate((equality, context) => {
      return continuation(statement, context);
    }, context, continuation);

    if (statementValidatesAsEquality) {
      context.debug(`...validated the '${statementString}' statement as an equality.`);
    }
  }

  return statementValidatesAsEquality;
}

function validateStatementAsJudgement(statement, context, continuation) {
  let validatesStatementAsJudgement = false;

  const { Judgement } = elements,
        judgement = Judgement.fromStatement(statement, context);

  if (judgement !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a judgement...`);

    validatesStatementAsJudgement = judgement.validate(context, (judgement, context) => {
      return continuation(statement, context);
    });

    if (validatesStatementAsJudgement) {
      context.debug(`...validated the '${statementString}' statement as a judgement.`);
    }
  }

  return validatesStatementAsJudgement;
}

function validateStatementAsTypeAssertion(statement, context, continuation) {
  let validatesStatementAsTypeAssertion = false;

  const { TypeAssertion } = elements,
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a type assertion...`);

    validatesStatementAsTypeAssertion = typeAssertion.validate(context, (typeAssertion, context) => {
      return continuation(statement, context);
    });

    if (validatesStatementAsTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }
  }

  return validatesStatementAsTypeAssertion;
}

function validateStatementAsDefinedAssertion(statement, context, continuation) {
  let validatesStatementAsDefinedAssertion = false;

  const { DefinedAssertion } = elements,
        definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

    validatesStatementAsDefinedAssertion = definedAssertion.validate(context, (definedAssertion, context) => {
      return continuation(statement, context);
    });

    if (validatesStatementAsDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }
  }

  return validatesStatementAsDefinedAssertion;
}

function validateStatementAsPropertyAssertion(statement, context, continuation) {
  let statementValidatesAsPropertyAssertion = false;

  const { PropertyAssertion } = elements,
        propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a property assertion...`);

    statementValidatesAsPropertyAssertion = propertyAssertion.validate(context, (propertyAssertion, context) => {
      return continuation(statement, context);
    });

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }
  }

  return statementValidatesAsPropertyAssertion;
}

function validateStatementAsSubproofAssertion(statement, context, continuation) {
  let statementValidatesAsSubproofAssertion = false;

  const { SubproofAssertion } = elements,
        subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

    statementValidatesAsSubproofAssertion = subproofAssertion.validate(context, (subproofAssertion, context) => {
      return continuation(statement, context);
    });

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }
  }

  return statementValidatesAsSubproofAssertion;
}

function validateStatementAsContainedAssertion(statement, context, continuation) {
  let validatesStatementAsContainedAssertion = false;

  const { ContainedAssertion } = elements,
        containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

    validatesStatementAsContainedAssertion = containedAssertion.validate(context, (containedAssertion, context) => {
      return continuation(statement, context);
    });

    if (validatesStatementAsContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }
  }

  return validatesStatementAsContainedAssertion;
}

function validateStatementAsSignatureAssertion(statement, context, continuation) {
  let validatesAStatementsSignatureAssertion = false;

  const { SignatureAssertion } = elements,
        signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

    validatesAStatementsSignatureAssertion = signatureAssertion.validate(context, (signatureAssertion, context) => {
      return continuation(statement, context);
    });

    if (validatesAStatementsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }
  }

  return validatesAStatementsSignatureAssertion;
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

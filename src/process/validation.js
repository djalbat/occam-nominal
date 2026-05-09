"use strict";

import elements from "../elements";

import { choose, descend } from "../utilities/context";
import { provisionallyStringFromProvisional } from "../utilities/string";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

function validateTermAsVariable(term, context, validateForwards) {
  let termValidatesAsVariable = false;

  const { Variable } = elements;

  let variable;

  variable = Variable.fromTerm(term, context);

  if (variable !== null) {
    const termString = term.getString();

    context.trace(`Validating the '${termString}' term as a variable...`);

    variable = variable.validate(context);

    if (variable !== null) {
      const type = variable.getType(),
            typeString = type.getString(),
            provisional = variable.isProvisional(),
            provisionallyString = provisionallyStringFromProvisional(provisional);

      context.trace(`Setting the '${termString}' term's type to the '${typeString}' type${provisionallyString}.`);

      term.setType(type);

      term.setProvisional(provisional);

      const validatesForwards = validateForwards(term, context);

      if (validatesForwards) {
        termValidatesAsVariable = true;
      }
    }

    if (termValidatesAsVariable) {
      context.debug(`...validated the '${termString}' term as a variable.`);
    }
  }

  return termValidatesAsVariable;
}

function unifyTermWithConstructors(term, context, validateForwards) {
  let termUnifiesWithConstructors;

  const constructors = context.getConstructors();

  termUnifiesWithConstructors = constructors.some((constructor) => {
    let termUnifiesWithConstructor = false;

    choose((context) => {
      const termUnifies = constructor.unifyTerm(term, context, validateForwards);

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

function unifyTermWithBracketedConstructor(term, context, validateForwards) {
  let termUnifiesWithBracketedConstructor;

  const bracketedConstructor = bracketedConstructorFromNothing();

  termUnifiesWithBracketedConstructor = bracketedConstructor.unifyTerm(term, context, validateForwards);

  return termUnifiesWithBracketedConstructor;
}

function validateStatementAsMetavariable(statement, context) {
  let statementValidatesAsMetavariable = false;

  const { Metavariable } = elements;

  let metavariable;

  metavariable = Metavariable.fromStatement(statement, context);

  if (metavariable !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a metavariable...`);

    const strict = true;  ///

    metavariable = metavariable.validate(strict, context);

    if (metavariable !== null) {

      const { TermSubstitution, FrameSubstitution } = elements;

      let substitution;

      const termSubstitution = TermSubstitution.fromStatement(statement, context),
            frameSubstitution = FrameSubstitution.fromStatement(statement, context);

      substitution = (termSubstitution || frameSubstitution);

      if (substitution === null) {
        statementValidatesAsMetavariable = true;
      } else {
        substitution = substitution.validate(context);  ///

        if (substitution !== null) {
          statementValidatesAsMetavariable = true;
        }
      }
    }

    if (statementValidatesAsMetavariable) {
      context.debug(`...validated the '${statementString}' statement as a metavariable.`);
    }
  }

  return statementValidatesAsMetavariable;
}

function unifyStatementWithCombinators(statement, context) {
  let statementUnifiesWithCombinators = false;

  const combinators = context.getCombinators();

  combinators.some((combinator) => {
    let statementUnifies;

    descend((context) => {
      statementUnifies = combinator.unifyStatement(statement, context);
    }, context);

    if (statementUnifies) {
      statementUnifiesWithCombinators = true;

      return true;
    }
  });

  return statementUnifiesWithCombinators;
}

function unifyStatementWithBracketedCombinator(statement, context) {
  let statementUnifiesWithBracketedCombinator;

  const bracketedCombinator = bracketedCombinatorFromNothing();

  statementUnifiesWithBracketedCombinator = bracketedCombinator.unifyStatement(statement, context);

  return statementUnifiesWithBracketedCombinator;
}

function validateStatementAsEquality(statement, context) {
  let statementValidatesAsEquality = false;

  const { Equality } = elements;

  let equality;

  equality = Equality.fromStatement(statement, context);

  if (equality !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as an equality...`);

    equality = equality.validate(context);  ///

    if (equality !== null) {
      statementValidatesAsEquality = true;
    }

    if (statementValidatesAsEquality) {
      context.debug(`...validated the '${statementString}' statement as an equality.`);
    }
  }

  return statementValidatesAsEquality;
}

function validateStatementAsJudgement(statement, context) {
  let validatesStatementAsJudgement = false;

  let judgement;

  const { Judgement } = elements;

  judgement = Judgement.fromStatement(statement, context);

  if (judgement !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a judgement...`);

    judgement = judgement.validate(context);  ///

    if (judgement !== null) {
      validatesStatementAsJudgement = true;
    }

    if (validatesStatementAsJudgement) {
      context.debug(`...validated the '${statementString}' statement as a judgement.`);
    }
  }

  return validatesStatementAsJudgement;
}

function validateStatementAsTypeAssertion(statement, context) {
  let validatesStatementAsTypeAssertion = false;

  const { TypeAssertion } = elements;

  let typeAssertion;

  typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a type assertion...`);

    typeAssertion = typeAssertion.validate(context);  ///

    if (typeAssertion !== null) {
      validatesStatementAsTypeAssertion = true;
    }

    if (validatesStatementAsTypeAssertion) {
      context.debug(`...validated the '${statementString}' statement as a type assertion.`);
    }
  }

  return validatesStatementAsTypeAssertion;
}

function validateStatementAsDefinedAssertion(statement, context) {
  let validatesStatementAsDefinedAssertion = false;

  const { DefinedAssertion } = elements;

  let definedAssertion;

  definedAssertion = DefinedAssertion.fromStatement(statement, context);

  if (definedAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a defined assertion...`);

    definedAssertion = definedAssertion.validate(context);  ///

    if (definedAssertion !== null) {
      validatesStatementAsDefinedAssertion = true;
    }

    if (validatesStatementAsDefinedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a defined assertion.`);
    }
  }

  return validatesStatementAsDefinedAssertion;
}

function validateStatementAsPropertyAssertion(statement, context) {
  let statementValidatesAsPropertyAssertion = false;

  const { PropertyAssertion } = elements;

  let propertyAssertion;

  propertyAssertion = PropertyAssertion.fromStatement(statement, context);

  if (propertyAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a property assertion...`);

    propertyAssertion = propertyAssertion.validate(context);  ///

    if (propertyAssertion !== null) {
      statementValidatesAsPropertyAssertion = true;
    }

    if (statementValidatesAsPropertyAssertion) {
      context.debug(`...validated the '${statementString}' statement as a property assertion.`);
    }
  }

  return statementValidatesAsPropertyAssertion;
}

function validateStatementAsSubproofAssertion(statement, context) {
  let statementValidatesAsSubproofAssertion = false;

  const { SubproofAssertion } = elements;

  let subproofAssertion;

  subproofAssertion = SubproofAssertion.fromStatement(statement, context);

  if (subproofAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a subproof assertion...`);

    subproofAssertion = subproofAssertion.validate(context);  ///

    if (subproofAssertion !== null) {
      statementValidatesAsSubproofAssertion = true;
    }

    if (statementValidatesAsSubproofAssertion) {
      context.debug(`...validated the '${statementString}' statement as a subproof assertion.`);
    }
  }

  return statementValidatesAsSubproofAssertion;
}

function validateStatementAsContainedAssertion(statement, context) {
  let validatesStatementAsContainedAssertion = false;

  const { ContainedAssertion } = elements;

  let containedAssertion;

  containedAssertion = ContainedAssertion.fromStatement(statement, context);

  if (containedAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a contained assertion...`);

    containedAssertion = containedAssertion.validate(context);  ///

    if (containedAssertion !== null) {
      validatesStatementAsContainedAssertion = true;
    }

    if (validatesStatementAsContainedAssertion) {
      context.debug(`...validated the '${statementString}' statement as a contained assertion.`);
    }
  }

  return validatesStatementAsContainedAssertion;
}

function validateStatementAsSignatureAssertion(statement, context) {
  let validatesAStatementsSignatureAssertion = false;

  const { SignatureAssertion } = elements;

  let signatureAssertion;

  signatureAssertion = SignatureAssertion.fromStatement(statement, context);

  if (signatureAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Validating the '${statementString}' statement as a signature assertion...`);

    signatureAssertion = signatureAssertion.validate(context);  ///

    if (signatureAssertion !== null) {
      validatesAStatementsSignatureAssertion = true;
    }

    if (validatesAStatementsSignatureAssertion) {
      context.debug(`...validated the '${statementString}' statement as a signature assertion.`);
    }
  }

  return validatesAStatementsSignatureAssertion;
}

export const validateTerms = [
  validateTermAsVariable,
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

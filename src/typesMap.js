"use strict";

import { arrayUtilities } from "necessary";

import { nominalParser } from "./utilities/nominal";
import { TERM_RULE_NAME, STATEMENT_RULE_NAME } from "./ruleNames";
import { STUFF_RULE_NAME, NONSENSE_RULE_NAME } from "./constants";

const { first } = arrayUtilities;

const ruleMap = nominalParser.getRuleMap(),
      stuffRule = ruleMap[STUFF_RULE_NAME],
      nonsenseRule = ruleMap[NONSENSE_RULE_NAME],
      stuffTypes = typesFromRule(stuffRule),
      nonsenseTypes = typesFromRule(nonsenseRule),
      termTypes = stuffTypes, ///
      statementTypes = nonsenseTypes,
      typesMap = {
        [TERM_RULE_NAME]: termTypes,
        [STATEMENT_RULE_NAME]: statementTypes
      };

export default typesMap;

function typesFromRule(rule) {
  let parts;

  const definitions = rule.getDefinitions(),
        firstDDefinition = first(definitions),
        definition = firstDDefinition;  ///

  parts = definition.getParts();

  const firstPart = first(parts),
        oneOrMorePartsPart = firstPart, ///
        part = oneOrMorePartsPart.getPart(),
        choiceOrPartsPart = part; ///

  parts = choiceOrPartsPart.getParts();

  const types = parts.map((part) => {
    const significantTokenTypePart = part,  ///
          significantTokenType = significantTokenTypePart.getSignificantTokenType(),
          type = significantTokenType;  ///

    return type;
  });

  return types;
}

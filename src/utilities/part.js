"use strict";

import { partTypes } from "occam-parsers";

const { RuleNamePartType } = partTypes;

export function isPartRuleNamePart(part) {
  let partRuleNamePart = false;

  const partTerminalPart = part.isTerminalPart(),
        partNonTerminalPart = !partTerminalPart;  ///

  if (partNonTerminalPart) {
    const nonTerminalPart = part, ///
          type = nonTerminalPart.getType(),
          typeRuleNamePartType = (type === RuleNamePartType);

    partRuleNamePart = typeRuleNamePartType;  ///
  }

  return partRuleNamePart;
}

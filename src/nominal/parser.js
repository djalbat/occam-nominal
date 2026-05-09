"use strict";

import { NonTerminalNode } from "occam-languages";
import { NominalParser as NominalParserBase } from "occam-grammars";

import NonTerminalNodeMap from "../nonTerminalNodeMap";

export default class NominalParser extends NominalParserBase {
  static NonTerminalNodeMap = NonTerminalNodeMap;

  static defaultNonTerminalNode = NonTerminalNode;
}

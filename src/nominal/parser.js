"use strict";

import { NominalParser as NominalParserBase } from "occam-languages";

import NonTerminalNodeMap from "../nonTerminalNodeMap";

export default class NominalParser extends NominalParserBase {
  static NonTerminalNodeMap = NonTerminalNodeMap;
}

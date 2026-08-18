"use strict";

const GREEK = "[\\p{Script=Greek}]",
      LATIN = "[\\p{Script=Latin}]",
      DECIMAL = "[0-9]",
      LATIN_LOWER_CASE = "[\\p{Script=Latin}&&\\p{Lowercase}]",
      LATIN_UPPER_CASE = "[\\p{Script=Latin}&&\\p{Uppercase}]",
      MATHEMATICAL_SANS_SERIF_BOLD = "[\\u{1D5D4}-\\u{1D607}]",
      MATHEMATICAL_ITALIC_UPPER_CASE = "[\\u{1D434}-\\u{1D44D}]",
      MATHEMATICAL_SCRIPT_UPPER_CASE = "[\\u{1D49C}\\u{212C}\\u{1D49E}\\u{1D49F}\\u{2130}\\u{2131}\\u{1D4A2}\\u{210B}\\u{2110}\\u{1D4A5}\\u{1D4A6}\\u{2112}\\u{2133}\\u{1D4A9}-\\u{1D4AC}\\u{211B}\\u{1D4AE}-\\u{1D4B5}]",
      MATHEMATICAL_FRAKTUR_UPPER_CASE = "[\\u{1D504}\\u{1D505}\\u{212D}\\u{1D507}-\\u{1D50A}\\u{210C}\\u{2111}\\u{1D50D}-\\u{1D514}\\u{211C}\\u{1D516}-\\u{1D51C}\\u{2128}]";

const entries = [
  {
    "primary-keyword": "^(?:Rule|Axiom|Theorem|Lemma|Conjecture|Schema|Premises|Premise|Conclusion|Proof|Therefore|Suppose|Hence|Then|Provisional|Type|TypePrefix|Properties|Property|Variable|Combinator|Constructor|Generator|Metavariable|Given|Closed)\\b"
  },
  {
    "secondary-keyword": "^(?:is|in|the|an|a|by|from|via|because|for|satisfies|provisionally|defined|undefined|missing|present)\\b"
  },
  {
    "meta-type": "^(?:Statement|Reference|Frame)\\b"
  },
  {
    "name": `^(?:${LATIN_UPPER_CASE}${LATIN}*${DECIMAL}*|${LATIN_LOWER_CASE}${LATIN}+${DECIMAL}*)`,
  },
  {
    "identifier": `^(?:${LATIN_LOWER_CASE}${DECIMAL}*|${GREEK}+|${MATHEMATICAL_SANS_SERIF_BOLD}+|${MATHEMATICAL_ITALIC_UPPER_CASE}+|${MATHEMATICAL_SCRIPT_UPPER_CASE}+|${MATHEMATICAL_FRAKTUR_UPPER_CASE}+)`
  },
  {
    "primitive": "^(?:\\||\\.\\.\\.|\\.|\\(|\\)|\\[|\\]|\\+|-|,|<|>|of)"
  },
  {
    "backtick": "^`"
  },
  {
    "special": "^(?:@|::|:|!=|=)"
  },
  {
    "unassigned": "^[^\\s\\(\\)\\[\\]:,]+"
  }
];

export default entries;

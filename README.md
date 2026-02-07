# Occam Nominal

[Occam](https://github.com/djalbat/occam)'s Nominal language.

### Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Example](#example)
- [Usage](#usage)
- [Building](#building)
- [Contact](#contact)

## Introduction

In Occam parlance, a grammar is a combination of lexical entries for a lexer and BNF for a parser. 
On the other hand, a custom grammar is a single lexical entry together with four BNF snippets for terms, expressions, statements and metastatements.

Custom grammars augment the Nominal grammar in order to allow for custom terms and statements. 
This package exports the means to combine custom grammars as well as supplying factory functions to create Nominal lexers and parsers that make use of them.

## Installation

With [npm](https://www.npmjs.com/):

    npm install occam-nominal

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/occam-nominal.git

...and then install the dependencies with npm from within the project's root directory:

    npm install

You can also run a development server, see the section on building later on.

## Example

There is a small development server that can be run from within the project's directory with the following command:

    npm start

The example will then be available at the following URL:

http://localhost:8888

The source for the example can be found in the `src/example.js` file and corresponding `src/example` folder. 
You are encouraged to try the example whilst reading what follows. 
You can rebuild it on the fly with the following command:

    npm run watch-debug

The development server will reload the page whenever you make changes.

One last thing to bear in mind is that this package is included by way of a relative rather than a package import. 
If you are importing it into your own application, however, you should use the standard package import.

## Usage

Custom grammars can be created by calling the `fromName(...)` method of the `CustomGrammar` class and then calling the requisite setters for other properties besides its name:

```
import { CustomGrammar } from "occam-nominal";

const name = "User defined",
      customGrammar = CustomGrammar.fromName(name),
      ruleName = "term",
      bnf = `

        ...
        
      `,
      lexicalPattern = "->|=>";

customGrammar.setBNF(ruleName, bnf);

customGrammar.setLexicalPattern(lexicalPattern);
...
```
Arrays of Custom grammars can then be combined:
```
import { CombinedCustomGrammar } from "occam-nominal";

const customGrammars = [

        ...

      ],
      combinedCustomGrammar = CombinedCustomGrammar.fromCustomGrammars(customGrammars);
```
Once combined, custom grammars can be passed to utility functions in order to create lexers and parsers:
```
const { lexersUtilities, parsersUtilities } = customGrammars,
      { florenceLexerFromCombinedCustomGrammar } = lexersUtilities,
      { florenceParserFromCombinedCustomGrammar } = parsersUtilities;

const combinedCustomGrammar = ...
      florenceLexer = florenceLexerFromCombinedCustomGrammar(combinedCustomGrammar),
      florenceParser = florenceParserFromCombinedCustomGrammar(combinedCustomGrammar);
```

Custom grammars should be provided in topological order, with dependencies coming before dependents.

## Building

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

* james.smith@djalbat.com

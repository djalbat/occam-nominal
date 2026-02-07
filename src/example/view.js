"use strict";

import withStyle from "easy-with-style";  ///

import { Element } from "easy";
import { rulesUtilities } from "occam-parsers";
import { RowsDiv, ColumnDiv, ColumnsDiv, VerticalSplitterDiv } from "easy-layout";
import { lexersUtilities, parsersUtilities, defaultCustomGrammar, CombinedCustomGrammar } from "../index";  ///

import SubHeading from "./subHeading";
import NameSelect from "./select/name";
import SizeableDiv from "./div/sizeable";
import BNFTextarea from "./textarea/bnf";
import RuleNameSelect from "./select/ruleName";
import ContentTextarea from "./textarea/content";
import ParseTreeTextarea from "./textarea/parseTree";
import StartRuleNameInput from "./input/startRuleName";
import NominalBNFTextarea from "./textarea/nominalBNF";
import VocabularyTextarea from "./textarea/vocabulary";
import VocabularyNameSelect from "./select/vocabularyName";
import userDefinedCustomGrammar from "./customGrammar/userDefined";

import { rulesFromParser } from "./utilities/rules";
import { DEFAULT_CUSTOM_GRAMMAR_NAME, USER_DEFINED_CUSTOM_GRAMMAR_NAME } from "./grammarNames";

const { rulesAsString } = rulesUtilities,
      { nominalLexerFromCombinedCustomGrammar } = lexersUtilities,
      { nominalParserFromCombinedCustomGrammar } = parsersUtilities;

class View extends Element {
  keyUpHandler = (event, element) => {
    // try {
      const bnf = this.getBNF(),
            name = this.getName(),
            ruleName = this.getRuleName(),
            vocabulary = this.getVocabulary(),
            vocabularyName = this.getVocabularyName();

      if (name === USER_DEFINED_CUSTOM_GRAMMAR_NAME) {
        userDefinedCustomGrammar.setBNF(ruleName, bnf);

        userDefinedCustomGrammar.setVocabulary(vocabularyName, vocabulary);
      }

      const customGrammars = [
              userDefinedCustomGrammar
            ],
            combinedCustomGrammar = CombinedCustomGrammar.fromCustomGrammars(customGrammars),
            nominalLexer = nominalLexerFromCombinedCustomGrammar(combinedCustomGrammar),
            nominalParser = nominalParserFromCombinedCustomGrammar(combinedCustomGrammar);

      const ruleMap = nominalParser.getRuleMap(),
            startRuleName = this.getStartRuleName(),
            startRule = ruleMap[startRuleName], ///
            content = this.getContent(),
            tokens = nominalLexer.tokenise(content),
            node = nominalParser.parse(tokens, startRule);

      let parseTree = null;

      if (node !== null) {
        parseTree = node.asParseTree(tokens);
      }

      this.setParseTree(parseTree);

      const nominalRules = rulesFromParser(nominalParser),
            multiLine = true,
            rulesString = rulesAsString(nominalRules, multiLine),
            nominalBNF = rulesString;  ///

      this.setNominalBNF(nominalBNF);
    // } catch (error) {
    //   console.log(error);
    //
    //   this.clearParseTree();
    //
    //   this.clearNominalBNF();
    // }
  }

  changeHandler = (event, element) => {
    let customGrammar;

    const name = this.getName(),
          ruleName = this.getRuleName(),
          vocabularyName = this.getVocabularyName();

    switch (name) {
      case DEFAULT_CUSTOM_GRAMMAR_NAME:
        customGrammar = defaultCustomGrammar;

        break;

      case USER_DEFINED_CUSTOM_GRAMMAR_NAME:
        customGrammar = userDefinedCustomGrammar;

        break;
    }

    const bnf = customGrammar.getBNF(ruleName),
          vocabulary = customGrammar.getVocabulary(vocabularyName);

    this.setBNF(bnf);

    this.setVocabulary(vocabulary);
  }

  childElements() {
    const keyUpHandler = this.keyUpHandler.bind(this),
          changeHandler = this.changeHandler.bind(this);

    return ([

      <ColumnsDiv>
        <SizeableDiv>
          <RowsDiv>
            <SubHeading>
              Custom grammar
            </SubHeading>
            <NameSelect onChange={changeHandler} />
            <SubHeading>
              Vocabulary
            </SubHeading>
            <VocabularyNameSelect onChange={changeHandler} />
            <VocabularyTextarea onKeyUp={keyUpHandler} />
            <SubHeading>
              BNF
            </SubHeading>
            <RuleNameSelect onChange={changeHandler} />
            <BNFTextarea onKeyUp={keyUpHandler} />
            <SubHeading>
              Start rule
            </SubHeading>
            <StartRuleNameInput onKeyUp={keyUpHandler} />
          </RowsDiv>
        </SizeableDiv>
        <VerticalSplitterDiv />
        <ColumnDiv>
          <RowsDiv>
            <SubHeading>
              Content
            </SubHeading>
            <ContentTextarea onKeyUp={keyUpHandler} />
            <SubHeading>
              Parse tree
            </SubHeading>
            <ParseTreeTextarea />
            <SubHeading>
              Nominal BNF
            </SubHeading>
            <NominalBNFTextarea />
          </RowsDiv>
        </ColumnDiv>
      </ColumnsDiv>

    ]);
  }

  initialise() {
    this.assignContext();

    const { initialContent, initialStartRuleName } = this.constructor;

    const content = initialContent, ///
          startRuleName = initialStartRuleName; ///

    this.setContent(content);

    this.setStartRuleName(startRuleName);

    this.changeHandler();

    this.keyUpHandler();
  }

  static initialStartRuleName = "";

  static initialContent = `Rule (Groups)
  Conclusion
    A
`;

  static tagName = "div";

  static defaultProperties = {
    className: "view"
  };
}

export default withStyle(View)`

  padding: 1rem;
  
`;

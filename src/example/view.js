"use strict";

import withStyle from "easy-with-style";  ///

import { Element } from "easy";
import { RowsDiv, ColumnDiv, ColumnsDiv, VerticalSplitterDiv } from "easy-layout";

import bnf from "./nominal/bnf";
import entries from "./nominal/entries";
import SubHeading from "./view/subHeading";
import SizeableDiv from "./view/div/sizeable";
import BNFTextarea from "./view/textarea/bnf";
import RuleNameInput from "./view/input/ruleName";
import TokensTextarea from "./view/textarea/tokens";
import ContentTextarea from "./view/textarea/content";
import ParseTreeTextarea from "./view/textarea/parseTree";
import LexicalEntriesTextarea from "./view/textarea/lexicalEntries";

import { nominalLexerFromEntries, nominalParserFromBNF } from "./utilities/nominal";

class View extends Element {
  keyUpHandler = (event, element) => {
    // try {
      const tokens = this.getTokens(),
            parseTree = this.getParseTree(tokens);

      this.setTokens(tokens);

      this.setParseTree(parseTree);
    // } catch (error) {
    //   console.log(error);
    //
    //   this.clearTokens();
    //
    //   this.clearParseTree();
    // }
  }

  getTokens() {
    const lexicalEntries = this.getLexicalEntries(),
          entries = lexicalEntries, ///
          nominalLexer = nominalLexerFromEntries(entries),
          lexer = nominalLexer,  ///
          content = this.getContent(),
          tokens = lexer.tokenise(content);

    return tokens;
  }

  getParseTree(tokens) {
    let parseTree = null;

    const bnf = this.getBNF(),
          nominalParser = nominalParserFromBNF(bnf),
          parser = nominalParser,  ///
          ruleName = this.getRuleName(),
          ruleMap = parser.getRuleMap(),
          rule = ruleMap[ruleName],
          node = parser.parse(tokens, rule);

    if (node !== null) {
      parseTree = node.asParseTree(tokens);
    }

    return parseTree;
  }

  childElements() {
    return (

      <ColumnsDiv>
        <SizeableDiv>
          <RowsDiv>
            <SubHeading>
              Lexical entries
            </SubHeading>
            <LexicalEntriesTextarea onKeyUp={this.keyUpHandler} />
            <SubHeading>
              BNF
            </SubHeading>
            <BNFTextarea onKeyUp={this.keyUpHandler} />
            <SubHeading>
              Rule name
            </SubHeading>
            <RuleNameInput onKeyUp={this.keyUpHandler} />
          </RowsDiv>
        </SizeableDiv>
        <VerticalSplitterDiv />
        <ColumnDiv>
          <RowsDiv>
            <SubHeading>
              Content
            </SubHeading>
            <ContentTextarea onKeyUp={this.keyUpHandler} />
            <SubHeading>
              Tokens
            </SubHeading>
            <TokensTextarea />
            <SubHeading>
              Parse tree
            </SubHeading>
            <ParseTreeTextarea />
          </RowsDiv>
        </ColumnDiv>
      </ColumnsDiv>

    );
  }

  initialise() {
    this.assignContext();

    const { initialContent, initialRuleName } = this.constructor,
          content = initialContent, ///
          ruleName = initialRuleName, ///
          lexicalEntries = entries; ///

    this.setBNF(bnf);

    this.setContent(content);

    this.setRuleName(ruleName);

    this.setLexicalEntries(lexicalEntries);

    this.keyUpHandler();
  }

  static initialRuleName = "";

  static initialContent = `Constructor n:ℕ₁₀

Variable n

Given
  @isTermNaturalNumber(n)

  Constructor n:ℕ₁₀
`;

  static tagName = "div";

  static defaultProperties = {
    className: "view"
  };
}

export default withStyle(View)`

  padding: 1rem;
 
`;

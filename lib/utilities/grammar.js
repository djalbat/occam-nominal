"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get customGrammarBNFLexer () {
        return customGrammarBNFLexer;
    },
    get customGrammarBNFParser () {
        return customGrammarBNFParser;
    },
    get customGrammarVocabularyLexer () {
        return customGrammarVocabularyLexer;
    },
    get customGrammarVocabularyParser () {
        return customGrammarVocabularyParser;
    }
});
var _occamgrammars = require("occam-grammars");
var customGrammarBNFLexer = _occamgrammars.CustomGrammarBNFLexer.fromNothing();
var customGrammarBNFParser = _occamgrammars.CustomGrammarBNFParser.fromNothing();
var customGrammarVocabularyLexer = _occamgrammars.CustomGrammarVocabularyLexer.fromNothing();
var customGrammarVocabularyParser = _occamgrammars.CustomGrammarVocabularyParser.fromNothing();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvZ3JhbW1hci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQ3VzdG9tR3JhbW1hckJORkxleGVyLCBDdXN0b21HcmFtbWFyQk5GUGFyc2VyIH0gZnJvbSBcIm9jY2FtLWdyYW1tYXJzXCI7XG5pbXBvcnQgeyBDdXN0b21HcmFtbWFyVm9jYWJ1bGFyeUxleGVyLCBDdXN0b21HcmFtbWFyVm9jYWJ1bGFyeVBhcnNlciB9IGZyb20gXCJvY2NhbS1ncmFtbWFyc1wiO1xuXG5leHBvcnQgY29uc3QgY3VzdG9tR3JhbW1hckJORkxleGVyID0gQ3VzdG9tR3JhbW1hckJORkxleGVyLmZyb21Ob3RoaW5nKCk7XG5cbmV4cG9ydCBjb25zdCBjdXN0b21HcmFtbWFyQk5GUGFyc2VyID0gQ3VzdG9tR3JhbW1hckJORlBhcnNlci5mcm9tTm90aGluZygpO1xuXG5leHBvcnQgY29uc3QgY3VzdG9tR3JhbW1hclZvY2FidWxhcnlMZXhlciA9IEN1c3RvbUdyYW1tYXJWb2NhYnVsYXJ5TGV4ZXIuZnJvbU5vdGhpbmcoKTtcblxuZXhwb3J0IGNvbnN0IGN1c3RvbUdyYW1tYXJWb2NhYnVsYXJ5UGFyc2VyID0gQ3VzdG9tR3JhbW1hclZvY2FidWxhcnlQYXJzZXIuZnJvbU5vdGhpbmcoKTtcbiJdLCJuYW1lcyI6WyJjdXN0b21HcmFtbWFyQk5GTGV4ZXIiLCJjdXN0b21HcmFtbWFyQk5GUGFyc2VyIiwiY3VzdG9tR3JhbW1hclZvY2FidWxhcnlMZXhlciIsImN1c3RvbUdyYW1tYXJWb2NhYnVsYXJ5UGFyc2VyIiwiQ3VzdG9tR3JhbW1hckJORkxleGVyIiwiZnJvbU5vdGhpbmciLCJDdXN0b21HcmFtbWFyQk5GUGFyc2VyIiwiQ3VzdG9tR3JhbW1hclZvY2FidWxhcnlMZXhlciIsIkN1c3RvbUdyYW1tYXJWb2NhYnVsYXJ5UGFyc2VyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFLYUE7ZUFBQUE7O1FBRUFDO2VBQUFBOztRQUVBQztlQUFBQTs7UUFFQUM7ZUFBQUE7Ozs2QkFUaUQ7QUFHdkQsSUFBTUgsd0JBQXdCSSxvQ0FBcUIsQ0FBQ0MsV0FBVztBQUUvRCxJQUFNSix5QkFBeUJLLHFDQUFzQixDQUFDRCxXQUFXO0FBRWpFLElBQU1ILCtCQUErQkssMkNBQTRCLENBQUNGLFdBQVc7QUFFN0UsSUFBTUYsZ0NBQWdDSyw0Q0FBNkIsQ0FBQ0gsV0FBVyJ9
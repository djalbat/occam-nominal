"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CustomGrammar;
    }
});
var _constants = require("./constants");
var _grammarNames = require("./grammarNames");
var _ruleNames = require("./ruleNames");
var _vocabularyNames = require("./vocabularyNames");
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var CustomGrammar = /*#__PURE__*/ function() {
    function CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary) {
        _class_call_check(this, CustomGrammar);
        this.name = name;
        this.termBNF = termBNF;
        this.statementBNF = statementBNF;
        this.typeVocabulary = typeVocabulary;
        this.symbolVocabulary = symbolVocabulary;
    }
    _create_class(CustomGrammar, [
        {
            key: "getName",
            value: function getName() {
                return this.name;
            }
        },
        {
            key: "getTermBNF",
            value: function getTermBNF() {
                return this.termBNF;
            }
        },
        {
            key: "getStatementBNF",
            value: function getStatementBNF() {
                return this.statementBNF;
            }
        },
        {
            key: "getTypeVocabulary",
            value: function getTypeVocabulary() {
                return this.typeVocabulary;
            }
        },
        {
            key: "getSymbolVocabulary",
            value: function getSymbolVocabulary() {
                return this.symbolVocabulary;
            }
        },
        {
            key: "getBNF",
            value: function getBNF(ruleName) {
                var bnf;
                switch(ruleName){
                    case _ruleNames.TERM_RULE_NAME:
                        bnf = this.termBNF;
                        break;
                    case _ruleNames.STATEMENT_RULE_NAME:
                        bnf = this.statementBNF;
                        break;
                }
                return bnf;
            }
        },
        {
            key: "getVocabulary",
            value: function getVocabulary(vocabularyName) {
                var vocabulary;
                switch(vocabularyName){
                    case _vocabularyNames.TYPE_VOCABULARY_NAME:
                        vocabulary = this.typeVocabulary;
                        break;
                    case _vocabularyNames.SYMBOL_VOCABULARY_NAME:
                        vocabulary = this.symbolVocabulary;
                        break;
                }
                return vocabulary;
            }
        },
        {
            key: "getVocabularies",
            value: function getVocabularies() {
                var vocabularies = [
                    this.typeVocabulary,
                    this.symbolVocabulary
                ];
                return vocabularies;
            }
        },
        {
            key: "isDefaultCustomGrammar",
            value: function isDefaultCustomGrammar() {
                var defaultCustomGrammar = this.name === _grammarNames.DEFAULT_CUSTOM_GRAMMAR_NAME;
                return defaultCustomGrammar;
            }
        },
        {
            key: "setName",
            value: function setName(name) {
                this.name = name;
            }
        },
        {
            key: "setBNF",
            value: function setBNF(ruleName, bnf) {
                switch(ruleName){
                    case _ruleNames.TERM_RULE_NAME:
                        this.termBNF = bnf;
                        break;
                    case _ruleNames.STATEMENT_RULE_NAME:
                        this.statementBNF = bnf;
                        break;
                }
            }
        },
        {
            key: "setVocabulary",
            value: function setVocabulary(vocabularyName, vocabulary) {
                switch(vocabularyName){
                    case _vocabularyNames.TYPE_VOCABULARY_NAME:
                        this.typeVocabulary = vocabulary;
                        break;
                    case _vocabularyNames.SYMBOL_VOCABULARY_NAME:
                        this.symbolVocabulary = vocabulary;
                        break;
                }
            }
        },
        {
            key: "resetBNF",
            value: function resetBNF(ruleName) {
                var bnf = _constants.EMPTY_STRING;
                this.setBNF(ruleName, bnf);
            }
        },
        {
            key: "resetVocabulary",
            value: function resetVocabulary(vocabularyName) {
                var vocabulary = _constants.EMPTY_STRING;
                this.setVocabulary(vocabularyName, vocabulary);
            }
        },
        {
            key: "update",
            value: function update(ruleName, bnf, vocabularyName, vocabulary) {
                this.setBNF(ruleName, bnf);
                this.setVocabulary(vocabularyName, vocabulary);
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var name = this.name, termBNF = this.termBNF, statementBNF = this.statementBNF, typeVocabulary = this.typeVocabulary, symbolVocabulary = this.symbolVocabulary, json = {
                    name: name,
                    termBNF: termBNF,
                    statementBNF: statementBNF,
                    typeVocabulary: typeVocabulary,
                    symbolVocabulary: symbolVocabulary
                };
                return json;
            }
        }
    ], [
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var name = json.name, termBNF = json.termBNF, statementBNF = json.statementBNF, typeVocabulary = json.typeVocabulary, symbolVocabulary = json.symbolVocabulary, customGrammar = new CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);
                return customGrammar;
            }
        },
        {
            key: "fromName",
            value: function fromName(name) {
                var termBNF = _constants.EMPTY_STRING, statementBNF = _constants.EMPTY_STRING, typeVocabulary = _constants.EMPTY_STRING, symbolVocabulary = _constants.EMPTY_STRING, customGrammar = new CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);
                return customGrammar;
            }
        },
        {
            key: "fromNameTermBNFStatementBNFTypeVocabularyAndSymbolVocabulary",
            value: function fromNameTermBNFStatementBNFTypeVocabularyAndSymbolVocabulary(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary) {
                var customGrammar = new CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);
                return customGrammar;
            }
        }
    ]);
    return CustomGrammar;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jdXN0b21HcmFtbWFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IERFRkFVTFRfQ1VTVE9NX0dSQU1NQVJfTkFNRSB9IGZyb20gXCIuL2dyYW1tYXJOYW1lc1wiO1xuaW1wb3J0IHsgVEVSTV9SVUxFX05BTUUsIFNUQVRFTUVOVF9SVUxFX05BTUUgfSBmcm9tIFwiLi9ydWxlTmFtZXNcIjtcbmltcG9ydCB7IFRZUEVfVk9DQUJVTEFSWV9OQU1FLCBTWU1CT0xfVk9DQUJVTEFSWV9OQU1FIH0gZnJvbSBcIi4vdm9jYWJ1bGFyeU5hbWVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbUdyYW1tYXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0ZXJtQk5GLCBzdGF0ZW1lbnRCTkYsIHR5cGVWb2NhYnVsYXJ5LCBzeW1ib2xWb2NhYnVsYXJ5KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRlcm1CTkYgPSB0ZXJtQk5GO1xuICAgIHRoaXMuc3RhdGVtZW50Qk5GID0gc3RhdGVtZW50Qk5GO1xuICAgIHRoaXMudHlwZVZvY2FidWxhcnkgPSB0eXBlVm9jYWJ1bGFyeTtcbiAgICB0aGlzLnN5bWJvbFZvY2FidWxhcnkgPSBzeW1ib2xWb2NhYnVsYXJ5O1xuICB9XG4gIFxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRUZXJtQk5GKCkge1xuICAgIHJldHVybiB0aGlzLnRlcm1CTkY7XG4gIH1cblxuICBnZXRTdGF0ZW1lbnRCTkYoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVtZW50Qk5GO1xuICB9XG5cbiAgZ2V0VHlwZVZvY2FidWxhcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZVZvY2FidWxhcnk7XG4gIH1cblxuICBnZXRTeW1ib2xWb2NhYnVsYXJ5KCkge1xuICAgIHJldHVybiB0aGlzLnN5bWJvbFZvY2FidWxhcnk7XG4gIH1cblxuICBnZXRCTkYocnVsZU5hbWUpIHtcbiAgICBsZXQgYm5mO1xuXG4gICAgc3dpdGNoIChydWxlTmFtZSkge1xuICAgICAgY2FzZSBURVJNX1JVTEVfTkFNRTogYm5mID0gdGhpcy50ZXJtQk5GOyBicmVhaztcbiAgICAgIGNhc2UgU1RBVEVNRU5UX1JVTEVfTkFNRTogYm5mID0gdGhpcy5zdGF0ZW1lbnRCTkY7IGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBibmY7XG4gIH1cblxuICBnZXRWb2NhYnVsYXJ5KHZvY2FidWxhcnlOYW1lKSB7XG4gICAgbGV0IHZvY2FidWxhcnk7XG5cbiAgICBzd2l0Y2ggKHZvY2FidWxhcnlOYW1lKSB7XG4gICAgICBjYXNlIFRZUEVfVk9DQUJVTEFSWV9OQU1FOiB2b2NhYnVsYXJ5ID0gdGhpcy50eXBlVm9jYWJ1bGFyeTsgYnJlYWs7XG4gICAgICBjYXNlIFNZTUJPTF9WT0NBQlVMQVJZX05BTUU6IHZvY2FidWxhcnkgPSB0aGlzLnN5bWJvbFZvY2FidWxhcnk7IGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB2b2NhYnVsYXJ5O1xuICB9XG5cbiAgZ2V0Vm9jYWJ1bGFyaWVzKCkge1xuICAgIGNvbnN0IHZvY2FidWxhcmllcyA9IFtcbiAgICAgIHRoaXMudHlwZVZvY2FidWxhcnksXG4gICAgICB0aGlzLnN5bWJvbFZvY2FidWxhcnlcbiAgICBdO1xuXG4gICAgcmV0dXJuIHZvY2FidWxhcmllcztcbiAgfVxuXG4gIGlzRGVmYXVsdEN1c3RvbUdyYW1tYXIoKSB7XG4gICAgY29uc3QgZGVmYXVsdEN1c3RvbUdyYW1tYXIgPSAodGhpcy5uYW1lID09PSBERUZBVUxUX0NVU1RPTV9HUkFNTUFSX05BTUUpO1xuXG4gICAgcmV0dXJuIGRlZmF1bHRDdXN0b21HcmFtbWFyO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEJORihydWxlTmFtZSwgYm5mKSB7XG4gICAgc3dpdGNoIChydWxlTmFtZSkge1xuICAgICAgY2FzZSBURVJNX1JVTEVfTkFNRTpcbiAgICAgICAgdGhpcy50ZXJtQk5GID0gYm5mO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNUQVRFTUVOVF9SVUxFX05BTUU6XG4gICAgICAgIHRoaXMuc3RhdGVtZW50Qk5GID0gYm5mO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHNldFZvY2FidWxhcnkodm9jYWJ1bGFyeU5hbWUsIHZvY2FidWxhcnkpIHtcbiAgICBzd2l0Y2ggKHZvY2FidWxhcnlOYW1lKSB7XG4gICAgICBjYXNlIFRZUEVfVk9DQUJVTEFSWV9OQU1FOlxuICAgICAgICB0aGlzLnR5cGVWb2NhYnVsYXJ5ID0gdm9jYWJ1bGFyeTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBTWU1CT0xfVk9DQUJVTEFSWV9OQU1FOlxuICAgICAgICB0aGlzLnN5bWJvbFZvY2FidWxhcnkgPSB2b2NhYnVsYXJ5O1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0Qk5GKHJ1bGVOYW1lKSB7XG4gICAgY29uc3QgYm5mID0gRU1QVFlfU1RSSU5HO1xuXG4gICAgdGhpcy5zZXRCTkYocnVsZU5hbWUsIGJuZik7XG4gIH1cblxuICByZXNldFZvY2FidWxhcnkodm9jYWJ1bGFyeU5hbWUpIHtcbiAgICBjb25zdCB2b2NhYnVsYXJ5ID0gRU1QVFlfU1RSSU5HO1xuXG4gICAgdGhpcy5zZXRWb2NhYnVsYXJ5KHZvY2FidWxhcnlOYW1lLCB2b2NhYnVsYXJ5KTtcbiAgfVxuXG4gIHVwZGF0ZShydWxlTmFtZSwgYm5mLCB2b2NhYnVsYXJ5TmFtZSwgdm9jYWJ1bGFyeSkge1xuICAgIHRoaXMuc2V0Qk5GKHJ1bGVOYW1lLCBibmYpO1xuXG4gICAgdGhpcy5zZXRWb2NhYnVsYXJ5KHZvY2FidWxhcnlOYW1lLCB2b2NhYnVsYXJ5KTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5uYW1lLFxuICAgICAgICAgIHRlcm1CTkYgPSB0aGlzLnRlcm1CTkYsXG4gICAgICAgICAgc3RhdGVtZW50Qk5GID0gdGhpcy5zdGF0ZW1lbnRCTkYsXG4gICAgICAgICAgdHlwZVZvY2FidWxhcnkgPSB0aGlzLnR5cGVWb2NhYnVsYXJ5LFxuICAgICAgICAgIHN5bWJvbFZvY2FidWxhcnkgPSB0aGlzLnN5bWJvbFZvY2FidWxhcnksXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB0ZXJtQk5GLFxuICAgICAgICAgICAgc3RhdGVtZW50Qk5GLFxuICAgICAgICAgICAgdHlwZVZvY2FidWxhcnksXG4gICAgICAgICAgICBzeW1ib2xWb2NhYnVsYXJ5XG4gICAgICAgICAgfTtcbiAgICBcbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgeyBuYW1lLCB0ZXJtQk5GLCBzdGF0ZW1lbnRCTkYsIHR5cGVWb2NhYnVsYXJ5LCBzeW1ib2xWb2NhYnVsYXJ5IH0gPSBqc29uLFxuICAgICAgICAgIGN1c3RvbUdyYW1tYXIgPSBuZXcgQ3VzdG9tR3JhbW1hcihuYW1lLCB0ZXJtQk5GLCBzdGF0ZW1lbnRCTkYsIHR5cGVWb2NhYnVsYXJ5LCBzeW1ib2xWb2NhYnVsYXJ5KTtcblxuICAgIHJldHVybiBjdXN0b21HcmFtbWFyO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lKG5hbWUpIHtcbiAgICBjb25zdCB0ZXJtQk5GID0gRU1QVFlfU1RSSU5HLFxuICAgICAgICAgIHN0YXRlbWVudEJORiA9IEVNUFRZX1NUUklORyxcbiAgICAgICAgICB0eXBlVm9jYWJ1bGFyeSA9IEVNUFRZX1NUUklORyxcbiAgICAgICAgICBzeW1ib2xWb2NhYnVsYXJ5ID0gRU1QVFlfU1RSSU5HLFxuICAgICAgICAgIGN1c3RvbUdyYW1tYXIgPSBuZXcgQ3VzdG9tR3JhbW1hcihuYW1lLCB0ZXJtQk5GLCBzdGF0ZW1lbnRCTkYsIHR5cGVWb2NhYnVsYXJ5LCBzeW1ib2xWb2NhYnVsYXJ5KTtcblxuICAgIHJldHVybiBjdXN0b21HcmFtbWFyO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lVGVybUJORlN0YXRlbWVudEJORlR5cGVWb2NhYnVsYXJ5QW5kU3ltYm9sVm9jYWJ1bGFyeShuYW1lLCB0ZXJtQk5GLCBzdGF0ZW1lbnRCTkYsIHR5cGVWb2NhYnVsYXJ5LCBzeW1ib2xWb2NhYnVsYXJ5KSB7XG4gICAgY29uc3QgY3VzdG9tR3JhbW1hciA9IG5ldyBDdXN0b21HcmFtbWFyKG5hbWUsIHRlcm1CTkYsIHN0YXRlbWVudEJORiwgdHlwZVZvY2FidWxhcnksIHN5bWJvbFZvY2FidWxhcnkpO1xuXG4gICAgcmV0dXJuIGN1c3RvbUdyYW1tYXI7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJDdXN0b21HcmFtbWFyIiwibmFtZSIsInRlcm1CTkYiLCJzdGF0ZW1lbnRCTkYiLCJ0eXBlVm9jYWJ1bGFyeSIsInN5bWJvbFZvY2FidWxhcnkiLCJnZXROYW1lIiwiZ2V0VGVybUJORiIsImdldFN0YXRlbWVudEJORiIsImdldFR5cGVWb2NhYnVsYXJ5IiwiZ2V0U3ltYm9sVm9jYWJ1bGFyeSIsImdldEJORiIsInJ1bGVOYW1lIiwiYm5mIiwiVEVSTV9SVUxFX05BTUUiLCJTVEFURU1FTlRfUlVMRV9OQU1FIiwiZ2V0Vm9jYWJ1bGFyeSIsInZvY2FidWxhcnlOYW1lIiwidm9jYWJ1bGFyeSIsIlRZUEVfVk9DQUJVTEFSWV9OQU1FIiwiU1lNQk9MX1ZPQ0FCVUxBUllfTkFNRSIsImdldFZvY2FidWxhcmllcyIsInZvY2FidWxhcmllcyIsImlzRGVmYXVsdEN1c3RvbUdyYW1tYXIiLCJkZWZhdWx0Q3VzdG9tR3JhbW1hciIsIkRFRkFVTFRfQ1VTVE9NX0dSQU1NQVJfTkFNRSIsInNldE5hbWUiLCJzZXRCTkYiLCJzZXRWb2NhYnVsYXJ5IiwicmVzZXRCTkYiLCJFTVBUWV9TVFJJTkciLCJyZXNldFZvY2FidWxhcnkiLCJ1cGRhdGUiLCJ0b0pTT04iLCJqc29uIiwiZnJvbUpTT04iLCJjdXN0b21HcmFtbWFyIiwiZnJvbU5hbWUiLCJmcm9tTmFtZVRlcm1CTkZTdGF0ZW1lbnRCTkZUeXBlVm9jYWJ1bGFyeUFuZFN5bWJvbFZvY2FidWxhcnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBT3FCQTs7O3lCQUxROzRCQUNlO3lCQUNROytCQUNTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU5QyxJQUFBLEFBQU1BLDhCQUFOO2FBQU1BLGNBQ1BDLElBQUksRUFBRUMsT0FBTyxFQUFFQyxZQUFZLEVBQUVDLGNBQWMsRUFBRUMsZ0JBQWdCO2dDQUR0REw7UUFFakIsSUFBSSxDQUFDQyxJQUFJLEdBQUdBO1FBQ1osSUFBSSxDQUFDQyxPQUFPLEdBQUdBO1FBQ2YsSUFBSSxDQUFDQyxZQUFZLEdBQUdBO1FBQ3BCLElBQUksQ0FBQ0MsY0FBYyxHQUFHQTtRQUN0QixJQUFJLENBQUNDLGdCQUFnQixHQUFHQTs7a0JBTlBMOztZQVNuQk0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxJQUFJO1lBQ2xCOzs7WUFFQU0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxPQUFPO1lBQ3JCOzs7WUFFQU0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxZQUFZO1lBQzFCOzs7WUFFQU0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxjQUFjO1lBQzVCOzs7WUFFQU0sS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDTCxnQkFBZ0I7WUFDOUI7OztZQUVBTSxLQUFBQTttQkFBQUEsU0FBQUEsT0FBT0MsUUFBUTtnQkFDYixJQUFJQztnQkFFSixPQUFRRDtvQkFDTixLQUFLRSx5QkFBYzt3QkFBRUQsTUFBTSxJQUFJLENBQUNYLE9BQU87d0JBQUU7b0JBQ3pDLEtBQUthLDhC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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CombinedCustomGrammar;
    }
});
var _necessary = require("necessary");
var _occamlexers = require("occam-lexers");
var _occamparsers = require("occam-parsers");
var _occamgrammarutilities = require("occam-grammar-utilities");
var _default = /*#__PURE__*/ _interop_require_default(require("../customGrammar/default"));
var _vocabulary = require("../utilities/vocabulary");
var _constants = require("../constants");
var _validate = require("../utilities/validate");
var _ruleNames = require("../ruleNames");
var _vocabularyNames = require("../vocabularyNames");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var opaque = _occamlexers.specialSymbols.opaque, rulesFromBNF = _occamparsers.parserUtilities.rulesFromBNF, unshift = _necessary.arrayUtilities.unshift, forwardsForEach = _necessary.arrayUtilities.forwardsForEach, backwardsForEach = _necessary.arrayUtilities.backwardsForEach;
var CombinedCustomGrammar = /*#__PURE__*/ function() {
    function CombinedCustomGrammar(rules, entries) {
        _class_call_check(this, CombinedCustomGrammar);
        this.rules = rules;
        this.entries = entries;
    }
    _create_class(CombinedCustomGrammar, [
        {
            key: "getRules",
            value: function getRules() {
                return this.rules;
            }
        },
        {
            key: "getEntries",
            value: function getEntries() {
                return this.entries;
            }
        },
        {
            key: "postProcess",
            value: function postProcess(rules) {
                rules = _to_consumable_array(rules).concat(_to_consumable_array(this.rules));
                rules = (0, _occamgrammarutilities.eliminateLeftRecursion)(rules); ///
                return rules;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var includeDefault = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
                var customGrammars = [];
                if (includeDefault) {
                    customGrammars = [
                        _default.default
                    ].concat(_to_consumable_array(customGrammars)); ///
                }
                var rules = rulesFromCustomGrammars(customGrammars), entries = entriesFromCustomGrammars(customGrammars), combinedCustomGrammar = new CombinedCustomGrammar(rules, entries);
                return combinedCustomGrammar;
            }
        },
        {
            key: "fromCustomGrammars",
            value: function fromCustomGrammars(customGrammars) {
                var includeDefault = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                if (includeDefault) {
                    customGrammars = [
                        _default.default
                    ].concat(_to_consumable_array(customGrammars)); ///
                }
                var rules = rulesFromCustomGrammars(customGrammars), entries = entriesFromCustomGrammars(customGrammars), combinedCustomGrammar = new CombinedCustomGrammar(rules, entries);
                return combinedCustomGrammar;
            }
        }
    ]);
    return CombinedCustomGrammar;
}();
function rulesFromCustomGrammars(customGrammars) {
    var ruleNames = [
        _ruleNames.TERM_RULE_NAME,
        _ruleNames.STATEMENT_RULE_NAME
    ], bnfs = ruleNames.map(function(ruleName) {
        var bnf = bnfFromCustomGrammars(customGrammars, ruleName);
        return bnf;
    }), bnf = bnfs.join(_constants.VERTICAL_SPACE), rules = rulesFromBNF(bnf);
    combineRules(rules);
    var opacity = opaque; ///
    ruleNames.forEach(function(ruleName) {
        var rule = rules.find(function(rule) {
            var name = rule.getName();
            if (name === ruleName) {
                return true;
            }
        });
        rule.setOpacity(opacity);
    });
    return rules;
}
function entriesFromCustomGrammars(customGrammars) {
    var vocabularyNames = [
        _vocabularyNames.TYPE_VOCABULARY_NAME,
        _vocabularyNames.SYMBOL_VOCABULARY_NAME
    ], entries = vocabularyNames.map(function(vocabularyName) {
        var entry = entryFromCustomGrammars(customGrammars, vocabularyName);
        return entry;
    });
    return entries;
}
function entryFromCustomGrammars(customGrammars, vocabularyName) {
    var expressions = [];
    backwardsForEach(customGrammars, function(customGrammar) {
        var vocabulary = customGrammar.getVocabulary(vocabularyName), customGrammarDefaultCustomGrammar = customGrammar.isDefaultCustomGrammar();
        if (!customGrammarDefaultCustomGrammar) {
            (0, _validate.validateVocabulary)(vocabulary);
        }
        (0, _vocabulary.expressionsFromVocabulary)(vocabulary, expressions);
    });
    var pattern = expressions.join(_constants.VERTICAL_BAR), entryName = vocabularyName, entryValue = "^(?:".concat(pattern, ")"), entry = _define_property({}, entryName, entryValue);
    return entry;
}
function bnfFromCustomGrammars(customGrammars, ruleName) {
    var bnfs = [];
    forwardsForEach(customGrammars, function(customGrammar) {
        var bnf = customGrammar.getBNF(ruleName), customGrammarDefaultCustomGrammar = customGrammar.isDefaultCustomGrammar();
        if (!customGrammarDefaultCustomGrammar) {
            (0, _validate.validateBNF)(bnf, ruleName);
        }
        bnfs.push(bnf);
    });
    var bnf = bnfs.join(_constants.VERTICAL_SPACE);
    return bnf;
}
function combineRules(rules) {
    var outerIndex = 0, length = rules.length;
    while(outerIndex < length){
        var outerRule = rules[outerIndex], outerRuleName = outerRule.getName();
        var innerIndex = outerIndex + 1;
        while(innerIndex < length){
            var innerRule = rules[innerIndex], innerRuleName = innerRule.getName();
            if (innerRuleName === outerRuleName) {
                var innerRuleDefinitions = innerRule.getDefinitions(), outerRuleDefinitions = outerRule.getDefinitions();
                unshift(outerRuleDefinitions, innerRuleDefinitions);
                var start = innerIndex, deleteCount = 1;
                rules.splice(start, deleteCount);
                length = rules.length;
            } else {
                innerIndex++;
            }
        }
        outerIndex++;
        length = rules.length;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jdXN0b21HcmFtbWFyL2NvbWJpbmVkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcbmltcG9ydCB7IHNwZWNpYWxTeW1ib2xzIH0gZnJvbSBcIm9jY2FtLWxleGVyc1wiO1xuaW1wb3J0IHsgcGFyc2VyVXRpbGl0aWVzIH0gZnJvbSBcIm9jY2FtLXBhcnNlcnNcIjtcbmltcG9ydCB7IGVsaW1pbmF0ZUxlZnRSZWN1cnNpb24gfSBmcm9tIFwib2NjYW0tZ3JhbW1hci11dGlsaXRpZXNcIjtcblxuaW1wb3J0IGRlZmF1bHRDdXN0b21HcmFtbWFyIGZyb20gXCIuLi9jdXN0b21HcmFtbWFyL2RlZmF1bHRcIjtcblxuaW1wb3J0IHsgZXhwcmVzc2lvbnNGcm9tVm9jYWJ1bGFyeSB9IGZyb20gXCIuLi91dGlsaXRpZXMvdm9jYWJ1bGFyeVwiO1xuaW1wb3J0IHsgVkVSVElDQUxfQkFSLCBWRVJUSUNBTF9TUEFDRSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHZhbGlkYXRlQk5GLCB2YWxpZGF0ZVZvY2FidWxhcnkgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ZhbGlkYXRlXCI7XG5pbXBvcnQgeyBURVJNX1JVTEVfTkFNRSwgU1RBVEVNRU5UX1JVTEVfTkFNRSB9IGZyb20gXCIuLi9ydWxlTmFtZXNcIjtcbmltcG9ydCB7IFRZUEVfVk9DQUJVTEFSWV9OQU1FLCBTWU1CT0xfVk9DQUJVTEFSWV9OQU1FIH0gZnJvbSBcIi4uL3ZvY2FidWxhcnlOYW1lc1wiO1xuXG5jb25zdCB7IG9wYXF1ZSAgfSA9IHNwZWNpYWxTeW1ib2xzLFxuICAgICAgeyBydWxlc0Zyb21CTkYgfSA9IHBhcnNlclV0aWxpdGllcyxcbiAgICAgIHsgdW5zaGlmdCwgZm9yd2FyZHNGb3JFYWNoLCBiYWNrd2FyZHNGb3JFYWNoIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tYmluZWRDdXN0b21HcmFtbWFyIHtcbiAgY29uc3RydWN0b3IocnVsZXMsIGVudHJpZXMpIHtcbiAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gICAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcbiAgfVxuICBcbiAgZ2V0UnVsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucnVsZXM7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXM7XG4gIH1cblxuICBwb3N0UHJvY2VzcyhydWxlcykge1xuICAgIHJ1bGVzID0gWyAvLy9cbiAgICAgIC4uLnJ1bGVzLFxuICAgICAgLi4udGhpcy5ydWxlc1xuICAgIF07XG5cbiAgICBydWxlcyA9IGVsaW1pbmF0ZUxlZnRSZWN1cnNpb24ocnVsZXMpOyAgLy8vXG5cbiAgICByZXR1cm4gcnVsZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoaW5jbHVkZURlZmF1bHQgPSB0cnVlKSB7XG4gICAgbGV0IGN1c3RvbUdyYW1tYXJzID0gW107XG5cbiAgICBpZiAoaW5jbHVkZURlZmF1bHQpIHtcbiAgICAgIGN1c3RvbUdyYW1tYXJzID0gWyBkZWZhdWx0Q3VzdG9tR3JhbW1hciwgLi4uY3VzdG9tR3JhbW1hcnMgXTsgLy8vXG4gICAgfVxuXG4gICAgY29uc3QgcnVsZXMgPSBydWxlc0Zyb21DdXN0b21HcmFtbWFycyhjdXN0b21HcmFtbWFycyksXG4gICAgICAgICAgZW50cmllcyA9IGVudHJpZXNGcm9tQ3VzdG9tR3JhbW1hcnMoY3VzdG9tR3JhbW1hcnMpLFxuICAgICAgICAgIGNvbWJpbmVkQ3VzdG9tR3JhbW1hciA9IG5ldyBDb21iaW5lZEN1c3RvbUdyYW1tYXIocnVsZXMsIGVudHJpZXMpO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVkQ3VzdG9tR3JhbW1hcjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ3VzdG9tR3JhbW1hcnMoY3VzdG9tR3JhbW1hcnMsIGluY2x1ZGVEZWZhdWx0ID0gdHJ1ZSkge1xuICAgIGlmIChpbmNsdWRlRGVmYXVsdCkge1xuICAgICAgY3VzdG9tR3JhbW1hcnMgPSBbIGRlZmF1bHRDdXN0b21HcmFtbWFyLCAuLi5jdXN0b21HcmFtbWFycyBdOyAvLy9cbiAgICB9XG5cbiAgICBjb25zdCBydWxlcyA9IHJ1bGVzRnJvbUN1c3RvbUdyYW1tYXJzKGN1c3RvbUdyYW1tYXJzKSxcbiAgICAgICAgICBlbnRyaWVzID0gZW50cmllc0Zyb21DdXN0b21HcmFtbWFycyhjdXN0b21HcmFtbWFycyksXG4gICAgICAgICAgY29tYmluZWRDdXN0b21HcmFtbWFyID0gbmV3IENvbWJpbmVkQ3VzdG9tR3JhbW1hcihydWxlcywgZW50cmllcyk7XG4gICAgXG4gICAgcmV0dXJuIGNvbWJpbmVkQ3VzdG9tR3JhbW1hcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBydWxlc0Zyb21DdXN0b21HcmFtbWFycyhjdXN0b21HcmFtbWFycykge1xuICBjb25zdCBydWxlTmFtZXMgPSBbXG4gICAgICAgICAgVEVSTV9SVUxFX05BTUUsXG4gICAgICAgICAgU1RBVEVNRU5UX1JVTEVfTkFNRSxcbiAgICAgICAgXSxcbiAgICAgICAgYm5mcyA9IHJ1bGVOYW1lcy5tYXAoKHJ1bGVOYW1lKSA9PiB7XG4gICAgICAgICAgY29uc3QgYm5mID0gYm5mRnJvbUN1c3RvbUdyYW1tYXJzKGN1c3RvbUdyYW1tYXJzLCBydWxlTmFtZSk7XG5cbiAgICAgICAgICByZXR1cm4gYm5mO1xuICAgICAgICB9KSxcbiAgICAgICAgYm5mID0gYm5mcy5qb2luKFZFUlRJQ0FMX1NQQUNFKSxcbiAgICAgICAgcnVsZXMgPSBydWxlc0Zyb21CTkYoYm5mKTtcblxuICBjb21iaW5lUnVsZXMocnVsZXMpO1xuXG4gIGNvbnN0IG9wYWNpdHkgPSBvcGFxdWU7IC8vL1xuXG4gIHJ1bGVOYW1lcy5mb3JFYWNoKChydWxlTmFtZSkgPT4ge1xuICAgIGNvbnN0IHJ1bGUgPSBydWxlcy5maW5kKChydWxlKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gcnVsZS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChuYW1lID09PSBydWxlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJ1bGUuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJ1bGVzO1xufVxuXG5mdW5jdGlvbiBlbnRyaWVzRnJvbUN1c3RvbUdyYW1tYXJzKGN1c3RvbUdyYW1tYXJzKSB7XG4gIGNvbnN0IHZvY2FidWxhcnlOYW1lcyA9IFtcbiAgICAgICAgICBUWVBFX1ZPQ0FCVUxBUllfTkFNRSxcbiAgICAgICAgICBTWU1CT0xfVk9DQUJVTEFSWV9OQU1FXG4gICAgICAgIF0sXG4gICAgICAgIGVudHJpZXMgPSB2b2NhYnVsYXJ5TmFtZXMubWFwKCh2b2NhYnVsYXJ5TmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVudHJ5ID0gZW50cnlGcm9tQ3VzdG9tR3JhbW1hcnMoY3VzdG9tR3JhbW1hcnMsIHZvY2FidWxhcnlOYW1lKTtcblxuICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgfSk7XG5cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGVudHJ5RnJvbUN1c3RvbUdyYW1tYXJzKGN1c3RvbUdyYW1tYXJzLCB2b2NhYnVsYXJ5TmFtZSkge1xuICBjb25zdCBleHByZXNzaW9ucyA9IFtdO1xuXG4gIGJhY2t3YXJkc0ZvckVhY2goY3VzdG9tR3JhbW1hcnMsIChjdXN0b21HcmFtbWFyKSA9PiB7XG4gICAgY29uc3Qgdm9jYWJ1bGFyeSA9IGN1c3RvbUdyYW1tYXIuZ2V0Vm9jYWJ1bGFyeSh2b2NhYnVsYXJ5TmFtZSksXG4gICAgICAgICAgY3VzdG9tR3JhbW1hckRlZmF1bHRDdXN0b21HcmFtbWFyID0gY3VzdG9tR3JhbW1hci5pc0RlZmF1bHRDdXN0b21HcmFtbWFyKCk7XG5cbiAgICBpZiAoIWN1c3RvbUdyYW1tYXJEZWZhdWx0Q3VzdG9tR3JhbW1hcikge1xuICAgICAgdmFsaWRhdGVWb2NhYnVsYXJ5KHZvY2FidWxhcnkpO1xuICAgIH1cblxuICAgIGV4cHJlc3Npb25zRnJvbVZvY2FidWxhcnkodm9jYWJ1bGFyeSwgZXhwcmVzc2lvbnMpO1xuICB9KTtcblxuICBjb25zdCBwYXR0ZXJuID0gZXhwcmVzc2lvbnMuam9pbihWRVJUSUNBTF9CQVIpLFxuICAgICAgICBlbnRyeU5hbWUgPSB2b2NhYnVsYXJ5TmFtZSwgIC8vL1xuICAgICAgICBlbnRyeVZhbHVlID0gYF4oPzoke3BhdHRlcm59KWAsXG4gICAgICAgIGVudHJ5ID0ge1xuICAgICAgICAgIFtlbnRyeU5hbWVdOiBlbnRyeVZhbHVlXG4gICAgICAgIH07XG5cbiAgcmV0dXJuIGVudHJ5O1xufVxuXG5mdW5jdGlvbiBibmZGcm9tQ3VzdG9tR3JhbW1hcnMoY3VzdG9tR3JhbW1hcnMsIHJ1bGVOYW1lKSB7XG4gIGNvbnN0IGJuZnMgPSBbXTtcblxuICBmb3J3YXJkc0ZvckVhY2goY3VzdG9tR3JhbW1hcnMsIChjdXN0b21HcmFtbWFyKSA9PiB7XG4gICAgY29uc3QgYm5mID0gY3VzdG9tR3JhbW1hci5nZXRCTkYocnVsZU5hbWUpLFxuICAgICAgICAgIGN1c3RvbUdyYW1tYXJEZWZhdWx0Q3VzdG9tR3JhbW1hciA9IGN1c3RvbUdyYW1tYXIuaXNEZWZhdWx0Q3VzdG9tR3JhbW1hcigpO1xuXG4gICAgaWYgKCFjdXN0b21HcmFtbWFyRGVmYXVsdEN1c3RvbUdyYW1tYXIpIHtcbiAgICAgIHZhbGlkYXRlQk5GKGJuZiwgcnVsZU5hbWUpO1xuICAgIH1cblxuICAgIGJuZnMucHVzaChibmYpO1xuICB9KTtcblxuICBjb25zdCBibmYgPSBibmZzLmpvaW4oVkVSVElDQUxfU1BBQ0UpO1xuXG4gIHJldHVybiBibmY7XG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVSdWxlcyhydWxlcykge1xuICBsZXQgb3V0ZXJJbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBydWxlcy5sZW5ndGg7XG5cbiAgd2hpbGUgKG91dGVySW5kZXggPCBsZW5ndGgpIHtcbiAgICBjb25zdCBvdXRlclJ1bGUgPSBydWxlc1tvdXRlckluZGV4XSxcbiAgICAgICAgICBvdXRlclJ1bGVOYW1lID0gb3V0ZXJSdWxlLmdldE5hbWUoKTtcblxuICAgIGxldCBpbm5lckluZGV4ID0gb3V0ZXJJbmRleCArIDE7XG5cbiAgICB3aGlsZSAoaW5uZXJJbmRleCA8IGxlbmd0aCkge1xuICAgICAgY29uc3QgaW5uZXJSdWxlID0gcnVsZXNbaW5uZXJJbmRleF0sXG4gICAgICAgICAgICBpbm5lclJ1bGVOYW1lID0gaW5uZXJSdWxlLmdldE5hbWUoKTtcblxuICAgICAgaWYgKGlubmVyUnVsZU5hbWUgPT09IG91dGVyUnVsZU5hbWUpIHtcbiAgICAgICAgY29uc3QgaW5uZXJSdWxlRGVmaW5pdGlvbnMgPSBpbm5lclJ1bGUuZ2V0RGVmaW5pdGlvbnMoKSxcbiAgICAgICAgICAgICAgb3V0ZXJSdWxlRGVmaW5pdGlvbnMgPSBvdXRlclJ1bGUuZ2V0RGVmaW5pdGlvbnMoKTtcblxuICAgICAgICB1bnNoaWZ0KG91dGVyUnVsZURlZmluaXRpb25zLCBpbm5lclJ1bGVEZWZpbml0aW9ucyk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBpbm5lckluZGV4LCAvLy9cbiAgICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgICAgIHJ1bGVzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuXG4gICAgICAgIGxlbmd0aCA9IHJ1bGVzLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlubmVySW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvdXRlckluZGV4Kys7XG5cbiAgICBsZW5ndGggPSBydWxlcy5sZW5ndGg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21iaW5lZEN1c3RvbUdyYW1tYXIiLCJvcGFxdWUiLCJzcGVjaWFsU3ltYm9scyIsInJ1bGVzRnJvbUJORiIsInBhcnNlclV0aWxpdGllcyIsInVuc2hpZnQiLCJhcnJheVV0aWxpdGllcyIsImZvcndhcmRzRm9yRWFjaCIsImJhY2t3YXJkc0ZvckVhY2giLCJydWxlcyIsImVudHJpZXMiLCJnZXRSdWxlcyIsImdldEVudHJpZXMiLCJwb3N0UHJvY2VzcyIsImVsaW1pbmF0ZUxlZnRSZWN1cnNpb24iLCJmcm9tTm90aGluZyIsImluY2x1ZGVEZWZhdWx0IiwiY3VzdG9tR3JhbW1hcnMiLCJkZWZhdWx0Q3VzdG9tR3JhbW1hciIsInJ1bGVzRnJvbUN1c3RvbUdyYW1tYXJzIiwiZW50cmllc0Zyb21DdXN0b21HcmFtbWFycyIsImNvbWJpbmVkQ3VzdG9tR3JhbW1hciIsImZyb21DdXN0b21HcmFtbWFycyIsInJ1bGVOYW1lcyIsIlRFUk1fUlVMRV9OQU1FIiwiU1RBVEVNRU5UX1JVTEVfTkFNRSIsImJuZnMiLCJtYXAiLCJydWxlTmFtZSIsImJuZiIsImJuZkZyb21DdXN0b21HcmFtbWFycyIsImpvaW4iLCJWRVJUSUNBTF9TUEFDRSIsImNvbWJpbmVSdWxlcyIsIm9wYWNpdHkiLCJmb3JFYWNoIiwicnVsZSIsImZpbmQiLCJuYW1lIiwiZ2V0TmFtZSIsInNldE9wYWNpdHkiLCJ2b2NhYnVsYXJ5TmFtZXMiLCJUWVBFX1ZPQ0FCVUxBUllfTkFNRSIsIlNZTUJPTF9WT0NBQlVMQVJZX05BTUUiLCJ2b2NhYnVsYXJ5TmFtZSIsImVudHJ5IiwiZW50cnlGcm9tQ3VzdG9tR3JhbW1hcnMiLCJleHByZXNzaW9ucyIsImN1c3RvbUdyYW1tYXIiLCJ2b2NhYnVsYXJ5IiwiZ2V0Vm9jYWJ1bGFyeSIsImN1c3RvbUdyYW1tYXJEZWZhdWx0Q3VzdG9tR3JhbW1hciIsImlzRGVmYXVsdEN1c3RvbUdyYW1tYXIiLCJ2YWxpZGF0ZVZvY2FidWxhcnkiLCJleHByZXNzaW9uc0Zyb21Wb2NhYnVsYXJ5IiwicGF0dGVybiIsIlZFUlRJQ0FMX0JBUiIsImVudHJ5TmFtZSIsImVudHJ5VmFsdWUiLCJnZXRCTkYiLCJ2YWxpZGF0ZUJORiIsInB1c2giLCJvdXRlckluZGV4IiwibGVuZ3RoIiwib3V0ZXJSdWxlIiwib3V0ZXJSdWxlTmFtZSIsImlubmVySW5kZXgiLCJpbm5lclJ1bGUiLCJpbm5lclJ1bGVOYW1lIiwiaW5uZXJSdWxlRGVmaW5pdGlvbnMiLCJnZXREZWZpbml0aW9ucyIsIm91dGVyUnVsZURlZmluaXRpb25zIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7ZUFtQnFCQTs7O3lCQWpCVTsyQkFDQTs0QkFDQztxQ0FDTzs4REFFTjswQkFFUzt5QkFDRzt3QkFDRzt5QkFDSTsrQkFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTdELElBQU0sQUFBRUMsU0FBWUMsMkJBQWMsQ0FBMUJELFFBQ0YsQUFBRUUsZUFBaUJDLDZCQUFlLENBQWhDRCxjQUNBRSxVQUErQ0MseUJBQWMsQ0FBN0RELFNBQVNFLGtCQUFzQ0QseUJBQWMsQ0FBcERDLGlCQUFpQkMsbUJBQXFCRix5QkFBYyxDQUFuQ0U7QUFFbkIsSUFBQSxBQUFNUixzQ0FBTjthQUFNQSxzQkFDUFMsS0FBSyxFQUFFQyxPQUFPO2dDQURQVjtRQUVqQixJQUFJLENBQUNTLEtBQUssR0FBR0E7UUFDYixJQUFJLENBQUNDLE9BQU8sR0FBR0E7O2tCQUhFVjs7WUFNbkJXLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0YsS0FBSztZQUNuQjs7O1lBRUFHLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxPQUFPLElBQUksQ0FBQ0YsT0FBTztZQUNyQjs7O1lBRUFHLEtBQUFBO21CQUFBQSxTQUFBQSxZQUFZSixLQUFLO2dCQUNmQSxRQUFRLEFBQ04scUJBQUdBLGNBQ0gscUJBQUcsSUFBSSxDQUFDQSxLQUFLO2dCQUdmQSxRQUFRSyxJQUFBQSw2Q0FBc0IsRUFBQ0wsUUFBUyxHQUFHO2dCQUUzQyxPQUFPQTtZQUNUOzs7O1lBRU9NLEtBQUFBO21CQUFQLFNBQU9BO29CQUFZQyxpQkFBQUEsaUVBQWlCO2dCQUNsQyxJQUFJQyxpQkFBaUIsRUFBRTtnQkFFdkIsSUFBSUQsZ0JBQWdCO29CQUNsQkMsaUJBQWlCO3dCQUFFQyxnQkFBb0I7cUJBQXFCLENBQTNDLE9BQXdCLHFCQUFHRCxrQkFBa0IsR0FBRztnQkFDbkU7Z0JBRUEsSUFBTVIsUUFBUVUsd0JBQXdCRixpQkFDaENQLFVBQVVVLDBCQUEwQkgsaUJBQ3BDSSx3QkFBd0IsSUFsQ2JyQixzQkFrQ3VDUyxPQUFPQztnQkFFL0QsT0FBT1c7WUFDVDs7O1lBRU9DLEtBQUFBO21CQUFQLFNBQU9BLG1CQUFtQkwsY0FBYztvQkFBRUQsaUJBQUFBLGlFQUFpQjtnQkFDekQsSUFBSUEsZ0JBQWdCO29CQUNsQkMsaUJBQWlCO3dCQUFFQyxnQkFBb0I7cUJBQXFCLENBQTNDLE9BQXdCLHFCQUFHRCxrQkFBa0IsR0FBRztnQkFDbkU7Z0JBRUEsSUFBTVIsUUFBUVUsd0JBQXdCRixpQkFDaENQLFVBQVVVLDBCQUEwQkgsaUJBQ3BDSSx3QkFBd0IsSUE5Q2JyQixzQkE4Q3VDUyxPQUFPQztnQkFFL0QsT0FBT1c7WUFDVDs7O1dBakRtQnJCOztBQW9EckIsU0FBU21CLHdCQUF3QkYsY0FBYztJQUM3QyxJQUFNTSxZQUFZO1FBQ1ZDLHlCQUFjO1FBQ2RDLDhCQUFtQjtLQUNwQixFQUNEQyxPQUFPSCxVQUFVSSxHQUFHLENBQUMsU0FBQ0M7UUFDcEIsSUFBTUMsTUFBTUMsc0JBQXNCYixnQkFBZ0JXO1FBRWxELE9BQU9DO0lBQ1QsSUFDQUEsTUFBTUgsS0FBS0ssSUFBSSxDQUFDQyx5QkFBYyxHQUM5QnZCLFFBQVFOLGFBQWEwQjtJQUUzQkksYUFBYXhCO0lBRWIsSUFBTXlCLFVBQVVqQyxRQUFRLEdBQUc7SUFFM0JzQixVQUFVWSxPQUFPLENBQUMsU0FBQ1A7UUFDakIsSUFBTVEsT0FBTzNCLE1BQU00QixJQUFJLENBQUMsU0FBQ0Q7WUFDdkIsSUFBTUUsT0FBT0YsS0FBS0csT0FBTztZQUV6QixJQUFJRCxTQUFTVixVQUFVO2dCQUNyQixPQUFPO1lBQ1Q7UUFDRjtRQUVBUSxLQUFLSSxVQUFVLENBQUNOO0lBQ2xCO0lBRUEsT0FBT3pCO0FBQ1Q7QUFFQSxTQUFTVywwQkFBMEJILGNBQWM7SUFDL0MsSUFBTXdCLGtCQUFrQjtRQUNoQkMscUNBQW9CO1FBQ3BCQyx1Q0FBc0I7S0FDdkIsRUFDRGpDLFVBQVUrQixnQkFBZ0JkLEdBQUcsQ0FBQyxTQUFDaUI7UUFDN0IsSUFBTUMsUUFBUUMsd0JBQXdCN0IsZ0JBQWdCMkI7UUFFdEQsT0FBT0M7SUFDVDtJQUVOLE9BQU9uQztBQUNUO0FBRUEsU0FBU29DLHdCQUF3QjdCLGNBQWMsRUFBRTJCLGNBQWM7SUFDN0QsSUFBTUcsY0FBYyxFQUFFO0lBRXRCdkMsaUJBQWlCUyxnQkFBZ0IsU0FBQytCO1FBQ2hDLElBQU1DLGFBQWFELGNBQWNFLGFBQWEsQ0FBQ04saUJBQ3pDTyxvQ0FBb0NILGNBQWNJLHNCQUFzQjtRQUU5RSxJQUFJLENBQUNELG1DQUFtQztZQUN0Q0UsSUFBQUEsNEJBQWtCLEVBQUNKO1FBQ3JCO1FBRUFLLElBQUFBLHFDQUF5QixFQUFDTCxZQUFZRjtJQUN4QztJQUVBLElBQU1RLFVBQVVSLFlBQVloQixJQUFJLENBQUN5Qix1QkFBWSxHQUN2Q0MsWUFBWWIsZ0JBQ1pjLGFBQWEsQUFBQyxPQUFjLE9BQVJILFNBQVEsTUFDNUJWLFFBQ0UscUJBQUNZLFdBQVlDO0lBR3JCLE9BQU9iO0FBQ1Q7QUFFQSxTQUFTZixzQkFBc0JiLGNBQWMsRUFBRVcsUUFBUTtJQUNyRCxJQUFNRixPQUFPLEVBQUU7SUFFZm5CLGdCQUFnQlUsZ0JBQWdCLFNBQUMrQjtRQUMvQixJQUFNbkIsTUFBTW1CLGNBQWNXLE1BQU0sQ0FBQy9CLFdBQzNCdUIsb0NBQW9DSCxjQUFjSSxzQkFBc0I7UUFFOUUsSUFBSSxDQUFDRCxtQ0FBbUM7WUFDdENTLElBQUFBLHFCQUFXLEVBQUMvQixLQUFLRDtRQUNuQjtRQUVBRixLQUFLbUMsSUFBSSxDQUFDaEM7SUFDWjtJQUVBLElBQU1BLE1BQU1ILEtBQUtLLElBQUksQ0FBQ0MseUJBQWM7SUFFcEMsT0FBT0g7QUFDVDtBQUVBLFNBQVNJLGFBQWF4QixLQUFLO0lBQ3pCLElBQUlxRCxhQUFhLEdBQ2JDLFNBQVN0RCxNQUFNc0QsTUFBTTtJQUV6QixNQUFPRCxhQUFhQyxPQUFRO1FBQzFCLElBQU1DLFlBQVl2RCxLQUFLLENBQUNxRCxXQUFXLEVBQzdCRyxnQkFBZ0JELFVBQVV6QixPQUFPO1FBRXZDLElBQUkyQixhQUFhSixhQUFhO1FBRTlCLE1BQU9JLGFBQWFILE9BQVE7WUFDMUIsSUFBTUksWUFBWTFELEtBQUssQ0FBQ3lELFdBQVcsRUFDN0JFLGdCQUFnQkQsVUFBVTVCLE9BQU87WUFFdkMsSUFBSTZCLGtCQUFrQkgsZUFBZTtnQkFDbkMsSUFBTUksdUJBQXVCRixVQUFVRyxjQUFjLElBQy9DQyx1QkFBdUJQLFVBQVVNLGNBQWM7Z0JBRXJEakUsUUFBUWtFLHNCQUFzQkY7Z0JBRTlCLElBQU1HLFFBQVFOLFlBQ1JPLGNBQWM7Z0JBRXBCaEUsTUFBTWlFLE1BQU0sQ0FBQ0YsT0FBT0M7Z0JBRXBCVixTQUFTdEQsTUFBTXNELE1BQU07WUFDdkIsT0FBTztnQkFDTEc7WUFDRjtRQUNGO1FBRUFKO1FBRUFDLFNBQVN0RCxNQUFNc0QsTUFBTTtJQUN2QjtBQUNGIn0=
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "rulesFromParser", {
    enumerable: true,
    get: function() {
        return rulesFromParser;
    }
});
var _necessary = require("necessary");
var filter = _necessary.arrayUtilities.filter;
function rulesFromParser(parser) {
    var ruleMap = parser.getRuleMap(), startRule = parser.getStartRule(), startRuleName = startRule.getName(), ruleMapValues = Object.values(ruleMap), rules = ruleMapValues; ///
    filter(rules, function(rule) {
        var ruleName = rule.getName();
        if (ruleName !== startRuleName) {
            return true;
        }
    });
    rules.unshift(startRule);
    return rules;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3V0aWxpdGllcy9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bGVzRnJvbVBhcnNlcihwYXJzZXIpIHtcbiAgY29uc3QgcnVsZU1hcCA9IHBhcnNlci5nZXRSdWxlTWFwKCksXG4gICAgICAgIHN0YXJ0UnVsZSA9IHBhcnNlci5nZXRTdGFydFJ1bGUoKSxcbiAgICAgICAgc3RhcnRSdWxlTmFtZSA9IHN0YXJ0UnVsZS5nZXROYW1lKCksXG4gICAgICAgIHJ1bGVNYXBWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHJ1bGVNYXApLFxuICAgICAgICBydWxlcyA9IHJ1bGVNYXBWYWx1ZXM7ICAvLy9cblxuICBmaWx0ZXIocnVsZXMsIChydWxlKSA9PiB7XG4gICAgY29uc3QgcnVsZU5hbWUgPSBydWxlLmdldE5hbWUoKTtcblxuICAgIGlmIChydWxlTmFtZSAhPT0gc3RhcnRSdWxlTmFtZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBydWxlcy51bnNoaWZ0KHN0YXJ0UnVsZSk7XG5cbiAgcmV0dXJuIHJ1bGVzO1xufVxuIl0sIm5hbWVzIjpbInJ1bGVzRnJvbVBhcnNlciIsImZpbHRlciIsImFycmF5VXRpbGl0aWVzIiwicGFyc2VyIiwicnVsZU1hcCIsImdldFJ1bGVNYXAiLCJzdGFydFJ1bGUiLCJnZXRTdGFydFJ1bGUiLCJzdGFydFJ1bGVOYW1lIiwiZ2V0TmFtZSIsInJ1bGVNYXBWYWx1ZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJydWxlcyIsInJ1bGUiLCJydWxlTmFtZSIsInVuc2hpZnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQU1nQkE7OztlQUFBQTs7O3lCQUplO0FBRS9CLElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRUQsU0FBU0QsZ0JBQWdCRyxNQUFNO0lBQ3BDLElBQU1DLFVBQVVELE9BQU9FLFVBQVUsSUFDM0JDLFlBQVlILE9BQU9JLFlBQVksSUFDL0JDLGdCQUFnQkYsVUFBVUcsT0FBTyxJQUNqQ0MsZ0JBQWdCQyxPQUFPQyxNQUFNLENBQUNSLFVBQzlCUyxRQUFRSCxlQUFnQixHQUFHO0lBRWpDVCxPQUFPWSxPQUFPLFNBQUNDO1FBQ2IsSUFBTUMsV0FBV0QsS0FBS0wsT0FBTztRQUU3QixJQUFJTSxhQUFhUCxlQUFlO1lBQzlCLE9BQU87UUFDVDtJQUNGO0lBRUFLLE1BQU1HLE9BQU8sQ0FBQ1Y7SUFFZCxPQUFPTztBQUNUIn0=